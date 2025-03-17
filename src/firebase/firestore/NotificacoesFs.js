import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { database } from '../config'
import AuthService from '../authentication/AuthService'

export default function NotificacoesFs() {

  const db = database;

  async function adicionarNotificacaoPadrao(notificacao) {
    try {

      // necessário pegar todos os usuários para enviar notificação
      const usuariosResult = await getDocs(collection(db, "usuarios"))
      let usuariosRefs = []
      usuariosResult.docs.map((doc) => {
        usuariosRefs.push(doc.ref)
      })

      notificacao.notificados = usuariosRefs

      const docRef = await addDoc(collection(db, "notificacoes"), notificacao);
      console.log("notificacao criada com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  return {
    adicionarNotificacaoPadrao,
  }
}