import React from 'react';
import StylesDivIcones from '../../styles/landingPage.divIcones.module.css';
import Styles from '../../styles/landingPage.module.css';
import Assuntos from '../svg/landingPage/assuntos';
import Conquistas from '../svg/landingPage/conquistas';
import Cursos from '../svg/landingPage/cursos';
import Discord from '../svg/landingPage/discord';
import Posts from '../svg/landingPage/posts';
import Suporte from '../svg/landingPage/suporte';
import DivIcone from './divIcone';

export default function Sessao2() {
    return (
        <section className={`${Styles.principal} ${Styles.corSecundaria}`}>
            <div className={`${Styles.sessaoTituloPrincipal} ${Styles.margemTitulo}`}>
                <span className={Styles.tituloPrincipalMedio}>O poder do&nbsp;<span className='cor-principal'>Anheu</span></span>
                <span className={Styles.tituloPrincipalMedio}>na palma das suas mãos</span>
            </div>

            <div className={Styles.margemTopP}>
                <span className={Styles.descricaoTituloPrincipal}>Poder na palma da sua mão — ou no seu monitor.</span>
                <span className={Styles.descricaoTituloPrincipal}>Aprenda tudo e um pouco mais.</span>
            </div>

            <div className={StylesDivIcones.divIcones}>
                <DivIcone Svg={<Posts width='25px' cor='rgba(255, 255, 255, 0.85)' />} titulo='Posts & tutoriais' desc='Aprenda gratuitamente com os tutoriais postados no Anheu.' url='/xxx' />
                <DivIcone Svg={<Cursos width='25px' cor='rgba(255, 255, 255, 0.85)' />} titulo='Cursos' desc='Cursos recheados com aulas de alta qualidade.' url='/xxx' />
                <DivIcone Svg={<Assuntos width='25px' cor='rgba(255, 255, 255, 0.85)' />} titulo='Assuntos diversos' desc='Descubra sobre software, hardware, clouding, etc.' url='/xxx' />
                <DivIcone Svg={<Conquistas width='25px' cor='rgba(255, 255, 255, 0.9)' />} titulo='Conquistas' desc='Acompanhe seu progresso com as conquistas.' url='/xxx' />
                <DivIcone Svg={<Discord width='25px' cor='rgba(255, 255, 255, 0.85)' />} titulo='Discord' desc='Grupo no discord para bater-papo e tirar dúvidas.' url='/xxx' />
                <DivIcone Svg={<Suporte width='25px' cor='rgba(255, 255, 255, 0.85)' />} titulo='Suporte' desc='Deixa suas dúvidas e tenha suporte em tempo real.' url='/xxx' />
            </div>
        </section>
    )
}

