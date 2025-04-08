import fs from 'fs';
import path from 'path';
import { WORKSHEETS_DIR } from '@/config';

export interface Worksheet {
  id: string;
  title: string;
  description: string;
  filePath: string;
  category: string;
  size: number;
  lastModified: Date;
  fileType: string;
}

const ALLOWED_EXTENSIONS = [
  '.ppt', '.pptx', '.pdf', '.doc', '.docx', '.txt', '.xls', '.xlsx',
  '.jpg', '.jpeg', '.png', '.gif', '.zip', '.rar', '.mp4', '.mp3'
];

function normalizeString(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
}

export function getWorksheets(): Worksheet[] {
  const worksheets: Worksheet[] = [];
  const baseDir = WORKSHEETS_DIR;

  function processDirectory(dir: string, category: string = '') {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Process subdirectories
        processDirectory(fullPath, file);
      } else {
        const ext = path.extname(file).toLowerCase();
        if (ALLOWED_EXTENSIONS.includes(ext)) {
          // Process supported files
          const title = path.basename(file, ext);
          worksheets.push({
            id: normalizeString(title),
            title: title,
            description: `Resource for ${title}`,
            filePath: fullPath,
            category: category || 'General',
            size: stat.size,
            lastModified: stat.mtime,
            fileType: ext.slice(1) // Remove the dot from extension
          });
        }
      }
    });
  }

  processDirectory(baseDir);
  return worksheets;
}

export function getWorksheetCategories(): string[] {
  const worksheets = getWorksheets();
  return [...new Set(worksheets.map(w => w.category))].sort();
}

export function getWorksheetsByCategory(category: string): Worksheet[] {
  const normalizedCategory = normalizeString(category);
  return getWorksheets().filter(w => normalizeString(w.category) === normalizedCategory);
}

export function getWorksheetById(id: string): Worksheet | undefined {
  const normalizedId = normalizeString(id);
  return getWorksheets().find(w => w.id === normalizedId);
}

export function getMimeType(fileType: string): string {
  const mimeTypes: Record<string, string> = {
    'ppt': 'application/vnd.ms-powerpoint',
    'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'zip': 'application/zip',
    'rar': 'application/x-rar-compressed',
    'mp4': 'video/mp4',
    'mp3': 'audio/mpeg'
  };
  return mimeTypes[fileType.toLowerCase()] || 'application/octet-stream';
} 