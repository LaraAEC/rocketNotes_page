import{ useNavigate } from 'react-router-dom';

import {RiShutDownLine} from 'react-icons/ri';
import { useAuth } from '../../hooks/auth';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';

import { api } from '../../services/api'; //importando minha api, meu servidor

import { Container, Profile, Logout } from './styles';

export function Header() {
  const { signOut, user } = useAuth(); //desestruturando a função de logout, e, o usuário, de dentro do meu contexto
  const navigation = useNavigate();

  function handleSignOut() { //função disparada com interação do usuário
    navigation("/"); //levando o usuário para a tela inicial
    signOut(); //deslogar o usuário
  }

  const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder; //se o usuário tiver avatar usar a literals com a url que busca a imagem no backend, senão usar avatarPlaceholder

  return (
    <Container>
      <Profile to="/profile">
        <img
          src={avatarUrl}
          alt={user.name}  //nome do usuário sendo pago de forma dinâmica  
        />

        <div>
          <span>Bem-vindo</span>
          <strong>{user.name}</strong> 
        </div>
      </Profile>

      <Logout onClick={handleSignOut}>
        <RiShutDownLine />
      </Logout>

    </Container>
  );
}

// Notas sobre este arquivo:
// Começamos importando nosso Container que contém o CSS específico do nosso Header que será estruturado aqui.
// Criamos nossa função em que escreveremos em HTML a estrutura do nosso Header.
// Lembrar a função dos componentes só tem um único return, tudo deve estar dentro dele para ser retornado em um só elemento;
// Return do meu Container, que é a constante que guarda, que seleciona, que pinça, que é o próprio Header.
// Para visualizar este Container vai em Pages/Details e no index.jsx importa ele.
// Exporto o Header para ser usado em algum lugar. Agora, basta importá-lo em todos os index.jsx das páginas que terão esse Header.
// Criei um componente que ainda não existe chamado <Profile></Profile>. Dentro dele vou ter uma imagem, onde vou dizer no seu src qual seu endereço.
/* Com esta linha de código renderizo a foto do meu github:
        <img
          src="https://github.com/LaraAEC.png"
          alt="Foto do usuário"     
        />
 */
/* 
Tanto o bem-vindo quanto o nome do usuário encontram-se em uma disposição um abaixo do outro, diferente do fluxo da imagem, por isso os coloquei dentro de uma 'div' a parte.
A foto e esses textos estão um do lado do outro, mas coloco eles dois à parte para depois usar um flex-direction e mudar a direção deles para um abaixo do outro.
        <div>
          <span>Bem-vindo</span>
          <strong>Larissa Adler</strong>
        </div>
*/
// Preciso ir criar esse componente (que já até importei aqui, sem nem existir) em styles.js desta pasta. Poderia ter feito primeiro lá, e depois vindo pra cá fazer sua parte estrutural.