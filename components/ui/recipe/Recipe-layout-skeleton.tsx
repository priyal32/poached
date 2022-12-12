import React from "react"

const RecipeLayoutSkeleton: React.FunctionComponent = () => {
  return (
    <article className="block grid-flow-row-dense grid-cols-12 gap-x-24 gap-y-16 lg:grid" aria-label="recipe-skeleton">
      <div className="col-start-6 col-end-13 mb-8 h-fit lg:mb-0">
        <div className="h-8 w-1/2 animate-pulse rounded-lg bg-neutral-500"></div>
        <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-neutral-600"></div>
        <div className="mt-8 flex space-x-4">
          <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-neutral-600"></div>
          <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-neutral-600"></div>
          <div className="mt-3 h-4 w-24 animate-pulse rounded-lg bg-neutral-600"></div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <div className="h-4 w-24 animate-pulse rounded-lg bg-neutral-600"></div>
          <div className="h-4 w-40 animate-pulse rounded-lg bg-neutral-600"></div>
          <div className="h-4 w-full animate-pulse rounded-lg bg-neutral-600"></div>
        </div>
      </div>
      <div className="relative col-start-1 col-end-6 row-start-1 row-end-auto mx-[calc(1.5rem*-0.7)] lg:mx-0">
        <div className="left-0 top-0 w-full pt-[125%] lg:absolute">
          <picture className="absolute left-0 top-0 h-full w-full animate-pulse rounded-lg bg-neutral-500"></picture>
        </div>
      </div>
      <div className="col-start-1 col-end-6 row-start-1 row-end-7 mt-12 lg:mt-8">
        <section className="flex flex-col lg:sticky lg:top-14 lg:left-0 lg:mt-[calc(125%+3rem)] lg:h-[calc(100vh-11rem)]">
          <header className="flex items-center justify-between">
            <div className="h-8 w-2/3 animate-pulse rounded-lg bg-neutral-500"></div>
            <div className="h-8 w-12 animate-pulse rounded-lg bg-neutral-500"></div>
          </header>
          <div className="mt-2 h-4 w-1/3 animate-pulse rounded-lg bg-neutral-500"></div>
          <ul className="flex grow flex-col gap-y-8 overflow-auto pt-6 lg:mt-4">
            {[...Array(5)].map((_, id) => (
              <li className="animate-pulse rounded-lg bg-neutral-600 py-4" key={id}>
                <label className="flex items-center"></label>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="col-start-6 col-end-13 mt-12 lg:mt-0">
        <div className="flex items-center justify-between">
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-neutral-500"></div>
          <div className="h-8 w-12 animate-pulse rounded-lg bg-neutral-500"></div>
        </div>
        <ol className="mt-8 lg:mt-4">
          {[...Array(5)].map((_, id) => (
            <li className="flex py-4 first:pt-2" key={id}>
              <div className="flex h-12 w-12 shrink-0 grow-0 basis-12 animate-pulse items-center justify-center rounded-full border-2 border-dark-neutral">
                <span></span>
              </div>
              <p className="ml-4 w-full animate-pulse rounded-lg bg-neutral-600"></p>
            </li>
          ))}
        </ol>
      </div>
    </article>
  )
}

export default RecipeLayoutSkeleton
