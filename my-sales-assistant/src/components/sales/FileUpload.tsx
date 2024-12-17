import { Input } from "@/components/ui/input"
import { Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface FileUploadProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>
  uploadMessage: string
  selectedFiles: File[]
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFileInputClick: () => void
  onRemoveFile: (index: number) => void
}

export function FileUpload({
  fileInputRef,
  uploadMessage,
  selectedFiles,
  onFileUpload,
  onFileInputClick,
  onRemoveFile
}: FileUploadProps) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      const txtFiles = fileList.filter(file => file.name.toLowerCase().endsWith('.txt'))
      
      if (txtFiles.length !== fileList.length) {
        alert('Only .txt files are supported')
      }
      
      if (txtFiles.length > 0) {
        onFileUpload(e)
      }
    }
  }

  return (
    <div className="relative">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".txt"
        onChange={handleFileUpload}
        className="hidden"
      />
      <div 
        onClick={onFileInputClick}
        className="cursor-pointer relative"
      >
        <Input 
          readOnly
          placeholder="Add documents (meeting notes, client briefings) to start a new project"
          value={uploadMessage}
          className="w-full pl-4 pr-10 bg-gray-50 cursor-pointer"
        />
        <button 
          type="button" 
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Display Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="mt-2 space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={index} className="flex items-center justify-between bg-white p-2 rounded-md">
              <span className="text-sm truncate">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                ×
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 