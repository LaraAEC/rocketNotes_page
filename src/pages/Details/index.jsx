import { useState, useEffect } from 'react';
import { Container, Links, Content } from './styles'; 
// Importando meu Container, criei no styles.js desta pasta, uma constante que guarda um elemento HTML: div.
// Ele (esse Container) que vai englobar toda a estrutura dessa minha página, e, estou importando aqui.

import { useParams, useNavigate } from 'react-router-dom'; //importando o useParams para buscar os parâmetros que existem na rota

import { api } from '../../services/api';

import { Tag } from '../../components/Tag'; // Importei meu componente Tag para usá-lo nesta page Details.
import { Header } from '../../components/Header'; // Importei meu componente Header para usá-lo nesta page Details
import { Button } from '../../components/Button'; // Importei meu componente Button para usá-lo nesta page Details.
import { Section } from '../../components/Section'; //Importei meu componente Section para usá-lo nesta page Details.
import { ButtonText } from '../../components/ButtonText'; // Importei meu componente ButtonText para usá-lo nesta page Details.

export function Details() { //minha função precisa ter somente um return. Tudo está dentro dele, envolto no Container que tem meu CSS.
  const [data, setData] = useState(null);

  const params = useParams(); //colocando meu usePrams em execução nessa constante
  const navigate = useNavigate();

  function handleBack() { //funcionalidade de voltar com o botão 'voltar'
    navigate(-1); //para ser usado no botão de voltar e colocar o usuário na rota anterior
  }

  async function handleRemove() { //funcionalidade de deletar notas
    const confirm = window.confirm("Deseja realmente remover esta Nota?"); //Vai guardar um true or false

    if(confirm) { //se confirm for verdadeiro, faço a exclusão da nota
      await api.delete(`/notes/${params.id}`); //deleta a nota localizada através do parâmetro que está sendo passado na rota no endereçamento lá em cima
      navigate(-1); //levo o usuário de volta a raiz
    }
  }

  useEffect(() => { //buscando os dados da minha nota na minha api/backend/banco de dados
    async function fetchNote(){
      const response = await api.get(`/notes/${params.id}`); //buscando no backend a minha nota usando a rota /notes e o parâmetro da minha nota
      setData(response.data); //configurando meu estado dados com a resposta do banco de dados sobre meu get na rota indicada acima
    } 

    fetchNote(); //chamando meu fetchNote, que declarei acima, para que ele seja executado
  }, []);

  return (
    <Container>
      <Header />
      {
        data &&
         <main>
         <Content>
           <ButtonText
           title="Excluir Nota"
           onClick={handleRemove}
           />
 
           <h1>
             {data.title}
           </h1>
 
           <p>
              {data.description}
           </p>

            {
              data.links &&
               <Section title="Links úteis">
                <Links>
                {
                  data.links.map(link => (
                    <li key={String(link.id)}>
                      <a href={link.url} target="_blank">{link.url}</a></li>
                  ))
                }
                </Links>
              </Section>
            }

            {
              data.tags &&
                <Section title="Marcadores">
                  {
                    data.tags.map(tag => (
                      <Tag key={String(tag.id)} title={tag.name} />
                    ))
                  }
                </Section>
            }
    
           <Button title="Voltar" onClick={handleBack} />
         </Content>
       </main>
      }
    </Container>
  )
}

// Notas sobre este arquivo:
// Minha página é toda feita através de função Javascript. Essa função só pode retornar um elemento.
// Esse elemento é minha 'div' que guardei no Container. Tudo da página ficará englobado por essa div para ser retornado e executado no navegador.
// O nome da pasta recebe o nome da página, assim como nos Componentes, o nome da pasta recebe o nome do componente.
// O nome da pasta deve ser o mesmo da função que vai retornar a página, e, no caso é o nome da página.
// Todo componente tem o mesmo nome da função que o cria, e, começam com letra maiúscula.
// Dentro desse return estou escrevendo em HTML. Estamos escrevendo HTML com Javascript.
// Estou retornando minha 'div' (container da vez)
// Dentro dessa div estou montando minha página com o Header, com o Button e etc...
// Quando faço assim <Header /> estou usando minha função.