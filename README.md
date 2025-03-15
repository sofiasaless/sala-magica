# Sala Mágica

A Sala Mágica é um projeto que desenvolvi com o objetivo de exercitar e consolidar meus conhecimentos em **React.js** e **Firebase**, sendo uma releitura completa do meu projeto [Landing Page](https://github.com/sofiasaless/landingPage).

A plataforma funciona como uma loja online para anunciar e expor produtos de decoração destinados a salas de aula infantis e maternais, produzidos por uma única pessoa. Entre seus recursos, há a possibilidade de compartilhamento de produtos, navegação por categorias, pesquisa por título, sistema de cadastro e login de usuários, além da opção de curtir produtos ao estar logado.

## Recursos Principais

- **Catálogo de Produtos** – Exibição organizada e intuitiva de enfeites e decorações.
- **Sistema de Cadastro/Login** – Permite que usuários se registrem e façam login na Sala Mágica.
- **Sistema de Curtidas** – Usuários autenticados podem curtir produtos, com dados armazenados no *Cloud Firestore*.
- **Lista de Desejos** – Produtos curtidos são adicionados automaticamente a uma lista personalizada.
- **Interface Responsiva** – Layout otimizado para diferentes dispositivos.

## Tecnologias

A Sala Mágica é um projeto **front-end** com **back-end integrado diretamente via Firebase**. Algumas das práticas implementadas incluem **rotas protegidas**, **autenticação e autorização**, **upload de imagens na nuvem** e **design responsivo**.

- **Front-end**: React.js + Vite, Bootstrap, HTML, CSS
- **Back-end**: JavaScript, Node.js, Firebase
  - **Banco de Dados**: Cloud Firestore
  - **Autenticação**: Firebase Authentication

## Demonstração

A Sala Mágica conta com dois tipos de usuários, diferenciados por **roles** (*papéis de usuário*):

- **USER** → Usuários comuns, possíveis clientes e visitantes da plataforma. Essas contas podem ser registradas diretamente na área de cadastro do site.
- **ADMIN** → Responsável pela administração dos produtos, podendo **adicionar, editar e excluir** itens do catálogo. As contas *ADMIN* são criadas manualmente no **Cloud Firestore** e no **Firebase Authentication**.

Essa estrutura foi adotada para facilitar a manutenção do catálogo pela pessoa que solicitou a Sala Mágica.

### Aqui estão algumas capturas de tela das funcionalidades disponíveis para o usuário *ADMIN*:

#### Página de perfil ADMIN
![Página usuário ADMIN](/public/assets/paginaADMIN.png)

#### Página para anunciar novos produtos
![Página anunciar produtos](/public/assets/anunciaProduto.png)

#### Páginas para edição e exclusão de produtos
![Página editar e excluir produtos](/public/assets/editarProduto.png)
![Página editar e excluir produtos](/public/assets/editarProduto2.png)

#### Página para listagem de usuários do sistema
![Página listar usuários](/public/assets/listaUsu.png)

#### Acesso negado para usuários *USER* que tentarem acessar rotas ADMIN
![Página acesso negado](/public/assets/acessoNegado.png)

Quer explorar todas as funcionalidades da Sala Mágica?
Acesse o site aqui: [Sala Mágica](https://sala-magica.vercel.app/)

## Licença

Este projeto está licenciado sob a licença [MIT](https://choosealicense.com/licenses/mit/).