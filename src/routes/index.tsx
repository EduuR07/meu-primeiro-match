import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, BarChart3, CheckCircle2, ClipboardCopy, Download, FileText, KeyRound,
  Lightbulb, RotateCcw, Sparkles, Trash2, TrendingUp, AlertTriangle, Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { analyze, validate, type AnalysisResult } from "@/lib/ats";
import { reorganizeResume } from "@/lib/resume";
import { exportResumePdf } from "@/lib/pdf";
import { EXAMPLE_JOB, EXAMPLE_RESUME } from "@/data/examples";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MeuPrimeiroMatch — Análise de currículo ATS" },
      { name: "description", content: "Compare seu currículo com a vaga, descubra palavras-chave e gere um currículo organizado em PDF. Para primeiro emprego, estágio e jovem aprendiz." },
      { property: "og:title", content: "MeuPrimeiroMatch — Seu talento no caminho certo" },
      { property: "og:description", content: "Análise gratuita e local de compatibilidade entre currículo e vaga." },
    ],
  }),
  component: App,
});

type Step = "home" | "form" | "results" | "resume";
const OPPS = ["Primeiro emprego", "Estágio", "Jovem aprendiz"];

function Logo() {
  return (
    <span className="flex items-center gap-2 font-extrabold text-lg text-primary">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><TrendingUp className="h-5 w-5" aria-hidden /></span>
      MeuPrimeiro<span className="text-accent -ml-2">Match</span>
    </span>
  );
}

