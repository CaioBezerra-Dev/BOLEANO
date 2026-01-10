const fs = require('fs');

// Lê o arquivo
let content = fs.readFileSync('src/data/questions.json', 'utf8');

// Remove comentários de linha
content = content.replace(/\/\/.*$/gm, '');

// Extrai todas as questões
const questions = [];
const seen = new Set();

// Regex mais robusto para extrair questões
const questionRegex = /\{\s*"id"\s*:\s*"([^"]+)"[^}]*?"language"\s*:\s*"([^"]+)"[^}]*?"difficulty"\s*:\s*(\d+)[^}]*?"category"\s*:\s*"([^"]+)"[^}]*?"statement_type"\s*:\s*"([^"]+)"[^}]*?"content"\s*:\s*"([^"]+)"[^}]*?"context"\s*:\s*"([^"]+)"[^}]*?"answer"\s*:\s*(\d+)[^}]*?"explanation"\s*:\s*"([^"]+)"\s*\}/gs;

let match;
while ((match = questionRegex.exec(content)) !== null) {
  const id = match[1];
  if (!seen.has(id)) {
    seen.add(id);
    
    // Limpa o conteúdo (remove quebras de linha literais)
    let qContent = match[6].replace(/\\n/g, '\n');
    let qExplanation = match[9].replace(/\\n/g, '\n');
    
    questions.push({
      id: id,
      language: match[2],
      difficulty: parseInt(match[3]),
      category: match[4],
      statement_type: match[5],
      content: qContent,
      context: match[7],
      answer: parseInt(match[8]),
      explanation: qExplanation
    });
  }
}

// Se o regex não funcionou bem, tenta extrair manualmente usando JSON.parse parcial
if (questions.length < 50) {
  console.error('Regex não extraiu questões suficientes, tentando método alternativo...');
  
  // Divide por linhas e procura por blocos JSON
  const lines = content.split('\n');
  let currentQuestion = null;
  let braceCount = 0;
  let inString = false;
  let escapeNext = false;
  let buffer = '';
  
  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (escapeNext) {
        buffer += char;
        escapeNext = false;
        continue;
      }
      
      if (char === '\\') {
        escapeNext = true;
        buffer += char;
        continue;
      }
      
      if (char === '"') {
        inString = !inString;
        buffer += char;
      } else if (!inString) {
        if (char === '{') {
          if (braceCount === 0) {
            buffer = '{';
          } else {
            buffer += char;
          }
          braceCount++;
        } else if (char === '}') {
          buffer += char;
          braceCount--;
          if (braceCount === 0 && buffer.includes('"id":')) {
            try {
              const obj = JSON.parse(buffer);
              if (obj.id && !seen.has(obj.id) && obj.language && obj.difficulty && obj.answer !== undefined) {
                questions.push(obj);
                seen.add(obj.id);
              }
            } catch (e) {
              // Ignora erros de parse
            }
            buffer = '';
          }
        } else {
          buffer += char;
        }
      } else {
        buffer += char;
      }
    }
    
    if (!inString) {
      buffer += '\n';
    }
  }
}

// Remove duplicatas finais baseado em ID
const uniqueQuestions = [];
const finalSeen = new Set();
for (const q of questions) {
  if (!finalSeen.has(q.id)) {
    uniqueQuestions.push(q);
    finalSeen.add(q.id);
  }
}

// Ordena por ID
uniqueQuestions.sort((a, b) => {
  const langA = a.id.split('-')[0];
  const langB = b.id.split('-')[0];
  const numA = parseInt(a.id.split('-')[1]);
  const numB = parseInt(b.id.split('-')[1]);
  
  if (langA !== langB) {
    return langA.localeCompare(langB);
  }
  return numA - numB;
});

console.log(`Total de questões únicas: ${uniqueQuestions.length}`);

// Salva o JSON limpo
const output = {
  questions: uniqueQuestions
};

fs.writeFileSync('src/data/questions.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Arquivo questions.json limpo e corrigido!');
