export type RootSchema = {
  url: string;
  name: string;
  image?: string;
  description?: string;
  cookTime?: string;
  prepTime?: string;
  totalTime?: string;
  cookTimeOriginalFormat?: string;
  prepTimeOriginalFormat?: string;
  totalTimeOriginalFormat?: string;
  prepTime?: string;
  totalTime?: string;
  recipeYield: number | string;
  recipeIngredients: { item: string; id: string }[];
  recipeInstructions?: { item: string; id: string }[];
  convertedCookTimes?: { type: string; value: number; id: string }[];
  cookTimes?: { id: string; hr: string; min: string; type: string }[];
  recipeCategories?: string[];
  recipeCuisines?: string[];
  recipeTypes?: string[];
  keywords?: string[];
};
