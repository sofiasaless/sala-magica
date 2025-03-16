import { createUserWithEmailAndPassword, deleteUser, EmailAuthProvider, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, database } from '../config'
import { addDoc, collection, deleteDoc, doc, getDocs, query, runTransaction, updateDoc, where } from "firebase/firestore";

export default function AuthService() {

  const db = database

  // cadastrando usuário no firebase
  async function cadastrarNovoUsuário(usuario) {

    return createUserWithEmailAndPassword(auth, usuario.email, usuario.senha)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        // console.log('cadastro feito com sucesso ', user)

        // salvando o usuario no firestore com roles e outras informações
        const objUsuario = {
          id: user.uid,
          nomeCompleto: usuario.nomeCompleto,
          email: user.email,
          telefone: usuario.telefone,
          role: 'USER',
          dataCadastro: new Date()
        }

        // console.log(objUsuario)
        const docRef = await addDoc(collection(db, "usuarios"), objUsuario);
        console.log("documento criado com o id: ", docRef.id);

        return {
          status: true,
          mensagem: 'Cadastro efetuado com sucesso! Agora faça login para prosseguir.'
        }
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // console.log('erros encontrados')
        // console.log(errorCode)
        // console.log(errorMessage)

        return {
          status: false,
          mensagem: 'Ocorreu um erro ao tentar fazer cadastro!',
          erro: errorCode
        }

      });
  }

  // entrando com usuario no firebase
  async function entrarComUsuario(usuario) {

    return signInWithEmailAndPassword(auth, usuario.email, usuario.senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log('logado com sucesso')
        // console.log(user)

        return {
          status: true,
          mensagem: 'Usuário logado com sucesso!'
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('erro ao tentar fazer login')
        console.log(errorCode)
        console.log(errorMessage)

        return {
          status: false,
          mensagem: 'Ocorreu um erro ao tentar fazr login!',
          erro: errorCode
        }
      })

  }

  // logout do usuario
  async function desconectarUsuario() {
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('logout efetuado com sucesso')
    }).catch((error) => {
      console.log('erro ao tentar fazer logout')
      console.log(error.code)
      console.log(error.message)
      // An error happened.
    });
  }

  async function verificarPermissoes(email) {
    try {
      const usuarioRef = collection(db, "usuarios");

      const produtosQuery = query(
        usuarioRef,
        where("email", "==", email),
      );

      let usuario

      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        usuario = { id: doc.id, ...doc.data() }
      })

      if (usuario.role === 'USER') {
        return false
      } else {
        return true
      }
    } catch (error) {
      console.log('erro ao buscar usuario ', error);
    }

  }

  async function atualizarPerfilUsuario(email, nomeCompleto, telefone) {
    try {
      // atualizar esse metodo para chamar a função auxiliar
      const usuarioRef = collection(db, "usuarios");

      const produtosQuery = query(
        usuarioRef,
        where("email", "==", email),
      );

      let usuarioId

      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        usuarioId = doc.id
      })

      const usuarioAtualizarRef = doc(db, "usuarios", usuarioId);
      await updateDoc(usuarioAtualizarRef,
        {
          nomeCompleto: nomeCompleto,
          telefone: telefone
        }
      );

    } catch (error) {
      console.log('erro ao atualizar usuario ', error);
    }

  }

  async function retornarInfosUsuario(email) {
    try {
      const usuarioRef = collection(db, "usuarios");

      const produtosQuery = query(
        usuarioRef,
        where("email", "==", email),
      );

      let usuario

      const querySnapshot = await getDocs(produtosQuery);
      querySnapshot.forEach((doc) => {
        usuario = { id: doc.id, ...doc.data() }
      })

      return usuario;
    } catch (error) {
      console.log('erro ao buscar usuario ', error);
    }

  }

  // para exclusão é necessária reautenticação
  async function reautenticarUsuario(email, senha) {
    try {
      const user = auth.currentUser;
      const credenciais = EmailAuthProvider.credential(email, senha);
      await reauthenticateWithCredential(user, credenciais);
      console.log("Usuário reautenticado com sucesso!");
    } catch (error) {
      console.error("Erro ao reautenticar usuário:", error);
      throw error;
    }
  }

  async function deletarUsuario(usuario, email, senha) {
    try {
      // necessario fazer reatenticação
      await reautenticarUsuario(email, senha)

      const usuarioRef = await getReferenciaUsuario(email)

      // necessario recuperar as curtidas do usuario para exclui-las do firestore
      const curtidasRef = collection(db, "curtidas");
      const curtidasQuery = query(curtidasRef, where("id_usuario", "==", usuarioRef));
      const curtidasSnapshot = await getDocs(curtidasQuery);

      // as exclusões vão acontecer em transação para caso a exclusão no authentication de errado
      await runTransaction(db, async (transaction) => {

        curtidasSnapshot.docs.forEach((curtidaDoc) => {
          transaction.delete(doc(db, "curtidas", curtidaDoc.id));
        });

        // antes de excluir do firestore, necessario excluir do authentication
        console.log("Usuário removido do Authentication com sucesso!");
        await deleteUser(usuario);

        console.log("Usuário e curtidas removidos do Firestore com sucesso!");
        transaction.delete(usuarioRef);
      });

    } catch (error) {
      console.error("Erro ao tentar apagar usuário:", error);
    }
  }

  async function recuperarUsuarios() {
    try {
      const querySnapshot = await getDocs(collection(db, "usuarios"));
      let listaUsuarios = []
      querySnapshot.forEach((doc) => {
        listaUsuarios.push({
          id: doc.id,
          ...doc.data()
        })
      });
      return listaUsuarios;
    } catch (error) {
      console.log('erro ao recuperar produtos: ', error)
    }

  }

  // função auxiliar buscar usuarios
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
    cadastrarNovoUsuário,
    entrarComUsuario,
    desconectarUsuario,
    verificarPermissoes,
    retornarInfosUsuario,
    atualizarPerfilUsuario,
    deletarUsuario,
    recuperarUsuarios,
    getReferenciaUsuario
  }

}