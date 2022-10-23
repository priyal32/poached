import clsx from "clsx"
import React from "react"

import s from "./RecipeData.module.css"

const RecipeDataSkeleton: React.FunctionComponent = () => {
  return (
    <article className={s.root}>
      <div className={s.recipe_head_layout}>
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-gray-300"></div>
        <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-gray-500"></div>
      </div>
      <div className={s.image_layout}>
        <div className={s.layout_inner}>
          <picture className="h-full w-full animate-pulse rounded-lg bg-gray-300"></picture>
        </div>
      </div>

      <div className={s.ingredients_layout}>
        <section className={s.ingredients_wrapper}>
          <header>
            <div className="h-8 w-2/3 animate-pulse rounded-lg bg-gray-300"></div>
          </header>
          <ul className={clsx(s.ingredients_list, "flex flex-col gap-y-4")}>
            {[...Array(5)].map((_, id) => (
              <li className="animate-pulse rounded-lg bg-gray-200 py-4 first:pt-2" key={id}>
                <label className={s.ingredient}></label>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className={s.instructions_layout}>
        <div className="h-8 w-2/3 animate-pulse rounded-lg bg-gray-300"></div>
        <ol>
          {[...Array(5)].map((_, id) => (
            <li key={id}>
              <div className={clsx(s.instruction_order, "animate-pulse bg-gray-200")}>
                <span></span>
              </div>
              <p className="w-full animate-pulse rounded-lg bg-gray-200"></p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}

export default RecipeDataSkeleton
