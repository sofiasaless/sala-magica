import { createUserWithEmailAndPassword } from "firebase/auth";

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
          role: 'USER' 
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
  async function entrarComUsuario(email, senha) {

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      })

  }

  // logout do usuario
  async function desconectarUsuario() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  return {
    cadastrarNovoUsuário,
    entrarComUsuario,
    desconectarUsuario
  }

}