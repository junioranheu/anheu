import { faGithub, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import Styles from '../../styles/footer.module.css'

export default function Footer() {
    return (
        <footer className={Styles.footer}>
            {/* Principal */}
            <div className={Styles.principal}>
                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Anheu</span>

                    <Link href='/'><a>Time</a></Link>
                    <Link href='/'><a>Preço</a></Link>
                    <Link href='/'><a>Aea <span className='efeito-new'>novo</span></a></Link>
                    <Link href='/'><a>Blog</a></Link>
                    <Link href='/'><a>Devs</a></Link>
                    <Link href='/'><a>Atualizações</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Plataformas</span>

                    <Link href='/'><a>Web</a></Link>
                    <Link href='/'><a>macOS</a></Link>
                    <Link href='/'><a>Windows</a></Link>
                    <Link href='/'><a>iOS</a></Link>
                    <Link href='/'><a>Android</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Aprenda</span>

                    <Link href='/'><a>Tutoriais</a></Link>
                    <Link href='/'><a>Exemplos</a></Link>
                    <Link href='/'><a>Templates</a></Link>
                    <Link href='/'><a>Sessões</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Sobre</span>

                    <Link href='/'><a>Comunidade</a></Link>
                    <Link href='/'><a>Empresa</a></Link>
                    <Link href='/'><a>Carreiras</a></Link>
                    <Link href='/'><a>Legal</a></Link>
                </div>

                <div className={Styles.sessao}>
                    <span className={Styles.tituloSessao}>Suporte</span>

                    <Link href='/'><a>Usando o Anheu</a></Link>
                    <Link href='/'><a>Contas</a></Link>
                    <Link href='/'><a>Contato</a></Link>
                </div>
            </div>

            {/* Secundária */}
            <div className={Styles.secundaria}>
                {/* Esquerda */}
                <div>
                    <span>
                        Copyright © {new Date().getFullYear()} Anheus B.V. — Desenvolvido por

                        <Link href='https://github.com/junioranheu'>
                            <a target='_blank'>
                                <span>
                                    <span className='cor-principal-hover'>&nbsp;@junioranheu</span>
                                </span>
                            </a>
                        </Link>
                    </span>
                </div>

                {/* Direita */}
                <div className={Styles.direita}>
                    <div className={Styles.icones}>
                        <span title='Alternar modo dark/light'>
                            <FontAwesomeIcon className='pointer' icon={faSun} size='lg' />
                        </span>

                        <span title='GitHub'>
                            <FontAwesomeIcon className='pointer' icon={faGithub} size='lg' onClick={() => { window.open('https://github.com/junioranheu', '_blank') }} />
                        </span>

                        <span title='Instagram'>
                            <FontAwesomeIcon className='pointer' icon={faInstagram} size='lg' onClick={() => { window.open('https://www.instagram.com/junioranheu/', '_blank') }} />
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
