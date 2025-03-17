import { useState } from 'react'
import './style.css'

export default function NavSwitch ( {opcaoUm, opcaoDois, acaoUm, acaoDois} ) {

  // states
  const [selecionado, setSelecionado] = useState(true)

  return (
    <div className="py-4 d-flex gap-4 justify-content-center align-items-center">
      <span style={{color: (selecionado)?'var(--cinzaUm)':'var(--cinzaDois)'}} className="text-center not-opcao" onClick={() => {
        acaoUm(true)
        setSelecionado(true)
      }}>
        {opcaoUm}
      </span>
      <div style={{height: '2rem', background: 'var(--cinzaUm)', width: '3px'}} className="rounded-3"></div>
      <span style={{color: (!selecionado)?'var(--cinzaUm)':'var(--cinzaDois)'}} className="text-center not-opcao" onClick={() => {
        acaoDois(false)
        setSelecionado(false)
      }}>
        {opcaoDois}
      </span>
    </div>
  )
}