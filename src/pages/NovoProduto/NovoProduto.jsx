import './style.css'
import { useState } from 'react'

// outros imports
import UploadImagem from '../../cloudnary/upload'
import ProdutosFs from '../../firebase/firestore/ProdutoFs'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'

// assets
import imgCapa from '../../assets/material/add-image.png'

export default function NovoProduto() {

  // instância pro firestore
  const produtoRepository = ProdutosFs()

  // states para cadastro do produto
  const [titulo, setTitulo] = useState('')
  const [preco, setPreco] = useState(0)
  const [descricao, setDescricao] = useState('')
  const [altura, setAltura] = useState(0)
  const [comprimento, setComprimento] = useState(0)
  const [modelagem, setModelagem] = useState('')
  const [categoria, setCategoria] = useState('')

  // controle visual para cadastro
  const [fazendoUp, setFazendoUp] = useState(false)

  // imagens
  const [imagemCapa, setImagemCapa] = useState(null);
  const [imagens, setImagens] = useState([]);

  // handle para upload de imagens
  const handleImagem = (event, tipoImg) => {
    const file = event.target.files[0];
    if (!file) return;

    if (tipoImg === 0) {
      setImagemCapa(file);
    } else {
      setImagens((prev) => [...prev, file]);
    }
  };

  // processo de anunciar o produto
  const anunciar = async () => {

    setFazendoUp(true);

    // objeto do produto que vai para o firestore
    const obj = {
      titulo: titulo,
      preco: preco,
      descricao: descricao,
      altura: altura,
      comprimento: comprimento,
      modelagem: modelagem,
      categoria: categoria,
      imagemCapa: '',
      imagens: [],
      dataAnuncio: new Date(),
    };

    // upload da imagem de capa
    if (imagemCapa) {
      obj.imagemCapa = await UploadImagem(imagemCapa);
    }

    // upload das imagens adicionais
    const imagensUrl = await Promise.all(imagens.map((img) => UploadImagem(img)));
    obj.imagens = imagensUrl;

    console.log('objeto final:', obj);

    // enviando ao firestore
    await produtoRepository.anunciarProduto(obj);

    // confirmação para o usuário
    alert('Produto anunciado com sucesso!');
    setFazendoUp(false);
    window.location.reload();
  }

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }}>
        <Header />
        <Container>

          <BotaoVoltar />

          <Titulo admin={true} titulo={'Anunciar novo produto'} />

          <form className='mt-4'
            onSubmit={(e) => {
              e.preventDefault()
              anunciar()
            }}
          >

            <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
              <img className='ms-2' src={imgCapa} alt="" />
              <label>Imagem da capa</label>
              <input type="file" className='' onChange={(e) => handleImagem(e, 0)} />
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Título do produto</label>
                <input required={true} type="text" className="form-control input-cadastro-produto" onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Preço</label>
                <input required={true} type="number" min={0} className="form-control input-cadastro-produto" onChange={(e) => setPreco(Number(e.target.value))}
                />
              </div>

            </div>

            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Descrição</label>
                <textarea required={true} type="text" className="form-control input-cadastro-produto" rows={3} onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Altura (cm)</label>
                <input type="text" className="form-control input-cadastro-produto" onChange={(e) => setAltura(Number(e.target.value))}
                />
              </div>

              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Comprimento (cm)</label>
                <input type="text" min={0} className="form-control input-cadastro-produto" onChange={(e) => setComprimento(Number(e.target.value))} />
              </div>
            </div>


            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Modelagem</label>
                <textarea type="text" className="form-control input-cadastro-produto" rows={2} onChange={(e) => setModelagem(e.target.value)} />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>

              <div className="p-0 mb-3 area-input">

                <label className="form-label ms-1">Categoria</label>

                <div className="form-check">
                  <input onChange={(e) => setCategoria(e.target.value)} value={"Enfeites de parede"} className="form-check-input" type="radio" name="radio" id='radio0' />
                  <label className="form-check-label" for="radio0">
                    Enfeites de parede
                  </label>
                </div>

                <div className="form-check">
                  <input onChange={(e) => setCategoria(e.target.value)} value={"Materiais educativos"} className="form-check-input" type="radio" name="radio" id='radio1' />
                  <label className="form-check-label" for="radio1">
                    Materiais educativos
                  </label>
                </div>

                <div className="form-check">
                  <input onChange={(e) => setCategoria(e.target.value)} value={"Decoração individual"} className="form-check-input" type="radio" name="radio" id='radio2' />
                  <label className="form-check-label" for="radio2">
                    Decoração individual
                  </label>
                </div>

                <div className="form-check">
                  <input onChange={(e) => setCategoria(e.target.value)} value={"Atividade pedagógica"} className="form-check-input" type="radio" name="radio" id='radio3' />
                  <label className="form-check-label" for="radio3">
                    Atividade pedagógica
                  </label>
                </div>

              </div>

              <div className="p-0 mb-3 area-input">

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 1</label>
                  <input type="file" className='' onChange={(e) => handleImagem(e, 1)} />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 2</label>
                  <input type="file" className='' onChange={(e) => handleImagem(e, 2)} />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 3</label>
                  <input type="file" className='' onChange={(e) => handleImagem(e, 3)} />
                </div>

                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Imagem 4</label>
                  <input type="file" className='' onChange={(e) => handleImagem(e, 4)} />
                </div>
              </div>
            </div>
            <div className='p-0 mt-3 d-flex justify-content-center'>
              <button type='submit' className="p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center" disabled={fazendoUp}
              >
                {
                  (fazendoUp) ?
                    <div className="spinner-border spinner-border-sm mx-5" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    :
                    <>
                      Anunciar produto
                      <i className="bi bi-cloud-plus-fill ms-3"></i>
                    </>
                }
              </button>
            </div>
          </form>


        </Container>
      </main>
    </>
  )
}