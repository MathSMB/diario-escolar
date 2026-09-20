---
name: Boas Práticas de Painel Administrativo & Auditoria (boas-praticas-de-admin)
description: Diretrizes de engenharia, métricas em tempo real, logs de auditoria (5 Ws), controle de permissões (RBAC) e design de dashboards administrativos modernos para plataformas SaaS e gestão de sistemas.
---

# 🛡️ Skill de Boas Práticas de Painel Administrativo & Auditoria

Esta skill define os padrões de arquitetura, ergonomia, métricas de observabilidade e segurança para o painel de administração da plataforma.

---

## 📊 1. Pilares de um Dashboard Administrativo Moderno

1. **Visão Executiva Instantânea (Regra dos 5 Segundos):**
   - No topo, cartões de KPIs consolidados mostram o estado geral da plataforma (*usuários ativos, famílias cadastradas, taxa de cumprimento de doses, integridade dos módulos*).
2. **Monitoramento e Métricas de Engajamento:**
   - Gráficos de tendências temporais (novos cadastros, uso do módulo de saúde, rotinas cumpridas).
3. **Gestão de Usuários & Controles de Acesso (RBAC):**
   - Tabela pesquisável e filtrável com status da conta, data de cadastro, papel (*Mamãe, Papai, Admin, Cuidador*), provedor de autenticação (*Google, Apple, E-mail*) e ações administrativas.
4. **Trilha de Auditoria Imutável (Audit Logs - Os 5 Ws):**
   - **Who** (Quem realizou a ação)
   - **What** (Qual operação: Login, Cadastro, Exportação ODS, Exclusão)
   - **Where** (Qual módulo/recurso afetado)
   - **When** (Timestamp preciso em padrão ISO/Local)
   - **Status/Context** (Sucesso, Alerta, Bloqueio)
5. **Saúde e Status dos Serviços:**
   - Latência simulada, status do armazenamento local/nuvem, taxa de exportação e segurança.

---

## 📈 2. KPIs Essenciais da Plataforma Familiar

| KPI | Descrição | Meta Saudável |
| :--- | :--- | :--- |
| **Famílias Ativas** | Total de lares gerenciando rotinas no mês | Crescimento constante |
| **Crianças Assistidas** | Quantidade de perfis infantis cadastrados | 1 a 3 por família |
| **Taxa de Adesão a Medicamentos** | % de doses marcadas como ministradas no horário | > 92% |
| **Prontidão de Ficha SOS** | Perfis com pediatra, sangue e alergias 100% preenchidos | 100% |
| **Volume de Exportações ODS/ZIP** | Famílias usufruindo da soberania de dados sem lock-in | Portabilidade ativa |

---

## 🛠️ 3. Checklist de Implementação da Tela de Admin

- [ ] Acesso restrito e seguro (botão no menu do usuário para contas com permissão de administrador ou chave de desenvolvedor).
- [ ] Cartões de métricas com indicadores de variação (+12%, meta atingida).
- [ ] Tabela de usuários registrados com filtros por papel e provedor de login.
- [ ] Tabela de logs de auditoria com busca por ação e status.
- [ ] Ferramenta de exportação de relatório administrativo em formato aberto (.ODS / .XLSX / .JSON).
- [ ] Capacidade de alternar papéis ou criar contas de teste para suporte.
