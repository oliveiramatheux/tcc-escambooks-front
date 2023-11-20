#### Front-end para web site, plataforma Rede social para troca de livros

- 💬 Descrição e objetivo: Criar a interface da rede social.

#### 🚧 Status do Projeto 🚀 Parcialmente concluído, início dia 30/03/2023 🚧

# Tabela de conteúdos

<!--ts-->

- [Tabela de Conteudo](#Tabela-de-conteúdos)
- [Pré-Requisitos Front-End](#Pré-requisitos-Front_End)
- [Configurações](#🎲-Configurações) -> [Firebase](#Firebase); [.env](#.env)
- [Tecnologias](#🛠-Tecnologias)
- [Autor](#Autores)
  <!--te-->
  <br>

### Pré-Requisitos Front_End

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Nodejs](https://nodejs.org/en/).<br>
Ter um editor para trabalhar com o código é recomendado, como o [Visual Studio Code](https://code.visualstudio.com/).<br>
Importante também criar uma conta no google para o projeto a fim de utilizar o [Firebase](https://firebase.google.com/?hl=pt) e o email sender (nodemailer) no back-end.

### Pré-Requisitos Back_End

Para a aplicação como um todo funcionar completamente, verifique as configurações <br>
necessárias para o back-end <a href="https://github.com/oliveiramatheux/tcc-escambooks-api#readme">aqui</a> <br>
e certifique-se que o back-end está rodando através do endereço http://localhost:REACT_APP_SERVICE_URL/api/health-check, <br>
sendo que ao acessá-lo, deve exibir a mensagem "server is ok" na tela. Importante definir a porta na URL do service (Back-end): REACT_APP_SERVICE_URL<br> <br>


### 🎲 Configurações

É necessário setar algumas configurações para setar o projeto: <br>
Não esqueça de assim que clonar o projeto localmente, executar YARN no terminal para instalar as dependências.

#### Firebase

- Com uma conta do google criada, inicialize um projeto no [Firebase Console](https://console.firebase.google.com/?hl=pt) (Pode deixar a opção analytics ativada) <br>
- Entre nas configurações do projeto em geral e procure por "Seus aplicativos" <br>
- Na seção "Seus aplicativos" clice no ícone "</>" que indica um app web <br>
- Nomeie o app <br>
- Analize as informações do SDK e adicione-as no .env de acordo com o item nomeado (Somente REACT_APP_FIREBASE_CONFIG_DATABASE_URL
não consta no SDK mas pode ser visto abrindo a seção real time database)


#### .env

```bash
REACT_APP_APP_PORT=3000 #Porta do front-end
REACT_APP_FIREBASE_CONFIG_API_KEY=apiKey #Configurações do Firebase (Ver sessão)
REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN=authDomain
REACT_APP_FIREBASE_CONFIG_DATABASE_URL=URLRealTimeDatabase
REACT_APP_FIREBASE_CONFIG_PROJECT_ID=projectId
REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET=storageBucket
REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID=messagingSenderId
REACT_APP_FIREBASE_CONFIG_APP_ID=appId
REACT_APP_FIREBASE_CONFIG_MEASUREMENT_ID=measurementId
REACT_APP_SERVICE_URL=http://localhost:PORT/ #URL do servidor back-end
REACT_APP_SERVICE_SOCKET_URL=ws://localhost:SERVICE_PORT #URL do web socket para o socket IO(colocar porta do back-end)
```
Após setar as variáveis no .env, certificar que o back-end está configurado e rodando localmente <br>
e configurar o firebase, abra um terminal e digite o comando "yarn start" para rodar o front-end.

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto front-end:

- [Nodejs](https://nodejs.org/en/)
- [MaterialUI4](https://v4.mui.com/getting-started/installation/)
- [Axios](https://axios-http.com/ptbr/docs/intro)
- [Firebase](https://firebase.google.com/?hl=pt)
- [SocketIO](https://socket.io/)

## Autores

<div>
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/C4D03AQEN5MndpcR7Rg/profile-displayphoto-shrink_800_800/0/1613396220155?e=1706140800&v=beta&t=wD-6BuaUEHSPPBVLZbQcSuMQjX3tQdU2D5W94x_K0jY" width="100px;" alt=""/> <!-- Matheus  -->
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/C4D03AQE_XlWds1qORg/profile-displayphoto-shrink_800_800/0/1646512221130?e=1706140800&v=beta&t=SsnJRaf9MaFCpMUjBahLMSF02BmxBnDPkJU5q_NkCbE" width="100px;" alt=""/> <!-- Eric  -->
  <img style="border-radius: 50%;" src="https://media.licdn.com/dms/image/D4D03AQFSRHVNtz9Fjg/profile-displayphoto-shrink_800_800/0/1685025769328?e=1706140800&v=beta&t=fvz6PxqFlXbIEFdI50qQSzjn_CSAKtuku1rkjUyYIFs" width="100px;" alt=""/> <!-- João  -->
</div>
<a href="https://www.linkedin.com/in/oliveiramatheux/">
<sub><b>Matheus de Oliveira</b></sub></a>🚀
<a href="https://www.linkedin.com/in/eric-nielsen-frança-65273914a/">
<sub><b>Eric França</b></sub></a>🚀
<a href="https://www.linkedin.com/in/joao-guis/">
<sub><b>João Guilherme</b></sub></a>🚀

Feito por Matheus de Oliveira, Eric Nielsen e João Guilherme 👋🏽 Entre em contato!
