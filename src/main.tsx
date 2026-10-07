import React from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, CheckCircle2, Globe2, MessageCircle, Scale, ShieldCheck, Users } from "lucide-react";
import "./styles.css";

const phone = "351937575254";
const email = "lucsilverio-67448l@adv.oa.pt";
const waText = "Ola Dra. Luciana, gostaria de falar sobre o meu processo de imigracao em Portugal.";
const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(waText)}`;

const services = [
  "Autorizacao de Residencia",
  "Visto de Trabalho",
  "CPLP",
  "Reagrupamento Familiar",
  "Nacionalidade Portuguesa",
  "Processos AIMA",
  "Consultoria em Imigracao",
  "Recursos Administrativos",
];

const pillars = [
  [Scale, "Dupla inscricao", "Portugal, Ordem dos Advogados 67448L, e Brasil, OAB/SP 404.150."],
  [Globe2, "Atendimento internacional", "Português, English e Español para clientes de diversos paises."],
  [Users, "Acompanhamento proximo", "Do primeiro contacto ao protocolo e conclusao possivel do caso."],
] as const;

function App() {
  return (
    <main>
      <section className="hero">
        <nav>
          <strong>Luciana Silverio</strong>
          <a href={waUrl} target="_blank" rel="noreferrer">WhatsApp</a>
        </nav>
        <div className="heroGrid">
          <div>
            <p className="eyebrow"><ShieldCheck size={16} /> Advocacia · Direito Migratorio · Portugal</p>
            <h1>Seguranca juridica para o seu percurso migratorio em Portugal.</h1>
            <p className="lead">Atendimento especializado para quem deseja viver, trabalhar ou regularizar a sua situacao em Portugal, com estrategia, transparencia e acompanhamento proximo.</p>
            <div className="actions">
              <a className="button primary" href={waUrl} target="_blank" rel="noreferrer"><MessageCircle size={20} /> Falar no WhatsApp</a>
              <a className="button secondary" href={`mailto:${email}`}>Enviar email</a>
            </div>
          </div>
          <aside className="credentialCard">
            <div className="monogram">LS</div>
            <h2>Luciana Silverio</h2>
            <p>Advogada de imigração em Portugal</p>
            <ul>
              <li><CheckCircle2 size={18} /> Cedula Profissional 67448L</li>
              <li><CheckCircle2 size={18} /> OAB/SP 404.150</li>
              <li><CheckCircle2 size={18} /> Lisboa, Portugal</li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="section intro">
        <p className="eyebrow">Podemos ajudar voce se...</p>
        <h2>A sua situacao em Portugal pode ter uma via juridica segura.</h2>
        <div className="chips">
          {["Estou a trabalhar sem documentos", "O meu processo esta parado na AIMA", "Quero trazer a minha familia", "Quero morar legalmente em Portugal"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="section services">
        <div>
          <p className="eyebrow">Servicos</p>
          <h2>Pratica integral em Direito Internacional Privado, com foco em Portugal.</h2>
        </div>
        <div className="serviceGrid">
          {services.map((service, index) => (
            <article key={service}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="section pillars">
        {pillars.map(([Icon, title, desc]) => (
          <article key={title}>
            <Icon />
            <h3>{title}</h3>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <section className="section cta">
        <p className="eyebrow">Proximo passo</p>
        <h2>O seu caso de imigracao em Portugal merece orientacao estrategica.</h2>
        <p>Decisoes certas hoje evitam atrasos, perdas e problemas futuros com o seu estatuto.</p>
        <a className="button primary" href={waUrl} target="_blank" rel="noreferrer">Falar com a Dra. Luciana <ArrowUpRight size={18} /></a>
      </section>

      <footer>
        <strong>Luciana Silverio</strong>
        <span>{email}</span>
        <span>+351 937 575 254</span>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<React.StrictMode><App /></React.StrictMode>);
