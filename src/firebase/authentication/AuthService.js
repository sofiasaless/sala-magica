import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, database } from '../config'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";

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

  async function atualizarPerfilUsuario(email, nomeCompleto, telefone) {
    try {
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

  return {
    cadastrarNovoUsuário,
    entrarComUsuario,
    desconectarUsuario,
    verificarPermissoes,
    retornarInfosUsuario,
    atualizarPerfilUsuario
  }

}