export default function InputFiltro({ placeholder, filtrar }) {
    return (
        <input className='inputFiltro' type='text' placeholder={placeholder} onChange={(e) => filtrar(e.target.value)} />
    )
}