function App() {
  const [step, setStep] = useState<Step>("home");
  const [opp, setOpp] = useState("");
  const [area, setArea] = useState("");
  const [job, setJob] = useState("");
  const [resume, setResume] = useState("");
  const [errors, setErrors] = useState<{ opp?: string; job?: string; resume?: string }>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [optimized, setOptimized] = useState("");
  const [notice, setNotice] = useState("");

  const go = (s: Step) => { setStep(s); window.scrollTo({ top: 0 }); };
  const clearAll = () => {
    setOpp(""); setArea(""); setJob(""); setResume(""); setErrors({}); setResult(null); setOptimized(""); setNotice("");
  };
  const submit = () => {
    const e: { opp?: string; job?: string; resume?: string } = { ...validate(job, resume) };
    if (!opp) e.opp = "Selecione o tipo de oportunidade.";
    setErrors(e);
    if (Object.keys(e).length) return;
    setResult(analyze(job, resume));
    go("results");
  };
  const copy = async () => {
    try { await navigator.clipboard.writeText(optimized); setNotice("Currículo copiado!"); }
    catch { setNotice("Não foi possível copiar. Selecione o texto e copie manualmente."); }
  };
  const pdf = () => {
    if (!optimized.trim()) return setNotice("O currículo está vazio.");
    try { exportResumePdf(optimized); setNotice("PDF gerado com sucesso."); }
    catch { setNotice("Falha ao gerar o PDF. Tente novamente."); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-10 border-b bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <button onClick={() => go("home")} aria-label="Página inicial"><Logo /></button>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-muted-foreground">
            <a href="#como-funciona" onClick={() => setStep("home")} className="hover:text-primary">Como funciona</a>
            <a href="#recursos" onClick={() => setStep("home")} className="hover:text-primary">Recursos</a>
            <a href="#sobre" onClick={() => setStep("home")} className="hover:text-primary">Sobre</a>
          </nav>
          <Button onClick={() => go("form")}>Começar agora</Button>
        </div>
      </header>

      <main className="flex-1">
        {step === "home" && <Home onStart={() => go("form")} />}

        {step === "form" && (
          <section className="mx-auto max-w-3xl px-4 py-10">
            <h1 className="text-3xl font-bold text-primary">Nova análise</h1>
            <p className="mt-2 text-muted-foreground">Seus dados ficam apenas no seu navegador.</p>
            <div className="mt-6 space-y-6 rounded-2xl border bg-card p-6 shadow-sm">
              <fieldset>
                <legend className="font-semibold">Tipo de oportunidade *</legend>
                <div className="mt-2 flex flex-wrap gap-2">
                  {OPPS.map((o) => (
                    <label key={o} className={`cursor-pointer rounded-full border px-4 py-2 text-sm font-medium has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring ${opp === o ? "border-primary bg-secondary text-primary" : ""}`}>
                      <input type="radio" name="opp" value={o} checked={opp === o} onChange={() => setOpp(o)} className="sr-only" />
                      {opp === o && "✓ "}{o}
                    </label>
                  ))}
                </div>
                {errors.opp && <Err msg={errors.opp} />}
              </fieldset>
              <div>
                <label htmlFor="area" className="font-semibold">Área de interesse <span className="font-normal text-muted-foreground">(opcional)</span></label>
                <input id="area" value={area} onChange={(e) => setArea(e.target.value)} placeholder="Ex.: Tecnologia, Administração, Logística…" className="mt-2 w-full rounded-lg border bg-card px-3 py-2.5" />
              </div>
              <Field id="job" label="Descrição da vaga *" value={job} onChange={setJob} error={errors.job} placeholder="Cole aqui a descrição completa da vaga" />
              <Field id="resume" label="Meu currículo *" value={resume} onChange={setResume} error={errors.resume} placeholder="Cole aqui o texto do seu currículo" rows={12} />
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => { setJob(EXAMPLE_JOB); setResume(EXAMPLE_RESUME); setOpp("Estágio"); setArea("Tecnologia"); setErrors({}); }}><FileText /> Usar exemplo</Button>
                  <Button variant="ghost" onClick={clearAll}><Trash2 /> Limpar dados</Button>
                </div>
                <Button size="lg" onClick={submit}>Analisar compatibilidade <ArrowRight /></Button>
              </div>
            </div>
          </section>
        )}

        {step === "results" && result && (
          <section className="mx-auto max-w-5xl px-4 py-10">
            <h1 className="text-3xl font-bold text-primary">Resultados da análise</h1>
            <p className="mt-1 text-muted-foreground">{opp}{area && ` · ${area}`}</p>
            {result.score === null ? (
              <div className="mt-6 rounded-2xl border border-warning bg-warning-soft p-6">
                <p className="font-semibold text-warning-strong flex gap-2"><AlertTriangle aria-hidden /> Não foi possível realizar uma análise confiável.</p>
                <p className="mt-2 text-sm">Não identificamos requisitos reconhecíveis na descrição da vaga. Tente colar a descrição completa, com requisitos e atividades.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-6 md:grid-cols-[260px_1fr] items-center rounded-2xl border bg-card p-6 shadow-sm">
                <ScoreRing value={result.score} />
                <div>
                  <h2 className="text-xl font-semibold">Resumo</h2>
                  <p className="mt-2 text-muted-foreground">
                    Identificamos <strong className="text-foreground">{result.required.length}</strong> requisitos na vaga. Seu currículo menciona <strong className="text-foreground">{result.found.length}</strong> deles
                    {result.missing.length ? ` e ${result.missing.length} não foram identificados.` : "."} A ausência de uma palavra-chave não significa que você não tenha a competência.
                  </p>
                </div>
              </div>
            )}
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <TagCard title="Palavras-chave encontradas" icon={<CheckCircle2 aria-hidden />} items={result.found} tone="success" empty="Nenhuma palavra-chave da vaga foi encontrada." />
              <TagCard title="Palavras-chave ausentes" icon={<AlertTriangle aria-hidden />} items={result.missing} tone="warning" empty="Nenhum requisito ausente." />
            </div>
            <div className="mt-6 rounded-2xl border-l-4 border-primary bg-card p-6 shadow-sm">
              <h2 className="flex items-center gap-2 font-semibold text-primary"><Lightbulb aria-hidden /> Recomendações</h2>
              <ul className="mt-3 space-y-2 text-sm list-disc pl-5">{result.recommendations.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
            <Disclaimer text="Esta análise representa uma estimativa simplificada de compatibilidade textual. Não corresponde à avaliação oficial de um ATS e não garante aprovação em processos seletivos." />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => { setOptimized(reorganizeResume(resume)); setNotice(""); go("resume"); }}><Sparkles /> Gerar currículo otimizado</Button>
              <Button size="lg" variant="outline" onClick={() => go("form")}><RotateCcw /> Fazer nova análise</Button>
            </div>
          </section>
        )}

        {step === "resume" && (
          <section className="mx-auto max-w-4xl px-4 py-10">
            <h1 className="text-3xl font-bold text-primary">Currículo otimizado</h1>
            <p className="mt-2 text-muted-foreground">Reorganizamos seções e espaçamentos do seu texto. Edite o que quiser antes de exportar.</p>
            <Disclaimer text="Revise seu currículo antes de enviar. A ferramenta reorganiza as informações fornecidas, mas não verifica sua veracidade." />
            <label htmlFor="opt" className="sr-only">Currículo otimizado editável</label>
            <textarea id="opt" value={optimized} onChange={(e) => setOptimized(e.target.value)} rows={22} className="mt-4 w-full rounded-2xl border bg-card p-5 font-mono text-sm leading-relaxed shadow-sm" />
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={pdf}><Download /> Baixar PDF</Button>
              <Button size="lg" variant="outline" onClick={copy}><ClipboardCopy /> Copiar currículo</Button>
              <Button size="lg" variant="ghost" onClick={() => go("results")}>Voltar aos resultados</Button>
              <Button size="lg" variant="ghost" onClick={() => { clearAll(); go("home"); }}><Trash2 /> Limpar meus dados</Button>
            </div>
            <p role="status" aria-live="polite" className="mt-3 text-sm font-medium text-primary">{notice}</p>
          </section>
        )}
      </main>

      <footer id="sobre" className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-muted-foreground space-y-2">
          <Logo />
          <p>Seu talento no caminho certo. Ferramenta gratuita para estudantes em busca do primeiro emprego, estágio ou jovem aprendiz. Tudo é processado no seu navegador.</p>
          <p>O MeuPrimeiroMatch oferece uma estimativa de compatibilidade textual e não garante aprovação em processos seletivos.</p>
        </div>
      </footer>
    </div>
  );
}

