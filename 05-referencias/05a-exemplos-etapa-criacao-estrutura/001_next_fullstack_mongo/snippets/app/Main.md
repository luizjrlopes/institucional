# Codigo do arquivo app/Main.tsx

```typescript
"use client";
import { useContext } from "react";
import StoreContext from "@/store/Context";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
`;

export default function Main() {
  const storeContext = useContext(StoreContext);

  return (
    <Container>
      <Title>Bem-vindo à Aplicação</Title>
      {storeContext?.user ? (
        <Subtitle>Olá, {storeContext.user.name}!</Subtitle>
      ) : (
        <Subtitle>Faça login para começar</Subtitle>
      )}
    </Container>
  );
}
```
