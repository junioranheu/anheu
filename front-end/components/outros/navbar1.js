import Styles from '../../styles/navbar1.module.css';
import Seta from '../svg/seta';

export default function Navbar1() {
    return (
        <nav className={Styles.navbar}>
            <span>Projeto para estudar React.js e Next.js.</span>

            <span>Olá</span>

            <span className='pointer cor-principal-hover' onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>@junioranheu <Seta width={'1rem'} /></span>
        </nav>
    )
}