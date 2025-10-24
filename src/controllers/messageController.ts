import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getMessages = async (req: Request, res: Response) => {
  const messages = await prisma.message.findMany({
    include: { user: true, category: true },
    orderBy: { id: "desc" },
  });
  res.json(messages);
};

export const createMessage = async (req: Request, res: Response) => {
  const { content, userId, categoryId } = req.body;
  if (!content || !userId || !categoryId)
    return res.status(400).json({ error: "Campos obrigatórios ausentes" });

  const message = await prisma.message.create({
    data: { content, userId: Number(userId), categoryId: Number(categoryId) },
  });
  res.status(201).json(message);
};

export const updateMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { content, categoryId } = req.body;

  const updated = await prisma.message.update({
    where: { id: Number(id) },
    data: { content, categoryId },
  });
  res.json(updated);
};

export const deleteMessage = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.message.delete({ where: { id: Number(id) } });
  res.json({ message: "Mensagem excluída" });
};
