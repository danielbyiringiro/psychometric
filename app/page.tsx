import Link from 'next/link'

export default function Home()
{
  return (
    <div className='min-h-screen bg-gray-100 py-12 px-4'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-4xl font-bold text-center text-gray-800 mb-12'>
          Aline Psychometric Test
        </h1>
        <div className='grid md:grid-cols-2 gap-8'>
          <div className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow'>
            <h2 className='text-2xl font-semibold text-gray-700 mb-4 text-center'>Verbal Reasoning</h2>
            <Link href='/verbal' className='block w-full bg-blue-500 text-white text-center py-3 px-6 rounded-md hover:bg-blue-600 transition-colors'>
              Start Test
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Numerical Reasoning</h2>
            <Link href="/numerical" className="block w-full bg-green-500 text-white text-center py-3 px-6 rounded-md hover:bg-green-600 transition-colors">
              Start Test
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}