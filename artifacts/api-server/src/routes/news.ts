import { Router, type IRouter } from "express";
import { db, newsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import {
  CreateNewsBody,
  UpdateNewsBody,
  GetNewsParams,
  UpdateNewsParams,
  DeleteNewsParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/news", async (_req, res) => {
  try {
    const articles = await db
      .select()
      .from(newsTable)
      .orderBy(newsTable.publishedAt);
    res.json(articles.reverse());
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/news", async (req, res) => {
  const parsed = CreateNewsBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const { title, content, excerpt, imageUrl, publishedAt } = parsed.data;
  try {
    const [article] = await db
      .insert(newsTable)
      .values({
        title,
        content,
        excerpt,
        imageUrl: imageUrl ?? null,
        publishedAt: new Date(publishedAt),
      })
      .returning();
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/news/:id", async (req, res) => {
  const parsed = GetNewsParams.safeParse({ id: req.params.id });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    const [article] = await db
      .select()
      .from(newsTable)
      .where(eq(newsTable.id, parsed.data.id));
    if (!article) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/news/:id", async (req, res) => {
  const paramsParsed = UpdateNewsParams.safeParse({ id: req.params.id });
  if (!paramsParsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  const bodyParsed = UpdateNewsBody.safeParse(req.body);
  if (!bodyParsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }
  const { title, content, excerpt, imageUrl, publishedAt } = bodyParsed.data;
  try {
    const [article] = await db
      .update(newsTable)
      .set({
        title,
        content,
        excerpt,
        imageUrl: imageUrl ?? null,
        publishedAt: new Date(publishedAt),
        updatedAt: new Date(),
      })
      .where(eq(newsTable.id, paramsParsed.data.id))
      .returning();
    if (!article) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/news/:id", async (req, res) => {
  const parsed = DeleteNewsParams.safeParse({ id: req.params.id });
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid id" });
    return;
  }
  try {
    const [deleted] = await db
      .delete(newsTable)
      .where(eq(newsTable.id, parsed.data.id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: "Not found" });
      return;
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
