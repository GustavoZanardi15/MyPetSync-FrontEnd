# MyPetSync - FrontEndMobile

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React Native](https://img.shields.io/badge/React%20Native-0.71-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-49-purple?logo=expo)

---

## Sobre o Projeto

O **MyPetSync - FrontEndMobile** é a aplicação mobile do projeto **MyPetSync**, construída para **gerenciar e interagir com serviços de pets**. Este projeto é a interface **Front-end** para dispositivos móveis, desenvolvida com foco em performance, experiência do usuário e compatibilidade entre plataformas.

Ele utiliza **React Native** com **Expo**, permitindo um desenvolvimento rápido e eficiente para **iOS e Android**.

---

## 🛠️ Tecnologias Utilizadas

* ⚛️ **React Native** – Biblioteca JavaScript para construção de interfaces mobile.
* ⚡ **Expo** – Ferramenta para acelerar o desenvolvimento e deploy de aplicativos React Native.

---

## 📂 Estrutura de Pastas

```
FrontEndMobile/
├─ .cursor/
├─ .vscode/
├─ app/                        # Arquivos principais do Expo e configuração de rotas
│   └─ screens/                 # Telas principais da aplicação
│       ├─ addPetScreens/       # Fluxo de cadastro de pets (Nome, Gênero, etc.)
│       └─ telaInicialScreens/  # Fluxo de Autenticação (Login, Cadastro, Recuperação de Senha)
├─ assets/                      # Imagens, ícones e fontes estáticas
├─ components/                  # Componentes React Native reutilizáveis
│   └─ telaInicial/              # Componentes específicos dos fluxos de autenticação
├─ node_modules/
├─ scripts/
├─ .gitignore
├─ app.json                     # Configurações do Expo
├─ eslint.config.js
├─ package-lock.json
├─ package.json
└─ tsconfig.json
```

---

## 🚀 Como Rodar a Aplicação

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório:

```bash
git clone https://github.com/GustavoZanardi15/MyPetSync-FrontEnd.git
```

2. Entre na pasta do projeto:

```bash
cd MyPetSync-FrontEnd/FrontEndMobile
```

3. Instale as dependências:

```bash
npm install
```

4. Inicie o servidor do Expo:

```bash
npm start
```

5. Abra a aplicação:

* **Para Android**: escaneie o QR code no app Expo Go do seu dispositivo.
* **Para iOS**: escaneie o QR code no app Expo Go do seu dispositivo ou use o simulador.
* **Para Web**: acesse via navegador em [http://localhost:8081](http://localhost:8081).
