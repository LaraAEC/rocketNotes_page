import { useState } from 'react'; //importando o hook de estado
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { api } from "../../services/api";

import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

import { Container, Form, Background } from "./styles";


export function SignUp() {
  
  //estruturando meus estados
  const [name, setName] = useState(""); //hook que cria um estado, o de nome. Inicia com string vazia.
  const [email, setEmail] = useState(""); //hook que cria um estado, o de email. Inicia com string vazia.
  const [password, setPassword] = useState(""); //hook que cria um estado, o de senha. Inicia com string vazia.

  const navigate = useNavigate(); //guardando useNavigate em execução nesta constante para usar ela para redirecionamento de page ao cadastrar com sucesso

  function handleSignUp(){ //verificando se foram preenchidos todos os campos
    if(!name || !email || !password) {
      return alert("Preencha todos os campos"); //return além do alerta pois preciso parar a função caso não tenha sido preenchido algum campo
    }

    api.post("/users", { name, email, password })
    .then(() => { //se der certo faça isso
      alert("Usuário cadastrado com sucesso!");
      navigate("/"); //levando o usuário para a barra que é nossa tela inicial desse conjunto de rotas
    })
    .catch(error => { //se der errado faça isso
      if(error.response){ //se o erro tiver uma resposta do backend
        alert(error.response.data.message); //dá um alerta na mensagem dessa resposta desse erro, trazendo para o frontend a mensagem de AppError do backend
      } else { //se não houver nenhuma mensagem específica
        alert("Não foi possível cadastrar o usuário."); //dou uma mensagem mais genérica
      }
    });
  }

  return (
    <Container>
       <Background />
      <Form>
        <h1>Rocket Notes</h1>
        <p>Aplicação para salvar e gerenciar seus links úteis.</p>

        <h2>Crie sua conta</h2>

        <Input
          placeholder="Nome"
          type="text"
          icon={FiUser}
          onChange={e => setName(e.target.value)} //capturando a alteração do campo com o onchange e acionando a função setName com o parâmetro do valor do evento.
        />

        <Input
          placeholder="E-mail"
          type="text"
          icon={FiMail}
          onChange={e => setEmail(e.target.value)} //capturando a alteração do campo com o onchange e acionando a função setEmail com o parâmetro do valor do evento.
        />

        <Input
          placeholder="Senha"
          type="password"
          icon={FiLock}
          onChange={e => setPassword(e.target.value)} //capturando a alteração do campo com o onchange e acionando a função setPassword com o parâmetro do valor do evento.
        />

        <Button title="Cadastrar" onClick={handleSignUp} />

        <Link to="/">
          Voltar para o login
        </Link>
      </Form>
    </Container>
  );
}