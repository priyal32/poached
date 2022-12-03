export type RootSchema = {
  url?: string
  name: string
  image?: string
  description?: string
  cookTime?: string
  prepTime?: string
  totalTime?: string
  cookTimeOriginalFormat?: string
  prepTimeOriginalFormat?: string
  totalTimeOriginalFormat?: string
  prepTime?: string
  totalTime?: string
  recipeYield?: number | string
  recipeIngredients: string[]
  recipeInstructions?: string[]
  recipeCategories?: string[]
  recipeCuisines?: string[]
  recipeTypes?: string[]
  keywords?: string[]
}
