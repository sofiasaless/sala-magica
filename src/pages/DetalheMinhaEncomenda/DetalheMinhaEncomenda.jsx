import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'

// imports
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function DetalheMinhaEncomenda() {

  const location = useLocation();
  const { objEncomenda } = location.state || {};
  
  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Informações da encomenda'} />

          <section className='py-4 d-flex flex-column'>

            <h4>📝 Revise os detalhes da sua encomenda.</h4>

            <div className='d-flex flex-column gap-4'>
              {/* <div className='area-detalhe d-flex flex-column'>
                <span className='text-uppercase '>- Informações do solicitante</span>
                <span>Nome completo: Sofia Sales Lima</span>
                <span>Telefone: (85) 98753-9972</span>
                <span>E-mail: sofiasaleswk@gmail.com</span>
              </div> */}

              <div className='area-detalhe d-flex flex-column'>
                <span className='text-uppercase'>- Detalhes encomenda</span>
                <span>Encomenda feita em quinta-feira, 5 de março de 2025</span>
                <span className='desc-encomenda'>📌 <b>Categoria:</b> {objEncomenda.categoria}</span>
                <span className='desc-encomenda'>📌 <b>Descrição:</b> {objEncomenda.descricao}</span>
                <span className='desc-encomenda'>📌 <b>Medidas do produto:</b> Altura: {objEncomenda.altura}cm Comprimento: {objEncomenda.comprimento}cm</span>
                <span className='desc-encomenda'>📌 <b>Referências: {objEncomenda.referencia}</b></span>
                <span className='desc-encomenda'>📌 <b>Imagem de exemplo:</b></span>
                <img src={objEncomenda.imagemReferencia} alt="" />
              </div>
            </div>

          </section>

        </Container>

      </main>
    </>
  )
}