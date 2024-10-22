import Link from 'next/link'
import { getAllFounders, getFounderData } from '@/lib/api'

export async function generateStaticParams() {
  const founders = getAllFounders()
  return founders.map((founder) => ({
    id: founder.id,
  }))
}

export default async function FounderPage({ params }: { params: { id: string } }) {
  const founder = await getFounderData(params.id)

  if (!founder) {
    return <div>Founder not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">{founder.name}</h1>
      {founder.bio && <p className="text-lg mb-4">{founder.bio}</p>}
      {founder.content && (
        <div className="mt-4 prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: founder.content }} />
      )}
      <Link href="/founders" className="mt-8 block text-blue-500 hover:underline">
        Back to all founders
      </Link>
    </div>
  )
}
