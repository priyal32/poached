import { withMethods } from "@libs/api-middleware/withMethod";
import { prisma } from "@libs/server/prisma";
import { getCurrentUser } from "@libs/server/session";
import { NextApiRequest, NextApiResponse } from "next";
import { RootSchema } from "types";

interface ExtendedNextApiRequest extends NextApiRequest {
  body: RootSchema;
}

async function handle(req: ExtendedNextApiRequest, res: NextApiResponse) {
  try {
    const userId = await getCurrentUser({ req, res });

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const recipe = await prisma.recipe
      .create({
        data: {
          name: req.body.name,
          description: req.body.description,
          image: req.body.image || "",
          cookTime: req.body.cookTime || "",
          cookTimeOriginalFormat: req.body.cookTime || "",
          prepTime: req.body.prepTime || "",
          prepTimeOriginalFormat: req.body.prepTimeOriginalFormat || "",
          recipeYield: req.body.recipeYield as number,
          totalTime: req.body.totalTime || "",
          totalTimeOriginalFormat: req.body.totalTimeOriginalFormat || "",
          url: req.body.url,
          convertedCooktimes: { create: req.body.convertedCookTimes },
          recipeIngredients: { create: req.body.recipeIngredients },
          recipeInstructions: { create: req.body.recipeInstructions },
          userId: userId.id,
        },
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
    return res.json(recipe);
  } catch (err) {
    return res.status(500).json(err);
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return await handle(req, res);
};

export default withMethods(["POST"], handler);
