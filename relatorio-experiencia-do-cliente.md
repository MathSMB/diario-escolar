# 📋 Relatório de Auditoria: Experiência do Cliente (CX & UX)
**Plataforma:** Diário & Acompanhamento Infantil (Refúgio Familiar)  
**Data:** 20/09/2026  
**Auditoria baseada em:** Heurísticas de Nielsen, Lei de Miller, Ergonomia Mobile ("Thumb Zone"), Princípios de Gestalt e Redução de Carga Cognitiva.

---

## 🔍 1. Diagnóstico e Varredura da Aplicação Atual

Após a varredura completa da arquitetura visual, componentes, espaçamentos e navegação, identificamos os seguintes pontos fortes e gargalos de usabilidade:

### ✅ Pontos Fortes (O que já está excelente)
1. **Atmosfera e Tom Visual Adequado:** A paleta orgânica matte (Creme de Linho, Terracota, Sálvia, Ardósia) e a tipografia híbrida (Fraunces + Plus Jakarta Sans) criam um refúgio acolhedor, eliminando o estresse visual de dashboards corporativos ou cores infantis saturadas.
2. **SLA < 2 Cliques para Ações Críticas:** O botão de registro de dose de remédio e o Cartão SOS respondem em 1 toque, o que é crucial para cuidadores sob estresse.
3. **Contexto Reativo por Filho:** A alternância instantânea entre *Helena*, *Mateo* e *Família Unificada* sem recarregar a página proporciona uma experiência fluida.

---

### ⚠️ Oportunidades Críticas de Melhoria (Gargalos de UX)

| Área | Problema Identificado | Impacto na Experiência (CX) | Severidade |
|---|---|---|---|
| **1. Carga Cognitiva na "Visão Hoje"** | A tela principal carrega **7 cartões densos empilhados** (grade completa, tarefas com abas, bloco de notas, remédios com histórico, curva OMS com SVG e histórico, memórias com polaroid, cofre com 3 pastas e arquivos). | O usuário sofre de sobrecarga de informação (*Information Overload*). A tela fica longa demais e não responde imediatamente *"O que é prioridade agora?"*. | 🔴 **Alta** |
| **2. Ergonomia Mobile (Thumb Zone)** | O menu de 7 abas fica fixo no topo da tela (`sticky top`). Em celulares (mobile-first), o topo é a zona de mais difícil alcance para o polegar com uma mão só. | Dificuldade motora para trocar de módulo e necessidade de scroll horizontal constante para encontrar o final da lista de abas. | 🔴 **Alta** |
| **3. Altura Útil Vertical Ocupada** | Header (73px) + Navbar (50px) + Seletor de Criança (70px) consom mais de 30% da tela do celular antes de exibir qualquer conteúdo útil. | O usuário é forçado a rolar a tela antes de ver qualquer informação da rotina. | 🟡 **Média** |
| **4. Divisão de Resumo vs. Detalhe** | Elementos que são de análise periódica (como o gráfico da Curva de Crescimento OMS e as pastas de Documentos Oficiais) ocupam espaço nobre do dia a dia. | Confunde a rotina diária com a gestão documental de longo prazo. | 🟡 **Média** |

---

## 📐 2. Boas Práticas e Fundamentos de UX Pesquisados

1. **Lei de Miller (7 ± 2 elementos) & Chunking:** A mente humana processa informações com mais rapidez quando agrupadas em blocos funcionais com contadores claros e diretos.
2. **Ergonomia "Thumb Zone" de Steven Hoober:** Em smartphones, 75% das interações ocorrem com uma mão. Os controles de navegação primários devem ficar nos 30% inferiores da tela (*Bottom Navigation Bar*).
3. **Divulgação Progressiva (*Progressive Disclosure*):** Mostrar primeiro apenas o que é essencial para o momento presente (ex: *"Próxima dose às 23:30"* ou *"Aulas da Manhã"*), permitindo expandir detalhes sob demanda com 1 toque.
4. **Hierarquia de 3 Níveis:**
   - **Nível 1 (Agora/Urgente):** Alertas de remédio do horário, próximas aulas, cartão SOS.
   - **Nível 2 (Hoje/Rotina):** Checklist da mochila, tarefas de autonomia da criança.
   - **Nível 3 (Histórico/Gestão):** Curva de crescimento, cofre de arquivos, boletim de notas (nas abas dedicadas).

---

## 💡 3. Proposta da "Melhor Versão" (Redesign Ergonômico)

### 3.1 Reorganização da "Visão Hoje" (Hub Central Limpo & Poderoso)
A tela inicial passa a ser um verdadeiro **Planner do Dia a Dia**, estruturado em:
1. **Barra de Resumo Rápido ("O Dia em Números"):**
   - 🎓 *3 Aulas hoje* • 💊 *1 Remédio pendente* • ⭐ *2 Tarefas de Autonomia*
2. **Card "Foco do Momento":**
   - Destaque para a próxima atividade ou aula do horário + botão de 1 clique para remédio.
3. **Checklist da Mochila & Tarefas da Criança:**
   - Cards interativos e leves de marcação rápida.
4. **Resumo das Outras Áreas com Atalhos Inteligentes:**
   - Mini-card de acesso ao diário pedagógico, memórias recentes e atalho rápido para o cofre de arquivos, sem poluir a tela inicial com gráficos pesados.

### 3.2 Navegação Híbrida Inteligente (Mobile Bottom Bar + Desktop Top Bar)
- **Em Mobile (< 768px):** Barra inferior fixa (*Bottom Tab Bar*) com 4 abas principais (**Hoje**, **Escola**, **Saúde**, **Tarefas**) + botão **"Mais"** (que abre uma folha inferior / bottom sheet com **Extracurricular**, **Memórias** e **Cofre**).
- **Em Desktop (>= 768px):** Barra superior de abas de luxo com layout espaçado.

### 3.3 Seletor de Perfil Compacto no Header
- Mover os avatares das crianças (*Helena*, *Mateo*, *Família*) para dentro do cabeçalho superior direito de forma compacta e elegante, liberando 70px de altura útil na tela.

---

## 🛠️ 4. Especificação de Componentes para Implementação

1. **`BottomNavBar.tsx` (Novo):** Barra ergonômica inferior para dispositivos móveis.
2. **`TodayView.tsx` (Refatorado):** Limpo, focado em prioridades do dia, com contadores e sem sobrecarga.
3. **`PlannerHeader.tsx` (Otimizado):** Incorporação compacta do seletor de filhos no cabeçalho.
