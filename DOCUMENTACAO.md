# 🧠 BOLEANO: Documentação Técnica e Conceitual Completa

## 1. Conceito Central: "O Compilador Mental"

### A Tese

A maioria dos jogos de programação foca na **escrita de código** (ex: LeetCode, CodeWars). O **Boleano** foca na **leitura e interpretação instantânea**.

**A Tese Fundamental**: Um programador sênior não precisa rodar um código simples para saber o que ele faz; ele "compila" mentalmente. O Boleano gamifica essa habilidade.

### Classificação do Jogo

**Gênero**: Binary Arcade Roguelike

- **Binary**: Apenas dois inputs possíveis (0 ou 1)
- **Arcade**: Focado em pontuação alta (High Score) e velocidade
- **Roguelike**: Morte permanente na "run" (perdeu as vidas, começa do zero)

---

## 2. Mecânicas de Jogo (Game Mechanics)

### 2.1 O Ciclo da Partida (The Run)

O jogo opera em um **loop infinito de tensão crescente**.

#### Configuração (Input do Usuário)

Antes de começar, o jogador define seu **perfil técnico**. Isso alimenta o algoritmo de geração.

- **Seleção**: C, Python, JavaScript, Java, Go, etc.
- **Proficiência**: 
  - Nível 1 (Junior)
  - Nível 2 (Pleno)
  - Nível 3 (Senior)

#### O Desafio (The Encounter)

Uma tela minimalista apresenta um snippet de código ou uma afirmação técnica.

- **Visualização**: Syntax highlighting monocromático
- **Inputs**: 
  - Botão **[1]** (TRUE)
  - Botão **[0]** (FALSE)
- **Atalhos**:
  - Tecla **Seta Direita** ou **D** para 1
  - Tecla **Seta Esquerda** ou **A** para 0

#### Resolução e Feedback

O feedback deve ser **visceral** (menos de 100ms).

- **Acerto**: 
  - A tela pisca sutilmente em verde/branco
  - Som de "hit" satisfatório
  - +1 no contador
  - Próxima pergunta imediatamente

- **Erro**: 
  - A tela sofre um "glitch" ou pisca vermelho
  - Som de erro grave
  - -1 coração de vida

- **Timeout** (Opcional futuro): 
  - Se o jogador demorar mais de 10s, conta como erro (pressão de tempo)

#### Game Over

Ao perder a 3ª vida, a run encerra. Estatísticas finais são exibidas:

- **Score Final**: Quantidade de acertos
- **Run Time**: Tempo total sobrevivido
- **Precisão**: Ex: "89% de assertividade"

---

## 3. O Algoritmo "Flow State" ⚙️

O diferencial do Boleano é **não entregar perguntas 100% aleatórias**. Ele usa um sistema de pesos para manter o jogador no **"Estado de Fluxo"** (nem entediado, nem frustrado).

### A Fórmula de Seleção

Para cada nova pergunta, o sistema calcula um **Peso de Probabilidade ($P$)** para todas as perguntas disponíveis no banco que ainda não foram usadas.

$$P = (\text{Dificuldade} \times \text{Afinidade}) + \text{Fator Caos}$$

### Definição das Variáveis

#### Afinidade ($A$)

Compara o **Nível da Pergunta** ($N_q$) com o **Nível do Jogador** ($N_p$) naquela linguagem.

- Se $N_q == N_p$: **Afinidade Alta** (Peso 100)
- Se $N_q == N_p \pm 1$: **Afinidade Média** (Peso 50)
- Se $N_q == N_p \pm 2$: **Afinidade Baixa** (Peso 10)

#### Fator Caos

Um pequeno valor randomizado para garantir que, ocasionalmente, uma pergunta muito fácil ou muito difícil apareça para quebrar o ritmo e surpreender.

### Exemplo Prático de Execução

**Jogador**: Python (Nível 1), C (Nível 3)

