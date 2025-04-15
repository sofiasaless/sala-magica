// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'
import NavSwitch from '../../components/NavSwitch/NavSwitch'
import CardEncomenda from '../../components/CardEncomenda/CardEncomenda'

// imports
import EncomendaFs from '../../firebase/firestore/EncomendaFs'
import { useEffect, useState } from 'react'

export default function GerenciarEncomendas() {

  const encomendaRepositorio = EncomendaFs()

  // states para encomendas
  const [encomendas, setEncomendas] = useState([])
  const [pendentes, setPendentes] = useState(true)

  const buscarEncomendas = async (status) => {
    await encomendaRepositorio.recuperarEncomendasPorPendencia(status).then((resultado) => {
      setEncomendas(resultado)
    })
    setPendentes(status)
  }

  useEffect(() => {
    buscarEncomendas(true)
  }, [])

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        {/* <Header /> */}
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Encomendas solicitadas'} admin={true} />

          <NavSwitch opcaoUm={'Encomendas pendentes'} opcaoDois={'Encomendas respondidas'} acaoUm={buscarEncomendas} acaoDois={buscarEncomendas} />

          <section className='d-flex flex-column gap-3 justify-content-center'>

            {
              (encomendas.length > 0) ?
                encomendas.map((e) => (
                  <>
                    <CardEncomenda key={e.id} encomenda={e} titulo={`Nova encomenda de categoria "${e.categoria}"`} admin={true} />
                  </>
                ))
                :
                <>
                  <h5 className='text-center'>Nenhuma encomenda {(pendentes)?'pendente':'respondida'}!</h5>
                </>
            }

          </section>


        </Container>

      </main>
    </>
  )
}