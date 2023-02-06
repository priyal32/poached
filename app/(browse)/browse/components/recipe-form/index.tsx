import ErrorMessage from "@components/form/error-message";
import Input from "@components/form/input-field";
import interpretDuration from "@helpers/interpretDuration";
import { parseMilliseconds } from "@helpers/msFormatter";
import { useNotificationStore } from "@libs/stores/notification";
import { nanoid } from "nanoid";
import React from "react";
import { SubmitErrorHandler, SubmitHandler, UseFormReturn } from "react-hook-form";
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

type IngredientHandle = React.ElementRef<typeof IngredientFields>;
type InstructionHandle = React.ElementRef<typeof InstructionFields>;

const RecipeForm: React.FC<Props> = ({ recipe, setRecipe, form, recipeData, handleCloseEdit }) => {
  const { setNotification } = useNotificationStore();
  const initialEdit = {
    description: recipe?.description ? (recipe?.description ? true : false) : false,
    ingredients: false,
    instructions: false,
  };

  const {
    register,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = form;

  const [onEditFields, setOnEditFields] = React.useState<{
    [key: string]: boolean;
  }>(initialEdit);

  const instructionElement = React.useRef<InstructionHandle>(null);
  const ingredientElement = React.useRef<IngredientHandle>(null);

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

  const toastId = nanoid();

  const onSubmit: SubmitHandler<RootSchema> = (data) => {
    instructionElement.current?.remove();
    ingredientElement.current?.remove();

    const sanitizedIngredients = data.recipeIngredients.filter((o) => o.item !== "");
    const sanitizedInstructions = data.recipeInstructions?.filter((o) => o.item !== "");
    const convertCookTimes = data?.cookTimes?.map((time) => {
      return { id: time.id, type: time.type, value: handleMiliseconds(`${time.hr} hour`) + handleMiliseconds(`${time.min} minute`) };
    });
    const normalizeParsedCookTimes = convertCookTimes?.map((time) => {
      return { id: time.id, type: time.type, hr: parseMilliseconds(time.value).hours.toString(), min: parseMilliseconds(time.value).minutes.toString() };
    });

    const newData = { ...data, recipeIngredients: sanitizedIngredients, recipeInstructions: sanitizedInstructions, convertedCookTimes: convertCookTimes, cookTimes: normalizeParsedCookTimes };
    setRecipe(newData);
    form.reset(newData);
    handleCloseEdit();
  };

  const onSubmitError: SubmitErrorHandler<RootSchema> = (data) => {
    console.log(data);
    setNotification({ id: toastId, category: "error", message: "Please fill the required field" });
  };

  React.useEffect(() => {
    setOnEditFields(initialEdit);
  }, [recipeData]);

  return (
    <form onSubmit={form.handleSubmit(onSubmit, onSubmitError)} className="flex h-full flex-col justify-between">
      <div className="flex flex-col px-4 pb-8">
        <div className="border-b border-b-dark-neutral">
          <h1 className="mb-2 pb-2 font-headline text-2xl font-bold">Edit recipe</h1>
        </div>
        <Title errors={errors.name} register={register} onEditFields={onEditFields} name="name" handleDescriptionToggle={handleDescriptionToggle} />
        {onEditFields.description && <Description register={register} />}
        <EditButton handleEditToggle={handleEditToggle} targetKey="ingredients" />
        {onEditFields.ingredients && <IngredientFields ref={ingredientElement} control={control} setValue={setValue} getValues={getValues} onEdit={onEditFields} />}
        {recipe?.recipeInstructions && (
          <>
            <EditButton handleEditToggle={handleEditToggle} targetKey="instructions" />
            {onEditFields.instructions && <InstructionFields ref={instructionElement} control={control} setValue={setValue} getValues={getValues} onEdit={onEditFields} />}
          </>
        )}
        <CooktimeFields errors={errors.cookTimes} control={control} setValue={setValue} register={register} />
        <Wrapper aria-label="Url">
          <Input {...register("url")} placeholder="Recipe url source" />
          {errors.url && <ErrorMessage>{errors.url.message}</ErrorMessage>}
        </Wrapper>
        <Wrapper aria-label="Yields">
          <Input {...register("recipeYield", { valueAsNumber: true })} type="number" placeholder="Recipe yields" />
          {errors.recipeYield && <ErrorMessage>{errors.recipeYield.message}</ErrorMessage>}
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
