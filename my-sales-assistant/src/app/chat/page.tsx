'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Asterisk, ArrowLeft } from 'lucide-react'
import { Sidebar } from "../sidebar"
import { useState, useEffect, useRef } from "react"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type FileContent = {
  name: string;
  content: string;
}

type Message = {
  role: 'user' | 'assistant'
  content: string
  files?: FileContent[]
}

export default function ChatInterface() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const initialMessageProcessed = useRef(false)

  useEffect(() => {
    const savedMessages = localStorage.getItem('chatMessages')
    if (savedMessages && !initialMessageProcessed.current) {
      const parsedMessages = JSON.parse(savedMessages)
      
      if (parsedMessages.length === 1 && parsedMessages[0].role === 'user') {
        const initialMessage = parsedMessages[0]
        setMessages([initialMessage])
        initialMessageProcessed.current = true
        handleApiCall(initialMessage.content, initialMessage.files)
      } else {
        setMessages(parsedMessages)
      }
    }
  }, [])

  const handleApiCall = async (messageText: string, files?: FileContent[]) => {
    setIsLoading(true)
    try {
      // Include files in the prompt if they exist
      const contextWithFiles = files?.length 
        ? messageText + "\n\nContext from uploaded files:\n" + 
          files.map(file => `\n--- ${file.name} ---\n${file.content}`).join("\n")
        : messageText;

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: contextWithFiles,
          files
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      const data = await response.json()
      const assistantMessage = { role: 'assistant' as const, content: data.message }
      setMessages(prevMessages => {
        const newMessages = [...prevMessages, assistantMessage]
        localStorage.setItem('chatMessages', JSON.stringify(newMessages))
        return newMessages
      })
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    const userMessage = { role: 'user' as const, content: message }
    setMessage("")
    
    setMessages(prevMessages => {
      const newMessages = [...prevMessages, userMessage]
      localStorage.setItem('chatMessages', JSON.stringify(newMessages))
      return newMessages
    })
    
    await handleApiCall(userMessage.content)
  }

  const clearChat = () => {
    setMessages([])
    localStorage.removeItem('chatMessages')
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 min-h-screen bg-gray-100">
        {/* Title Bar */}
        <div className="py-3 px-4 border-b bg-white flex items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/')}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-lg font-medium text-gray-700 flex-1">
            New Chat
          </h1>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearChat}
            className="text-gray-500"
          >
            Clear Chat
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="max-w-3xl mx-auto p-4 h-[calc(100vh-64px)] flex flex-col">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto space-y-4 mb-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${msg.role === 'user' ? '' : ''}`}
              >
                {msg.role === 'user' ? (
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-lg p-3 max-w-[95%] flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-100 flex-shrink-0 flex items-center justify-center">
                        <Image
                          src="/user-avatar.png"
                          alt="User"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{msg.content}</p>
                        {msg.files && (
                          <div className="flex gap-2 mt-2">
                            {msg.files.map((file, fileIndex) => (
                              <div key={fileIndex} className="text-xs text-gray-500 flex items-center gap-1">
                                <span>📎 {file.name}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Asterisk className="w-8 h-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3 max-w-[95%]">
                        <p className="text-sm text-gray-800">{msg.content}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 flex items-center justify-center">
                  <Asterisk className="w-8 h-8 text-gray-600" />
                </div>
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="bg-white rounded-lg border p-2">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button 
                type="submit" 
                disabled={isLoading}
                variant="outline"
              >
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
} 