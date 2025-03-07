import './style.css';

export default function Modal({ id, titulo, mensagem, txtBtnUm, txtBtnDois, acao }) {

  return (
    <div className="modal fade" id={id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{titulo}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {mensagem}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">{txtBtnUm}</button>
            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={acao}>{txtBtnDois}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
