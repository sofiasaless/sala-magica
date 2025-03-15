import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'

// assets

export default function DetalheNotificacao() {

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem', height: '100%' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo titulo={'Lendo notificação id #i018u481'} />

          <section className='py-4 d-flex'>

            <h4>Novo produto no catálogo! Venha conferir o “Calendário tema verde” da categoria enfeites de parede!</h4>

            <p className='p-notificacao'>
              ✨ Temos um novo produto anunciado no catálogo da Sala Mágica! Explore a novidade e deixe sua sala de aula ainda mais especial.
            </p>

            <p className='p-notificacao'>
              Confira agora e não esqueça de curtir se gostar! 💖
            </p>
                        
            <p className='p-notificacao'>
              Acesse aqui:
            </p>

          </section>



        </Container>

      </main>
    </>
  )
}