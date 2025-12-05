// middlewares/isAdmin.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma/client";

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.userId);

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

  // Caso contrário → negar
  return res.status(403).json({ error: "Você não é um administrador para executar essa ação" });
};
