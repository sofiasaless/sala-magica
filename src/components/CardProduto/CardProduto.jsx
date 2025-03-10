import './style.css'

// importação de imagem
import template from '../../assets/cards/calendario.png'
import favoritar from '../../assets/material/heart_pink_contorno.png'
import desfavoritar from '../../assets/material/heart_pink_preenchido.png'

// imports
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CurtidasFs from '../../firebase/firestore/CurtidasFs';
import useAuth from '../../firebase/authentication/useAuth'

export default function CardProduto( {id, titulo, preco, imagemCapa} ) {

  const curtidaRepositorio = CurtidasFs()

  const usuario = useAuth();

  const navegador = useNavigate()

  // states
  const [curtido, setCurtido] = useState(false)

  // verificar se há curtida no produto
  const verificarCurtida = async () => {
    if (usuario) {
      await curtidaRepositorio.temCurtidaNoProduto(usuario.email, id).then((resultado) => {
        // console.log('tem curtida? ', resultado)
        setCurtido(resultado)
      })
      return
    }
  }

  // ações de curtidas no produto
  const manipularCurtida = async () => {
    if (usuario) {
      if (curtido) {
        // se o produto ja estiver curtido e o usuario escolher descurtir ....
        await curtidaRepositorio.apagarCurtida(usuario.email, id);
        setCurtido(false)
      } else {
        // curtindo o produto
        await curtidaRepositorio.registrarCurtida(usuario.email, id);
        setCurtido(true)
      }
      return
    }

    alert('Faça login para curtir o produto!')
  }

  useEffect(() => {
    console.log('executando useeffect')
    verificarCurtida();
  }, [usuario])

  return (
    <>
      <div className="card rounded-4 shadow-sm">
        <img onClick={() => navegador(`/produto/${id}`)} id='card-photo' src={imagemCapa} className="card-img-top rounded-4" alt="..."/>
          <div className="card-body d-flex">
            <Link to={`/produto/${id}`} className='card-textos nav-link'>
              <h5 className="card-title">{titulo}</h5>
              <span className="card-text card-preco">R${Number(preco).toFixed(2)}</span>
            </Link>
            <div className='d-flex justify-content-end align-items-end' onClick={manipularCurtida}>
              <img style={{cursor: 'pointer'}} src={(curtido)?desfavoritar:favoritar} alt="" />
            </div>
          </div>
      </div>
    </>
  );
}