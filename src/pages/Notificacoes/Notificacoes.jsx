import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'
import NavSwitch from '../../components/NavSwitch/NavSwitch'

// assets

export default function Notificacoes() {

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }} className='principal'>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Suas notificações'} />

          <NavSwitch opcaoUm={'Não lidas'} opcaoDois={'Lidas'}/>

          <section className='d-flex flex-column gap-3 justify-content-center'>

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