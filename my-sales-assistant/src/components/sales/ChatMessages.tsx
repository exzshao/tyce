type Message = {
  role: 'user' | 'assistant'
  content: string
}

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  if (messages.length === 0) return null

  return (
    <div className="space-y-4 max-h-[400px] overflow-y-auto bg-white rounded-lg p-4 shadow-sm">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-[80%] rounded-lg p-3 ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white ml-4'
                : 'bg-gray-100 text-gray-900 mr-4'
            }`}
          >
            <p className="text-sm">{msg.content}</p>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="flex justify-start">
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
  )
} 