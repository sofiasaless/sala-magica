import { addDoc, collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore';
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
      // console.log('id sendo passado: ', id)
      return result.data();
    } catch (error) {
      console.error("Erro ao recuperar o produto:", error);
    }
  }

  async function recuperarProdutoPorCategoriaHome(categoria) {
    try {
      let listaProdutos = []
      const produtoRef = collection(db, "produtos");
  
      // consulta por categoria
      const produtosQuery = query(
        produtoRef,
        where("categoria", "==", categoria),
        limit(7)
      );
  
      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        listaProdutos.push({
          id: doc.id,
          ...doc.data()
        })
      });

      return listaProdutos;
    } catch (error) {
      console.log('erro ao buscar produtos ', error);
    }
  }

  async function recuperarProdutoPorCategoria(categoria) {
    try {
      let listaProdutos = []
      const produtoRef = collection(db, "produtos");
  
      // consulta por categoria
      const produtosQuery = query(
        produtoRef,
        where("categoria", "==", categoria),
      );
  
      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        listaProdutos.push({
          id: doc.id,
          ...doc.data()
        })
      });

      return listaProdutos;
    } catch (error) {
      console.log('erro ao buscar produtos ', error);
    }
  }

  async function recuperarProdutosSugestao() {
    try {
      let listaProdutos = []
      const produtoRef = collection(db, "produtos");
  
      // consulta por categoria
      const produtosQuery = query(
        produtoRef,
        limit(5)
      );
  
      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        listaProdutos.push({
          id: doc.id,
          ...doc.data()
        })
      });

      return listaProdutos;
    } catch (error) {
      console.log('erro ao buscar produtos para sugestão', error);
    }
  }

  async function recuperarProdutoPorTitulo(tituloPrefix) {
    try {
      let produtosList = [];
      const prefixo = tituloPrefix[0].toUpperCase() + tituloPrefix.substring(1);
      const produtosRef = collection(db, "produtos");

      const produtosQuery = query(
        produtosRef,
        where("titulo", ">=", prefixo),
        where("titulo", "<=", prefixo + "\uf8ff")
      );

      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        produtosList.push({ 
          id: doc.id,
          ...doc.data()
        })
      });

      return produtosList;
    } catch (error) {
      console.log('erro ao buscar produtos ', error);
    }
  }

  return {
    anunciarProduto,
    recuperarProdutos,
    recuperarProdutoPorId,
    recuperarProdutoPorCategoriaHome,
    recuperarProdutosSugestao,
    recuperarProdutoPorCategoria,
    recuperarProdutoPorTitulo
  }
}