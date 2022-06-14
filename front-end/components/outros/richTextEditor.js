import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback } from 'react';
import Styles from '../../styles/richTextEditor.module.css';

// https://tiptap.dev/installation/nextjs
export default function RichTextEditor({ atualizarFormDataConteudo }) {
    const editor = useEditor({
        extensions: [StarterKit, Image],
        content: '',

        // https://tiptap.dev/guide/output
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            // console.log('onUpdate: ' + html);

            atualizarFormDataConteudo(html);
        }
    })

    // https://tiptap.dev/api/nodes/image;
    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor])

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
                    Negrito
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive('itálico') ? 'is-active' : ''}
                >
                    Itálico
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive('riscar') ? 'is-active' : ''}
                >
                    Riscar
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    className={editor.isActive('código') ? 'is-active' : ''}
                >
                    Código
                </button>

                <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                    Limpar efeitos
                </button>

                <button onClick={() => editor.chain().focus().clearNodes().run()}>
                    Limpar nodes
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
                    Lista
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive('orderedList') ? 'is-active' : ''}
                >
                    Lista ordenada
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive('citar') ? 'is-active' : ''}
                >
                    Citar
                </button>

                <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                    hr
                </button>

                <button onClick={() => editor.chain().focus().setHardBreak().run()}>
                    Pular linha
                </button>

                <button onClick={() => editor.chain().focus().undo().run()}>
                    Desfazer
                </button>

                <button onClick={() => editor.chain().focus().redo().run()}>
                    Redesfazer
                </button>

                <button onClick={addImage}>
                    Inserir imagem
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
