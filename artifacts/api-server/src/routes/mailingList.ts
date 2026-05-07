import { Router, type IRouter } from "express";
import { SubscribeMailingListBody } from "@workspace/api-zod";
import { db, mailingListTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { createIpRateLimiter } from "../middleware/rateLimit";

const router: IRouter = Router();
const mailListLimiter = createIpRateLimiter({
  windowMs: 60_000,
  maxRequests: 10,
  message: "Too many subscription attempts. Please try again in a minute.",
});

router.post("/mailing-list", mailListLimiter, async (req, res) => {
  const parseResult = SubscribeMailingListBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(422).json({
      error: "validation_error",
      message: "Invalid request body",
    });
    return;
  }

  const rawEmail = parseResult.data.email;
  const rawName = parseResult.data.name;
  const normalizedEmail = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";
  const normalizedName = typeof rawName === "string" ? rawName.trim() : "";

  if (
    normalizedEmail.length === 0 ||
    normalizedEmail.length > 254 ||
    normalizedName.length > 80
  ) {
    res.status(422).json({
      error: "validation_error",
      message: "Invalid request body",
    });
    return;
  }

  try {
    const existing = await db
      .select()
      .from(mailingListTable)
      .where(eq(mailingListTable.email, normalizedEmail))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({
        error: "already_subscribed",
        message: "This email is already subscribed to our mailing list.",
      });
      return;
    }

    await db.insert(mailingListTable).values({
      email: normalizedEmail,
      name: normalizedName.length > 0 ? normalizedName : null,
    });

    res.status(201).json({
      success: true,
      message: "You've been added to the Fireplace Records mailing list!",
    });
  } catch (err) {
    const isUniqueViolation =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      (err as { code: unknown }).code === "23505";

    if (isUniqueViolation) {
      res.status(409).json({
        error: "already_subscribed",
        message: "This email is already subscribed to our mailing list.",
      });
      return;
    }

    req.log.error({ err }, "Error subscribing to mailing list");
    res.status(500).json({
      error: "server_error",
      message: "Something went wrong. Please try again.",
    });
  }
});

export default router;
