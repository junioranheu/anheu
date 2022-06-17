import Image from '@tiptap/extension-image';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCallback, useRef } from 'react';
import Styles from '../../styles/richTextEditor.module.css';

// https://tiptap.dev/installation/nextjs
export default function RichTextEditor({ atualizarFormDataConteudo }) {
    const refBtnUpar = useRef();

    const editor = useEditor({
        extensions: [StarterKit, Image.configure({ allowBase64: true })],
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
        const url = window.prompt('URL');

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
                    className={editor.isActive('italico') ? 'is-active' : ''}
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
                    className={editor.isActive('codigo') ? 'is-active' : ''}
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
                    Inserir imagem (URL)
                </button>

                <button onClick={() => refBtnUpar.current.click()}>
                    Subir imagem
                </button>

                <input
                    ref={refBtnUpar}
                    onChange={subirImagem}
                    multiple={false}
                    type='file'
                    accept='image/*'
                    hidden
                />
            </>
        )
    }

    const subirImagem = useCallback((e) => {
        const arquivoUpado = e.target.files[0];
        // console.log(arquivoUpado);

        arquivoUpado.convertToBase64(function (base64) {
            // console.log('base64', base64);

            if (base64) {
                editor.chain().focus().setImage({ src: base64 }).run();
            }
        });
    }, [editor])

    // Converter URL para base64 com callback - https://stackoverflow.com/questions/17710147/image-convert-to-base64;
    File.prototype.convertToBase64 = function (callback) {
        var reader = new FileReader();

        reader.onloadend = function (e) {
            callback(e.target.result, e.target.error);
        };

        reader.readAsDataURL(this);
    };

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
