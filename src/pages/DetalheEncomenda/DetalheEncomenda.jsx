import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import Modal from '../../components/Modal/Modal'

// imports
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthService from '../../firebase/authentication/AuthService'
import EncomendaFs from '../../firebase/firestore/EncomendaFs'
import NotificacoesFs from '../../firebase/firestore/NotificacoesFs'
import { NotificacaoObj } from '../../util/NotificacaoObj'

export default function DetalheEncomenda() {

  const location = useLocation();
  const { objEncomenda } = location.state || {};

  // states
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')
  const [resposta, setResposta] = useState('')

  // states para modal
  const [mensagem, setMensagem] = useState('');
  const [tituloModal, setTituloModal] = useState('');

  const enviarResposta = async () => {
    console.log(objEncomenda)

    try {
      // criar notificação para o solicitante, enviando a resposta
      const notificacaoRepository = NotificacoesFs()

      // objeto de notificação de resposta
      const objNotificacao = NotificacaoObj(
        `Resposta a sua solicitação de encomenda. Venha conferir!`,
        resposta,
        ``,
        'RESPOSTA',
        null
      )

      // enviando a notificação
      await notificacaoRepository.adicionarNotificacaoResposta(objNotificacao, objEncomenda.solicitante)

      // alterar pendencia da encomenda
      const encomendaRepository = EncomendaFs()
      await encomendaRepository.atualizarPendenciaEncomenda(objEncomenda.id, false);

      setTituloModal('Sucesso!')
      setMensagem('Resposta enviada a solicitação de encomenda com sucesso!')

    } catch (error) {
      setTituloModal('Ops..')
      setMensagem('Ocorreu um erro ao enviar a resposta para solicitação de encomenda. ', error)
    }

  }

  useEffect(() => {
    const buscarDadosDoSolicitante = async () => {
      const authServ = AuthService()
      await authServ.retornarInfosUsuarioViaId(objEncomenda.solicitante).then((resultado) => {
        setUsuarioSolicitante(resultado)
      })
    }

    if (objEncomenda) {
      buscarDadosDoSolicitante()
    }
  }, [objEncomenda])

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        {/* <Header /> */}
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Informações da encomenda'} admin={true} />

          <section className='py-4 d-flex flex-column' style={{ height: '100%' }}>

            <h4>Nova encomenda solicitada por Cloroquina Gatuxa.</h4>
            <h5 style={{ color: 'var(--cinzaUm)' }} className='pb-3'>📝 Confira os detalhes do pedido e entre em contato para alinhar a produção.</h5>

            <div className='d-flex flex-column gap-4'>
              <div className='area-detalhe d-flex flex-column'>
                <span className='text-uppercase '>- Informações do solicitante</span>
                <span>Nome completo: {usuarioSolicitante.nomeCompleto}</span>
                <span>Telefone: {usuarioSolicitante.telefone}</span>
                <span>E-mail: {usuarioSolicitante.email}</span>
              </div>

              <div className='area-detalhe d-flex flex-column'>
                <span className='text-uppercase'>- Detalhes encomenda</span>
                <span>Encomenda feita {objEncomenda.dataEncomenda}</span>
                <span className='desc-encomenda'>📌 <b>Categoria:</b> {objEncomenda.categoria}</span>
                <span className='desc-encomenda'>📌 <b>Descrição:</b> {objEncomenda.descricao}</span>
                
                <div className='d-flex flex-column'>
                  <span>📌 <b>Medidas do produto:</b></span>
                  <span className='desc-encomenda'>- Altura: {objEncomenda.altura}cm</span>
                  <span className='desc-encomenda'>- Comprimento: {objEncomenda.comprimento}cm</span>
                </div>

                <span className='desc-encomenda'>📌 <b>Referências: {objEncomenda.referencia}</b></span>
                <span className='desc-encomenda'>📌 <b>Imagem de exemplo</b></span>
              </div>

              <div className='area-img-encomenda d-flex justify-content-center'>
                <img src={objEncomenda.imagemReferencia} className='img-encomenda' alt="" />
              </div>
            </div>

          </section>

          <Titulo titulo={'Enviar resposta'} admin={true} />

          <div className='area-infos mt-4'>
            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">Mensagem de resposta ao cliente</label>
              <textarea required={true} type="text" className="form-control input-cadastro-produto" rows={3} onChange={(e) => setResposta(e.target.value)} />
            </div>
          </div>

          <div>
            <button className='p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center text-uppercase' onClick={enviarResposta}>
              Enviar
              <i class="bi bi-send ms-2"></i>
            </button>
          </div>

        </Container>

        {mensagem && <Modal mensagem={mensagem} setMensagem={setMensagem} tituloModal={tituloModal} />}
      </main>
    </>
  )
}