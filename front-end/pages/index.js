import Link from 'next/link';

export default function Index() {
    return (
        <div className='topico'>
            Index<br />
            <Link href='/cursos'>
                <a>Cursos</a>
            </Link>
        </div>
    )
}
