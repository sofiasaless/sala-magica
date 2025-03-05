import { addDoc, collection } from 'firebase/firestore';
import { database } from '../config'

export default function ProdutosFs () {

  const db = database;

  async function anunciarProduto(produto) {
    try {
      const docRef = await addDoc(collection(db, "produtos"), produto);
      console.log("documento criado com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  return {
    anunciarProduto
  }
}