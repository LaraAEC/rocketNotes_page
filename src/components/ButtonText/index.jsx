import { Container } from './styles';

export function ButtonText({title, isActive = false, ...rest}) {
  return(
    <Container
      type="button"
      isActive={isActive}
      {...rest}
    >
      {title}
    </Container>
  );
}

//Na function ButtonText vamos pegar a propriedade title e através do '...rest' tantas outras propriedades passarmos pela nossa página.