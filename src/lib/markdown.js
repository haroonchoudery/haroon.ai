import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPosts() {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Assuming the slug is the filename without the .mdx extension
    const slug = fileName.replace(/\.mdx$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    return {
      id: slug, // or keep this as is if you want id and slug to be the same
      slug, // Add the slug field here
      ...data
    }
  })

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1
    } else if (a > b) {
      return 0
    } else {
      return -1
    }
  })
}

export async function getPostData(slug) {
  // Construct the full path to the file
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  // Read the file contents
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  // Use gray-matter to parse the post metadata section
  const { data, content } = matter(fileContents)

  // Return the post data with slug, metadata, and content
  return {
    ...data,
    content
  }
}
