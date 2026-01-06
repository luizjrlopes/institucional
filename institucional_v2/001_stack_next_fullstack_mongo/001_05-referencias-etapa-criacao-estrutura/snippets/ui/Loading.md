# Codigo do arquivo components/Loading/index.tsx

```typescript
"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(
    0,
    0,
    0,
    0.8
  ); /* Opcional: adiciona um fundo semi-transparente */
  z-index: 9999; /* Garante que o loading fique acima de outros elementos */
  color: #ffffff;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center; /* Opcional: centra o texto */
`;

const LoadingText = styled.h1`
  margin-bottom: 20px;
`;

const configureClockwise = keyframes`
  0% {
    transform: rotate(0);
  }
  25% {
    transform: rotate(90deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const configureXclockwise = keyframes`
  0% {
    transform: rotate(45deg);
  }
  25% {
    transform: rotate(-45deg);
  }
  50% {
    transform: rotate(-135deg);
  }
  75% {
    transform: rotate(-225deg);
  }
  100% {
    transform: rotate(-315deg);
  }
`;

const SpinnerBox = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative; /* Adicionado para posicionar os quadrados corretamente */
  background-color: transparent;
`;

const ConfigureBorder1 = styled.div`
  width: 115px;
  height: 115px;
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fb5b53;
  animation: ${configureClockwise} 3s ease-in-out 0s infinite alternate;
`;

const ConfigureBorder2 = styled.div`
  width: 115px;
  height: 115px;
  padding: 3px;
  position: absolute; /* Ajustado para garantir sobreposição */
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(63, 249, 220);
  transform: rotate(45deg);
  animation: ${configureXclockwise} 3s ease-in-out 0s infinite alternate;
`;

const ConfigureCore = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d2630;
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Main>
        <LoadingText>Carregando...</LoadingText>
        <SpinnerBox>
          <ConfigureBorder1>
            <ConfigureCore />
          </ConfigureBorder1>
          <ConfigureBorder2>
            <ConfigureCore />
          </ConfigureBorder2>
        </SpinnerBox>
      </Main>
    </LoadingContainer>
  );
};

export default Loading;
```
