import { Request, Response } from "express";
import prisma from "../prisma/client";

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

export const createMessage = async (req: Request, res: Response) => {
  try {
    const { author, content, authorToken } = req.body;

    if (!author || !content || !authorToken) {
      return res
        .status(400)
        .json({ error: "Autor, conteúdo e token são obrigatórios." });
    }

    const message = await prisma.message.create({
      data: { author, content, authorToken },
    });

    res.status(201).json(message);
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);
    res.status(500).json({ error: "Erro interno ao criar mensagem." });
  }
};

export async function updateMessage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { content, authorToken } = req.body;

    if (!authorToken) {
      return res
        .status(400)
        .json({ error: "Token do autor é obrigatório para editar." });
    }

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    if (existing.authorToken !== authorToken) {
      return res
        .status(403)
        .json({ error: "Sem permissão para editar esta mensagem." });
    }

    const updated = await prisma.message.update({
      where: { id },
      data: { content },
    });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar mensagem." });
  }
}

export async function deleteMessage(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { authorToken } = req.body;

    if (!authorToken) {
      return res
        .status(400)
        .json({ error: "Token do autor é obrigatório para deletar." });
    }

    const existing = await prisma.message.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Mensagem não encontrada." });
    }

    if (existing.authorToken !== authorToken) {
      return res
        .status(403)
        .json({ error: "Sem permissão para deletar esta mensagem." });
    }

    await prisma.message.delete({ where: { id } });
    res.json({ message: "Mensagem deletada com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar mensagem." });
  }
}
