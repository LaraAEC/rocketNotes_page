import styled from 'styled-components';

export const Container = styled.section`
  margin: 28px 0;

  > h2 {
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

    padding-bottom: 16px; 
    margin-bottom: 28px;

    color: ${({ theme }) => theme.COLORS.GRAY_100};
    font-size: 20px;
    font-weight: 400;
  }
`
/* Observações
 padding-bottom: 16px; => Em h2 para a linha não ficar tão colocada no texto do título.
 margin-bottom: 28px; => Uma folga para quem estiver embaixo se afastar um pouco, no caso o children.
*/
