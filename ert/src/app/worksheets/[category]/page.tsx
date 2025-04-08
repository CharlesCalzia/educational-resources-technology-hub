import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getWorksheetsByCategory, getWorksheetCategories } from '@/lib/worksheets';
import { WorksheetCard } from '@/components/WorksheetCard';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import { ChevronLeft, FolderOpen } from 'lucide-react';

type Props = {
  params: { category: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const normalizedCategory = params.category.toLowerCase().replace(/-/g, ' ');
  const categories = getWorksheetCategories();
  
  // Check if category exists
  if (!categories.some(cat => cat.toLowerCase().replace(/[^a-z0-9]/g, '-') === params.category)) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${normalizedCategory} - Educational Resources`,
    description: `Educational resources and worksheets for ${normalizedCategory}`,
  };
}

export async function generateStaticParams() {
  const categories = getWorksheetCategories();
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
  }));
}

function groupWorksheetsBySubfolder(worksheets: ReturnType<typeof getWorksheetsByCategory>) {
  // Group worksheets by subfolder
  const worksheetsBySubfolder = worksheets.reduce((acc, worksheet) => {
    const pathParts = worksheet.filePath.split('/');
    const subfolder = pathParts[pathParts.length - 2] || 'General';
    if (!acc[subfolder]) {
      acc[subfolder] = [];
    }
    acc[subfolder].push(worksheet);
    return acc;
  }, {} as Record<string, typeof worksheets>);

  // Sort subfolders and worksheets within each subfolder
  const sortedSubfolders = Object.keys(worksheetsBySubfolder).sort();
  sortedSubfolders.forEach(subfolder => {
    worksheetsBySubfolder[subfolder].sort((a, b) => a.title.localeCompare(b.title));
  });

  return {
    folders: sortedSubfolders,
    worksheetsByFolder: worksheetsBySubfolder,
  };
}

export default async function CategoryPage({ params }: Props) {
  const normalizedCategory = params.category.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const categories = getWorksheetCategories();
  
  // Check if category exists
  if (!categories.some(cat => cat.toLowerCase().replace(/[^a-z0-9]/g, '-') === normalizedCategory)) {
    notFound();
  }

  const worksheets = getWorksheetsByCategory(normalizedCategory);
  const { folders, worksheetsByFolder } = groupWorksheetsBySubfolder(worksheets);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-4">
        <div className="flex items-center gap-2 mb-6">
          <Link 
            href="/worksheets"
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold capitalize">{params.category.replace(/-/g, ' ')}</h1>
        </div>

        {folders.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-600">No resources found</h2>
            <p className="text-gray-500 mt-2">This category doesn't have any resources yet.</p>
          </div>
        ) : (
          folders.map((folder) => (
            <div key={folder} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <FolderOpen className="h-5 w-5 text-gray-400" />
                <h2 className="text-xl font-semibold text-gray-700 capitalize">
                  {folder === 'General' ? 'General Resources' : folder}
                </h2>
                <span className="text-sm text-gray-500">
                  ({worksheetsByFolder[folder].length} {worksheetsByFolder[folder].length === 1 ? 'resource' : 'resources'})
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {worksheetsByFolder[folder].map((worksheet) => (
                  <WorksheetCard key={worksheet.id} worksheet={worksheet} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 