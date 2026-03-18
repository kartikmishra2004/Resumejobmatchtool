import { useRef } from 'react';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Upload, FileText, X } from 'lucide-react';

interface ResumeUploadProps {
  file: File | null;
  onFileChange: (file: File | null) => void;
}

export function ResumeUpload({ file, onFileChange }: ResumeUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      onFileChange(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    onFileChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      onFileChange(droppedFile);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-fuchsia-400" />
        <Label className="text-lg font-semibold text-zinc-100">
          Resume Upload
        </Label>
      </div>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 rounded-lg bg-zinc-950 hover:border-fuchsia-500 transition-colors"
      >
        {file ? (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-fuchsia-500/10 rounded-full flex items-center justify-center">
              <FileText className="w-10 h-10 text-fuchsia-400" />
            </div>
            <p className="text-zinc-100 font-medium mb-2">{file.name}</p>
            <p className="text-zinc-500 text-sm mb-4">
              {(file.size / 1024).toFixed(2)} KB
            </p>
            <Button
              onClick={handleRemoveFile}
              variant="outline"
              size="sm"
              className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100"
            >
              <X className="w-4 h-4 mr-2" />
              Remove File
            </Button>
          </div>
        ) : (
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-fuchsia-500/10 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-fuchsia-400" />
            </div>
            <p className="text-zinc-100 font-medium mb-2">
              Upload your resume
            </p>
            <p className="text-zinc-500 text-sm mb-4">
              Drag and drop or click to browse
            </p>
            <Button
              onClick={() => fileInputRef.current?.click()}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose PDF File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>
        )}
      </div>
      <p className="text-sm text-zinc-500 mt-2">
        {file ? 'PDF file uploaded successfully' : 'Only PDF format is supported'}
      </p>
    </div>
  );
}
