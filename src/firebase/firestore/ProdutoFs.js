import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, updateDoc, where } from 'firebase/firestore';
import { database } from '../config'

export default function ProdutosFs() {

  const db = database;

  async function anunciarProduto(produto) {
    try {
      const docRef = await addDoc(collection(db, "produtos"), produto);
      console.log("documento criado com o id: ", docRef.id);
      return docRef.id
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

  async function atualizarProdutoPorId(id, produtoObj) {
    try {
      const produtoRef = doc(db, "produtos", id)

      await updateDoc(produtoRef,
        {
          titulo: produtoObj.titulo,
          preco: produtoObj.preco,
          descricao: produtoObj.descricao,
          altura: produtoObj.altura,
          comprimento: produtoObj.comprimento,
          modelagem: produtoObj.modelagem,
          categoria: produtoObj.categoria,
          imagemCapa: produtoObj.imagemCapa,
          imagens: produtoObj.imagens,
        }
      );
    } catch (error) {
      console.log('ocorreu um erro ao tentar atualizar o produto ', error)
    }
  }

  async function apagarProduto(id) {
    try {
      // referencia pro produto
      const produtoRef = doc(db, "produtos", id)

      // necessário apagar as curtidas relacionadas ao produto que vai ser excluido
      const curtidasRef = collection(db, "curtidas");
      const curtidaQuery = query(
        curtidasRef,
        where("id_produto", "==", produtoRef)
      );
      const curtidaSnapshot = await getDocs(curtidaQuery);

      // deletando as curtidas encontradas
      curtidaSnapshot.forEach(async (d) => {
        await deleteDoc(doc(db, "curtidas", d.id));
      })

      await deleteDoc(produtoRef)

      console.log('produto e suas curtidas apagadas com sucesso')

    } catch (e) {
      console.error("erro ao apagar a curtida:", e);
    }
  }

  return {
    anunciarProduto,
    recuperarProdutos,
    recuperarProdutoPorId,
    recuperarProdutoPorCategoriaHome,
    recuperarProdutosSugestao,
    recuperarProdutoPorCategoria,
    recuperarProdutoPorTitulo,
    atualizarProdutoPorId,
    apagarProduto
  }
}