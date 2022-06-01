export default function Toggle({ width }) {
    return (
        <svg width={width} height={width}>
            <g fillRule='evenodd'>
                <path fill='white' d='M1 3v9h14V3H1zm0-1h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z' fillRule='nonzero'></path>
                <path fill='white' d='M10 8h4v3h-4z'></path>
            </g>
        </svg>
    )
}