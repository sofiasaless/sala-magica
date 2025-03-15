import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import NavNotificacoes from '../../components/NavNotifiacoes/NavNotifiacoes'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'

// assets

export default function Notificacoes() {

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Suas notificações'} />

          <NavNotificacoes />

          <section className='d-flex gap-3 justify-content-center'>

            <CardNotificacao />
            <CardNotificacao />
            <CardNotificacao />
            <CardNotificacao />
            <CardNotificacao />

          </section>


        </Container>

      </main>
    </>
  )
}