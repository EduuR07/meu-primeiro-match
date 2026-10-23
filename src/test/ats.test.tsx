import { describe, expect, it } from "vitest";
import { analyze } from "@/lib/ats";
import { reorganizeResume } from "@/lib/resume";

describe("ATS", () => {
  it("score = encontrados / requisitos", () => {
    const r = analyze("Requisitos: Excel, SQL, inglês e trabalho em equipe.", "Sei Microsoft Excel e trabalho em equipe.");
    expect(r.required.length).toBe(4);
    expect(r.found).toEqual(expect.arrayContaining(["Excel", "Trabalho em equipe"]));
    expect(r.score).toBe(50);
  });
  it("sem requisitos não gera pontuação", () => {
    expect(analyze("Venha fazer parte do nosso time incrível.", "texto").score).toBeNull();
  });
  it("reorganização não perde conteúdo", () => {
    const out = reorganizeResume("Ana\nhabilidades\nExcel\nlinha desconhecida\nformação\nEnsino médio");
    for (const t of ["Ana", "Excel", "linha desconhecida", "Ensino médio", "FORMAÇÃO ACADÊMICA"]) expect(out).toContain(t);
  });
});
