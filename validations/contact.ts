import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Nom trop court').max(120),
  company: z.string().trim().max(160).optional().default(''),
  email: z
    .string()
    .trim()
    .max(200)
    .regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, 'Adresse e-mail invalide'),
  phone: z.string().trim().min(5, 'Téléphone trop court').max(40),
  productType: z.string().trim().min(2, 'Précisez le type de produit').max(120),
  message: z.string().trim().min(10, 'Message trop court').max(4000),
  website: z.string().max(200).optional().default(''),
});

export type ContactInput = z.infer<typeof contactSchema>;
