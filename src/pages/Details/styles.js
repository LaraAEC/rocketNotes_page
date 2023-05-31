import styled from 'styled-components';


export const Container = styled.div`
   width: 100%; 
   height: 100vh;

   display: grid;
   grid-template-rows: 105px auto;
   grid-template-areas:
   "header"
   "content";

   > main {
    grid-area: content;
    overflow-y: scroll;
    padding: 64px 0;

   }
`;

// Notas sobre este arquivo:
// Importo essa biblioteca para poder escrever CSS com JS. Assim que fazemos no React.
// Com isto trago os elementos HTML dentro do styled, e consigo com literals template escrever CSS neles.
// Crio uma constante e dentro vou guardar um elemento HTML, pego de dentro do styled (ele guarda todos os elementos HTML) com o ponto um elemento div.
// Armazenando dentro dessa constante um elemento HTML que é uma div, neste caso.
// Criei meu elemento e vou precisar exportá-lo para meu arquivo de estruturação jsx. Daí já crio usando o export (fiz exportação named).
// E, para estilizar essa div coloco as propriedades e valores entro de crase. Não estilizei por aqui pq não era o propósito.
// Exporto essa constante para poder ser usada em outro arquivo, no index.js.
// Não estilizei quase nada por aqui desse componente, ele está seguindo só estilização global, que está na pasta styles.
// Configurei a propriedade display com o valor de grid.
// O display desse Container será exibido em formato de GRID, pois vamos criar o grid para dizer aonde cada parte do nosso Layout vai se encaixar.
// width de 100% da tela, pois é todo o conteúdo da minha página e quero exibir ele em toda tela possível.
// Height de 100vh, quero que seu conteúdo pegue 100% da altura da tela viewport height.
// grid-template-rows: 105px auto; Duas linhas uma para o cabeçalho e outra para o conteúdo.
// grid-template-areas: "header" "content"; Nome das linhas do grid.

export const Links = styled.ul`
  list-style: none;

  > li {
    margin-top: 12px;

    a {
      color: ${({ theme }) => theme. COLORS.WHITE};
    }
  }
`;
/*Observações:
  Arrumando minha lista que criei em index.js de Details.
  Dando um espaço em cada item, em cada elemento da lista.
  Retirando aquele aspecto de azul sublinhado das âncoras quando adicionamos links nos projetos.
*/

export const Content = styled.div`
  max-width: 550px;
  margin: 0 auto;

  display: flex;
  flex-direction: column;

  > button:first-child {
    align-self: end;
  }

  > h1 {
    font-size: 36px;
    font-weight: 500px;
    padding-top: 64px;
  }

  > p {
    font-size: 16px;
    margin-top: 16px;
    text-align: justify;
  }
`;
