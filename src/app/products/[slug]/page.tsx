import Link from 'next/link'
import { getAllProducts, getProductData } from '@/lib/api'

export async function generateStaticParams() {
  const products = getAllProducts()
  return products.map((product) => ({
    slug: product.slug,
  }))
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductData(params.slug)

  if (!product) {
    return <div>Product not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
      {product.description && <p className="text-lg mb-4">{product.description}</p>}
      {product.website && (
        <a href={product.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline mb-4 block">
          Visit Website
        </a>
      )}
      {product.content && (
        <div className="mt-4 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: product.content }} />
      )}
      <Link href="/products" className="mt-8 block text-blue-500 hover:underline">
        Back to all products
      </Link>
    </div>
  )
}
