import type { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { addSpendingSchema, updateSettingsSchema } from '../schemas/plannerSchemas.js';

function serializeDecimal(value: any) {
  if (value === null || value === undefined) return value;
  if (typeof value === 'object' && 'toNumber' in value && typeof value.toNumber === 'function') {
    return value.toNumber();
  }
  return value;
}

export async function getSettings(req: Request, res: Response) {
  const userId = req.user!.id;
  const settings = await prisma.plannerSettings.findUnique({ where: { userId } });
  if (!settings) {
    return res.status(404).json({ message: 'Impostazioni non trovate' });
  }
  return res.json({
    monthlyIncome: serializeDecimal(settings.monthlyIncome),
    recurring: serializeDecimal(settings.recurring),
    extraSavings: serializeDecimal(settings.extraSavings),
    days: settings.days,
    mode: settings.mode,
    updatedAt: settings.updatedAt,
  });
}

export async function updateSettings(req: Request, res: Response) {
  const parseResult = updateSettingsSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Dati non validi', errors: parseResult.error.flatten() });
  }
  const data = parseResult.data;
  const userId = req.user!.id;
  const settings = await prisma.plannerSettings.upsert({
    where: { userId },
    update: {
      monthlyIncome: data.monthlyIncome,
      recurring: data.recurring,
      extraSavings: data.extraSavings ?? 0,
      days: data.days,
      mode: data.mode,
    },
    create: {
      userId,
      monthlyIncome: data.monthlyIncome,
      recurring: data.recurring,
      extraSavings: data.extraSavings ?? 0,
      days: data.days,
      mode: data.mode,
    },
  });

  return res.json({
    monthlyIncome: serializeDecimal(settings.monthlyIncome),
    recurring: serializeDecimal(settings.recurring),
    extraSavings: serializeDecimal(settings.extraSavings),
    days: settings.days,
    mode: settings.mode,
    updatedAt: settings.updatedAt,
  });
}

export async function listSpending(req: Request, res: Response) {
  const userId = req.user!.id;
  const items = await prisma.spendingEntry.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30,
  });
  return res.json(
    items.map((item) => ({
      id: item.id,
      date: item.date,
      amount: serializeDecimal(item.amount),
      note: item.note,
      createdAt: item.createdAt,
    }))
  );
}

export async function addSpending(req: Request, res: Response) {
  const parseResult = addSpendingSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({ message: 'Dati non validi', errors: parseResult.error.flatten() });
  }

  const data = parseResult.data;
  const userId = req.user!.id;

  const entry = await prisma.spendingEntry.create({
    data: {
      userId,
      date: new Date(data.date),
      amount: data.amount,
      note: data.note,
    },
  });

  return res.status(201).json({
    id: entry.id,
    date: entry.date,
    amount: serializeDecimal(entry.amount),
    note: entry.note,
    createdAt: entry.createdAt,
  });
}

export async function deleteSpending(req: Request, res: Response) {
  const userId = req.user!.id;
  const id = Number.parseInt(req.params.id, 10);
  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'ID non valido' });
  }

  const entry = await prisma.spendingEntry.findFirst({ where: { id, userId } });
  if (!entry) {
    return res.status(404).json({ message: 'Voce non trovata' });
  }

  await prisma.spendingEntry.delete({ where: { id } });
  return res.status(204).send();
}
