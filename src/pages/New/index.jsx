import { useState } from 'react'; //importando o useState para armazenar os estados da nossa aplicação, dos nossos links

import { useNavigate } from 'react-router-dom';

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { Textarea } from "../../components/Textarea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";

import { api } from '../../services/api'; //importando minha api para cadastrar a nota no BD

import { Container, Form } from "./styles";

export function New() {
  const [ title, setTitle] = useState(""); //Criando um estado para o título da nota a ser cadastrada
  const [ description, setDescription] = useState(""); //Criando um estado para a descrição da nota a ser cadastrada

  const [ links, setLinks ] = useState([]); //Criando nosso estado que armazena os links digitados, ele começa como um array vazio.
  const [ newLink, setNewLink ] = useState(""); //Criando nosso estado que armazena o novo link, apenas um, o digitado da vez, inicializa como string vazia.

  const [ tags, setTags ] = useState([]); //Criando nosso estado que armazena as Tags digitados, ele começa como um array vazio.
  const [ newTag, setNewTag ] = useState(""); //Criando nosso estado que armazena a nova Tag, apenas um, o digitado da vez, inicializa como string vazia.

  const navigate = useNavigate();
  
  function handleBack() { //funcionalidade de voltar com o botão 'voltar'
    navigate(-1); //para ser usado no botão de voltar e colocar o usuário na rota anterior
  }


  function handleAddLink() { //funcionalidade que adiciona o novo link, digitado pelo usuário, na lista de links
    setLinks(prevState => [...prevState, newLink]); //Setando meu array estado links - mantenho o que tinha antes mais o novo link, e com o spread operator tudo fica em um único array, mesmo nível
    setNewLink("");//Após usar o estado newLink na linha superior, eu zero ele para receber depois outro link, sem acúmulo nesta linha.
  }

  function handleRemoveLink(deleted) { //funcionalidade para remover link, recebe como parâmetro o link que deseja remover
    setLinks(prevState => prevState.filter(link => link !== deleted)); //filtrando na lista de links atual (atual = prevState) a partir do link que quero deletar, refazer a lista com todos os itens que são diferentes do link que estou deletando
    //Tudo sendo feito dentro de setLinks, pois ele já vai me devolver a nova lista
  }

  function handleAddTag() { //funcionalidade que adiciona a nova Tag, digita pelo usuário, na lista de tags
    setTags(prevState => [...prevState, newTag]); //Setando meu array estado tags - mantenho o que tinha antes, mais a nova Tag, e com o spread operator tudo fica dentro de um único array, mesmo nível
    setNewTag("");//Após usar o estado newTag na linha superior, eu zero ele para receber depois outra Tag, sem acúmulo nesta linha.
  }

  function handleRemoveTag(deleted) { //funcionalidade para remover tag, recebe como parâmetro o tag que deseja remover
    setTags(prevState => prevState.filter(tag => tag !== deleted)); //filtrando na lista de tags atual (atual = prevState) a partir do tag que quero deletar, refazer a lista com todos os itens que são diferentes do tag que estou deletando
    //Tudo sendo feito dentro de setTags, pois ele já vai me devolver a nova lista
  }

  async function handleNewNote() {
    if (!title) { //se não houver título dar um return com esse alerta parando a função, precisa ter título.
      return alert("Precisa inserir um título. Por favor, informe o título da Nota.");
    }
    
    if (newLink) { //se houver newLink retornar esse alerta, e o próprio return pára a função, e ele será dao se cair no if, e cai no if se tiver algo nesse input de tag e só vai haver se não tiver clicado no mais, pois quando clica ele zera o input correspondente.
      return alert("Você deixou um link no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.");
    }

    if (newTag) { //se houver newTag retornar esse alerta, e o próprio return pára a função, e ele será dao se cair no if, e cai no if se tiver algo nesse input de tag e só vai haver se não tiver clicado no mais, pois quando clica ele zera o input correspondente.
      return alert("Você deixou uma tag no campo para adicionar, mas não clicou em adicionar. Clique para adicionar ou deixe o campo vazio.");
    }

    await api.post("/notes", { //fazendo um post na nossa api enviando para essa rota o objeto que quero mandar com todos itens que quero enviar para o BD 
      title,
      description,
      tags,
      links
    });

    alert('Nota criada com sucesso!'); //em dando tudo certo dar alerta
    navigate(-1); //levando o usuário para '/' ou '/home' ou seja tela home, colocando ele na rota anterior
  }


  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Criar Nota</h1>
  
            <ButtonText
            title="Voltar"
            onClick={handleBack} 
            />
          </header>

          <Input
            placeholder="Título"
            onChange={e => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Observações"
            onChange={e => setDescription(e.target.value)}
            
          />

          <Section title="Links úteis">
            {
              links.map((link, index) => (
                <NoteItem
                  key={String(index)}
                  value = {link}
                  onClick={() => handleRemoveLink(link)}
                />
              ))
            }
            <NoteItem
            isNew
            placeholder="Novo Link"
            value = {newLink}
            onChange={e => setNewLink(e.target.value)}
            onClick={handleAddLink}
            />
          </Section>

          <Section title='Marcadores'>
            <div className="tags">
              {
                 tags.map((tag, index) => (
                  <NoteItem 
                    key={String(index)}
                    value={tag}
                    onClick={() => handleRemoveTag(tag)}
                  />  
                 ))
              }
            
            <NoteItem
              isNew
              placeholder="Nova tag"
              onChange={e => setNewTag(e.target.value)}
              value={newTag}
              onClick={handleAddTag}
            />
            </div>
          </Section>

          <Button
            title="Salvar"
            onClick={handleNewNote}
          />
        </Form>
      </main>
    </Container>
  );
}