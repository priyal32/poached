import { parseMilliseconds } from "@helpers/msFormatter";
import extractDomain from "extract-domain";
import interpretDuration from "helpers/interpretDuration";
import { nanoid } from "nanoid";
import getRecipeData from "scrape-recipe-schema";

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
        const newIngredients = recipeData.recipeIngredients.map((ingredient) => {
          return { id: nanoid(), item: ingredient };
        });
        const newInstructions = recipeData.recipeInstructions.map((instruction) => {
          return { id: nanoid(), item: instruction };
        });

        const convertedCookTimes = [
          { id: nanoid(), type: "cookTime", value: convertDuration(recipeData.cookTime) },
          { id: nanoid(), type: "prepTime", value: convertDuration(recipeData.prepTime) },
          { id: nanoid(), type: "totalTime", value: convertDuration(recipeData.totalTime) },
        ];

        const parsedCookTimes = convertedCookTimes.map((time) => {
          return { id: nanoid(), type: time.type, hr: parseMilliseconds(time.value as number).hours.toString(), min: parseMilliseconds(time.value as number).minutes.toString() };
        });

        return { ...recipe.data, recipeIngredients: newIngredients, recipeInstructions: newInstructions, url, convertedCookTimes, cookTimes: parsedCookTimes };
      }
      throw new Error(recipe.message);
    }
  } else {
    throw new Error("Failed to parse domain");
  }
}
