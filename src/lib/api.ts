import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// ... existing imports and constants ...

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

// ... existing getProducts and getFounders functions ...

const productsDirectory = path.join(process.cwd(), 'content/products')
const foundersDirectory = path.join(process.cwd(), 'content/founders')

interface ProductData {
  slug: string;
  name: string;
  description?: string;
  content?: string;
  website?: string;
  category?: string;
  [key: string]: any;
}

// Add this interface
interface Founder {
  id: string;
  name: string;
  bio?: string;
  [key: string]: any;
}

export function getAllProducts(): ProductData[] {
  const fileNames = fs.readdirSync(productsDirectory)
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(productsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)
    return {
      slug,
      name: data.name || 'Unknown Product',
      description: data.description,
      category: data.category,
      website: data.website,
      content: content,
      ...data,
    }
  })
}

export function getAllFounders(): Founder[] {
  const fileNames = fs.readdirSync(foundersDirectory)
  return fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '')
    const fullPath = path.join(foundersDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      id,
      name: data.name || 'Unknown Founder',
      bio: data.bio,
      ...data,
    }
  })
}

export async function getProductData(slug: string): Promise<ProductData | null> {
  const fullPath = path.join(productsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return { 
    slug, 
    name: data.name || 'Unknown Product',
    description: data.description,
    content: contentHtml,
    website: data.website,
    category: data.category,
    ...data 
  }
}

interface FounderData {
  id: string;
  name: string;
  bio?: string;
  content: string;
  linkedin?: string;
  twitter?: string;
  [key: string]: any;
}

export async function getFounderData(id: string): Promise<FounderData | null> {
  const fullPath = path.join(foundersDirectory, `${id}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  
  const processedContent = await remark()
    .use(html)
    .process(content)
  const contentHtml = processedContent.toString()

  return { 
    id, 
    name: data.name || 'Unknown Founder',
    bio: data.bio,
    content: contentHtml,
    linkedin: data.linkedin,
    twitter: data.twitter,
    ...data 
  }
}

export async function getProductBySlug(slug: string) {
  const fullPath = path.join(productsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)
  return { ...data, content: htmlContent, slug }
}

export async function getFounderById(id: string) {
  const fullPath = path.join(foundersDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const htmlContent = await markdownToHtml(content)
  return { ...data, content: htmlContent, id }
}
