import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: grid;
  grid-template-columns: 250px auto;
  grid-template-rows: 105px 128px auto 64px;
  grid-template-areas:
  "brand header"
  "menu search"
  "menu content"
  "newnote content";

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_800};


`;
/*
Notas:
Largura e altura de tela máximas;
Display grid para fazer o layout da página dividida em colunas e linhas;
Definindo quantas são as colunas e seus tamanhos com grid-template-columns, e demos 250px para o menu e automático
para o restante;
Vamos definir as linhas com grid-template-rows, onde teremos 4 linhas: header - 105px, Search - 128px
resto do conteúdo - auto, e, por fim, Button NewNote - 64px (tamanho que preciso para o botãozinho);
Distribuição das áreas do grid, grid-template-areas (não esquecer do ; ao final das áreas):
(basta olhar para o layout e seguir a sequencia da direita para a esquerda, de cima para baixo);
As linhas definidas cortam as duas colunas, as colunas definidas cortam todas as linhas (visualize);
*/

export const Brand = styled.div`
  grid-area: brand;
  
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  > h1 {
    font-size: 24px;
    color: ${({ theme }) => theme.COLORS.ORANGE};
  }
`;
/* 
Notas:
Display flex para habilitarmos propriedades de centralização e ajuste de conteúdo;
Para ajustar e centralizar bem o conteúdo as propriedades justify-content e align-items como center;
Propriedades border-bottom(variadas), ajustando a borda inferior desse elemento para
que seja uma linha de acordo com o planejado;
*/

export const Menu = styled.ul`
  grid-area: menu;
  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  padding-top: 64px;
  text-align: center;

  > li {
    margin-bottom: 24px;
  }
  
`;

export const Search = styled.div`
  grid-area: search;
  padding: 64px 64px 0;
 
`;

export const Content = styled.div`
  grid-area: content;
  padding: 0 64px;
  overflow-y: auto;
  
`;

export const NewNote = styled(Link)`
  grid-area: newnote;

  background-color: ${({ theme }) => theme.COLORS.ORANGE};
  color: ${({ theme }) => theme.COLORS.BACKGROUND_900};

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 8px;
  }`;
  /*Notas:
  Nomeei a grid-área a que essa constante corresponde, a que ele vai preencher, grid area newnote;
  Dei uma cor de fundo laranja para meu botão;
  Retirei as bordas do botão;
  Usei display flex para possibilitar a centralização pelos comandos align-items e justify-content,
  nos eixos x e y, havendo uma boa centralização;
  acessei meu svg e com margin-right distanciei ele do texto Criar nota.
  */
