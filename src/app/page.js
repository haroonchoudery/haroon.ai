import { Suspense } from 'react'
import Link from 'next/link'

import { ScrollArea } from '@/components/scroll-area'
import { LoadingSpinner } from '@/components/loading-spinner'
import { WritingList } from '@/components/writing-list'
import { FloatingHeader } from '@/components/floating-header'
import { PageTitle } from '@/components/page-title'
import { Button } from '@/components/ui/button.jsx'
import { getAllPosts } from '@/lib/contentful'
import { getSortedPosts } from '@/lib/utils'

async function fetchData() {
  const allPosts = await getAllPosts()
  return { allPosts }
}

const EmptyPlaceholder = () => (
  <div className="shrink-0 snap-center md:hidden">
    <div className="w-px shrink-0" />
  </div>
)

export default async function Home() {
  const { allPosts } = await fetchData()
  const sortedPosts = getSortedPosts(allPosts)

  return (
    <ScrollArea className="flex flex-col" hasScrollTitle>
      <FloatingHeader scrollTitle="Haroon Choudery" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Home" className="lg:hidden" />
          <p>
            {`Hi 👋 I'm Haroon, 6+ year AI professional, amateur podcast host, and girl dad based in
          New York City.`}
          </p>
          <p>
            I'm currently CEO at Autoblocks. Previously, I worked in data science roles at Mark Cuban Companies,
            Deloitte, and Komodo Health, and led growth at startups like Hex and Highlight.
          </p>
          <p>
            I'm also co-founder of AI For Anyone, one of the nation's most impactful AI education nonprofits, and Not A
            Bot, an AI newsletter with 50k+ subscribers.
          </p>
          {/* <div className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-scroll pb-6 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:pb-0">
            <EmptyPlaceholder />
            <img
              src="/assets/workspace-1.webp"
              alt="Workspace | 1"
              className="w-2/3 snap-center object-cover md:w-full md:snap-align-none"
              width={756}
              height={1008}
              loading="eager"
            />
            <img
              src="/assets/workspace-1.webp"
              alt="Workspace | 1"
              className="w-2/3 snap-center object-cover md:w-full md:snap-align-none"
              width={756}
              height={1008}
              loading="eager"
            />
            <img
              src="/assets/workspace-1.webp"
              alt="Workspace | 1"
              className="w-2/3 snap-center object-cover md:w-full md:snap-align-none"
              width={756}
              height={1008}
              loading="eager"
            />
            <img
              src="/assets/workspace-2.webp"
              alt="Workspace | 2"
              className="w-2/3 snap-center object-cover md:w-full md:snap-align-none"
              width={756}
              height={1008}
              loading="eager"
            />
            <EmptyPlaceholder />
          </div> */}
          <Button asChild variant="link" className="inline px-0">
            <Link href="/writing">
              <h2 className="mb-4 mt-8">Writing</h2>
            </Link>
          </Button>
          <Suspense fallback={<LoadingSpinner />}>
            <WritingList items={sortedPosts} header="Writing" />
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
