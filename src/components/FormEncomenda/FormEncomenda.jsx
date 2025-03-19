import './style.css'

// assets
import imgIlustrativa from '../../assets/material/delivery.png'
import imgCapa from '../../assets/material/add-image.png'

// componentes
import Modal from '../Modal/Modal';

// imports
import { useEffect, useState } from 'react';
import useAuth from '../../firebase/authentication/useAuth';
import AuthService from '../../firebase/authentication/AuthService';
import EncomendaFs from '../../firebase/firestore/EncomendaFs';
import UploadImagem from '../../cloudnary/upload';
import NotificacoesFs from '../../firebase/firestore/NotificacoesFs';
import { NotificacaoObj } from '../../util/NotificacaoObj';

export default function FormEncomenda() {

  const usuario = useAuth();

  const [logado, setLogado] = useState(false)

  // states para envio da encomenda
  const [categoria, setCategoria] = useState('')
  const [referencias, setReferencias] = useState('')
  const [descricao, setDescricao] = useState('')
  const [altura, setAltura] = useState('')
  const [comprimento, setComprimento] = useState('')
  const [imagemReferencia, setImagemReferencia] = useState('')

  // outros states
  const [carregando, setCarregando] = useState(false)
  const [mensagem, setMensagem] = useState('');
  const [titulo, setTitulo] = useState('');

  // handle para enviar a imagem
  const handleImagem = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setImagemReferencia(file)
  };

  // enviando a encomenda
  const enviarEncomenda = async () => {
    try {
      setCarregando(true)

      const encomendaRepositorio = EncomendaFs()

      // carregando as informações do usuário que está logado
      const authServ = AuthService()
      const refUsuario = await authServ.getReferenciaUsuario(usuario.email)

      // objeto de encomenda que vai ser enviado
      const obj = {
        solicitante: refUsuario,
        categoria,
        referencias,
        descricao,
        altura,
        comprimento,
        imagemReferencia,
        pendente: true,
        dataEncomenda: new Date()
      }

      if (imagemReferencia) {
        obj.imagemReferencia = await UploadImagem(imagemReferencia);
      }

      await encomendaRepositorio.adicionarEncomenda(obj)

      // infos do cliente para montar a notificação
      let nomeCliente = await authServ.retornarInfosUsuarioViaId(refUsuario.id)

      // enviando a notificação pro usuário admin
      const objNotificacao = NotificacaoObj(
        `Você tem uma novo pedido de encomenda personalizada!`,
        `O cliente ${nomeCliente.nomeCompleto} mandou um pedido de encomenda personalizada da categoria "${categoria}"! Quer dar uma olhada? ✨\nAcesse aqui: `,
        `https://sala-magica.vercel.app/gerenciamento-encomendas`,
        'ENCOMENDA',
        null
      )

      const notificacaoRepository = NotificacoesFs()
      await notificacaoRepository.adicionarNotificacaoNovaEncomenda(objNotificacao)

      setCarregando(false)

      // mensagens pro modal de confirmação
      setTitulo('Enviada com sucesso!')
      setMensagem('Seu pedido de encomenda personalizada foi enviado com sucesso! Assim que possível mandaremos uma resposta, fique atento a sua caixa de notificações para posteriores contatos.')

      // console.log(obj)
    } catch (error) {
      setTitulo('Ops...')
      setMensagem('Ocorreu um erro interno! Não foi possível enviar o pedido de encomenda personalizada :(')
      setCarregando(false)
    }
  }

  useEffect(() => {
    if (usuario) {
      setLogado(true)
    }
  }, [usuario])

  return (
    <form className='py-4 container' onSubmit={(e) => {
      e.preventDefault()
      enviarEncomenda()
    }}>
      <div className="p-0 mb-3 area-txts d-flex justify-content-center align-items-center">
        <p className='p-form text-center fst-italic'>
          E que tal um enfeite exclusivo para sua sala de aula? Basta preencher o formulário abaixo com os detalhes do que deseja e entraremos em contato para alinhar os detalhes da sua encomenda.
        </p>
        <img src={imgIlustrativa} className='img-encomendar' alt="" />
      </div>

      <div style={{ display: (logado) ? 'none' : '' }} className="alert alert-warning" role="alert">
        Para enviar pedidos de encomendas personalizadas é necessário estar <b>logado</b> na Sala Mágica!
      </div>

      <div style={{ display: (categoria != '') ? '' : 'none' }} className="alert alert-warning" role="alert">
        Antes de enviar a encomenda, certifique-se de que o <b>telefone</b> registrado na sua conta é válido! Utilizaremos para entrar em contato.
      </div>

      <div className='area-infos d-flex gap-3 justify-content-between'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Categoria do pedido</label>
          <input onChange={(e) => setCategoria(e.target.value)} required={true} type="text" className="form-control input-cadastro-produto" placeholder='Ex: Enfeites de parede, material educativo, etc...' readOnly={!logado} />
        </div>

        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Referências</label>
          <input onChange={(e) => setReferencias(e.target.value)} type="text" min={0} className="form-control input-cadastro-produto" placeholder='Link de imagem ou descrição de um modelo que goste, informe aqui.' readOnly={!logado} />
        </div>

      </div>

      <div className='area-infos'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Descrição do pedido</label>
          <textarea onChange={(e) => setDescricao(e.target.value)} required={true} type="text" className="form-control input-cadastro-produto" rows={5} placeholder='Aqui você pode detalhar as características do enfeite que deseja encomendar, como cores, tamanho, tema, materiais preferidos, entre outros detalhes importantes.' readOnly={!logado} />
        </div>
      </div>

      <div className='area-infos d-flex gap-3 justify-content-between'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Tamanho em altura (cm)</label>
          <input onChange={(e) => setAltura(Number(e.target.value))} type="text" className="form-control input-cadastro-produto" readOnly={!logado} />
        </div>

        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Tamanho em comprimento (cm)</label>
          <input onChange={(e) => setComprimento(Number(e.target.value))} type="text" className="form-control input-cadastro-produto" readOnly={!logado} />
        </div>
      </div>

      <div className='area-infos d-flex gap-5 justify-content-between'>
        <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
          <img className='ms-2' src={imgCapa} alt="" />
          <label>Imagem de exemplo</label>
          <input type="file" className='' onChange={(e) => handleImagem(e)} disabled={!logado} />
        </div>

        <div>
          <button type='submit' className='p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center' data-bs-toggle="tooltip" data-bs-placement="top" disabled={(!logado || carregando)}>

            {
              (carregando) ?
                <div className="spinner-border spinner-border-sm mx-5" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                :
                <>
                  Enviar solicitação de encomenda
                  <i className="bi bi-send ms-2"></i>
                </>
            }

          </button>
        </div>

      </div>

      {mensagem && <Modal mensagem={mensagem} setMensagem={setMensagem} tituloModal={titulo} />}
    </form>
  )
}
