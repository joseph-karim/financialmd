import { useState, useRef, useEffect } from 'react'
import { X, Send, Loader2, Brain } from 'lucide-react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useChatStore } from '@/store/chat-store'
import Markdown from 'markdown-to-jsx'

export function AIChat() {
  const { messages, isOpen, closeChat, isLoading, sendMessage } = useChatStore()
  const [input, setInput] = useState('')
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  
  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])
  
  // Scroll to bottom when new message comes in
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [messages])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return
    
    sendMessage(input)
    setInput('')
  }
  
  if (!isOpen) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:bottom-8 md:right-8 md:w-96">
      <Card className="flex h-96 flex-col shadow-lg border border-medical-blue/20">
        <CardHeader className="p-4 bg-medical-blue/5 rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg flex items-center">
              <Brain className="mr-2 h-5 w-5 text-medical-blue" />
              AI Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={closeChat} className="text-medical-dark hover:bg-medical-blue/10">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </CardHeader>
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <CardContent className="px-0">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center p-6">
                <Brain className="mb-3 h-12 w-12 text-medical-blue opacity-70" />
                <p className="text-sm text-muted-foreground">
                  Ask me anything about medical billing and coding. I'm here to help you maximize your reimbursements!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.role === 'user' ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-lg px-3 py-2 ${
                        message.role === 'user'
                          ? "bg-medical-blue text-white"
                          : "bg-gray-100 dark:bg-gray-800"
                      }`}
                    >
                      {message.role === 'user' ? (
                        <p className="text-sm">{message.content}</p>
                      ) : (
                        <Markdown 
                          className="prose prose-sm dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:text-medical-dark prose-a:text-medical-blue"
                          options={{ forceBlock: true }}
                        >
                          {message.content}
                        </Markdown>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2">
                      <Loader2 className="h-4 w-4 animate-spin text-medical-blue" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </ScrollArea>
        <CardFooter className="p-4 pt-2 border-t bg-gray-50/50 dark:bg-gray-800/20">
          <form className="flex w-full gap-2" onSubmit={handleSubmit}>
            <Input
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border-medical-blue/20 focus-visible:ring-medical-blue"
              disabled={isLoading}
              ref={inputRef}
            />
            <Button 
              type="submit" 
              size="icon" 
              disabled={isLoading || input.trim() === ''}
              className="bg-medical-blue hover:bg-medical-blue/90 text-white"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}