---
name: Experiência do Cliente (experiencia-do-cliente)
description: Metodologia e framework para auditoria de Experiência do Cliente (CX), Usabilidade e UX em aplicações web e mobile. Avalia heurísticas de Nielsen, ergonomia, hierarquia visual, densidade de tela, arquitetura de informação, navegação e redução de carga cognitiva, gerando diagnósticos com propostas práticas de melhoria.
license: MIT
metadata:
  author: Antigravity AI
  version: 1.0.0
  scope: local
---

# 🌟 Skill: Experiência do Cliente (CX & UX Audit Framework)

Esta skill fornece uma metodologia rigorosa e estruturada para analisar, auditar e otimizar a **Experiência do Cliente (CX)** e a **Usabilidade (UX)** de aplicações web e mobile-first.

---

## 🎯 Pilares e Critérios de Análise

### 1. Carga Cognitiva & Densidade de Informação (Lei de Miller & Lei de Hick)
- **Densidade da Tela Principal:** Avaliar se a tela inicial agrega valor ou sobrecarrega o usuário com excesso de cartões simultâneos sem hierarquia de prioridade.
- **Técnica de *Chunking*:** A informação está dividida em blocos digeríveis com espaçamento generoso (*white space*)?
- **Resumo vs. Detalhe:** O painel principal exibe apenas os dados imediatos do dia ("o que eu preciso saber/fazer agora?"), delegando históricos para seções dedicadas?

### 2. Ergonomia & Navegação Mobile-First ("Thumb Zone")
- **Posicionamento de Menus:** Em telas mobile, os menus críticos de navegação e ações de alta frequência estão ao alcance do polegar (*bottom bar / floating actions*)?
- **Alvos de Toque (Touch Targets):** Botões e controles têm área de clique mínima de 44x44px / 48x48px com espaçamento adequado para evitar toques acidentais?
- **Regra dos 2 Cliques (SLA de Agilidade):** Toda ação prioritária do usuário (ex: registrar dose de remédio, ver alergia, marcar tarefa) é executada em até 2 toques?

### 3. Heurísticas de Usabilidade (Jakob Nielsen)
1. **Visibilidade do Status do Sistema:** O usuário sabe exatamente onde está, qual perfil está ativo e qual o estado das ações?
2. **Correspondência com o Mundo Real:** Termos, fluxos e metáforas refletem a linguagem e o cotidiano da persona (ex: cadernos, checklists, planner)?
3. **Controle e Liberdade do Usuário:** Facilidade de cancelar modais, desfazer marcações ou fechar janelas?
4. **Consistência e Padrões:** Botões, cores de status, tipografia e raios de borda seguem um padrão visual unificado?
5. **Prevenção de Erros:** Confirmações para ações críticas e prevenção de duplicidade (ex: registro de doses de remédio)?
6. **Reconhecimento em vez de Memorização:** Informações essenciais visíveis sem exigir que o usuário lembre de telas anteriores.
7. **Flexibilidade e Eficiência:** Atalhos rápidos para usuários frequentes e caminhos claros para iniciantes.
8. **Estética e Design Minimalista:** Zero ruído visual, eliminação de metadados desnecessários ou blocos técnicos fora de contexto.
9. **Recuperação de Erros:** Mensagens claras em linguagem humana quando algo não for preenchido.
10. **Ajuda e Documentação:** Dicas contextuais sutis e feedbacks visuais em ações concluídas.

### 4. Hierarquia Visual & Princípios de Gestalt
- **Pontos Focais:** O olho do usuário é guiado naturalmente para o item mais importante da tela (ex: Próxima aula, remédio do horário)?
- **Proximidade e Agrupamento:** Elementos relacionados estão visualmente unidos, e seções distintas têm separação clara?
- **Contraste e Legibilidade:** Relação de contraste acessível (WCAG AA) entre texto e fundo, com tipografia legível em telas pequenas.

---

## 📋 Protocolo de Execução da Auditoria

Ao ser acionada, esta skill executa 4 etapas obrigatórias:

```
┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
│ 1. VARREDURA &  │ → │ 2. PESQUISA &   │ → │ 3. DIAGNÓSTICO  │ → │ 4. PROPOSTA DA  │
│ LEVANTAMENTO    │   │ BENCHMARKING    │   │ DETALHADO (CX)  │   │ MELHOR VERSÃO   │
└─────────────────┘   └─────────────────┘   └─────────────────┘   └─────────────────┘
```

### Etapa 1: Varredura de Telas e Componentes
- Inspecionar a tela principal (Visão Hoje / Dashboard) e as telas dos módulos.
- Medir a densidade: quantos cartões estão na tela simultaneamente?
- Avaliar a navegação: desktop (top bar / sidebar) vs mobile (overflow, scroll, menus).
- Identificar atritos, redundâncias ou ruídos visuais.

### Etapa 2: Benchmark com Melhores Práticas
- Cruzar as telas com padrões de aplicativos de alta avaliação na categoria de produtividade, organização familiar e saúde (ex: Notion, Apple Health, Cozy Family, Habitica).

### Etapa 3: Relatório de Diagnóstico
- Mapear pontos fortes (*O que já está excelente*).
- Mapear oportunidades de melhoria (*Gargalos de usabilidade, excesso de informação, espaçamentos ou menus*).
- Classificar por severidade (Alta, Média, Baixa).

### Etapa 4: Proposta da Melhor Versão
- Especificar wireframes conceituais ou alterações de layout.
- Propor reorganização de blocos, abas ou navegação inferior mobile.
- Deixar a proposta pronta para execução e teste imediato.
