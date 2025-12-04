import { Request, Response, NextFunction } from "express";

export const onlySelf = (req: Request, res: Response, next: NextFunction) => {
  const loggedUserId = req.user?.id;          // Quem está logado (token)
  const targetId = Number(req.params.id);     // Quem ele quer alterar/deletar

  if (loggedUserId !== targetId) {
    return res.status(403).json({ error: "Você não tem permissão para isso" });
  }

  next();
};
