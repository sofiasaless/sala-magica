import './style.css'

// assets
import search from '../../assets/material/search.png'

export default function NavProdutos( {emPesquisar, emFiltrar} ) {

  const filtrando = (categoria) => {
    categoria.preventDefault();

    emFiltrar(categoria.target.value);
  }

  return (
    <>
      <div className="area-nav d-flex justify-content-between gap-3 mt-4">

        <div className='area-pesquisa rounded-5 ps-3 d-flex align-items-center'>
          <input className='input-pesquisa' placeholder='Pesquisar...'/>
          <div style={{cursor: 'pointer'}} className='pe-3'>
            <img src={search} alt="" />
          </div>
        </div>

        <div className="dropdown">
          <button className="filtro-drop rounded-5 px-4 py-2 btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            Filtrar categoria
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li><option onClick={(e) => filtrando(e)} value={"Todos produtos"} className="dropdown-item" href="#">Todos produtos</option></li>
            <li><option onClick={(e) => filtrando(e)} value={"Enfeites de parede"} className="dropdown-item" href="#">Enfeites de parede</option></li>
            <li><option onClick={(e) => filtrando(e)} value={"Materiais educativos"} className="dropdown-item" href="#">Materiais educativos</option></li>
            <li><option onClick={(e) => filtrando(e)} value={"Decoração individual"} className="dropdown-item" href="#">Decoração individual</option></li>
            <li><option onClick={(e) => filtrando(e)} value={"Atividade pedagógica"} className="dropdown-item" href="#">Atividade pedagógica</option></li>
          </ul>
        </div>

      </div>
    </>
  );
}