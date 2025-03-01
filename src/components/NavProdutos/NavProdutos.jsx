import './style.css'

// assets
import search from '../../assets/material/search.png'

export default function NavProdutos() {
  return (
    <>
      <div className="d-flex justify-content-between gap-3 mt-4">

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
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>

      </div>
    </>
  );
}