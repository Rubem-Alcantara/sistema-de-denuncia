# 🛡️ Sistema de Canal de Ética & Compliance (Secure Whistleblower)

> **Projeto Integrador VI B - 2025.2:** Desenvolvimento Backend & Direito e Ética na Computação.

![Status](https://img.shields.io/badge/Status-Concluído%20(v3.0)-success)
![Security](https://img.shields.io/badge/Security-Spring%20Security-blue)
![Frontend](https://img.shields.io/badge/Frontend-React%20%7C%20MUI-blueviolet)
![Backend](https://img.shields.io/badge/Backend-Java%20%7C%20Spring%20Boot-green)

## 📖 Sobre o Projeto
O projeto apresenta uma solução completa (Fullstack) para o relato seguro, anônimo e auditável de incidentes de segurança da informação e violações de conduta corporativa.

O objetivo é fornecer um canal onde colaboradores e parceiros possam reportar irregularidades, garantindo a conformidade com a **LGPD (Lei Geral de Proteção de Dados)**, princípios de **Privacy by Design** e a ética de não-retaliação.

---

## 📜 Histórico de Evolução

O projeto foi desenvolvido em ciclos incrementais, simulando um ambiente real de desenvolvimento de software:

### 🔹 Versão 1.0 (MVP - Mínimo Produto Viável)
* **Foco:** Estrutura base e persistência de dados.
* **Entregas:** Criação da API REST básica, conexão com banco H2 e formulário simples de cadastro sem estilização avançada.

### 🔹 Versão 2.0 (UX & Melhoria de Interface)
* **Foco:** Experiência do usuário e Design System.
* **Entregas:** Implementação do **Material UI (MUI)**, criação de cards interativos, feedback visual (Toast/Alerts) e lógica de alteração de status da denúncia (Pendente -> Em Análise).

### 🔹 Versão 3.0 (Versão Atual - Security & Audit)
* **Foco:** Segurança da Informação, Controle de Acesso e Ciclo de Auditoria.
* **Entregas:**
    * 🔒 **Spring Security:** Implementação de autenticação para proteger a área administrativa.
    * 👁️ **Consulta Pública:** Nova tela para o denunciante acompanhar o status usando apenas o protocolo.
    * 📝 **Direito de Resposta:** Funcionalidade para o auditor registrar um parecer técnico oficial.
    * 🎨 **Redesign Enterprise:** Identidade visual corporativa (Gradientes, Layout Responsivo e Cards Flutuantes).

---

## ⚖️ Destaques: Direito e Ética na Computação

Este projeto foi desenhado seguindo o conceito de **Privacy by Design**. As principais funcionalidades éticas incluem:

1.  **Anonimato Garantido (Checkbox Lógico):**
    * O sistema possui uma trava lógica no Backend. Se o usuário marcar a opção "Anônimo", o sistema ignora e descarta qualquer dado pessoal (nome/email) enviado, garantindo o **Princípio da Minimização de Dados** da LGPD.

2.  **Proteção ao Denunciante (Whistleblower Protection):**
    * Não é necessário login para realizar uma denúncia, evitando rastreamento de identidade do denunciante (Cookies/Sessão).

3.  **Rastreabilidade via Protocolo:**
    * Ao final do registro, é gerado um **Hash Único (Protocolo)**. Isso permite que o denunciante acompanhe o caso e veja a resposta da auditoria sem precisar fornecer dados cadastrais.

---

## 🚀 Tecnologias Utilizadas

### Backend (API)
* **Java 17** & **Spring Boot 3**: Framework robusto para arquitetura REST.
* **Spring Security**: Controle de autenticação e autorização de rotas.
* **Spring Data JPA**: Camada de persistência de dados.
* **H2 Database**: Banco de dados em memória.
* **Lombok**: Redução de boilerplate code.

### Frontend (Interface)
* **React.js** + **Vite**: Biblioteca moderna para construção de interfaces.
* **Material UI (MUI)**: Biblioteca de componentes visuais Enterprise.
* **Axios**: Cliente HTTP para integração com a API.
* **React Router**: Gerenciamento de rotas públicas e privadas.

---

## ⚙️ Funcionalidades Implementadas

### Módulo Público (Denunciante)
- [x] Formulário de denúncia com validação em tempo real.
- [x] Opção de anonimato total.
- [x] Geração automática de protocolo único.
- [x] **Consulta de Protocolo:** Visualização do status e da resposta da auditoria.

### Módulo Administrativo (Auditor)
- [x] Login seguro (Acesso Restrito).
- [x] Painel de Dashboard (Listagem de Casos).
- [x] Identificação visual de denúncias anônimas vs. identificadas.
- [x] Gerenciamento de Status (Pendente -> Em Análise -> Concluída).
- [x] Registro de Parecer Técnico (Resposta da Auditoria).

---

## 🔧 Como Rodar o Projeto

### Pré-requisitos
* Java 17 ou superior.
* Node.js (v18+) e NPM.
* Maven.

### Passo 1: Rodar o Backend
1.  Acesse a pasta `denuncia-api`.
2.  Execute o projeto via terminal:
    ```bash
    mvn spring-boot:run
    ```
3.  O servidor iniciará na porta `8080`.
    * *API Base:* `http://localhost:8080/api/denuncias`

### Passo 2: Rodar o Frontend
1.  Acesse a pasta `denuncia-front`.
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor:
    ```bash
    npm run dev
    ```
4.  Acesse no navegador: `http://localhost:5173`.

---

## 🔜 Roadmap (Próximos Passos - v4.0)
Para a próxima fase de desenvolvimento, o foco será em infraestrutura e análise de dados:

- [ ] **Migração de Banco de Dados:** Substituição do H2 (em memória) pelo **PostgreSQL** para persistência definitiva.
- [ ] **DevOps:** Containerização completa da aplicação utilizando **Docker** e Docker Compose.
- [ ] **Dashboard Estatístico:** Implementação de gráficos para análise de volume de denúncias por tipo e status.
- [ ] **Notificações:** Envio automático de e-mail para denúncias identificadas quando houver atualização de status.

---

## 📁 Estrutura do Projeto

```text
sistema-de-denuncia/
├── denuncia-api/         # Backend (Spring Boot + Security)
│   ├── src/main/java/com/faculdade/denuncia_api
│   │   ├── controller/   # Endpoints REST
│   │   ├── dto/          # Objetos de Transferência
│   │   ├── model/        # Entidades do Banco
│   │   ├── repository/   # Acesso a Dados
│   │   └── service/      # Regras de Negócio
│   └── pom.xml
│
├── denuncia-front/       # Frontend (React + MUI)
│   ├── src/
│   │   ├── components/   # Telas (Home, Admin, Login, Form)
│   │   └── App.jsx       # Configuração de Rotas
│   └── package.json
│
└── README.md             # Documentação Oficial