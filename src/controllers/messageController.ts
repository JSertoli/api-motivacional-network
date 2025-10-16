import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export async function getMessages(req: Request, res: Response) {
  try {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar mensagens." });
  }
}

export async function createMessage(req: Request, res: Response) {
  try {
    const { author, content } = req.body;
    if (!author || !content) {
      return res.status(400).json({ error: "Autor e conteúdo são obrigatórios." });
    }

    const message = await prisma.message.create({
      data: { author, content },
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar mensagem." });
  }
}

export async function updateMessage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { author, content } = req.body;

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    const updated = await prisma.message.update({
      where: { id },
      data: { author, content },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar mensagem." });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    await prisma.message.delete({ where: { id } });
    res.json({ message: "Mensagem deletada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar mensagem." });
  }
}
