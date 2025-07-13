import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { forwardRef } from 'react'
import { Button } from './Button'
import { Toolbar } from './Toolbar'
import { Separator } from './Separator'

interface RichTextEditorProps {
  content?: string
  onChange?: (content: string) => void
  placeholder?: string
  className?: string
  editable?: boolean
}

/**
 * RichTextEditor component using Tiptap with StarterKit extensions
 * 
 * Features:
 * - Basic text formatting (bold, italic, strikethrough)
 * - Headings (H1, H2, H3)
 * - Lists (ordered and unordered)
 * - Blockquotes
 * - Code blocks
 * - Undo/Redo
 * 
 * @example
 * ```tsx
 * <RichTextEditor
 *   content="<p>Initial content</p>"
 *   onChange={(content) => console.log(content)}
 *   placeholder="Start typing..."
 * />
 * ```
 */
export const RichTextEditor = forwardRef<HTMLDivElement, RichTextEditorProps>(
  ({ content = '', onChange, placeholder = 'Start typing...', className = '', editable = true }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
      ],
      content,
      editable,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML())
      },
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[100px] p-4',
        },
      },
    })

    if (!editor) {
      return null
    }

    return (
      <div ref={ref} className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}>
        {editable && (
          <Toolbar className="border-b border-gray-200 p-2 bg-gray-50">
            <div className="flex items-center gap-1 flex-wrap">
              {/* Text Formatting */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'bg-gray-200' : ''}
                type="button"
              >
                <strong>B</strong>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'bg-gray-200' : ''}
                type="button"
              >
                <em>I</em>
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'bg-gray-200' : ''}
                type="button"
              >
                <s>S</s>
              </Button>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Headings */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
                type="button"
              >
                H1
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
                type="button"
              >
                H2
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : ''}
                type="button"
              >
                H3
              </Button>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Lists */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
                type="button"
              >
                • List
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
                type="button"
              >
                1. List
              </Button>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Blockquote */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'bg-gray-200' : ''}
                type="button"
              >
                Quote
              </Button>

              {/* Code */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'bg-gray-200' : ''}
                type="button"
              >
                Code
              </Button>

              <Separator orientation="vertical" className="h-6 mx-1" />

              {/* Undo/Redo */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                type="button"
              >
                ↶
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                type="button"
              >
                ↷
              </Button>
            </div>
          </Toolbar>
        )}
        
        <EditorContent 
          editor={editor} 
          className="min-h-[100px] max-h-[400px] overflow-y-auto"
        />
        
        {editor.isEmpty && editable && (
          <div className="absolute pointer-events-none text-gray-400 p-4 top-[60px]">
            {placeholder}
          </div>
        )}
      </div>
    )
  }
)

RichTextEditor.displayName = 'RichTextEditor'

/**
 * RichTextViewer component for read-only display of rich text content
 * 
 * @example
 * ```tsx
 * <RichTextViewer content="<p>Some <strong>rich</strong> text</p>" />
 * ```
 */
export const RichTextViewer = forwardRef<HTMLDivElement, { content: string; className?: string }>(
  ({ content, className = '' }, ref) => {
    const editor = useEditor({
      extensions: [StarterKit],
      content,
      editable: false,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none',
        },
      },
    })

    if (!editor) {
      return null
    }

    return (
      <div ref={ref} className={className}>
        <EditorContent editor={editor} />
      </div>
    )
  }
)

RichTextViewer.displayName = 'RichTextViewer'