import extractDomain from "extract-domain";
import getRecipeData from "scrape-recipe-schema";

import interpretDuration from "@/helpers/interpretDuration";

import { allrecipes, eatingwell } from "./alternative-scrapers";

interface Domains {
  [key: string]: (any: string) => any;
}

const domains: Domains = {
  "allrecipes.com": allrecipes,
  "eatingwell.com": eatingwell,
};

function isDomainSupported(domain: string) {
  return Object.keys(domains).find((d) => d === domain) !== undefined;
}

function convertDuration(str: string) {
  if (!str) return;
  const duration = interpretDuration(str).toMilliseconds();
  if (typeof duration !== "number") {
    return undefined;
  }
  return duration;
}

export async function scrapeRecipe(url: string) {
  const parse = extractDomain(url);

  if (parse) {
    if (isDomainSupported(parse)) {
      if (domains[parse] !== undefined) {
        return fetch(url).then(async (response) => {
          const html = await response.text();
          return { ...domains[parse](html), url };
        });
      }
      throw new Error("Site is not yet supported");
    } else {
      const recipe = await getRecipeData({ html: await (await fetch(url)).text() });
      if (recipe.data !== undefined) {
        const recipeData = recipe.data;
        const newIngredients = recipeData.recipeIngredients.map((ingredient, id) => {
          return { id: id, item: ingredient };
        });
        const newInstructions = recipeData.recipeInstructions.map((instruction, id) => {
          return { id: id, item: instruction };
        });

        const convertedCookTimes = [
          { type: "cookTime", value: convertDuration(recipeData.cookTime) },
          { type: "prepTime", value: convertDuration(recipeData.prepTime) },
          { type: "totalTime", value: convertDuration(recipeData.totalTime) },
        ];

        return { ...recipe.data, recipeIngredients: newIngredients, recipeInstructions: newInstructions, url, convertedCookTimes };
      }
      throw new Error(recipe.message);
    }
  } else {
    throw new Error("Failed to parse domain");
  }
}
