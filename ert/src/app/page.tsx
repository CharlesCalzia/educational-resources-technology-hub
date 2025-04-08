import { getCategories } from '@/lib/resources';
import Image from 'next/image';
import Navbar from '@/components/Navbar';

export default function Home() {
  const categories = getCategories();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {categories.map(category => (
          <section key={category.id} className="py-12 first:pt-8 last:pb-16">
            <div className="max-w-screen-xl px-4 mx-auto">
              <div className="relative max-w-3xl mx-auto text-center mb-12">
                <span className="absolute inset-x-0 h-px -translate-y-1/2 bg-black/10 top-1/2"></span>
                <h2 className="relative inline-block px-4 text-2xl font-bold text-center bg-gray-50">
                  {category.title}
                </h2>
                <p className="mt-4 text-gray-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {category.resources.map((resource) => (
                  <a
                    key={resource.id}
                    href={resource.slug}
                    className="block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="relative h-48">
                      <Image
                        src={`/images/${resource.image}`}
                        alt={resource.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600">{resource.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
