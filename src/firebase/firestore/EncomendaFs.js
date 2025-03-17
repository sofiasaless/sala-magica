import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { database } from '../config'
import AuthService from '../authentication/AuthService'

export default function EncomendaFs() {

  const db = database;

  async function adicionarEncomenda(encomenda) {
    try {
      const docRef = await addDoc(collection(db, "encomendas"), encomenda);
      console.log("encomenda criado com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  async function reuperarEncomendasPorUsuario(email, status) {
    try {
      // referencia pro usuario
      const usuarioRepositorio = AuthService()
      const usuarioRef = await usuarioRepositorio.getReferenciaUsuario(email);

      // procurando pela encomenda
      const encomendaRef = collection(db, "encomendas");
      const encomendaQuery = query(
        encomendaRef,
        where("solicitante", "==", usuarioRef),
        where("pendente", "==", status)
      );

      const encomendaSnapshot = await getDocs(encomendaQuery)
      
      let listaEncomendas = []

      encomendaSnapshot.forEach((doc) => {
        listaEncomendas.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return listaEncomendas
    } catch (error) {
      console.log('ocorreu um erro ao retornar as encomendas do usuario ', error)
    }
  }

  async function recuperarEncomendasPorPendencia(status) {
    try {
      const encomendaRef = collection(db, "encomendas");
      const encomendaQuery = query(
        encomendaRef,
        where("pendente", "==", status)
      );

      const encomendaSnapshot = await getDocs(encomendaQuery)
      
      let listaEncomendas = []

      encomendaSnapshot.forEach((doc) => {
        listaEncomendas.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return listaEncomendas
    } catch (error) {
      console.log('ocorreu um erro ao retornar as encomendas pendentes')
    }
  }

  return {
    adicionarEncomenda,
    reuperarEncomendasPorUsuario,
    recuperarEncomendasPorPendencia
  }
}