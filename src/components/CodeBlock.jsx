export default function CodeBlock({ content, statementType = 'code' }) {
  if (statementType === 'text') {
    return (
      <div className="bg-black/30 border border-gh-text/20 rounded-lg p-6 mb-8">
        <pre className="text-gh-text text-lg font-mono whitespace-pre-wrap">
          {content}
        </pre>
      </div>
    )
  }
  
  return (
    <div className="bg-black/30 border border-gh-text/20 rounded-lg p-6 mb-8">
      <pre className="text-gh-text text-lg font-mono">
        <code>{content}</code>
      </pre>
    </div>
  )
}
