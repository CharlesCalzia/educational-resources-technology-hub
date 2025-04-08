import { NextResponse } from 'next/server';
import { getWorksheetById, getMimeType } from '@/lib/worksheets';
import fs from 'fs';

export async function GET(
  request: Request
): Promise<Response> {
  const url = new URL(request.url);
  const id = url.pathname.split('/').pop() || '';
  
  const worksheet = getWorksheetById(id);
  
  if (!worksheet) {
    return new Response('Resource not found', { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(worksheet.filePath);
    const fileName = worksheet.title + '.' + worksheet.fileType;
    const mimeType = getMimeType(worksheet.fileType);

    return new Response(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error('Error reading resource file:', error);
    return new Response('Error reading resource file', { status: 500 });
  }
} 