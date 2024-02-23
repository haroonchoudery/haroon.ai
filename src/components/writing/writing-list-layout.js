'use client'

import { WritingLink } from '@/components/writing-link'
import { useViewData } from '@/hooks/useViewData'
import { cn } from '@/lib/utils'

export const WritingListLayout = ({ list, isMobile }) => {
  const viewData = useViewData()

  return (
    <div className={cn(!isMobile && 'flex flex-col gap-1 text-sm')}>
      {list.map((post) => {
        const viewCount = viewData?.find((item) => item.slug === post.slug)?.view_count
        // Ensure each WritingLink has a unique key prop, using post.slug as the key
        return <WritingLink key={post.slug} post={post} viewCount={viewCount} isMobile={isMobile} />
      })}
    </div>
  )
}
