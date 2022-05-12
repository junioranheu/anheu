import Styles from '../../styles/navbar1.module.css';
import EmojiAleatorio from '../../utils/outros/emojiAleatorio';
import Seta from '../svg/seta';

export default function Navbar1() {
    return (
        <nav className={Styles.navbar}>
            <span>Anheu: Plataforma de ensino on-line de técnologia e programação</span>

            <span>{EmojiAleatorio()}</span>

            <span className='pointer cor-principal-hover' onClick={() => { window.open('https://github.com/junioranheu', '_blank'); }}>
                Saiba mais <Seta width='1rem' />
            </span>
        </nav>
    )
}