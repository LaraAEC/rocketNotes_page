import { createContext, useContext, useState, useEffect } from 'react'; //importando o que é necessário para criar e usar contexto

import { api } from '../services/api'; //importando minha api backend

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [data, setData] = useState({}); //criando um estado chamado de dados, de data, como um objeto vazio inicialmente

  async function signIn({ email, password }) { //função de verificação de autenticação dos dados email e password

    try {
      const response = await api.post("/sessions", { email, password }); //enviando os dados para o BD e guardando sua resposta nesta constante
      const { user, token } = response.data; //desestruturando user e token atualizados de dentro dos dados da resposta
      
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); // definindo um novo conteúdo dentro do meu local storage, passando o nome da chave e seu valor, e já transforamndo com o stringfy o user de objeto para texto para poder ser lido e guardado no LocalStorage do navegador
      localStorage.setItem("@rocketnotes:token", token);// definindo um novo conteúdo dentro do meu local storage, passando o nome da chave e seu valor. Como o token já é texto  não preciso fazer nenhum parse.

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;//inserindo um token do tipo Bearer, de autorização, no cabeçalho, por padrão de todas as requisições que o usuário fizer a partir de agora.

      setData({ user, token }); //configurando, atualizando, alterando meu estado data para os valores de user e token acima desestruturados

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else{
          alert("Não foi possível entrar.");
      }
    }  
  }

  function signOut() { //função de fazer logout da page Home, da minha Aplicação
    localStorage.removeItem("@rocketnotes:token"); //removendo do Local storage o token
    localStorage.removeItem("@rocketnotes:user"); //removendo do Local storage o usuário

    setData({});
  }

  async function updateProfile({ user, avatarFile }) { //função que atualiza os dados do usuário e seu avatar
    try {

      if(avatarFile) { //se existir um arquivo de foto selecionado fazer...seu envio para o backend
        const fileUploadForm = new FormData(); //criando um form data para enviar arquivo para o backend, precisa ser enviado assim.
        fileUploadForm.append("avatar", avatarFile); //inserindo nesse Formulário um campo avatar com o valor do avatarFile(arquivo da foto).
        
        const response = await api.patch("/users/avatar", fileUploadForm);
        user.avatar = response.data.avatar; //atualizando meu avatar colocando ele para receber a resposta do backend
      }

      await api.put("/users", user); //atualizando nessa rota esses dados do usuário recebidos por essa função, atualizando meu BD
      localStorage.setItem("@rocketnotes:user", JSON.stringify(user)); //atualizando esses dados no local storage, usando a mesma chave para atualizar seu valor

      setData({ user, token: data.token });
      alert("Perfil atualizado com sucesso.");

    } catch (error) {
      if(error.response) {
        alert(error.response.data.message);
      } else {
          alert("Não foi possível atualizar o perfil.");
      }
    }  
  }

  useEffect(() => { //buscando as informações do local storage no navegador
    const token = localStorage.getItem("@rocketnotes:token"); //buscando no Local Storage o token através de sua chave
    const user = localStorage.getItem("@rocketnotes:user"); //buscando no Local Storage o user através de sua chave

    if(token && user) { //fazendo um if para garantir que tanto o token como o user foram informados
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;//repete a execução da linha que coloca o token no cabeçalho
      
      setData({ //colocando dentro do meu estado data meu token e meu user, sendo este transformado de volta de string para objeto
        token,
        user: JSON.parse(user) //voltando os dados do usuário que estavam armazenados no tipo texto para o tipo objeto

      });
    }

  }, []);

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      updateProfile,
      user: data.user
      }}
      > 
      {children} 
    </AuthContext.Provider>
  )
}

function useAuth() { //função que seleciona o contexto e o inicializa através do useContext já importado
  const context = useContext(AuthContext); //inicializando meu contexto e identificando qual contexto será usado

  return context; //retorno meu contexto selecionado já inicializado
}

export { AuthProvider, useAuth }

//Esse { children }, é o componente filho de algo sempre, no caso é o filho do nosso AuthProvider, ou seja, todas as rotas da nossa aplicação, veja no main.jsx quem é o componente filho do AuthProvider.

/*Poderia por as exportações em cada constante e em cada função, mas foi escolhido colocar apenas
no final entre chaves. Para facilitar a visualização do que estou exportando para usar em outro arquivo*/