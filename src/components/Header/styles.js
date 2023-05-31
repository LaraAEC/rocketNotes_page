import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.header`
  grid-area: header; 

  height: 105px;
  width: 100%;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  justify-content: space-between;

  padding: 0 80px;
`;
// Notas sobre este arquivo:
// Estratégia de grid-area para deixar o cabeçalho fixo ao rolar a tela ele não sumir.
// A largura foi configurada para ocupar 100% do que estiver disponível na tela.
// Colocando a linha que existe em baixo no cabeçalho com border-bottom-width: 1px;
// Fazendo com que essa linha seja sólida com border-bottom-style: solid;
// Colocando a cor dessa linha/ borda inferior com o cifrão pois vai envolver variável e estamos em um literals template. Com o código que puxa uma cor do tema styles geral.
// Meu cabeçalho está como display: flex;
// Arrumei os elementos dentro do cabeçalho para ficarem na horizontal dispostos cada um em uma extremidade com  justify-content: space-between;

export const Profile = styled(Link)`
  display: flex;
  align-items: center;

  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  } 
`;
// Notas sobre este arquivo:
// Primeira coisa é configurar para display flex, para os elementos ficarem lado a lado, e colocar align-items center para garantir que a foto e o texto estarão um ao lado do outro centralizadamente.
/*
  Nossa imagem está muito grande, dentro do nosso Profile existe uma tag <img> então: Para garantir que vou estilizar a imagem que existe dentro do meu componente vou usar o sinal de maior >.
  Vamos tirar o background vermelho do Header (já cumpriu seu propósito de visualização do Header)
*/
// Configurei os textos de seja bem-vindo e nome do usuário colocando sua div como display flex, e, direção coluna.
// Configurei os textos dessa div em margin-left para desgrudar do lado esquerdo.
// Configurei os textos dessa div em line-height para dar distanciamento maior, altura, entre suas linhas.
// Agora vamos configurar nosso span (não precisei do sinal de maior, pois já estou com uma especificidade grande, já apontei que estou na div que está dentro do Profile, então, ao codar span, estou na span dentro dessa div): Note, que a span está dentro das chaves da 'div' pois a ela pertence (questão de hierarquia/cascata).
// Do mesmo modo fizemos com o nosso strong.

export const Logout = styled.button`
  border: none;
  background: none;

  > svg {
    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 36px;
  }
`
//Configurações CSS do meu botão de desligar/Logout