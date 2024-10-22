import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const productsDirectory = path.join(process.cwd(), 'content/products')
const foundersDirectory = path.join(process.cwd(), 'content/founders')

export async function GET() {
  const products = getItems(productsDirectory, 'slug')
  const founders = getItems(foundersDirectory, 'id')

  return NextResponse.json({ products, founders })
}

function getItems(directory: string, idField: string) {
  const fileNames = fs.readdirSync(directory)
  const items = fileNames.map((fileName) => {
    const fullPath = path.join(directory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    return {
      [idField]: fileName.replace(/\.md$/, ''),
      ...data,
    }
  })
  return items
}
