export default function CodeBlock({ content, statementType = 'code' }) {
  if (statementType === 'text') {
    return (
      <div className="bg-black/30 border border-gh-text/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 max-w-full overflow-x-auto">
        <pre className="text-gh-text text-base sm:text-lg font-mono whitespace-pre-wrap break-words min-w-0">
          {content}
        </pre>
      </div>
    )
  }

  return (
    <div className="bg-black/30 border border-gh-text/20 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 max-w-full overflow-x-auto">
      <pre className="text-gh-text text-base sm:text-lg font-mono min-w-0">
        <code className="block whitespace-pre break-normal">{content}</code>
      </pre>
    </div>
  )
}
