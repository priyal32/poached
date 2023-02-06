import { RootSchema } from "types/index";
import * as z from "zod";

type ZodShape<T> = {
  [key in keyof T]-?: undefined extends T[key] ? z.ZodOptionalType<z.ZodType<T[key]>> : z.ZodType<T[key]>;
};

const recipeShape: ZodShape<RootSchema> = {
  name: z.string().min(1, "Name is required"),
  url: z.union([z.literal(""), z.string().trim().url()]),
  recipeYield: z.number().min(1, "Yields is required"),
  image: z.string().optional(),
  recipeIngredients: z.array(
    z.object({
      id: z.string(),
      item: z.string(),
    }),
  ),
  description: z.string().optional(),
  cookTime: z.string().optional(),
  prepTime: z.string().optional(),
  totalTime: z.string().optional(),
  cookTimeOriginalFormat: z.string().optional(),
  prepTimeOriginalFormat: z.string().optional(),
  totalTimeOriginalFormat: z.string().optional(),
  recipeInstructions: z
    .array(
      z.object({
        id: z.string(),
        item: z.string(),
      }),
    )
    .optional(),
  convertedCookTimes: z
    .array(
      z.object({
        id: z.string(),
        type: z.string().min(3),
        value: z.number(),
      }),
    )
    .optional(),
  cookTimes: z
    .array(
      z.object({
        id: z.string(),
        hr: z.string(),
        min: z.string(),
        type: z.string().min(1, "required"),
      }),
    )
    .optional(),
  recipeCategories: z.array(z.string()).optional(),
  recipeCuisines: z.array(z.string()).optional(),
  recipeTypes: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
};

export const recipeSchema = z.object(recipeShape);
