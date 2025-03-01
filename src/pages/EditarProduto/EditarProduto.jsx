import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import ArquivarProduto from '../../components/ArquivarProduto/ArquivarProduto'

// assets
import imgCapa from '../../assets/material/add-image.png'

export default function EditarProduto() {
  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo admin={true} titulo={'Informações do produto'} />

          <form className='mt-4'>

            <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
              <img className='ms-2' src={imgCapa} alt="" />
              <label>Imagem da capa</label>
              <input type="file" className='' />
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Título do produto</label>
                <input type="text" className="form-control input-cadastro-produto" />
              </div>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Preço</label>
                <input type="number" min={0} className="form-control input-cadastro-produto" />
              </div>

            </div>

            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Descrição</label>
                <textarea type="text" className="form-control input-cadastro-produto" rows={3} />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Dimensão de altura (cm)</label>
                <input type="number" className="form-control input-cadastro-produto" />
              </div>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Dimensão de comprimento (cm)</label>
                <input type="number" min={0} className="form-control input-cadastro-produto" />
              </div>
            </div>


            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Modelagem</label>
                <textarea type="text" className="form-control input-cadastro-produto" rows={2} />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>

              <div className="p-0 mb-3 area-input">

                <label className="form-label ms-1">Categoria</label>

                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" />
                  <label class="form-check-label">
                    Enfeites de parede
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" />
                  <label class="form-check-label">
                    Materiais educativos
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" />
                  <label class="form-check-label">
                    Decoração individual
                  </label>
                </div>

                <div class="form-check">
                  <input class="form-check-input" type="radio" name="flexRadioDefault" />
                  <label class="form-check-label">
                    Atividade pedagógica
                  </label>
                </div>

              </div>

              <div className="p-0 mb-3 area-input">

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 1</label>
                  <input type="file" className='' />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 2</label>
                  <input type="file" className='' />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 3</label>
                  <input type="file" className='' />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 4</label>
                  <input type="file" className='' />
                </div>
              </div>
            </div>
          </form>

          <div className='p-0 mt-3 d-flex justify-content-around'>
            <div className="p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center">
              Editar produto
              <i class="bi bi-pencil-fill ms-2"></i>
            </div>

            <ArquivarProduto descricao={'Arquivar produto'}/>

            <div className="p-3 px-4 rounded-4 btn-opc btn-verm d-flex align-items-center">
              Excluir produto
              <i class="bi bi-trash3-fill ms-2"></i>
            </div>
          </div>

        </Container>
      </main>
    </>
  )
}