import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs'
import path from 'path'

export default async function RemoteMdxPage() {
  // MDX text - can be from a local file, database, CMS, fetch, anywhere...

  const filePath = path.join(process.cwd(), 'posts', 'hello-world.mdx')
  const markdown = fs.readFileSync(filePath, 'utf8')
  return <MDXRemote source={markdown} />
}
