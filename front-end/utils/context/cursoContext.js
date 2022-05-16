import { createContext, useState } from 'react';

// Criar o contexto para usar no providar abaixo;
export const CursoContext = createContext();

// Provider: para "segurar" uma informação e passar para todos os componentes "child";
export const CursoProvider = props => {
    // https://stackoverflow.com/questions/68189273/referenceerror-localstorage-is-not-defined-using-local-storage-in-nextjs
    if (typeof window !== 'undefined') {
        const [cursoContext, setCursoContext] = useState(localStorage.getItem('cursoSelecionado') ?? null);

        return (
            <CursoContext.Provider value={[cursoContext, setCursoContext]}>
                {props.children}
            </CursoContext.Provider>
        );
    } else {
        return null;
    }
}

export const Storage = {
    setCursoLogado(cursoId) {
        // console.log(cursoId);
        localStorage.setItem('cursoSelecionado', cursoId);
    },

    getCursoLogado() {
        let data = localStorage.getItem('cursoSelecionado');
        // console.log(dataJson);

        if (!data) {
            return null;
        }

        return data;
    },

    deleteCursoLogado() {
        localStorage.removeItem('cursoSelecionado');
    },

    updateCursoLogado(cursoId) {
        // console.log(data);
        localStorage.setItem('cursoSelecionado', cursoId);
    }
}