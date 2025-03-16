import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { database } from '../config'

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

  return {
    adicionarEncomenda
  }
}