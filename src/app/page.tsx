'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Product {
  slug: string
  name: string
  description: string
}

interface Founder {
  id: string
  name?: string
  bio?: string
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [founders, setFounders] = useState<Founder[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('/api/directory')
      .then(response => response.json())
      .then(data => {
        setProducts(data.products || [])
        setFounders(data.founders || [])
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }, [])

  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  )

  const filteredFounders = founders.filter(founder =>
    founder.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
  )

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">SaaS Products and Founders Directory</h1>
      
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products or founders..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Featured Products */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.slice(0, 3).map((product) => (
            <Link key={product.slug} href={`/products/${product.slug}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/products" className="mt-4 inline-block text-blue-500 hover:underline">
          View all products
        </Link>
      </section>

      {/* Featured Founders */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Founders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFounders.slice(0, 3).map((founder) => (
            <Link key={founder.id} href={`/founders/${founder.id}`} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{founder.name || 'Unknown'}</h3>
              <p className="text-gray-600">{founder.bio || 'No bio available'}</p>
            </Link>
          ))}
        </div>
        <Link href="/founders" className="mt-4 inline-block text-blue-500 hover:underline">
          View all founders
        </Link>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-100 p-8 rounded-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Own SaaS Journey?</h2>
        <p className="mb-4">Get our free guide on how to build and launch your SaaS product in 90 days or less!</p>
        <a href="http://start.vinodsharma.co/" target="_blank" rel="noopener noreferrer" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">
          Download Free Guide
        </a>
      </section>
    </main>
  )
}
