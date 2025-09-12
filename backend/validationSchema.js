import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }).trim(),
  email: z.email({ message: 'Invalid email address' }).trim(),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.enum(['admin', 'manager', 'salesman']).default('salesman'),
  createdAt: z.date().optional(),
});

export const loginSchema = userSchema.pick({
  email: true,
  password: true,
});

export const resetPasswordSchema = z.object({
  oldPassword: z.string().min(6, { message: 'Old password is required' }),
  newPassword: z.string().min(6, { message: 'New password must be at least 6 characters long' }),
});

export const deleteUserSchema = z.object({
  id: z.string().regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid user ID format' }),
});

export const inventorySchema = z.object({
  name: z.string().min(1, { message: 'Item name is required' }).trim(),
  quantity: z.coerce.number().int().min(0, { message: 'Quantity must be a non-negative integer' }),
  unit: z.string().trim().optional(),
  purchasePrice: z.coerce.number().min(0, { message: 'Purchase price cannot be negative' }),
  salePrice: z.coerce.number().min(0, { message: 'Sale price cannot be negative' }),
  stockInDate: z.date().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
