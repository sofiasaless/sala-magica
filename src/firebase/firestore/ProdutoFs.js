import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { database } from '../config'

export default function ProdutosFs() {

  const db = database;

  async function anunciarProduto(produto) {
    try {
      const docRef = await addDoc(collection(db, "produtos"), produto);
      console.log("documento criado com o id: ", docRef.id);
    } catch (e) {
      console.error("erro adicionando o documento: ", e);
    }
  }

  async function recuperarProdutos() {
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      let listaProdutos = []
      querySnapshot.forEach((doc) => {
        listaProdutos.push({
          id: doc.id,
          ...doc.data()
        })
      });
      // console.log(listaProdutos)
      return listaProdutos;
    } catch (error) {
      console.log('erro ao recuperar produtos: ', error)
    }
  }

  async function recuperarProdutoPorId(id) {
    try {
      const result = await getDoc(doc(db, 'produtos', id))
      console.log('id sendo passado: ', id)
      return result.data();
    } catch (error) {
      console.error("Erro ao recuperar o produto:", error);
    }
  }

  return {
    anunciarProduto,
    recuperarProdutos,
    recuperarProdutoPorId
  }
}