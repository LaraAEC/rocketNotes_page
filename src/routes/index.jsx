import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/auth';

import { AppRoutes} from './app.routes';
import { AuthRoutes} from './auth.routes';

export function Routes() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      { user ? <AppRoutes /> : <AuthRoutes />} 
    </BrowserRouter>
  )
}

/*
Usamos if ternário para fazer a verificação de tomada de decisão de que caminho de rotas seguir.
If ternário { user ? <AppRoutes /> : <AuthRoutes />}  => Verificação sendo realizada acima,
se tem um usuário (se tem conteúdo lá dentro do user) renderizar a rota App, se não tenha um
usuário renderizar a rota Auth.
*/

/*
Lembrete de quem é meu user:
arquivo auth.jsx da pasta hooks
  return (
    <AuthContext.Provider value={{ signIn, user: data.user }}> 
      {children} 
    </AuthContext.Provider>
  )
  */ 