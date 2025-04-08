import fs from 'fs';
import path from 'path';
import { RESOURCES_DIR, zimConfig } from '@/config';

export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  resources: Resource[];
}

function getResourceUrl(filename: string): string {
  // Extract ZIM file name and format for Kiwix
  let zimFile = filename;
  if (zimFile.includes('/')) {
    zimFile = zimFile.split('/').pop() || zimFile;
  }
  // Keep the original name without removing special characters
  zimFile = zimFile.replace('.zim', '');
  
  // Use the same host as the current page
  const host = typeof window !== 'undefined' ? window.location.host : 'localhost';
  return `http://${host}:${zimConfig.kiwixPort}/viewer#${encodeURIComponent(zimFile).toLowerCase()}`;
}

export function getCategories(): Category[] {
  // Load categories from categories.json
  const categoriesPath = path.join(RESOURCES_DIR, 'categories.json');
  const categoriesData = JSON.parse(fs.readFileSync(categoriesPath, 'utf-8'));
  
  // Create a map of ZIM files from the config
  const zimFilesMap = new Map<string, Resource>();
  zimConfig.zimFiles.forEach(zimFile => {
    zimFilesMap.set(zimFile.filename, {
      id: zimFile.filename.replace('.zim', ''),
      title: zimFile.name,
      description: zimFile.description,
      image: `${zimFile.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.png`,
      slug: getResourceUrl(zimFile.filename)
    });
  });

  // Create categories map from the loaded categories
  const categoriesMap = new Map<string, Category>();
  categoriesData.categories.forEach((category: any) => {
    categoriesMap.set(category.id, {
      id: category.id,
      title: category.title,
      description: category.description,
      resources: []
    });
  });

  // Add resources to their respective categories
  zimConfig.zimFiles.forEach(zimFile => {
    const category = categoriesMap.get(zimFile.category);
    if (category) {
      const resource = zimFilesMap.get(zimFile.filename);
      if (resource && !category.resources.some(r => r.id === resource.id)) {
        category.resources.push(resource);
      }
    }
  });

  return Array.from(categoriesMap.values());
} 