**Banco de Questões**:
- **Q1** (Python, Nível 1): Afinidade Máxima (Alta chance de aparecer)
- **Q2** (C, Nível 1): Afinidade Baixa (Pergunta muito fácil para um sênior, chance baixa)
- **Q3** (C, Nível 3): Afinidade Máxima (Desafio adequado, alta chance)

O algoritmo sorteia a próxima pergunta baseada nessa **"roleta viciada"**.

---

## 4. Arquitetura de Dados e Conteúdo

O "banco de dados" é um arquivo **JSON estático** (`questions.json`). Isso permite que o jogo rode offline, seja hospedado em qualquer lugar (GitHub Pages, Vercel) e tenha custo zero.

### Taxonomia das Perguntas (Tipos T1-T10)

Para garantir variedade, as perguntas são tagueadas por **"Tipo Lógico"**:

| Tipo | Nome | Descrição | Exemplo (Conceito) |
|------|------|-----------|-------------------|
| **T1** | Comparação | Igualdade solta vs estrita | `1 == '1'` vs `1 === '1'` |
| **T2** | Mutabilidade | Alterar valor vs referência | `const` em objeto permite mudar propriedade? |
| **T3** | Escopo | Variável global vs local | `var` vs `let` dentro de um `if` |
| **T4** | Aritmética | Precedência e tipos | `1 + "1"` resulta em quê? |
| **T5** | Truthy/Falsy | O que avalia como booleano | `[]` é true ou false? |
| **T6** | Ponteiros/Ref | Endereço de memória (C/C++) | `*p` vs `&p` |
| **T7** | Métodos Nativos | Comportamento de APIs padrão | `splice` altera o array original? |
| **T8** | Short-circuit | Lógica E/OU | `true && ...` ou `false \|\| ...` |
| **T9** | Sintaxe | Erros de compilação óbvios | Falta de `;` ou indentação errada |
| **T10** | Complexidade | Big O simples | Loop dentro de loop é $O(n)$? |

### Schema JSON Detalhado

```json
{
  "questions": [
    {
      "id": "py-001",
      "language": "Python",
      "difficulty": 1,
      "category": "T5",
      "statement_type": "code",
      "content": "bool([])",
      "context": "O código acima retorna True.",
      "answer": 0,
      "explanation": "Em Python, listas vazias são avaliadas como Falsy."
    },
    {
      "id": "js-042",
      "language": "Javascript",
      "difficulty": 2,
      "category": "T1",
      "statement_type": "text",
      "content": "NaN === NaN",
      "context": "Esta comparação retorna true.",
      "answer": 0,
      "explanation": "NaN nunca é igual a nada, nem a ele mesmo."
    }
  ]
}
```

#### Campos do Schema

- **`id`**: Identificador único (formato: `{lang}-{num}`)
- **`language`**: Linguagem de programação
- **`difficulty`**: Nível de dificuldade (1-3)
- **`category`**: Tipo lógico (T1-T10)
- **`statement_type`**: `"code"` ou `"text"`
- **`content`**: O código ou afirmação
- **`context`**: Afirmação que o jogador deve avaliar
- **`answer`**: `0` (FALSE) ou `1` (TRUE)
- **`explanation`**: Explicação técnica após resposta

---

## 5. Engenharia de Software (Stack e Estrutura)

O objetivo técnico é **latência zero**. Não pode haver "loading" entre perguntas.

### Tecnologias

#### Core

- **React**: Pela facilidade de componentes
- **Vite**: Pelo build otimizado

#### State Management: Zustand

**Por que Zustand?**
- Redux é muito verboso
- Context API pode ter problemas de renderização desnecessária
- Zustand é **atômico**, perfeito para atualizar score e lives sem renderizar o layout inteiro

#### Estilo: Tailwind CSS

Classes utilitárias permitem iterar o design visual ("Cyberpunk") direto no HTML sem trocar de arquivos.

### Estrutura de Arquivos Otimizada

