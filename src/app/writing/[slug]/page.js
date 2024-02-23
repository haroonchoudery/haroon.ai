import { MDXRemote } from 'next-mdx-remote'
import { getSortedPosts, getPostData } from '@/lib/markdown'
import { serialize } from 'next-mdx-remote/serialize'
import { remark } from 'remark'
import html from 'remark-html'
import Link from 'next/link'

// Define custom components for MDX elements
const components = {
  h1: (props) => <h1 className="my-4 text-4xl font-bold" {...props} />,
  p: (props) => <p className="mb-4" {...props} />,
  a: (props) => <Link {...props} className="text-blue-500 hover:underline" />
}

export async function generateStaticParams() {
  const posts = getSortedPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

async function fetchData(slug) {
  const postData = await getPostData(slug)
  const processedContent = await remark().use(html).process(postData.content)
  const contentHtml = processedContent.toString()
  return { title: postData.title, contentHtml }
}

export default async function Post({ params }) {
  const { slug } = params
  const { title, contentHtml } = await fetchData(slug)
  return (
    <article className="prose lg:prose-xl mx-auto p-4">
      <h1 className="mb-4 text-3xl font-bold">{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  )
}
