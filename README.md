# ConectaELLP

O **ConectaELLP** é uma plataforma web desenvolvida para gerenciar oficinas, inscrições de alunos, presença e gestão de voluntários (professores e tutores) do projeto de extensão ELLP.

Esta documentação cobre a estrutura, instalação e funcionamento do cliente web.

## Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna baseada em **React** e **Vite**.

### Core

  * **[React](https://reactjs.org/)**: Biblioteca principal para construção da interface.
  * **[Vite](https://vitejs.dev/)**: Build tool e servidor de desenvolvimento rápido.
  * **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação.
  * **[Axios](https://axios-http.com/)**: Cliente HTTP para comunicação com a API.

### UI & Estilização

  * **[Styled-components](https://styled-components.com/)**: CSS-in-JS para estilização de componentes com suporte a temas e props dinâmicas.
  * **[React Icons](https://react-icons.github.io/react-icons/)**: Biblioteca de ícones (FontAwesome, HeroIcons, etc.).
  * **[Radix UI (Dropdown Menu)](https://www.radix-ui.com/)**: Componentes acessíveis e sem estilo (headless) para o menu de ações.

### Formulários e Interatividade

  * **[React Select](https://react-select.com/)**: Componente poderoso para select/dropdowns e multiseleção.
  * **[React Toastify](https://fkhadra.github.io/react-toastify/)**: Notificações flutuantes (Toasts) para feedback ao usuário.
  * **[Flatpickr](https://flatpickr.js.org/)**: Seletor de data e hora amigável.
  * **[IMask](https://imask.js.org/)**: Máscaras de input (CPF, Telefone).

## Instalação e Execução

### Pré-requisitos

  * Node.js (v18 ou superior)
  * NPM ou Yarn

### Passos

1.  Clone o repositório:

    ```bash
    git clone https://github.com/utfpr-cp-materias/conecta-ellp-frontend.git
    cd conecta-ellp-frontend
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Configure as variáveis de ambiente:
    Crie um arquivo `.env` na raiz do projeto:

    ```env
    VITE_API_URL=
    ```

4.  Inicie o servidor de desenvolvimento:

    ```bash
    npm run dev
    ```

## Controle de Acesso 

O sistema implementa rotas protegidas baseadas em roles:

| Role | Oficinas | Detalhes Oficina | Usuários | Documentos | Perfil |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Admin** | Full | Full | Full | Full | Full |
| **Teacher** | Full | Full | Full | Full | Full |
| **Tutor** | View | View/Chamada | - | - | Full |
| **Student** | View/Inscrever | - | - | - | Full |

*Componente `RoleProtectedRoute` gerencia esses acessos.*
