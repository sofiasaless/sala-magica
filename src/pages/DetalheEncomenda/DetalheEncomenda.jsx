import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'

// imports
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import AuthService from '../../firebase/authentication/AuthService'

export default function DetalheEncomenda() {

  const location = useLocation();
  const { objEncomenda } = location.state || {};

  // states
  const [usuarioSolicitante, setUsuarioSolicitante] = useState('')

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
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Informações da encomenda'} admin={true} />

          <section className='py-4 d-flex flex-column'>

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
                <span>Encomenda feita em quinta-feira, 5 de março de 2025</span>
                <span className='desc-encomenda'>📌 <b>Categoria:</b> {objEncomenda.categoria}</span>
                <span className='desc-encomenda'>📌 <b>Descrição:</b> {objEncomenda.descricao}</span>
                <span className='desc-encomenda'>📌 <b>Medidas do produto:</b> Altura: {objEncomenda.altura}cm Comprimento: {objEncomenda.comprimento}cm</span>
                <span className='desc-encomenda'>📌 <b>Referências: {objEncomenda.referencia}</b></span>
                <span className='desc-encomenda'>📌 <b>Imagem de exemplo</b></span>
                <img src={objEncomenda.imagemExemplo} alt="" />
              </div>
            </div>

          </section>

          <Titulo titulo={'Enviar resposta'} admin={true} />

          <div className='area-infos mt-4'>
            <div className="p-0 mb-3 area-input">
              <label className="form-label ms-1">Mensagem de resposta ao cliente</label>
              <textarea required={true} type="text" className="form-control input-cadastro-produto" rows={3} />
            </div>
          </div>

          <div>
            <button className='p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center text-uppercase'>
              Enviar
              <i class="bi bi-send ms-2"></i>
            </button>
          </div>

        </Container>

      </main>
    </>
  )
}