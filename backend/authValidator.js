import z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.email('Invalid email address'),
  password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
  role: z.string().min(1, { message: 'Role is required' }),
});

export const loginSchema = z.object({
  email: z.email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'password is not correct' }),
});
