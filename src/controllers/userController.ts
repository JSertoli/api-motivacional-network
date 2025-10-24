import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ include: { messages: true } });
  res.json(users);
};

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: "Nome e email são obrigatórios" });

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.json(existingUser); // Retorna o usuário existente
  }

  const user = await prisma.user.create({ data: { name, email } });
  res.status(201).json(user);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const user = await prisma.user.update({
    where: { id: Number(id) },
    data: { name, email },
  });
  res.json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.user.delete({ where: { id: Number(id) } });
  res.json({ message: "Usuário removido" });
};
