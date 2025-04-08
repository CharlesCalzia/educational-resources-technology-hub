import { Worksheet } from '@/lib/worksheets';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText, FileImage, FileVideo, FileAudio, FileArchive, FileSpreadsheet, Presentation } from 'lucide-react';

interface WorksheetCardProps {
  worksheet: Worksheet;
}

export function WorksheetCard({ worksheet }: WorksheetCardProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(type)) return <FileImage className="h-4 w-4" />;
    if (['mp4'].includes(type)) return <FileVideo className="h-4 w-4" />;
    if (['mp3'].includes(type)) return <FileAudio className="h-4 w-4" />;
    if (['zip', 'rar'].includes(type)) return <FileArchive className="h-4 w-4" />;
    if (['xls', 'xlsx'].includes(type)) return <FileSpreadsheet className="h-4 w-4" />;
    if (['ppt', 'pptx'].includes(type)) return <Presentation className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-1">
            {getFileIcon(worksheet.fileType)}
          </div>
          <div className="flex-grow min-w-0">
            <h3 className="font-medium text-sm truncate" title={worksheet.title}>
              {worksheet.title}
            </h3>
            <div className="text-xs text-muted-foreground mt-1 space-y-0.5">
              <p className="truncate" title={worksheet.description}>{worksheet.description}</p>
              <p>{formatFileSize(worksheet.size)} • {worksheet.fileType.toUpperCase()}</p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              asChild 
              className="mt-2 w-full"
            >
              <a href={`/api/worksheets/${worksheet.id.toLowerCase()}`} download>
                <Download className="mr-2 h-3 w-3" />
                Download
              </a>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 