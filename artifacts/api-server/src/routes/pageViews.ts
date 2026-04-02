import { Router, type IRouter } from "express";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";

const router: IRouter = Router();

router.post("/page-views", async (req, res) => {
  try {
    const result = await db.execute(sql`
      INSERT INTO page_views_counter (id, count, updated_at)
      VALUES (1, 1, NOW())
      ON CONFLICT (id) DO UPDATE
        SET count      = page_views_counter.count + 1,
            updated_at = NOW()
      RETURNING count
    `);

    const count = Number((result.rows[0] as { count: string | number }).count);
    res.json({ count });
  } catch (err) {
    req.log.error({ err }, "Error recording page view");
    res.status(500).json({ error: "server_error", message: "Could not record page view." });
  }
});

router.get("/page-views", async (req, res) => {
  try {
    const result = await db.execute(sql`
      SELECT count FROM page_views_counter WHERE id = 1
    `);

    const count = result.rows.length > 0
      ? Number((result.rows[0] as { count: string | number }).count)
      : 0;
    res.json({ count });
  } catch (err) {
    req.log.error({ err }, "Error fetching page view count");
    res.status(500).json({ error: "server_error", message: "Could not fetch page view count." });
  }
});

export default router;
