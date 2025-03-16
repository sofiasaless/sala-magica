// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'
import NavSwitch from '../../components/NavSwitch/NavSwitch'
import CardEncomenda from '../../components/CardEncomenda/CardEncomenda'

export default function EncomendasUsuario() {

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Minhas encomendas'} />

          <NavSwitch opcaoUm={'Encomendas pendentes'} opcaoDois={'Encomendas respondidas'}/>

          <section className='d-flex flex-column gap-3 justify-content-center'>

            <CardEncomenda />
            <CardEncomenda />
            <CardEncomenda />
            <CardEncomenda />
            <CardEncomenda />
            
          </section>


        </Container>

      </main>
    </>
  )
}