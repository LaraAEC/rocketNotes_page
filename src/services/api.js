import axios from "axios";

export const api = axios.create({ //objeto api que vai conter propriedades importantes
  baseURL: "https://rocketnotes-api-cyef.onrender.com" //passo para essa propriedade a parte do endereço backend que roda em nosso computador(servidor/api), e, depois a substituí pela endereço backend que está rodando online no render.
});
