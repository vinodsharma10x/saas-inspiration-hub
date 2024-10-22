import Link from 'next/link'
import { getAllFounders } from '@/lib/api'

interface Founder {
  id: string;
  name: string;
  bio?: string;
  [key: string]: any; // This allows for additional properties
}

export default async function FoundersPage() {
  const founders: Founder[] = await getAllFounders()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Founders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {founders.map((founder) => (
          <Link 
            href={`/founders/${founder.id}`} 
            key={founder.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-2">{founder.name}</h2>
            {founder.bio && <p className="text-gray-600">{founder.bio}</p>}
          </Link>
        ))}
      </div>
    </div>
  )
}
