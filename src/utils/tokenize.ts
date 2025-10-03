type Token = { text: string; type: string };

const regexRules: Record<string, RegExp> = {
  javascript: /(\/\/.*$)|('(?:\\'|[^'])*'|"(?:\\"|[^"])*")|\b(const|let|var|function|if|else|return|for|while|switch|case|break|new|this)\b|(\b\d+\b)/gm,

  python: /(#[^\n]*)|("""[\s\S]*?"""|"(?:\\"|[^"])*"|'(?:\\'|[^'])*')|\b(def|class|if|else|elif|return|for|while|import|from|as|with|try|except|finally|print|in|is|and|or|not)\b|(\b\d+\b)/gm,

  java: /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:\\"|[^"])*")|\b(class|public|private|protected|static|final|void|int|String|new|if|else|for|while|return)\b|(\b\d+\b)/gm,

  cpp: /(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:\\"|[^"])*")|\b(int|float|double|char|class|public|private|protected|virtual|if|else|for|while|return|new|delete)\b|(\b\d+\b)/gm,

  sql: /(#[^\n]*|--[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\"|[^"])*"|'(?:\\'|[^'])*')|\b(SELECT|FROM|WHERE|INSERT|INTO|VALUES|UPDATE|DELETE|JOIN|ON|AS|AND|OR|NOT|NULL)\b|(\b\d+\b)/gim,

  html: /(<!--[\s\S]*?-->)|(<[a-zA-Z\/][^>]*>)|("(?:\\"|[^"])*")/gm,

  css: /(\/\*[\s\S]*?\*\/)|([a-zA-Z-]+\s*:)|(#\w+|\.\w+)|("(?:\\"|[^"])*")/gm,

  json: /("(?:\\"|[^"])*")\s*(:)?|(\b\d+\b|true|false|null)/gm,

  bash: /(#.*$)|("(?:\\"|[^"])*"|'(?:\\'|[^'])*')|\b(echo|cd|ls|pwd|if|then|else|fi|for|in|do|done|exit)\b/gm,
};

export const tokenize = (lang: string, code: string): Token[] => {
  const regex = regexRules[lang.toLowerCase()] || regexRules["javascript"];
  const segments: Token[] = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ text: code.substring(lastIndex, match.index), type: "default" });
    }

    if (match[1]) segments.push({ text: match[1], type: "comment" });
    else if (match[2]) segments.push({ text: match[2], type: "string" });
    else if (match[3]) segments.push({ text: match[3], type: "keyword" });
    else if (match[4]) segments.push({ text: match[4], type: "number" });
    else segments.push({ text: match[0], type: "default" });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < code.length) {
    segments.push({ text: code.substring(lastIndex), type: "default" });
  }

  return segments;
};
