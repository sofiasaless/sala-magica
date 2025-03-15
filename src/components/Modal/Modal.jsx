import './style.css'

import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

export default function Modal({ mensagem, setMensagem, tituloModal }) {
  return (
    <div className="modal fade show" style={{ display: mensagem ? "block" : "none" }} tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content shadow-lg" style={{backgroundColor: 'var(--verdeDois)'}}>
          <div className="modal-header">
            <h5 style={{color: 'white'}} className="modal-title">{tituloModal}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={() => setMensagem("")}></button>
          </div>
          <div className="modal-body">
            <p className="p-modal">{mensagem}</p>
          </div>
        </div>
      </div>
    </div>
  );
}