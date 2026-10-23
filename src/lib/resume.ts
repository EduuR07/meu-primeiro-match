import { normalize } from "./ats";

const SECTIONS: { title: string; keys: string[] }[] = [
  { title: "OBJETIVO PROFISSIONAL", keys: ["objetivo", "objetivo profissional", "resumo", "resumo profissional", "perfil", "sobre mim"] },
  { title: "FORMAÇÃO ACADÊMICA", keys: ["formacao", "formacao academica", "escolaridade", "educacao"] },
  { title: "EXPERIÊNCIA PROFISSIONAL", keys: ["experiencia", "experiencias", "experiencia profissional", "historico profissional"] },
  { title: "PROJETOS ACADÊMICOS", keys: ["projetos", "projetos academicos", "projeto", "projetos pessoais"] },
  { title: "CURSOS E CERTIFICAÇÕES", keys: ["cursos", "certificacoes", "cursos e certificacoes", "cursos complementares", "certificados"] },
  { title: "HABILIDADES E COMPETÊNCIAS", keys: ["habilidades", "competencias", "habilidades e competencias", "conhecimentos", "skills"] },
  { title: "IDIOMAS", keys: ["idiomas", "idioma"] },
  { title: "INFORMAÇÕES ADICIONAIS", keys: ["informacoes adicionais", "outras informacoes", "atividades", "voluntariado"] },
];

function headingOf(line: string): string | null {
  const n = normalize(line.replace(/[:#*\-_=]+$/g, "")).trim();
  if (!n || n.length > 40) return null;
  return SECTIONS.find((s) => s.keys.includes(n))?.title ?? null;
}

/** Reorganiza o currículo sem remover nem inventar conteúdo. */
export function reorganizeResume(text: string): string {
  const lines = text.replace(/\r/g, "").split("\n").map((l) => l.replace(/\s+/g, " ").trim());
  const header: string[] = [];
  const blocks = new Map<string, string[]>();
  let current: string | null = null;
  for (const line of lines) {
    const h = headingOf(line);
    if (h) {
      current = h;
      if (!blocks.has(h)) blocks.set(h, []);
      continue;
    }
    if (current) blocks.get(current)!.push(line);
    else header.push(line);
  }
  const clean = (arr: string[]) =>
    arr.join("\n").replace(/\n{3,}/g, "\n\n").trim();

  const out: string[] = [];
  const head = clean(header);
  if (head) out.push(blocks.size ? `DADOS PESSOAIS E CONTATO\n${head}` : head);
  for (const s of SECTIONS) {
    const body = blocks.has(s.title) ? clean(blocks.get(s.title)!) : "";
    if (body) out.push(`${s.title}\n${body}`);
  }
  return out.join("\n\n");
}
