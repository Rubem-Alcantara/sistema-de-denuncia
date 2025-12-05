# 🛡️ Sistema de Canal de Ética & Compliance (v3.0)

Plataforma Full Stack para denúncias anônimas e gestão de auditoria, desenvolvida com foco em segurança da informação, conformidade com a LGPD e experiência do usuário.

![Status](https://img.shields.io/badge/Status-Concluído%20(v3.0)-success)
![Security](https://img.shields.io/badge/Security-Spring%20Security-blue)

## 🚀 Funcionalidades

### 👤 Portal do Denunciante (Público)
- **Denúncia Anônima:** Opção de relatar incidentes sem coleta de dados pessoais.
- **Protocolo Único:** Geração automática de hash para acompanhamento.
- **Consulta de Status:** Acompanhamento do andamento e visualização da resposta da auditoria através do protocolo.
- **Interface Intuitiva:** UI moderna e responsiva (Mobile-first).

### 🔐 Painel Administrativo (Restrito)
- **Autenticação Segura:** Login protegido via Spring Security.
- **Gestão de Casos:** Visualização de todas as denúncias com filtros visuais.
- **Fluxo de Auditoria:** Alteração de status (Pendente / Em Análise / Concluída).
- **Parecer Técnico:** Modal para registro de resposta oficial da auditoria.

---

## 🛠️ Tecnologias Utilizadas

### Front-end
- **React.js (Vite):** Performance e construção de componentes.
- **Material UI (MUI):** Design System Enterprise para interfaces consistentes.
- **Axios:** Integração com APIs REST.

### Back-end
- **Java 17 + Spring Boot 3:** Estrutura robusta de API RESTful.
- **Spring Security:** Controle de autenticação e autorização de rotas.
- **Spring Data JPA:** Abstração de persistência de dados.
- **H2 Database:** Banco de dados em memória (Migração para PostgreSQL prevista na v4.0).

---

## 📸 Screenshots

| Portal Inicial | Painel Admin |
|:---:|:---:|
![alt text](image.png) ![alt text](image-1.png)

---

## 📦 Como Rodar o Projeto

### Pré-requisitos
- Node.js e NPM
- JDK 17+
- Maven

### 1. Back-end
```bash
cd backend
mvn spring-boot:run
# O servidor iniciará em http://localhost:8080
2. Front-end
Bash

cd frontend
npm install
npm run dev
# O front iniciará em http://localhost:5173
----------------------------------------------------------
🔜 Roadmap (Próximos Passos - v4.0)
[ ] Migração do banco de dados para PostgreSQL.

[ ] Containerização da aplicação com Docker.

[ ] Implementação de Dashboard com gráficos estatísticos.

[ ] Envio de notificações por e-mail (para denúncias identificadas).