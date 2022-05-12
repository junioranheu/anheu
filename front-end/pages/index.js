import Link from 'next/link';

export default function Index() {
    return (
        <div style={{backgroundColor: 'var(--preto)', height: '100vh'}}>
            <span className='topico'>Index</span><br />

            <Link href='/disciplinas'>
                <a className='topico'>Disciplinas</a>
            </Link>
        </div>
    )
} 
