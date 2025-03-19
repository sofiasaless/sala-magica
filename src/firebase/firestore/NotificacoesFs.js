import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { database } from '../config'
import AuthService from '../authentication/AuthService'

export default function NotificacoesFs() {

  const db = database;

  async function adicionarNotificacaoPadrao(notificacao) {
    try {
      // necessário pegar todos os usuários para enviar notificação
      const usuariosResult = await getDocs(collection(db, "usuarios"))

      // enviando a notificação pra todos os usuários
      Promise.all(
        usuariosResult.docs.map(async (doc) => {
          notificacao.usuario_notificado = doc.ref
          await addDoc(collection(db, "notificacoes"), notificacao);
        })
      )

      // console.log("notificações criadas com sucesso");
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  async function adicionarNotificacaoResposta(notificacao, idSolicitante) {
    try {

      // necessário pegar todos os usuários para enviar notificação
      const usuarioRef = doc(db, "usuarios", idSolicitante)

      notificacao.usuario_notificado = usuarioRef

      const docRef = await addDoc(collection(db, "notificacoes"), notificacao);
      // console.log("notificacao criada com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  async function adicionarNotificacaoIndividual(notificacao) {
    try {
      const docRef = await addDoc(collection(db, "notificacoes"), notificacao);
      // console.log("notificacao individual criada com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  async function adicionarNotificacaoNovaEncomenda(notificacao) {
    try {
      // necessário pegar as referências dos usuários admin
      const usuariosRef = collection(db, "usuarios");
      const usuarioQuery = query(
        usuariosRef,
        where("role", "==", 'ADMIN')
      );
      const usuarioSnapshot = await getDocs(usuarioQuery);

      // atribuindo os notificados ao objeto de notificação
      Promise.all(
        usuarioSnapshot.docs.map(async (doc) => {
          notificacao.usuario_notificado = doc.ref
          await addDoc(collection(db, "notificacoes"), notificacao);
        })
      )

      // console.log('notificações criadas com sucesso!')
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  // essa função deve retornar um booleano para contagem de notificações não lidas > 0 de um usuário
  async function verificarExistenciaNotificacao(usuario_email) {
    try {
      const authServ = AuthService()
      const usuarioRef = await authServ.getReferenciaUsuario(usuario_email)

      // verificando se há notificações 
      const notificacoesRef = collection(db, "notificacoes");
      const notificacaoQuery = query(
        notificacoesRef,
        where("usuario_notificado", "==", usuarioRef),
        where("lido", "==", false)
      );
      const notificacaoSnapshot = await getDocs(notificacaoQuery);

      return {
        temNotificacao: (notificacaoSnapshot.docs.length > 0),
        usuarioReferencia: usuarioRef
      }
    } catch (error) {
      console.log('ocorreu um erro ao verificar a existência de notificações pendentes ', error)
    }
  }

  async function recuperandoNotificacoes(usuarioId, notLida) {
    try {
      const usuarioRef = doc(db, "usuarios", usuarioId)

      // verificando se há notificações 
      const notificacoesRef = collection(db, "notificacoes");
      const notificacaoQuery = query(
        notificacoesRef,
        where("usuario_notificado", "==", usuarioRef),
        where("lido", "==", notLida)
      );
      const notificacaoSnapshot = await getDocs(notificacaoQuery);

      // listando as notificações e retornando
      let listaNotificacoes = []
      notificacaoSnapshot.docs.map((doc) => {
        listaNotificacoes.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return listaNotificacoes
    } catch (error) {
      console.log('erro ao recuperar as notificações do usuario ', error)
    }
  }

  async function marcarNotificacaoComoLida(notificacaoId) {
    try {
      const notificacaoRef = doc(db, "notificacoes", notificacaoId)
      await updateDoc(notificacaoRef,
        {
          lido: true
        }
      );
      // console.log('notificação marcada como lida')
    } catch (error) {
      console.log('ocorreu um erro ao marcar a notificação como lida ', error)
    }
  }

  return {
    adicionarNotificacaoPadrao,
    adicionarNotificacaoIndividual,
    adicionarNotificacaoResposta,
    adicionarNotificacaoNovaEncomenda,
    verificarExistenciaNotificacao,
    recuperandoNotificacoes,
    marcarNotificacaoComoLida
  }
}