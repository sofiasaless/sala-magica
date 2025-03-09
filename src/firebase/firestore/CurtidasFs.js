import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, query, setDoc, where } from 'firebase/firestore';
import { database } from '../config'

export default function CurtidasFs() {

  const db = database;

  // registrando uma curtida no produto por um usuario
  async function registrarCurtida(usuarioEmail, produtoId) {
    try {
      // referencia pro produto
      const produtoRef = doc(db, "produtos", produtoId);

      // referencia pro usuario
      const usuarioRef = await getReferenciaUsuario(usuarioEmail);

      // agora a referencia pra criar a curtida
      const curtidaRef = doc(collection(db, "curtidas"));

      // salvando no firestore finalmente
      await setDoc(curtidaRef, {
        id_usuario: usuarioRef,
        id_produto: produtoRef,
        data_curtida: new Date()
      });

      console.log("curtida registrada com sucesso!");
    } catch (e) {
      console.error("Erro ao registrar curtida:", e);
    }
  }

  // descurtindo o produto
  async function apagarCurtida(usuarioEmail, produtoId) {
    try {
      // referencia pro usuario
      const usuarioRef = await getReferenciaUsuario(usuarioEmail);

      const curtidasRef = collection(db, "curtidas");
      const curtidaQuery = query(
        curtidasRef,
        where("id_usuario", "==", usuarioRef),
        where("id_produto", "==", doc(db, "produtos", produtoId))
      );
      const curtidaSnapshot = await getDocs(curtidaQuery);

      // deletando a curtida encontrada
      const curtidaId = curtidaSnapshot.docs[0].id;
      await deleteDoc(doc(db, "curtidas", curtidaId));

      console.log("curtida removida com sucesso!");
    } catch (e) {
      console.error("erro ao apagar a curtida:", e);
    }
  }

  // verificando se um determinado produto tem a curtida de um determinado usuario
  async function temCurtidaNoProduto(usuarioEmail, produtoId) {

    try {
      const usuarioRef = await getReferenciaUsuario(usuarioEmail)
      const produtoRef = doc(db, "produtos", produtoId);

      // refencia pra buscar nas curtidas
      const curtidasColecaoRef = collection(db, "curtidas")

      const q = query(
        curtidasColecaoRef,
        where("id_usuario", "==", usuarioRef),
        where("id_produto", "==", produtoRef)
      )

      const querySnapshot = await getDocs(q)

      return !(querySnapshot.empty)

    } catch (error) {
      console.log('erro ao procurar curtida do usuario no produto passado: ', error)
    }

  }

  // ... puxando os produtos curtidos pelo o usuario passado
  async function recuperarCurtidasUsuario(usuarioEmail) {
    try {
      const usuarioRef = await getReferenciaUsuario(usuarioEmail)

      const curtidasColecaoRef = collection(db, "curtidas");
      const curtidasQ = query(
        curtidasColecaoRef, 
        where("id_usuario", "==", usuarioRef)
      );
      const curtidasSnapshot = await getDocs(curtidasQ);

      if (curtidasSnapshot.empty) {
        console.log("Usuário não curtiu nenhum produto.");
        return [];
      }

      // buscando os produtos das curtidas do usuario
      const produtosCurtidos = await Promise.all(
        curtidasSnapshot.docs.map(async (curtidaDoc) => {
          const produtoRef = curtidaDoc.data().id_produto; // pega o id de referencia do produto
          // com a referência 
          const produtoSnap = await getDoc(produtoRef); 
          return produtoSnap.exists() ? { id: produtoSnap.id, ...produtoSnap.data() } : null;
        })
      );

      return produtosCurtidos.filter((produto) => produto !== null);

    } catch (error) {
      console.log('erro ao buscar produtos favoritos ', error)
      return []
    }
  }

  // funções auxiliares
  async function getReferenciaUsuario(email) {
    try {
      const usuariosRef = collection(db, "usuarios");
      const q = query(usuariosRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.error("Usuário não encontrado!");
        return;
      }
      const usuarioRef = doc(db, "usuarios", querySnapshot.docs[0].id);
      return usuarioRef
    } catch (error) {
      console.log('usuario nao encontrado ', error)
    }
  }

  return {
    registrarCurtida,
    apagarCurtida,
    temCurtidaNoProduto,
    recuperarCurtidasUsuario
  }
}