function Home({ onStart }: { onStart: () => void }) {
  const benefits = [
    { icon: BarChart3, t: "Análise de compatibilidade", d: "Veja o quanto seu currículo combina com a vaga." },
    { icon: KeyRound, t: "Palavras-chave", d: "Descubra os requisitos que a vaga destaca." },
    { icon: Lightbulb, t: "Recomendações", d: "Sugestões práticas baseadas no seu texto." },
    { icon: FileText, t: "Currículo para ATS", d: "Versão organizada e pronta em PDF." },
  ];
  return (
    <>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-20">
        <div>
          <span className="inline-block rounded-full bg-secondary px-3 py-1 text-sm font-medium text-primary">Seu talento no caminho certo</span>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">Seu currículo mais alinhado. <span className="text-primary">Suas oportunidades mais perto.</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Descubra como seu currículo combina com uma vaga e receba sugestões para destacar suas habilidades, cursos e projetos, mesmo sem experiência profissional.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onStart}>Analisar meu currículo <ArrowRight /></Button>
            <Button size="lg" variant="outline" asChild><a href="#como-funciona">Como funciona</a></Button>
          </div>
        </div>
        <div aria-hidden className="relative mx-auto w-full max-w-sm">
          <div className="rounded-2xl border bg-card p-6 shadow-lg">
            <div className="h-3 w-24 rounded bg-primary/80" />
            <div className="mt-4 space-y-2">{[90, 75, 85, 60].map((w) => <div key={w} className="h-2 rounded bg-border" style={{ width: `${w}%` }} />)}</div>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Excel", "Comunicação", "SQL"].map((t) => <span key={t} className="rounded-full bg-success-soft px-3 py-1 text-xs font-medium text-success-strong">✓ {t}</span>)}
              <span className="rounded-full bg-warning-soft px-3 py-1 text-xs font-medium text-warning-strong">! Inglês</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-4 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lg">
            <div className="text-3xl font-extrabold">78%</div><div className="text-xs opacity-90">compatível</div>
          </div>
        </div>
      </section>
      <section id="recursos" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary">Recursos</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ icon: I, t, d }) => (
            <div key={t} className="rounded-2xl border bg-card p-5 shadow-sm">
              <I className="h-7 w-7 text-primary" aria-hidden />
              <h3 className="mt-3 font-semibold">{t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="como-funciona" className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold text-primary">Como funciona</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {["Cole a descrição da vaga.", "Insira seu currículo.", "Receba a análise e gere uma versão otimizada."].map((t, i) => (
            <li key={t} className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-sm">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary font-bold text-primary-foreground">{i + 1}</span>
              <span className="font-medium">{t}</span>
            </li>
          ))}
        </ol>
        <Button size="lg" className="mt-8" onClick={onStart}>Começar agora <ArrowRight /></Button>
      </section>
    </>
  );
}

