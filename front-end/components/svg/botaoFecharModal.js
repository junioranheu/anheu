export default function BotaoFecharModal(props) {
    return (
        <button aria-label='Fechar' title='Fechar' type='button' className={props.style.botaoFechar} onClick={() => props.fecharModal()}>
            <span className={props.style.spanBotaoFechar}>
                <svg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg' aria-hidden='true' role='presentation' focusable='false'
                    style={{ display: 'block', fill: 'none', height: props.height, width: props.width, stroke: 'currentcolor', strokeWidth: '3', overflow: 'visible' }}>
                    <path d='m6 6 20 20'></path>
                    <path d='m26 6-20 20'></path>
                </svg>
            </span>
        </button>
    )
}