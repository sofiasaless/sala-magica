import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth, database } from '../config'
import { addDoc, collection } from "firebase/firestore";

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

  // verificando se há usuário logado no site
  async function verificaEstadoLogin() {
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user); // Usuário está logado
      } else {
        setUsuario(null); // Usuário não está logado
      }
    });

  }

  return {
    cadastrarNovoUsuário,
    entrarComUsuario,
    desconectarUsuario
  }

}