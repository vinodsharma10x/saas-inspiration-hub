import Link from 'next/link'
import { getAllProducts } from '@/lib/api'

interface Product {
  slug: string;
  name: string;
  description?: string;
  category?: string;
  [key: string]: any; // This allows for additional properties
}

export default async function ProductsPage() {
  const products: Product[] = await getAllProducts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link 
            href={`/products/${product.slug}`} 
            key={product.slug}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            {product.description && <p className="text-gray-600 mb-2">{product.description}</p>}
            {product.category && <p className="text-sm text-gray-500">Category: {product.category}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
