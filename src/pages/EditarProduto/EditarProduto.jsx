import './style.css'

// components
import Container from '../../components/Container/Container'
import Header from '../../components/Header/Header'
import Titulo from '../../components/Titulo/Titulo'
import BotaoVoltar from '../../components/BotaoVoltar/BotaoVoltar'
import ArquivarProduto from '../../components/ArquivarProduto/ArquivarProduto'

// assets
import imgCapa from '../../assets/material/add-image.png'

// imports
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ProdutosFs from '../../firebase/firestore/ProdutoFs'
import UploadImagem from '../../cloudnary/upload'

export default function EditarProduto() {
  const { id } = useParams();
  const produtoRepositorio = ProdutosFs();

  const navegador = useNavigate()

  const [produto, setProduto] = useState();
  
  // states de atributos
  const [titulo, setTitulo] = useState('');
  const [preco, setPreco] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [altura, setAltura] = useState(0);
  const [comprimento, setComprimento] = useState(0);
  const [modelagem, setModelagem] = useState('');
  const [categoria, setCategoria] = useState('');
  
  // outros
  const [txtBotao, setTxtBotao] = useState('Editar produto');
  const [habilitado, setHabilitado] = useState(true);
  const [carregando, setCarregando] = useState(false);
  
  // imagens
  const [imagemCapa, setImagemCapa] = useState(null);
  const [imagens, setImagens] = useState([]);

  // adicionando novas imagens ao produto
  const handleAdicionarImagem = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImagens((prev) => [...prev, file]);
  };

  // substituindo imagens do produto por novas
  const handleSubstituirImagem = (event, index) => {
    const file = event.target.files[0];
    if (!file) return;
    setImagens((prev) => {
      const novasImagens = [...prev];
      novasImagens[index] = file;
      return novasImagens;
    });
  };

  // deletando uma imagem pre-existente do produto
  const handleDeletarImagem = (index) => {
    setImagens((prev) => {
      const novasImagens = [...prev];
      novasImagens.splice(index, 1);
      return novasImagens;
    });
  };

  const handleEditarSalvar = async () => {
    if (txtBotao !== 'Editar produto') {
      try {
        setCarregando(true)

        const obj = {
          titulo,
          preco,
          descricao,
          altura,
          comprimento,
          modelagem,
          categoria,
          imagemCapa,
          imagens,
        };

        if (imagemCapa instanceof File) {
          obj.imagemCapa = await UploadImagem(imagemCapa);
        }

        const imagensUrl = await Promise.all(
          imagens.map((img) => {
            if (img instanceof File) {
              return UploadImagem(img)
            }
            return img
          })
        );
        obj.imagens = imagensUrl;

        console.log('objeto final:', obj);

        // enviando o produto atualizado pro firestore
        await produtoRepositorio.atualizarProdutoPorId(id, obj)

        alert('Produto atualizado com sucesso!')

        setCarregando(false)

        setTxtBotao('Editar produto');
        setHabilitado(true);
      } catch (error) {
        alert('Ocorreu um erro ao atualizar o produto! ', error)
      }
    } else {
      setTxtBotao('Salvar alterações');
      setHabilitado(false);
    }
  };

  // apagando o produto
  const apagarProduto = async () => {
    if (window.confirm('Tem certeza que deseja deletar o produto?').valueOf()) {
      await produtoRepositorio.apagarProduto(id);
      navegador(-1)
      return
    }
  }

  const carregarProduto = async () => {
    await produtoRepositorio.recuperarProdutoPorId(id).then((resultado) => {
      setProduto(resultado);
      setTitulo(resultado.titulo);
      setPreco(resultado.preco);
      setCategoria(resultado.categoria);
      setDescricao(resultado.descricao);
      setAltura(resultado.altura);
      setComprimento(resultado.comprimento);
      setModelagem(resultado.modelagem);
      setImagemCapa(resultado.imagemCapa);
      setImagens(resultado.imagens);
    });
  };

  useEffect(() => {
    carregarProduto();
  }, [id]);

  return (
    <>
      <main style={{ backgroundColor: '#e8e8e8', paddingBottom: '5rem' }}>
        <Header />
        <Container>
          <BotaoVoltar />
          <Titulo admin={true} titulo={'Informações do produto'} />
          <form className='mt-4'>
            <div className='area-img area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
              <img className='ms-2' src={imgCapa} alt="" />
              <img src={imagemCapa} style={{ height: '10rem' }} />
              <label>Imagem da capa</label>
              <input type="file" disabled={habilitado} onChange={(e) => setImagemCapa(e.target.files[0])} />
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Título do produto</label>
                <input type="text" className="form-control input-cadastro-produto" onChange={(e) => setTitulo(e.target.value)} value={titulo} readOnly={habilitado} />
              </div>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Preço</label>
                <input type="number" min={0} className="form-control input-cadastro-produto" onChange={(e) => setPreco(Number(e.target.value))} value={preco} readOnly={habilitado} />
              </div>
            </div>

            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Descrição</label>
                <textarea type="text" className="form-control input-cadastro-produto" rows={3} onChange={(e) => setDescricao(e.target.value)} value={descricao} readOnly={habilitado} />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Dimensão de altura (cm)</label>
                <input type="number" className="form-control input-cadastro-produto" onChange={(e) => setAltura(Number(e.target.value))} value={altura} readOnly={habilitado} />
              </div>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Dimensão de comprimento (cm)</label>
                <input type="number" min={0} className="form-control input-cadastro-produto" onChange={(e) => setComprimento(Number(e.target.value))} value={comprimento} readOnly={habilitado} />
              </div>
            </div>

            <div className='area-infos'>
              <div className="p-0 mb-3 area-input">
                <label className="form-label ms-1">Modelagem</label>
                <textarea type="text" className="form-control input-cadastro-produto" rows={2} onChange={(e) => setModelagem(e.target.value)} value={modelagem} readOnly={habilitado} />
              </div>
            </div>

            <div className='area-infos d-flex gap-3 justify-content-between secao-cat-img'>
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
                {imagens.map((img, index) => (
                  <div key={index} className='area-img area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                    <img className='ms-2' src={imgCapa} alt="" />
                    <img src={img instanceof File ? URL.createObjectURL(img) : img} style={{ height: '8rem' }} />
                    <label>Imagem {index + 1}</label>
                    <input type="file" disabled={habilitado} onChange={(e) => handleSubstituirImagem(e, index)} />
                    <button type="button" disabled={habilitado} onClick={() => handleDeletarImagem(index)}>Deletar</button>
                  </div>
                ))}
                <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
                  <img className='ms-2' src={imgCapa} alt="" />
                  <label>Adicionar nova imagem</label>
                  <input type="file" disabled={habilitado} onChange={handleAdicionarImagem} />
                </div>
              </div>
            </div>
          </form>

          <div className='p-0 mt-3 d-flex justify-content-around area-btns'>
            <button className="p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center" onClick={handleEditarSalvar} disabled={carregando}>
              {
                (carregando) ?
                  <div className="spinner-border spinner-border-sm mx-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  :
                  <>
                    {txtBotao}
                    <i class="bi bi-pencil-fill ms-2"></i>
                  </>
              }
            </button>
            <ArquivarProduto descricao={'Arquivar produto'} />
            <button className="p-3 px-4 rounded-4 btn-verm d-flex align-items-center" onClick={apagarProduto}>
              Excluir produto
              <i className="bi bi-trash3-fill ms-2"></i>
            </button>
          </div>
        </Container>
      </main>
    </>
  );
}