import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Styles from '../../styles/richTextEditor.module.css';

// https://tiptap.dev/installation/nextjs
export default function RichTextEditor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: ''
    })

    const MenuBar = ({ editor }) => {
        if (!editor) {
            return null
        }

        return (
            <>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive('negrito') ? 'is-active' : ''}
                >
                    negrito
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('itálico') ? 'is-active' : ''}
                >
                    itálico
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('riscar') ? 'is-active' : ''}
                >
                    riscar
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('código') ? 'is-active' : ''}
                >
                    código
                </button>

                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    limpar efeitos
                </button>

                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    limpar nodes
                </button>
                
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                >
                    h1
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                >
                    h2
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                >
                    h3
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                >
                    h4
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                >
                    h5
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                >
                    h6
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive('bulletList') ? 'is-active' : ''}
                >
                    lista
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    lista ordenada
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('citar') ? 'is-active' : ''}
                >
                    citar
                </button>

                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    HR
                </button>

                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    pular linha
                </button>

                <button onClick={() => editor.chain().focus().undo().run()}>
                    desfazer
                </button>

                <button onClick={() => editor.chain().focus().redo().run()}>
                    redesfazer
                </button>
            </>
        )
    }

    return (
        <div className={Styles.divEditor}>
            <div className={Styles.divMenu}>
                <MenuBar editor={editor} />
            </div>

            <div className={Styles.divInput}>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}
