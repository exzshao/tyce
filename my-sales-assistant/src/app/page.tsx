'use client'

import { Input } from "@/components/ui/input"
import { AsteriskIcon } from 'lucide-react'
import { Sidebar } from "./sidebar"
import { useState, useRef } from "react"
import { useRouter } from 'next/navigation'
import { Header } from "@/components/sales/Header"
import { ActionButtons } from "@/components/sales/ActionButtons"
import { ChatMessages } from "@/components/sales/ChatMessages"
import { FileUpload } from "@/components/sales/FileUpload"
import { TopDeals } from "@/components/sales/TopDeals"

type FileContent = {
  name: string;
  content: string;
}

type Message = {
  role: 'user' | 'assistant'
  content: string
  files?: FileContent[]
}

export default function SalesAssistant() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadMessage, setUploadMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const input = e.currentTarget.querySelector('input[type="text"]') as HTMLInputElement
    const initialMessage = input.value.trim()
    
    if (initialMessage) {
      try {
        console.log('Selected files before processing:', selectedFiles);
        
        // Read all file contents before storing
        const fileContents = await Promise.all(
          selectedFiles.map(async (file) => {
            console.log('Processing file:', file.name);
            const content = await file.text();
            console.log('File content length:', content.length);
            return {
              name: file.name,
              content: content
            };
          })
        );

        console.log('Processed file contents:', fileContents);

        const firstMessage = { 
          role: 'user' as const, 
          content: initialMessage,
          files: fileContents
        }
        
        console.log('Storing message in localStorage:', firstMessage);
        localStorage.setItem('chatMessages', JSON.stringify([firstMessage]))
        
        // Clear files from UI
        setSelectedFiles([]);
        setUploadMessage("");
        
        router.push('/chat')
      } catch (error) {
        console.error('Error processing files:', error);
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const fileList = Array.from(files)
      const txtFiles = fileList.filter(file => file.name.toLowerCase().endsWith('.txt'))
      setSelectedFiles(prev => [...prev, ...txtFiles])
      setUploadMessage(`${txtFiles.length} file(s) selected`)
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100 p-8">
        <div className="mx-auto max-w-3xl space-y-8">
          <Header />
          <ActionButtons />
          <ChatMessages messages={messages} isLoading={isLoading} />

          {/* Search Input and Attachments */}
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Let me know how I can help you!</p>
            <div className="space-y-2">
              <form onSubmit={handleSubmit} className="relative">
                <Input 
                  type="text"
                  placeholder="Let me know how I can help you!"
                  className="w-full pl-4 pr-10 bg-white"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <AsteriskIcon className="h-4 w-4 text-muted-foreground" />
                </button>
              </form>

              <FileUpload 
                fileInputRef={fileInputRef}
                uploadMessage={uploadMessage}
                selectedFiles={selectedFiles}
                onFileUpload={handleFileUpload}
                onFileInputClick={handleFileInputClick}
                onRemoveFile={removeFile}
              />
            </div>
          </div>

          <TopDeals />
        </div>
      </div>
    </div>
  )
}

