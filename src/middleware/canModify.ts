// middlewares/isAdmin.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";

export const canModify= async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.userId);
  const messageId = Number(req.params.id);

  // Buscar o usuário
  const user = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  // Se for admin → permitir direto
  if (user.role === "ADMIN") {
    return next();
  }

  // Se NÃO for admin → verificar se ele é o dono da mensagem
  const message = await prisma.message.findUnique({
    where: { id: messageId },
    include: { user: true }
  });

  if (!message) {
    return res.status(404).json({ error: "Mensagem não encontrada" });
  }

  // Se o criador da mensagem for o userId → permitir
  if (message.userId === userId) {
    return next();
  }

  // Caso contrário → negar
  return res.status(403).json({ error: "Você não tem permissão para editar/deletar esta mensagem" });
};
