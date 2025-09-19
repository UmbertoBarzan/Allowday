import type { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import prisma from '../lib/prisma.js';
import { loginSchema, registerSchema } from '../schemas/authSchemas.js';
import { signToken } from '../utils/token.js';

const SALT_ROUNDS = 12;

function serializeUser(user: {
  id: number;
  email: string;
  fullName?: string | null;
  createdAt: Date;
  settings?: {
    monthlyIncome: any;
    recurring: any;
    extraSavings: any;
    days: number;
    mode: string;
    updatedAt: Date;
  } | null;
}) {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
    settings: user.settings
      ? {
          monthlyIncome: Number(user.settings.monthlyIncome) || 0,
          recurring: Number(user.settings.recurring) || 0,
          extraSavings: Number(user.settings.extraSavings) || 0,
          days: user.settings.days,
          mode: user.settings.mode,
          updatedAt: user.settings.updatedAt,
        }
      : null,
  };
}

export async function register(req: Request, res: Response) {
  const parseResult = registerSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Dati non validi', errors: parseResult.error.flatten() });
  }

  const { email, password, fullName } = parseResult.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: 'Email già registrata' });
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      fullName,
      settings: {
        create: {},
      },
    },
    select: {
      id: true,
      email: true,
      fullName: true,
      createdAt: true,
      settings: true,
    },
  });

  const token = signToken({ userId: user.id, email: user.email });

  return res.status(201).json({ token, user: serializeUser(user) });
}

export async function login(req: Request, res: Response) {
  const parseResult = loginSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Credenziali non valide', errors: parseResult.error.flatten() });
  }

  const { email, password } = parseResult.data;

  const user = await prisma.user.findUnique({ where: { email }, include: { settings: true } });
  if (!user) {
    return res.status(401).json({ message: 'Credenziali non valide' });
  }

  const isValid = await bcrypt.compare(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: 'Credenziali non valide' });
  }

  const token = signToken({ userId: user.id, email: user.email });

  const { passwordHash, ...safeUser } = user as typeof user & { passwordHash: string };

  return res.json({ token, user: serializeUser(safeUser) });
}