function Field(p: { id: string; label: string; value: string; onChange: (v: string) => void; error?: string | undefined; placeholder: string; rows?: number }) {
  return (
    <div>
      <div className="flex justify-between">
        <label htmlFor={p.id} className="font-semibold">{p.label}</label>
        <span className="text-xs text-muted-foreground">{p.value.length} caracteres</span>
      </div>
      <textarea id={p.id} value={p.value} rows={p.rows ?? 8} onChange={(e) => p.onChange(e.target.value)} placeholder={p.placeholder}
        aria-invalid={!!p.error} aria-describedby={p.error ? `${p.id}-err` : undefined}
        className={`mt-2 w-full rounded-lg border bg-card p-3 text-sm ${p.error ? "border-destructive" : ""}`} />
      {p.error && <Err id={`${p.id}-err`} msg={p.error} />}
    </div>
  );
}

function Err({ msg, id }: { msg: string; id?: string | undefined }) {
  return <p id={id} role="alert" className="mt-1 flex items-center gap-1 text-sm font-medium text-destructive"><AlertTriangle className="h-4 w-4" aria-hidden /> {msg}</p>;
}

function Disclaimer({ text }: { text: string }) {
  return <p className="mt-6 flex gap-2 rounded-xl bg-secondary p-4 text-sm text-secondary-foreground"><Info className="h-5 w-5 shrink-0" aria-hidden />{text}</p>;
}

function ScoreRing({ value }: { value: number }) {
  const c = 2 * Math.PI * 52;
  return (
    <div className="relative mx-auto h-44 w-44" role="img" aria-label={`Compatibilidade estimada de ${value}%`}>
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
        <circle cx="60" cy="60" r="52" strokeWidth="12" className="fill-none stroke-border" />
        <circle cx="60" cy="60" r="52" strokeWidth="12" strokeLinecap="round" className="fill-none stroke-primary transition-all" strokeDasharray={c} strokeDashoffset={c * (1 - value / 100)} />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div><div className="text-4xl font-extrabold text-primary">{value}%</div><div className="text-xs text-muted-foreground">compatibilidade</div></div>
      </div>
    </div>
  );
}

function TagCard({ title, icon, items, tone, empty }: { title: string; icon: React.ReactNode; items: string[]; tone: "success" | "warning"; empty: string }) {
  const s = tone === "success"
    ? { border: "border-t-success", text: "text-success-strong", chip: "bg-success-soft text-success-strong", mark: "✓" }
    : { border: "border-t-warning", text: "text-warning-strong", chip: "bg-warning-soft text-warning-strong", mark: "!" };
  return (
    <div className={`rounded-2xl border border-t-4 ${s.border} bg-card p-6 shadow-sm`}>
      <h2 className={`flex items-center gap-2 font-semibold ${s.text}`}>{icon} {title} ({items.length})</h2>
      {items.length ? (
        <ul className="mt-3 flex flex-wrap gap-2">{items.map((i) => <li key={i} className={`rounded-full px-3 py-1 text-sm font-medium ${s.chip}`}>{s.mark} {i}</li>)}</ul>
      ) : <p className="mt-3 text-sm text-muted-foreground">{empty}</p>}
    </div>
  );
}
