import Link from 'next/link';

export default function Index() {
    return (
        <div className='topico' style={{backgroundColor: 'black'}}>
            Index<br />

            <Link href='/cursos'>
                <a>Cursos</a>
            </Link>
        </div>
    )
} 
