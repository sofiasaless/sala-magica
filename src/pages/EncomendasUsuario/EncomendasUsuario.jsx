// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'
import NavSwitch from '../../components/NavSwitch/NavSwitch'
import CardEncomenda from '../../components/CardEncomenda/CardEncomenda'
import EncomendaFs from '../../firebase/firestore/EncomendaFs'
import useAuth from '../../firebase/authentication/useAuth'
import { useEffect, useState } from 'react'

export default function EncomendasUsuario() {

  const encomendaRepositorio = EncomendaFs()

  const usuario = useAuth()

  // states para encomendas
  const [encomendas, setEncomendas] = useState([])
  const [pendentes, setPendentes] = useState(true)

  const buscarEncomendas = async (status) => {
    await encomendaRepositorio.reuperarEncomendasPorUsuario(usuario.email, status).then((resultado) => {
      setEncomendas(resultado)
      console.log(resultado)
    })
    setPendentes(status)
  }

  useEffect(() => {
    if (usuario) {
      buscarEncomendas(true)
    }

  }, [usuario])

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Minhas encomendas'} />

          <NavSwitch opcaoUm={'Encomendas pendentes'} opcaoDois={'Encomendas respondidas'} acaoUm={buscarEncomendas} acaoDois={buscarEncomendas}/>

          <section className='d-flex flex-column gap-3 justify-content-center'>

            {
              (encomendas.length > 0)?
              encomendas.map((e) => (
                <>
                  <CardEncomenda key={e.id} encomenda={e} titulo={`Encomenda de categoria "${e.categoria}"`} />
                </>
              ))
              :
              <>
                <h5 className='text-center'>{(pendentes)?'Você ainda não fez nenhuma encomenda!':'Nenhuma encomenda respondida!'}</h5>
              </>
            }
            
          </section>


        </Container>

      </main>
    </>
  )
}