```
/src
  /assets         # Sons (hit.mp3, gameover.mp3) e fontes
  /data
    questions.json # 500+ perguntas pré-geradas
  /engine
    GameLoop.js    # Controla o timer, inputs e checagem de resposta
    RNG.js         # O algoritmo de seleção ponderada (Weighted Random)
  /store
    useGameStore.js # Hooks: useLives(), useScore(), useSettings()
  /components
    /Terminal     # O container visual principal
    /CodeBlock    # Renderizador com syntax highlighting simples
    /BinaryInput  # Os botões 0 e 1 animados
  App.jsx
```

---

## 6. Design System & UI/UX

A identidade visual é parte da mecânica. O jogo deve parecer uma **ferramenta de hacker de filme dos anos 90**, mas com **UX moderna**.

### Tipografia

- **Fira Code** ou **JetBrains Mono**
- Ligaduras são importantes (ex: `!=` vira `≠`)

### Paleta de Cores

- **Background**: `#0D1117` (GitHub Dark Dimmed) ou `#000000`
- **Foreground (Texto)**: `#C9D1D9`
- **Accent 1 (True)**: `#2EA043` (Verde Matrix/Terminal)
- **Accent 0 (False)**: `#DA3633` (Vermelho Erro)

### Micro-interações

1. **Botões**: Ao clicar, o botão deve "afundar" virtualmente
2. **Contador**: O contador de pontos deve ter um efeito de "rolling number" (odômetro) se a pontuação subir muito rápido

### Princípios de Design

1. **Minimalismo**: Apenas o essencial na tela
2. **Feedback Instantâneo**: Resposta visual/auditiva < 100ms
3. **Legibilidade**: Código deve ser fácil de ler mesmo sob pressão
4. **Acessibilidade**: Suporte a teclado completo, sem depender do mouse

---

## 7. Roadmap Técnico (Futuro)

### Fase 1: MVP
- [ ] Estrutura base do projeto (React + Vite)
- [ ] Banco de questões (100+ perguntas)
- [ ] Sistema de seleção ponderada (RNG.js)
- [ ] UI básica com Tailwind
- [ ] Feedback visual/auditivo

### Fase 2: Polish
- [ ] 500+ perguntas no banco
- [ ] Animações suaves
- [ ] Sistema de estatísticas
- [ ] Leaderboard local

### Fase 3: Expansão
- [ ] Modo multiplayer (comparar scores)
- [ ] Mais linguagens (Rust, TypeScript, etc.)
- [ ] Modo "Time Attack" (perguntas com timeout forçado)
- [ ] Export de estatísticas

---

## 8. Métricas de Sucesso

### Métricas Técnicas
- Tempo de resposta < 100ms entre perguntas
- Bundle size < 200KB (gzipped)
- Lighthouse Score > 90

### Métricas de Jogo
- Taxa de retenção: Jogadores que jogam mais de 3 runs
- Precisão média: Manter entre 60-80% (nem muito fácil, nem muito difícil)
- Tempo médio por run: 2-5 minutos

---

## Apêndice A: Algoritmo de Seleção Ponderada (Pseudocódigo)

```javascript
function selectNextQuestion(availableQuestions, playerProfile) {
  const weights = availableQuestions.map(q => {
    const affinity = calculateAffinity(q.difficulty, playerProfile);
    const chaos = Math.random() * 10; // 0-10
    return (q.difficulty * affinity) + chaos;
  });
  
  // Algoritmo de "roleta viciada"
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;
  
  for (let i = 0; i < availableQuestions.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return availableQuestions[i];
    }
  }
  
  return availableQuestions[0]; // Fallback
}

function calculateAffinity(questionLevel, playerLevel) {
  const diff = Math.abs(questionLevel - playerLevel);
  if (diff === 0) return 100;
  if (diff === 1) return 50;
  return 10;
}
```

---

## Apêndice B: Referências e Inspirações

- **LeetCode**: Para estrutura de perguntas técnicas
- **TypeRacer**: Para mecânica de velocidade e pontuação
- **2048**: Para loop infinito simples e viciante
- **Papers, Please**: Para feedback visual minimalista e impactante

---

**Versão**: 1.0  
**Última Atualização**: 2024  
**Autor**: Equipe Boleano
