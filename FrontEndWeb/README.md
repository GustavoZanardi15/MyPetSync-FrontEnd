# MyPetSync - FrontEndWeb

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

Sobre o Projeto

O MyPetSync - FrontEndWeb é a aplicação web do projeto MyPetSync, construída para gerenciar e interagir com serviços de pets. Este projeto é a interface Front-end, desenvolvida com foco em performance, escalabilidade e modernidade.

Ele utiliza React com Vite para criação rápida do projeto e Tailwind CSS para estilização moderna e responsiva.

Tecnologias Utilizadas

React
– Biblioteca JavaScript para construção de interfaces.

Vite
– Ferramenta de build rápida para projetos web modernos.

Tailwind CSS
– Framework CSS utilitário para estilização rápida e responsiva.

PostCSS
– Ferramenta de processamento de CSS utilizada pelo Tailwind.

Autoprefixer
– Adiciona prefixos automáticos para compatibilidade com navegadores.

Configurações do Projeto

Estrutura de Pastas

FrontEndWeb/
├─ node_modules/
├─ public/
├─ src/
│ ├─ assets/ # Imagens, ícones e fontes
│ ├─ components/ # Componentes React reutilizáveis
│ ├─ pages/ # Páginas da aplicação
│ ├─ App.jsx # Componente principal
│ └─ main.jsx # Entrada da aplicação
├─ index.html
├─ package.json
├─ tailwind.config.js
└─ postcss.config.js

Tailwind CSS

Arquivo de configuração: tailwind.config.js

Arquivo de estilos: src/index.css

Inclusão padrão:

@tailwind base;
@tailwind components;
@tailwind utilities;

Scripts principais do package.json

{
"scripts": {
"dev": "vite",
"build": "vite build",
"preview": "vite preview"
}
}

🚀 Como Rodar a Aplicação

Siga os passos abaixo para rodar o projeto localmente:

Clone o repositório

git clone https://github.com/SEU_USUARIO/MyPetSync-FrontEnd.git

Entre na pasta FrontEndWeb

cd MyPetSync-FrontEnd/FrontEndWeb

Instale as dependências

npm install

Inicie o servidor de desenvolvimento

npm run dev

Abra a aplicação no navegador

O Vite irá fornecer a URL local, geralmente:

http://localhost:5173
