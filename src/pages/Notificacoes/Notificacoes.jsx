import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import CardNotificacao from '../../components/CardNotificacao/CardNotificacao'
import NavSwitch from '../../components/NavSwitch/NavSwitch'

// imports
import NotificacoesFs from '../../firebase/firestore/NotificacoesFs'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Notificacoes() {

  const notificacaoRepositorio = NotificacoesFs()

  // dados passados por rota
  const location = useLocation()
  const usuarioId = location.state || '';

  // state
  const [notificacoes, setNotificacoes] = useState([])
  const [msgPendente, setMsgPendente] = useState(true)

  const buscarNotificacoes = async (lidas) => {
    let resultadoNotificacoes = await notificacaoRepositorio.recuperandoNotificacoes(usuarioId.usuarioId, !lidas);
    setNotificacoes(resultadoNotificacoes)
    setMsgPendente(lidas)
  }

  useEffect(() => {
    if (usuarioId) {
      buscarNotificacoes(true)
    }
  }, [usuarioId])

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }} className='principal'>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Suas notificações'} />

          <NavSwitch opcaoUm={'Não lidas'} opcaoDois={'Lidas'} acaoUm={buscarNotificacoes} acaoDois={buscarNotificacoes} />

          <section className='d-flex flex-column gap-3 justify-content-center'>

            {
              (notificacoes.length > 0) ?
                <>
                  {
                    notificacoes.map((not) => (
                      <CardNotificacao key={not.id} titulo={not.tituloNot} notificacao={not} />
                    ))
                  }
                </>
                :
                <>
                  <h3 className='text-center'>{(msgPendente)?'Sem notificações não lidas!':'Nenhuma notificação lida'}</h3>
                </>

            }

          </section>


        </Container>

      </main>
    </>
  )
}