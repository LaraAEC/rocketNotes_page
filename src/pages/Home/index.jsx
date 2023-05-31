import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiPlus, FiSearch } from 'react-icons/fi';

import { api } from '../../services/api';

import {Container, Brand, Menu, Search, Content, NewNote } from './styles';

import { Note } from '../../components/Note';
import { Input } from '../../components/Input';
import { Header } from '../../components/Header';
import { Section } from '../../components/Section';
import { ButtonText } from './../../components/ButtonText';


export function Home() {
  const [tags, setTags] = useState([]); //criando estado que recebe as tags digitadas pelo usuário
  const [tagsSelected, setTagsSelected] = useState([]); //criando o estado das tags selecionadas pelo usuário
  const [search, setSearch] = useState(""); //criando meu estado que recebe o conteúdo digitado no input de pesquisa
  const [notes, setNotes] = useState([]); //criando meu estado das notas e será um array

  const navigate = useNavigate();

  function handleTagSelected(tagName) { //função que lida com a tag selecionada e recebe como parâmetro o nome da tag selecionada
    if(tagName ==="all") {
      return setTagsSelected([]); //se eu clicar em 'todos' desmarca todas as outras tags de uma vez
    }
    
    const alreadySelected = tagsSelected.includes(tagName); //verificando se a tag selecionada existe dentro do array de tags
    
    if(alreadySelected) { //se já está selecionado, e foi clicado, então tira da lista de tags
      const filteredTags = tagsSelected.filter(tag => tag !== tagName); //faz um filter e devolve uma lista com todas as tags diferentes da tagName
      setTagsSelected(filteredTags); //colocando as tags já filtradas no array de tagsSelected

    } else {
      setTagsSelected(prevState => [...prevState, tagName]); //se não está selecionado, e foi clicado, então seleciona
    }
  }

  function handleDetails(id) {
    navigate(`/details/${id}`); //levando o usuário para a tela de details e mandando um parâmetro na rota
  }

  useEffect(() => { //buscando a tag, só uma vez quando a página é carregada, por isso não coloquei nenhum estado entre os colchetes abaixo
    async function fetchTags() {
      const response = await api.get("/tags"); //acessando minha api e pegando minhas tags com o 'get' da rota '/tags' de dentro da minha api
      setTags(response.data); //pegando os dados da minha response obtida acima e colocando como parâmetro já dentro do setTags, configurando-o com minhas tgs atuais contidas no BD
    }

    fetchTags();
  },[]);

  useEffect(() => { //a dependência desse useEffect serão as tagsSelected e o search, quando mudar o conteúdo desses estados ele executa o useEffect novamente
    async function fetchNotes(){ //buscando a nota usando como filtro os dois estados do colchetes
      const response = await api.get(`/notes?title=${search}&tags=${tagsSelected}`); //buscando no backend na rota '/notes', e enviando através de uma query o nome do title passando o conteúdo do search e as tags com o conteúdo das tags selecionadas
      setNotes(response.data); //passando os dados da resposta do backend sobre a nota buscada para o setNotes
    }

    fetchNotes(); //executando a função acima declarada, foi declarada neste escopo pois só aqui será usada

  }, [tagsSelected, search]);

  return (
    <Container>
      <Brand>
        <h1>Rocketnotes</h1>
      </Brand>

      <Header />

      <Menu>
        <li>
          <ButtonText
          title="Todos"
          onClick={() => handleTagSelected("all")}
          isActive={tagsSelected.length === 0} /*verificando se há tags selecionadas, se não houver ativar o isActive orange*/ 
          />
          </li>
        {
          tags && tags.map(tag => (
            <li key={String(tag.id)}>
              <ButtonText
                title={tag.name}
                onClick={() => handleTagSelected(tag.name)}
                isActive={tagsSelected.includes(tag.name)} /*verificando se tag.name existe dentro do array tagsSelected, se existe quer dizer que ela está selecionada, isActive orange*/ 
              se />
              </li>
          ))
        }
      </Menu>

      <Search>
        <Input
        placeholder="Pesquisar pelo título"
        icon={FiSearch}
        onChange={(e) => setSearch(e.target.value)}
        />
      </Search>

      <Content>
        <Section title="Minhas notas">
          {
            notes.map(note => (
              <Note
              key={String(note.id)}
              data={note}
              onClick={() => handleDetails(note.id)}
              />
            ))
          }
        </Section>
      </Content>

      <NewNote to="/new">
        <FiPlus />
        Criar nota
      </NewNote>
    </Container>
  );
}

//Importei meu Component Header para reutilizar nesta página.