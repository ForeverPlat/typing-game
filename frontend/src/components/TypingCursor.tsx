import { forwardRef } from 'react'
import '../styles/typingCursor.css'

const TypingCursor = forwardRef<HTMLDivElement>((_props, ref) => {
  return (
    <div ref={ref} className="cursor"></div>
  )
})

export default TypingCursor