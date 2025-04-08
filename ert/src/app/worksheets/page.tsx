import { getWorksheetCategories } from '@/lib/worksheets';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

export default function WorksheetsPage() {
  const categories = getWorksheetCategories();

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Educational Worksheets</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <Link 
              key={category} 
              href={`/worksheets/${category.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
              className="block"
            >
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold">{category}</h2>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 