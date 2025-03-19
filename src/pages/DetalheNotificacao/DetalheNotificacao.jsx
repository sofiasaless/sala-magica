import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'

// imports
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import NotificacoesFs from '../../firebase/firestore/NotificacoesFs'

export default function DetalheNotificacao() {

  // dados passados por rota
  const location = useLocation()
  const { notificacaoObj } = location.state || {};

  const marcarComoLida = async () => {
    const notificacaoRepositorio = NotificacoesFs()
    await notificacaoRepositorio.marcarNotificacaoComoLida(notificacaoObj.id)
  }

  useEffect(() => {
    marcarComoLida()
  }, [])

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={`Lendo notificação id #${notificacaoObj.id}`} />

          <section className='py-4 d-flex flex-column'>

            <h4>{notificacaoObj.tituloNot}</h4>

            <p className='p-notificacao fst-italic'>
              Notificação enviada {notificacaoObj.dataNotificacao}
            </p>

            <p className='p-notificacao'>
              {notificacaoObj.descricaoNot}
            </p>

            <a href={notificacaoObj.redirecionamento}>{notificacaoObj.redirecionamento}</a>

          </section>



        </Container>

      </main>
    </>
  )
}