import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import SeasunLanding from "@modules/home/components/seasun-landing"
import { getCollectionsWithProducts } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"

export const metadata: Metadata = {
  title: "SEASUN - Caribbean Beauty Secret | Natural Skincare",
  description:
    "Discover the Caribbean's best kept secret to radiant, even-toned skin. Natural sun protection meets luxury skincare.",
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionsWithProducts(countryCode)
  const region = await getRegion(countryCode)

  // Feature flag to toggle between landing page and store
  // Set to true to show landing page, false to show original store
  const showLandingPage = true // Can be controlled via env variable: process.env.NEXT_PUBLIC_SHOW_LANDING === "true"

  if (showLandingPage) {
    return <SeasunLanding countryCode={countryCode} />
  }

  // Original store code preserved below
  if (!collections || !region) {
    return null
  }

  return (
    <>
      <Hero />
      <div className="py-12">
        <ul className="flex flex-col gap-x-6">
          <FeaturedProducts collections={collections} region={region} />
        </ul>
      </div>
    </>
  )
}
