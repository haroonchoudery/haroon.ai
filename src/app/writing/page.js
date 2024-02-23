import { Suspense } from 'react'

import { ScrollArea } from '@/components/scroll-area'
import { FloatingHeader } from '@/components/floating-header'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WritingListLayout } from '@/components/writing/writing-list-layout'
import { getPageSeo } from '@/lib/contentful'
// import { getSortedPosts } from '@/lib/utils'
import { getSortedPosts } from '@/lib/markdown'

async function fetchData() {
  const allPosts = getSortedPosts()
  return { allPosts }
}

// async function fetchData() {
//   const filenames = fs.readdirSync(postsDirectory)

//   const postsPromises = filenames
//     .filter((filename) => /\.mdx?$/.test(filename))
//     .map(async (filename) => {
//       const filePath = path.join(postsDirectory, filename)
//       const module = await import(filePath)
//       console.log(module)
//       return {
//         filename
//       }
//     })

//   const allPosts = await Promise.all(postsPromises)

//   return { allPosts }
// }

export default async function Writing() {
  const { allPosts } = await fetchData()
  const sortedPosts = getSortedPosts(allPosts)

  return (
    <ScrollArea className="flex flex-col lg:hidden">
      <FloatingHeader title="Writing" />
      <Suspense fallback={<LoadingSpinner />}>
        <WritingListLayout list={sortedPosts} isMobile />
      </Suspense>
    </ScrollArea>
  )
}

export async function generateMetadata() {
  const seoData = await getPageSeo('writing')
  if (!seoData) return null

  const {
    seo: { title, description }
  } = seoData
  const siteUrl = '/writing'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl
    },
    alternates: {
      canonical: siteUrl
    }
  }
}
