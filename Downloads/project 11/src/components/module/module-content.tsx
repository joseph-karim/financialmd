import Markdown from 'markdown-to-jsx'

interface ModuleContentProps {
  content: string
}

export function ModuleContent({ content }: ModuleContentProps) {
  return (
    <Markdown 
      className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert
                prose-headings:text-medical-dark 
                prose-headings:font-semibold 
                prose-a:text-medical-blue 
                prose-p:text-medical-dark/90
                prose-strong:text-medical-dark
                prose-code:text-medical-blue
                prose-code:bg-medical-blue/5
                prose-code:px-1
                prose-code:py-0.5
                prose-code:rounded
                prose-code:font-normal
                prose-p:leading-relaxed
                prose-li:leading-relaxed
                prose-ul:my-6
                prose-ol:my-6
                prose-li:my-2
                prose-hr:border-gray-200
                prose-hr:my-6
                prose-h3:mt-8
                prose-h2:text-2xl
                prose-h3:text-xl
                prose-h4:text-lg"
      options={{
        overrides: {
          table: {
            props: {
              className: "medical-table"
            }
          },
          th: {
            props: {
              className: "bg-medical-blue/10 text-medical-dark font-semibold border border-medical-blue/20 p-3"
            }
          },
          td: {
            props: {
              className: "p-3 border border-gray-200"
            }
          },
          tr: {
            props: {
              className: "even:bg-medical-light hover:bg-medical-blue/5"
            }
          },
          h1: {
            props: {
              className: "text-3xl font-bold text-medical-dark mb-6 pb-2 border-b border-gray-200"
            }
          }
        }
      }}
    >
      {content}
    </Markdown>
  )
}