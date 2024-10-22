import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const productsDirectory = path.join(process.cwd(), 'content/products')
const foundersDirectory = path.join(process.cwd(), 'content/founders')

export async function getProductData(slug: string) {
  const fullPath = path.join(productsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  return {
    slug,
    ...matterResult.data,
    content: matterResult.content,
  }
}

export async function getFounderData(id: string) {
  const fullPath = path.join(foundersDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null; // Return null if the file doesn't exist
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)
  
  return {
    id,
    name: matterResult.data.name || 'Unknown Founder',
    bio: matterResult.data.bio || '',
    content: matterResult.content || '',
    ...matterResult.data, // Include any other properties from the frontmatter
  }
}
