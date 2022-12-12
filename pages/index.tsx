import type { NextPage } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"

import HomepageRecipe from "@/components/home/homepage-recipe"
import type { QueryParam } from "@/components/home/types"
import { Container } from "@/components/ui"
import { Result } from "@/components/ui/recipe/recipe"
import RecipeHeader from "@/components/ui/recipe/Recipe-header"
import RecipeImportForm from "@/components/ui/recipe/Recipe-import-form"
import { server } from "@/config"
import { isValidHttpUrl } from "@/helpers/isValidHttp"

export const Home: NextPage = () => {
  const router = useRouter()
  const { url } = router.query as QueryParam

  const [value, setValue] = React.useState<string>(url || "")
  const [isRequested, setIsRequested] = React.useState<boolean>(false)
  const [recipeData, setRecipeData] = React.useState<Result>()

  async function fetchRecipe(targetUrl: string) {
    setIsRequested(true)
    try {
      await fetch(`${server}/api/scrap`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(targetUrl)
      })
        .then((res) => res.json())
        .then((data) => {
          setRecipeData(data)
          setIsRequested(false)
        })
    } catch (err) {
      console.warn(err)
    }
  }

  async function handleSubmitForm(event: React.FormEvent) {
    event.preventDefault()
    const query: { url: string } = { url: value }
    if (value.length > 0 && isValidHttpUrl(query.url)) {
      router.push({ pathname: "/", query: `url=${decodeURI(query.url)}` })
      fetchRecipe(query.url)
      setValue("")
    } else {
      alert("Make sure you entered valid url")
    }
  }

  React.useEffect(() => {
    if (url) {
      fetchRecipe(url)
    } else {
      setRecipeData(undefined)
    }
  }, [url])

  const importProps = { handleSubmitForm, isRequested, setValue, value }

  return (
    <section className="m-auto flex h-full flex-col">
      {recipeData?.results && <RecipeHeader {...importProps} />}
      {!recipeData && !isRequested && (
        <Container className="m-auto flex flex-col">
          <div className="m-auto flex max-w-xl flex-col items-center justify-center px-4 sm:px-0">
            <Image src="/poached_logo.png" alt="Poached Logo" width={150} height={150} className="relative mx-auto object-cover" />
            <p className="mb-6 text-center font-headline text-lg font-bold lg:text-xl">Get just the instructions & ingredients for any recipe. No popups, ads, or annoying clutters</p>
            <RecipeImportForm {...importProps} wfull />
          </div>
        </Container>
      )}
      {url && (
        <Container className="m-auto flex flex-col gap-y-8">
          <HomepageRecipe {...importProps} data={recipeData} isRequested={isRequested} url={url} />
        </Container>
      )}
    </section>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   const response = await fetch(process.env.REPO_STATS as string)
//   const stats = await response.json()

//   return {
//     props: {
//       stats: {
//         starGazer: stats.stargazers_count,
//         origin: stats.html_url,
//         forkUrl: "https://github.com/arcetros/poached/fork"
//       }
//     },
//     revalidate: 10
//   }
// }

export default Home
