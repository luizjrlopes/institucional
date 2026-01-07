# Referências Visuais — Stack 002

**Stack:** 002_next_front_node_back_mongo  
**Versão:** v1.0

---

## Objetivo

Este diretório contém HTMLs de referência visual para as páginas institucionais de autenticação.

---

## Regras de Uso

### ✅ OBRIGATÓRIO: Seguir Literalmente

Os HTMLs devem ser implementados **exatamente como estão**, respeitando:

- Estrutura DOM completa
- Classes CSS aplicadas
- Hierarquia de elementos
- Estrutura de formulários
- Ordem dos campos

### ✅ PERMITIDO Alterar

- `{APP_NAME}` → Nome da aplicação
- `{BRAND_PALETTE}` → Cores da marca (hex codes)
- Textos de ajuda/suporte
- Links de contato
- Logotipo/ícones

### ❌ PROIBIDO Alterar

- Reorganizar DOM
- Remover/adicionar elementos
- Alterar nomes de classes
- Simplificar estrutura
- Mudar fluxo de formulário
- Alterar validações visuais

---

## HTMLs Disponíveis

### 1. login.html

Página de login com:

- Email + password
- "Esqueci minha senha"
- "Criar conta"
- Validação visual

### 2. register.html

Página de cadastro com:

- Nome, email, password, confirmação
- Termos de uso
- Link para login
- Validação visual

### 3. reset-password.html

Página de recuperação de senha com:

- Email para envio
- Mensagem de sucesso
- Link para login

### 4. dashboard.html (Opcional)

Layout base do dashboard com:

- Header
- Sidebar
- Área de conteúdo
- Footer

---

## Como Implementar

### 1. Analisar HTML

Estude a estrutura, classes e fluxo

### 2. Criar Componentes Next.js

Converta HTML para componentes React/Next.js

### 3. Aplicar Styled Components

```tsx
const Container = styled.div`
  // Estilos baseados nas classes do HTML
`;
```

### 4. Adicionar Lógica

- Form handling (react-hook-form)
- Validação (zod)
- Chamadas HTTP (apiClient)
- Estados (loading, erro)

### 5. Integrar com Backend

- Conectar com endpoints de auth
- Gerenciar tokens JWT
- Atualizar AuthContext

---

## Exemplo de Conversão

**HTML Referência:**

```html
<div class="auth-container">
  <form class="auth-form">
    <h1>Login</h1>
    <input type="email" placeholder="Email" />
    <input type="password" placeholder="Senha" />
    <button type="submit">Entrar</button>
  </form>
</div>
```

**Conversão Next.js + Styled:**

```tsx
const Container = styled.div.attrs({ className: "auth-container" })`
  /* estilos */
`;

const Form = styled.form.attrs({ className: "auth-form" })`
  /* estilos */
`;

export default function LoginPage() {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Senha" {...register("password")} />
        <button type="submit">Entrar</button>
      </Form>
    </Container>
  );
}
```

---

## Observações

- HTMLs são guias visuais, não código pronto
- Adapte responsividade conforme necessário
- Mantenha acessibilidade (aria-labels, etc)
- Teste em múltiplos breakpoints
- Siga dossiê de frontend para estrutura de pastas

---

© 2026 - Documentação Institucional Oficial
