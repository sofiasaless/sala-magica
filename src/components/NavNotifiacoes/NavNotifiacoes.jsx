import './style.css'

export default function NavNotificacoes () {
  return (
    <div className="py-4 d-flex gap-4 justify-content-center align-items-center">
      <span style={{color: 'var(--cinzaUm)'}} className="not-opcao">Não lidas</span>
      <div style={{height: '2rem', background: 'var(--cinzaUm)', width: '3px'}} className="rounded-3"></div>
      <span style={{color: 'var(--cinzaDois)'}} className="not-opcao">Lidas</span>
    </div>
  )
}