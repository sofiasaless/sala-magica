import './style.css'

// assets
import imgIlustrativa from '../../assets/material/delivery.png'
import imgCapa from '../../assets/material/add-image.png'

export default function FormEncomenda() {
  return (
    <div className='py-4 container'>
      <div className="p-0 mb-3 area-txts d-flex justify-content-center align-items-center">
        <p className='p-form text-center fst-italic'>
          E que tal um enfeite exclusivo para sua sala de aula? Basta preencher o formulário abaixo com os detalhes do que deseja e entraremos em contato para alinhar os detalhes da sua encomenda.
        </p>
        <img src={imgIlustrativa} className='img-encomendar' alt="" />
      </div>

      <div class="alert alert-warning" role="alert">
        Certifique-se de que o <b>telefone</b> registrado na sua conta é válido! Utilizaremos para entrar em contato. 
      </div>

      <div className='area-infos d-flex gap-3 justify-content-between'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Categoria do pedido</label>
          <input required={true} type="text" className="form-control input-cadastro-produto" placeholder='Ex: Enfeites de parede, material educativo, etc...' />
        </div>

        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Referências</label>
          <input type="text" min={0} className="form-control input-cadastro-produto" placeholder='Link de imagem ou descrição de um modelo que goste, informe aqui.' />
        </div>

      </div>

      <div className='area-infos'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Descrição do pedido</label>
          <textarea required={true} type="text" className="form-control input-cadastro-produto" rows={5} placeholder='Aqui você pode detalhar as características do enfeite que deseja encomendar, como cores, tamanho, tema, materiais preferidos, entre outros detalhes importantes.' />
        </div>
      </div>

      <div className='area-infos d-flex gap-3 justify-content-between'>
        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Tamanho em altura (cm)</label>
          <input type="text" className="form-control input-cadastro-produto" />
        </div>

        <div className="p-0 mb-3 area-input">
          <label className="form-label ms-1">Tamanho em comprimento (cm)</label>
          <input type="text" className="form-control input-cadastro-produto" />
        </div>
      </div>

      <div className='area-infos d-flex gap-5 justify-content-between'>
        <div className='area-infos d-flex gap-3 justify-content-start input-cadastro-produto align-items-center p-2 rounded-2 mb-2'>
          <img className='ms-2' src={imgCapa} alt="" />
          <label>Imagem de exemplo</label>
          <input type="file" className='' />
        </div>

        <div>
          <button className='p-3 px-4 rounded-4 btn-opc btn-azul d-flex align-items-center'>
            Enviar solicitação de encomenda
            <i class="bi bi-send ms-2"></i>
          </button>
        </div>

      </div>

    </div>
  )
}
