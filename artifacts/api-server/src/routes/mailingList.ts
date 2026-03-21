import { Router, type IRouter } from "express";
import { SubscribeMailingListBody } from "@workspace/api-zod";
import { db, mailingListTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

router.post("/mailing-list", async (req, res) => {
  const parseResult = SubscribeMailingListBody.safeParse(req.body);
  if (!parseResult.success) {
    res.status(422).json({
      error: "validation_error",
      message: "Invalid request body",
    });
    return;
  }

  const { email, name } = parseResult.data;

  try {
    const existing = await db
      .select()
      .from(mailingListTable)
      .where(eq(mailingListTable.email, email.toLowerCase()))
      .limit(1);

    if (existing.length > 0) {
      res.status(409).json({
        error: "already_subscribed",
        message: "This email is already subscribed to our mailing list.",
      });
      return;
    }

    await db.insert(mailingListTable).values({
      email: email.toLowerCase(),
      name: name ?? null,
    });

    res.status(201).json({
      success: true,
      message: "You've been added to the Fireplace Records mailing list!",
    });
  } catch (err) {
    req.log.error({ err }, "Error subscribing to mailing list");
    res.status(500).json({
      error: "server_error",
      message: "Something went wrong. Please try again.",
    });
  }
});

export default router;
