import Input from "@components/form/input-field";
import interpretDuration from "@helpers/interpretDuration";
import { parseMilliseconds } from "@helpers/msFormatter";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { RootSchema } from "types";

import CooktimeFields from "./cooktime-fields";
import Description from "./description-field";
import EditButton from "./edit-button";
import IngredientFields from "./ingredient-fields";
import InstructionFields from "./instruction.fields";
import Title from "./title-field";
import Wrapper from "./wrapper";

type Result = {
  message: string;
  status: boolean;
  results: RootSchema;
  method: string;
};

type Props = {
  recipe: RootSchema | undefined;
  setRecipe: React.Dispatch<React.SetStateAction<RootSchema | undefined>>;
  recipeData: Result | undefined;
  form: UseFormReturn<RootSchema, any>;
  handleCloseEdit: () => void;
};

const RecipeForm: React.FC<Props> = ({ recipe, setRecipe, form, recipeData, handleCloseEdit }) => {
  const initialEdit = {
    description: recipe?.description ? (recipe?.description ? true : false) : false,
    ingredients: false,
    instructions: false,
  };

  const { register, control, setValue, getValues } = form;

  const [onEditFields, setOnEditFields] = React.useState<{
    [key: string]: boolean;
  }>(initialEdit);

  const ingredientRef = React.useRef<(HTMLLIElement | null)[]>([]);
  const instructionsRef = React.useRef<(HTMLOListElement | null)[]>([]);

  function handleDescriptionToggle() {
    if (onEditFields.description) {
      setOnEditFields({ ...onEditFields, description: false });
      form.setValue("description", undefined);
      return;
    }
    setOnEditFields({ ...onEditFields, description: true });
  }

  function handleEditToggle(key: string) {
    setOnEditFields({
      ...onEditFields,
      [key]: !onEditFields[key],
    });
  }

  function handleMiliseconds(str: string) {
    return Number(interpretDuration(str).toMilliseconds());
  }

  function handleSubmit(data: RootSchema) {
    const sanitizedIngredients = data.recipeIngredients.filter((o) => o.item !== "");
    const sanitizedInstructions = data.recipeInstructions?.filter((o) => o.item !== "");
    const convertCookTimes = data?.cookTimes?.map((time) => {
      return { type: time.type, value: handleMiliseconds(`${time.hr} hour`) + handleMiliseconds(`${time.min} minute`) };
    });
    const normalizeParsedCookTimes = convertCookTimes?.map((time) => {
      return { type: time.type, hr: parseMilliseconds(time.value).hours.toString(), min: parseMilliseconds(time.value).minutes.toString() };
    });

    const newData = { ...data, recipeIngredients: sanitizedIngredients, recipeInstructions: sanitizedInstructions, convertedCookTimes: convertCookTimes, cookTimes: normalizeParsedCookTimes };
    setRecipe(newData);
    form.reset(newData);
    handleCloseEdit();
  }

  React.useEffect(() => {
    setOnEditFields(initialEdit);
  }, [recipeData]);

  return (
    <form onSubmit={form.handleSubmit((data) => handleSubmit(data))} className="flex h-full flex-col justify-between">
      <div className="flex flex-col px-4 pb-8">
        <div className="border-b border-b-dark-neutral">
          <h1 className="mb-2 pb-2 font-headline text-2xl font-bold">Edit recipe</h1>
        </div>
        <Title register={register} onEditFields={onEditFields} name="name" handleDescriptionToggle={handleDescriptionToggle} />
        {onEditFields.description && <Description register={register} />}
        <EditButton handleEditToggle={handleEditToggle} targetKey="ingredients" />
        {onEditFields.ingredients && <IngredientFields handleSubmit={handleSubmit} control={control} ingredientRef={ingredientRef} setValue={setValue} getValues={getValues} onEdit={onEditFields} />}
        {recipe?.recipeInstructions && (
          <>
            <EditButton handleEditToggle={handleEditToggle} targetKey="instructions" />
            {onEditFields.instructions && (
              <InstructionFields handleSubmit={handleSubmit} control={control} instructionsRef={instructionsRef} setValue={setValue} getValues={getValues} onEdit={onEditFields} />
            )}
          </>
        )}
        <CooktimeFields control={control} setValue={setValue} register={register} />
        <Wrapper aria-label="Url">
          <Input {...register("url")} placeholder="Recipe url source" />
        </Wrapper>
        <Wrapper aria-label="Yields">
          <Input {...register("recipeYield")} type="number" placeholder="Recipe yields" />
        </Wrapper>
      </div>
      <div className="p-4">
        <button type="submit" className="flex w-full items-center justify-center rounded-lg bg-[hsl(144,40%,36%)] px-4 py-3 text-lg font-bold transition-all hover:bg-[hsl(144,40%,29%)]">
          Save
        </button>
      </div>
    </form>
  );
};

export default RecipeForm;