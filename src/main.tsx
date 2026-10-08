import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowUpRight, Award, Briefcase, CheckCircle2, FileText, Globe2, Languages, Menu, MessageCircle, Scale, ShieldCheck, Stamp, Users, X } from 'lucide-react';
import './styles.css';

type Lang = 'pt' | 'en' | 'es';
type Country = 'pt' | 'br' | 'pk' | 'bd' | 'np';

type Copy = {
  nav: string[];
  hero: { eyebrow: string; title: string; subtitle: string; primary: string; secondary: string; stats: string[] };
  help: { eyebrow: string; title: string; lead: string; items: string[] };
  about: { eyebrow: string; title: string; paragraphs: string[]; timeline: string[] };
  services: { eyebrow: string; title: string; lead: string; items: { title: string; desc: string }[] };
  why: { eyebrow: string; title: string; items: { title: string; desc: string }[] };
  testimonials: { eyebrow: string; title: string; items: { name: string; country: string; text: string }[] };
  process: { eyebrow: string; title: string; lead: string; steps: { title: string; desc: string }[] };
  faq: { eyebrow: string; title: string; items: { q: string; a: string }[] };
  cta: { eyebrow: string; title: string; lead: string };
};

const PHONE = '351937575254';
const CONTACT_EMAIL = 'lucsilverio-67448l@adv.oa.pt';
const langs: { code: Lang; label: string }[] = [{ code: 'pt', label: 'PT' }, { code: 'en', label: 'EN' }, { code: 'es', label: 'ES' }];
const countries: { code: Country; label: string; flag: string }[] = [
  { code: 'pt', label: 'Portugal', flag: 'PT' },
  { code: 'br', label: 'Brasil', flag: 'BR' },
  { code: 'pk', label: 'Pakistan', flag: 'PK' },
  { code: 'bd', label: 'Bangladesh', flag: 'BD' },
  { code: 'np', label: 'Nepal', flag: 'NP' },
];

const base: Record<Lang, Copy> = {
  pt: {
    nav: ['Sobre', 'Servicos', 'Processo', 'Perguntas', 'Contacto'],
    hero: { eyebrow: 'Advocacia · Direito Migratorio · Portugal', title: 'Seguranca juridica para o seu percurso migratorio em Portugal.', subtitle: 'Atendimento especializado para quem deseja viver, trabalhar ou regularizar a sua situacao em Portugal, com estrategia, transparencia e acompanhamento proximo.', primary: 'Falar no WhatsApp', secondary: 'Agendar consulta', stats: ['+9 anos de advocacia', '+3.000 casos acompanhados', 'Lisboa · Portugal'] },
    help: { eyebrow: 'Podemos ajudar voce se...', title: 'A sua situacao em Portugal pode ter uma via juridica segura.', lead: 'O primeiro passo e analisar o seu caso com estrategia e responsabilidade.', items: ['Estou a trabalhar sem documentos', 'O meu processo esta parado na AIMA', 'Preciso iniciar a minha regularizacao', 'Quero trazer a minha familia para Portugal', 'Quero um visto de trabalho', 'Quero morar legalmente em Portugal'] },
    about: { eyebrow: 'Sobre', title: 'Pratica tecnica com a sensibilidade de quem tambem e imigrante.', paragraphs: ['Ha mais de 9 anos iniciei a minha trajetoria na advocacia, no Brasil, com atuacao tecnica em ambiente empresarial e atendimento a clientes nacionais e internacionais.', 'Em Portugal, direcionei a minha pratica para o Direito Migratorio, acompanhando pessoas e familias que procuram regularizar a sua situacao, obter vistos, reunir familiares, requerer nacionalidade portuguesa ou resolver processos pendentes perante a AIMA.', 'A minha propria experiencia como imigrante tornou esta atuacao ainda mais proxima e consciente. Um processo migratorio envolve estabilidade, trabalho, familia e projeto de vida.'], timeline: ['Trajetoria iniciada na advocacia no Brasil', 'Pratica direcionada ao Direito Migratorio em Portugal', 'Mais de 3.000 casos em imigracao, residencia e nacionalidade', 'Atendimento estrategico, proximo e online'] },
    services: { eyebrow: 'Servicos', title: 'Pratica integral em Direito Internacional Privado, com foco em imigracao para Portugal.', lead: 'Acompanhamento desde a primeira analise ate ao final do seu caso, com explicacao clara sobre riscos, prazos e proximos passos.', items: serviceItemsPt() },
    why: { eyebrow: 'Porque nos', title: 'Uma pratica construida para reduzir a incerteza de quem recomeca.', items: whyItemsPt() },
    testimonials: { eyebrow: 'Depoimentos', title: 'Imigrantes de todo o mundo confiam a sua vida em Portugal a nossa pratica.', items: testimonialsPt() },
    process: { eyebrow: 'Processo', title: 'Cinco etapas, do primeiro contacto a sua nova vida em Portugal.', lead: 'Atendimento maioritariamente online. Portugal e estrangeiro.', steps: processPt() },
    faq: { eyebrow: 'Perguntas frequentes', title: 'Respostas claras antes da nossa primeira conversa.', items: faqPt() },
    cta: { eyebrow: 'Proximo passo', title: 'O seu caso de imigracao em Portugal merece seguranca juridica.', lead: 'Decisoes certas hoje evitam atrasos, perdas e problemas futuros com o seu estatuto.' },
  },
  en: {
    nav: ['About', 'Services', 'Process', 'FAQ', 'Contact'],
    hero: { eyebrow: 'Law Firm · Immigration to Portugal', title: 'Regularize your situation in Portugal with legal security.', subtitle: 'Specialized legal support for those who wish to live, work or regularize their status in Portugal, with strategy, transparency and close guidance.', primary: 'Chat on WhatsApp', secondary: 'Book consultation', stats: ['+9 years practicing law', '+3,000 cases handled', 'Lisbon · Portugal'] },
    help: { eyebrow: 'We can help you if...', title: 'There is a legal path for your situation in Portugal.', lead: 'Every case has a safer route. Identify your scenario and reach out.', items: ['I am working without documents', 'My AIMA case is stuck', 'I need to start regularization', 'I want to bring my family to Portugal', 'I want a work visa', 'I want to live legally in Portugal'] },
    about: { eyebrow: 'About', title: 'Technical legal practice with the sensitivity of someone who is also an immigrant.', paragraphs: ['Luciana Silverio began her legal career in Brazil, working with national and international clients.', 'In Portugal, her practice focuses on immigration law and private international law, supporting people and families through residence, visas, family reunification, citizenship and AIMA proceedings.', 'The work is strategic, transparent and human, because immigration is not just paperwork: it affects work, family and life plans.'], timeline: ['Legal career started in Brazil', 'Practice focused on immigration law in Portugal', 'More than 3,000 immigration and residence cases', 'Strategic online service based in Lisbon'] },
    services: { eyebrow: 'Services', title: 'Full private international law practice, focused on immigration to Portugal.', lead: 'Support from the first assessment to the end of your case, with clear risks, deadlines and next steps.', items: serviceItemsEn() },
    why: { eyebrow: 'Why us', title: 'A law practice built to reduce the uncertainty of starting over.', items: whyItemsEn() },
    testimonials: { eyebrow: 'Testimonials', title: 'Immigrants from around the world trust their life in Portugal to this practice.', items: testimonialsEn() },
    process: { eyebrow: 'Process', title: 'Five steps, from first contact to your new life in Portugal.', lead: 'Mostly online service. Portugal and abroad.', steps: processEn() },
    faq: { eyebrow: 'Frequently asked', title: 'Clear answers before our first conversation.', items: faqEn() },
    cta: { eyebrow: 'Next step', title: 'Your immigration case in Portugal deserves legal security.', lead: 'The right decisions early prevent delays, losses and future problems with your status.' },
  },
  es: {
    nav: ['Sobre', 'Servicios', 'Proceso', 'Preguntas', 'Contacto'],
    hero: { eyebrow: 'Abogacia · Inmigracion a Portugal', title: 'Regularice su situacion en Portugal con seguridad juridica.', subtitle: 'Atencion especializada para quienes desean vivir, trabajar o regularizar su situacion en Portugal, con estrategia, transparencia y acompanamiento cercano.', primary: 'Hablar por WhatsApp', secondary: 'Agendar consulta', stats: ['+9 anos de abogacia', '+3.000 casos atendidos', 'Lisboa · Portugal'] },
    help: { eyebrow: 'Podemos ayudarle si...', title: 'Existe un camino legal para su situacion en Portugal.', lead: 'Cada caso tiene una via segura. Identifique su escenario y contactenos.', items: ['Estoy trabajando sin documentos', 'Mi proceso en AIMA esta parado', 'Necesito iniciar mi regularizacion', 'Quiero traer a mi familia a Portugal', 'Quiero un visado de trabajo', 'Quiero vivir legalmente en Portugal'] },
    about: { eyebrow: 'Sobre', title: 'Practica tecnica con la sensibilidad de quien tambien es inmigrante.', paragraphs: ['Luciana Silverio inicio su carrera juridica en Brasil, con actuacion tecnica y clientes nacionales e internacionales.', 'En Portugal enfoco su practica en Derecho Migratorio, acompanando personas y familias en residencia, visados, reagrupacion, nacionalidad y procesos ante AIMA.', 'Cada caso se trata con estrategia, claridad sobre riesgos y acompanamiento responsable.'], timeline: ['Carrera juridica iniciada en Brasil', 'Practica dirigida a inmigracion en Portugal', 'Mas de 3.000 casos migratorios', 'Atencion estrategica online desde Lisboa'] },
    services: { eyebrow: 'Servicios', title: 'Practica integral en Derecho Internacional Privado, enfocada en inmigracion a Portugal.', lead: 'Acompanamiento desde el primer analisis hasta el cierre de su caso, con riesgos, plazos y pasos claros.', items: serviceItemsEs() },
    why: { eyebrow: 'Por que nosotros', title: 'Una practica construida para reducir la incertidumbre de empezar de nuevo.', items: whyItemsEs() },
    testimonials: { eyebrow: 'Testimonios', title: 'Inmigrantes de todo el mundo confian su vida en Portugal a esta practica.', items: testimonialsEs() },
    process: { eyebrow: 'Proceso', title: 'Cinco pasos, del primer contacto a su nueva vida en Portugal.', lead: 'Atencion principalmente online. Portugal y extranjero.', steps: processEs() },
    faq: { eyebrow: 'Preguntas frecuentes', title: 'Respuestas claras antes de nuestra primera conversacion.', items: faqEs() },
    cta: { eyebrow: 'Proximo paso', title: 'Su caso migratorio en Portugal merece seguridad juridica.', lead: 'Tomar decisiones correctas hoy evita retrasos, perdidas y problemas futuros.' },
  },
};

const countryOverrides: Partial<Record<Country, Partial<Record<Lang, Partial<Copy>>>>> = {
  br: { pt: { hero: { ...base.pt.hero, eyebrow: 'Para brasileiros · Mudar para Portugal', title: 'Planeje sua mudanca para Portugal com seguranca juridica.', subtitle: 'Apoio completo para brasileiros que querem morar legalmente em Portugal: vistos, residencia, reagrupamento familiar e planejamento migratorio.' }, help: { ...base.pt.help, eyebrow: 'Para brasileiros', title: 'Do Brasil a Portugal, com cada etapa clara.' } } },
  pk: { en: { hero: { ...base.en.hero, eyebrow: 'For Pakistanis · Regularization in Portugal', title: 'Regularize your status and documents in Portugal.' } }, pt: { hero: { ...base.pt.hero, eyebrow: 'Para paquistaneses · Regularizacao em Portugal', title: 'Regularize a sua situacao e documentos em Portugal.' } } },
  bd: { en: { hero: { ...base.en.hero, eyebrow: 'For Bangladeshis · Legal security in Portugal', title: 'Regularize your life and work in Portugal.' } } },
  np: { en: { hero: { ...base.en.hero, eyebrow: 'For Nepalis · Living legally in Portugal', title: 'Live, work and reunite your family in Portugal with legal support.' } } },
};

function mergeCopy(lang: Lang, country: Country): Copy {
  const copy = base[lang];
  const override = countryOverrides[country]?.[lang];
  return override ? { ...copy, ...override, hero: { ...copy.hero, ...(override.hero || {}) }, help: { ...copy.help, ...(override.help || {}) } } : copy;
}

function waLink(message: string) { return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`; }

function App() {
  const [lang, setLang] = useState<Lang>('pt');
  const [country, setCountry] = useState<Country>('pt');
  const [menu, setMenu] = useState(false);
  const T = useMemo(() => mergeCopy(lang, country), [lang, country]);
  return <div data-country={country}><Header T={T} lang={lang} country={country} setLang={setLang} setCountry={setCountry} menu={menu} setMenu={setMenu} /><Hero T={T} country={country} /><Help T={T} /><About T={T} /><Services T={T} /><Why T={T} /><Testimonials T={T} /><Process T={T} /><FAQ T={T} /><CTA T={T} /><Footer T={T} /></div>;
}

function Header({ T, lang, country, setLang, setCountry, menu, setMenu }: { T: Copy; lang: Lang; country: Country; setLang: (l: Lang) => void; setCountry: (c: Country) => void; menu: boolean; setMenu: (m: boolean) => void }) {
  const ids = ['about', 'services', 'process', 'faq', 'contact'];
  return <header className="topbar"><a className="brand" href="#top"><span>LS</span><strong>Luciana Silverio</strong><small>OA 67448L · OAB/SP 404.150</small></a><nav className="desktop-nav">{T.nav.map((item, i) => <a key={item} href={`#${ids[i]}`}>{item}</a>)}</nav><div className="selectors"><select value={country} onChange={(e) => setCountry(e.target.value as Country)}>{countries.map((c) => <option value={c.code} key={c.code}>{c.flag}</option>)}</select><select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>{langs.map((l) => <option value={l.code} key={l.code}>{l.label}</option>)}</select><a className="primary small" href={waLink(T.hero.subtitle)} target="_blank"><MessageCircle size={16} /></a><button className="menu" onClick={() => setMenu(true)}><Menu /></button></div>{menu && <div className="drawer"><button className="close" onClick={() => setMenu(false)}><X /></button>{T.nav.map((item, i) => <a key={item} href={`#${ids[i]}`} onClick={() => setMenu(false)}>{item}</a>)}</div>}</header>;
}

function Hero({ T, country }: { T: Copy; country: Country }) { return <section id="top" className="hero"><div className="hero-bg" /><div className="hero-content"><p className="eyebrow"><ShieldCheck size={16} />{T.hero.eyebrow}</p><h1>{T.hero.title}</h1><p>{T.hero.subtitle}</p><div className="actions"><a className="primary" href={waLink(T.hero.subtitle)} target="_blank"><MessageCircle />{T.hero.primary}<ArrowUpRight /></a><a className="secondary" href={waLink('Gostaria de agendar uma consulta.')} target="_blank">{T.hero.secondary}</a></div><ul className="checks"><li><CheckCircle2 />Advogada inscrita em Portugal</li><li><CheckCircle2 />Atendimento internacional</li><li><CheckCircle2 />Processos AIMA</li></ul></div><div className="portrait"><div className="portrait-img">LS</div><h2>Luciana Silverio</h2><p>Advogada · Imigracao em Portugal</p><span>{country.toUpperCase()} mode</span></div><div className="stats">{T.hero.stats.map((item) => <strong key={item}>{item}</strong>)}</div></section>; }
function Help({ T }: { T: Copy }) { return <section className="section" id="help"><Label icon={<Users />} text={T.help.eyebrow} /><h2>{T.help.title}</h2><p className="lead">{T.help.lead}</p><div className="help-grid">{T.help.items.map((item) => <a key={item} href={waLink(item)} target="_blank"><CheckCircle2 />{item}</a>)}</div></section>; }
function About({ T }: { T: Copy }) { return <section className="section split" id="about"><div><Label icon={<Award />} text={T.about.eyebrow} /><h2>{T.about.title}</h2>{T.about.paragraphs.map((p) => <p key={p}>{p}</p>)}</div><ol className="timeline">{T.about.timeline.map((item, i) => <li key={item}><span>{String(i + 1).padStart(2, '0')}</span>{item}</li>)}</ol></section>; }
function Services({ T }: { T: Copy }) { const icons = [FileText, Briefcase, Globe2, Users, Award, Stamp, MessageCircle, Scale]; return <section className="section alt" id="services"><Label icon={<Scale />} text={T.services.eyebrow} /><h2>{T.services.title}</h2><p className="lead">{T.services.lead}</p><div className="service-grid">{T.services.items.map((item, i) => { const Icon = icons[i % icons.length]; return <article key={item.title}><Icon /><span>{String(i + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.desc}</p><a href={waLink(item.title)} target="_blank">WhatsApp <ArrowUpRight size={15} /></a></article>; })}</div></section>; }
function Why({ T }: { T: Copy }) { return <section className="section"><Label icon={<ShieldCheck />} text={T.why.eyebrow} /><h2>{T.why.title}</h2><div className="cards">{T.why.items.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.desc}</p></article>)}</div></section>; }
function Testimonials({ T }: { T: Copy }) { return <section className="section alt"><Label icon={<MessageCircle />} text={T.testimonials.eyebrow} /><h2>{T.testimonials.title}</h2><div className="cards testimonials">{T.testimonials.items.map((item) => <article key={item.name}><p>“{item.text}”</p><strong>{item.name}</strong><small>{item.country}</small></article>)}</div></section>; }
function Process({ T }: { T: Copy }) { return <section className="section split" id="process"><div><Label icon={<FileText />} text={T.process.eyebrow} /><h2>{T.process.title}</h2><p>{T.process.lead}</p></div><div className="process">{T.process.steps.map((step, i) => <article key={step.title}><span>{i + 1}</span><h3>{step.title}</h3><p>{step.desc}</p></article>)}</div></section>; }
function FAQ({ T }: { T: Copy }) { return <section className="section alt" id="faq"><Label icon={<Languages />} text={T.faq.eyebrow} /><h2>{T.faq.title}</h2><div className="faq">{T.faq.items.map((item) => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</div></section>; }
function CTA({ T }: { T: Copy }) { return <section className="cta" id="contact"><p className="eyebrow">{T.cta.eyebrow}</p><h2>{T.cta.title}</h2><p>{T.cta.lead}</p><a className="primary" href={waLink(T.cta.title)} target="_blank"><MessageCircle />WhatsApp</a></section>; }
function Footer({ T }: { T: Copy }) { return <footer><strong>Luciana Silverio Advocacia</strong><span>OA 67448L · OAB/SP 404.150</span><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a><a href={`https://wa.me/${PHONE}`} target="_blank">+351 937 575 254</a></footer>; }
function Label({ icon, text }: { icon: React.ReactNode; text: string }) { return <p className="eyebrow label">{icon}{text}</p>; }

function serviceItemsPt() { return ['Autorizacao de Residencia|Pedido, preparacao e acompanhamento na AIMA, com revisao tecnica de cada documento.', 'Visto de Trabalho|Estrategia para vistos D1, D3 e procura de trabalho, do contrato a regularizacao em Portugal.', 'CPLP|Analise de elegibilidade, submissao e acompanhamento ate a obtencao do titulo.', 'Reagrupamento Familiar|Planeamento para reunir conjuge, filhos e pais em Portugal com menos atraso.', 'Nacionalidade Portuguesa|Elegibilidade por residencia, casamento, ascendencia ou origem sefardita.', 'Processos AIMA|Desbloqueio de processos parados, resposta a exigencias e acompanhamento.', 'Consultoria em Imigracao|Estrategia juridica antes de qualquer decisao migratoria.', 'Recursos Administrativos|Defesa em indeferimentos, expulsao, recursos e acoes urgentes.'].map(splitItem); }
function serviceItemsEn() { return ['Residence Permit|Application, preparation and AIMA appointment support with technical document review.', 'Work Visa|Strategy for D1, D3 and job-seeker visas, from contract to regularization.', 'CPLP|Eligibility, filing and follow-up until permit issuance.', 'Family Reunification|Planning to reunite spouses, children and parents in Portugal.', 'Portuguese Citizenship|Eligibility through residence, marriage, ancestry or Sephardic origin.', 'AIMA Proceedings|Unblocking stalled cases and responding to authority demands.', 'Immigration Consulting|Legal strategy before any immigration decision.', 'Administrative Appeals|Defense in denials, expulsion cases, appeals and urgent actions.'].map(splitItem); }
function serviceItemsEs() { return ['Autorizacion de Residencia|Solicitud, preparacion y acompanamiento en AIMA con revision documental.', 'Visado de Trabajo|Estrategia para visados D1, D3 y busqueda de trabajo.', 'CPLP|Analisis, solicitud y seguimiento hasta obtener el titulo.', 'Reagrupacion Familiar|Planificacion para reunir conyuges, hijos y padres en Portugal.', 'Nacionalidad Portuguesa|Elegibilidad por residencia, matrimonio, ascendencia u origen sefardita.', 'Procesos AIMA|Desbloqueo de procesos parados y respuesta a requerimientos.', 'Consultoria Migratoria|Estrategia juridica antes de cualquier decision.', 'Recursos Administrativos|Defensa en denegaciones, expulsion, recursos y acciones urgentes.'].map(splitItem); }
function splitItem(value: string) { const [title, desc] = value.split('|'); return { title, desc }; }
function whyItemsPt() { return ['Dupla inscricao|Advogada em Portugal e no Brasil.', 'Estrategia personalizada|Analise tecnica caso a caso.', 'Clientes internacionais|Atendimento em portugues, ingles e espanhol.', 'Acompanhamento completo|Do primeiro contacto ao registo final.', 'Atendimento humano|Escuta cuidadosa antes da estrategia.', 'Transparencia total|Riscos, prazos e custos explicados.'].map(splitItem); }
function whyItemsEn() { return ['Dual registration|Registered lawyer in Portugal and Brazil.', 'Personalized strategy|Case-by-case technical analysis.', 'International clients|Service in Portuguese, English and Spanish.', 'Full follow-up|From first contact to final registration.', 'Human service|Careful listening before strategy.', 'Full transparency|Risks, deadlines and costs explained.'].map(splitItem); }
function whyItemsEs() { return ['Doble inscripcion|Abogada en Portugal y Brasil.', 'Estrategia personalizada|Analisis tecnico caso por caso.', 'Clientes internacionales|Atencion en portugues, ingles y espanol.', 'Acompanamiento completo|Del primer contacto al registro final.', 'Atencion humana|Escucha cuidadosa antes de la estrategia.', 'Transparencia total|Riesgos, plazos y costes claros.'].map(splitItem); }
function testimonialsPt() { return [{ name: 'Ahmed R.', country: 'Paquistao', text: 'A Dra. Luciana desbloqueou o meu processo e explicou tudo com paciencia.' }, { name: 'Rahim H.', country: 'Bangladesh', text: 'Organizaram toda a documentacao e hoje tenho residencia.' }, { name: 'Bishal K.', country: 'Nepal', text: 'Trouxe a minha familia para Portugal com seguranca.' }]; }
function testimonialsEn() { return [{ name: 'Ahmed R.', country: 'Pakistan', text: 'Dr. Luciana unblocked my case and explained everything patiently.' }, { name: 'Rahim H.', country: 'Bangladesh', text: 'The team organized my paperwork and I now have residence.' }, { name: 'Bishal K.', country: 'Nepal', text: 'I brought my family to Portugal safely.' }]; }
function testimonialsEs() { return [{ name: 'Ahmed R.', country: 'Pakistan', text: 'La Dra. Luciana desbloqueo mi proceso y explico todo con paciencia.' }, { name: 'Rahim H.', country: 'Bangladesh', text: 'Organizaron mi documentacion y hoy tengo residencia.' }, { name: 'Bishal K.', country: 'Nepal', text: 'Traje a mi familia a Portugal con seguridad.' }]; }
function processPt() { return ['Avaliacao Juridica Inicial|Compreensao da situacao, objetivos e contexto migratorio.', 'Analise Documental|Checklist personalizada e revisao de cada documento.', 'Preparacao do Processo|Definicao da melhor via juridica, riscos e alternativas.', 'Submissao|Protocolo junto da autoridade competente.', 'Acompanhamento ate Conclusao|Atualizacoes e resposta imediata a exigencias.'].map(splitItem); }
function processEn() { return ['Initial Legal Assessment|Understanding your situation, goals and immigration context.', 'Document Analysis|Personalized checklist and review of every document.', 'Case Preparation|Best legal route, risks and alternatives.', 'Submission|Filing with the competent authority.', 'Follow-up Until Completion|Updates and immediate response to demands.'].map(splitItem); }
function processEs() { return ['Evaluacion Juridica Inicial|Comprension de situacion, objetivos y contexto migratorio.', 'Analisis Documental|Checklist personalizado y revision documental.', 'Preparacion del Proceso|Mejor via juridica, riesgos y alternativas.', 'Presentacion|Protocolo ante la autoridad competente.', 'Seguimiento hasta Conclusion|Actualizaciones y respuesta a requerimientos.'].map(splitItem); }
function faqPt() { return [{ q: 'Como funciona o atendimento online?', a: 'Por WhatsApp, e-mail e videochamadas agendadas, com envio seguro de documentos.' }, { q: 'Atendem quem nao fala portugues?', a: 'Sim. Atendimento em portugues, ingles e espanhol.' }, { q: 'O meu processo na AIMA esta parado. Podem ajudar?', a: 'Sim, com exposicoes fundamentadas, agendamentos e medidas cabiveis.' }, { q: 'Existe garantia de resultado?', a: 'Nao. O compromisso e rigor tecnico, estrategia e acompanhamento proximo.' }]; }
function faqEn() { return [{ q: 'How does online service work?', a: 'Via WhatsApp, email and scheduled video calls, with secure document exchange.' }, { q: 'Do you serve non-Portuguese speakers?', a: 'Yes. Service in Portuguese, English and Spanish.' }, { q: 'My AIMA case is stuck. Can you help?', a: 'Yes, through formal petitions, scheduling and suitable legal measures.' }, { q: 'Is there a guarantee of result?', a: 'No. The commitment is technical rigor, strategy and close follow-up.' }]; }
function faqEs() { return [{ q: 'Como funciona la atencion online?', a: 'Por WhatsApp, correo y videollamadas agendadas.' }, { q: 'Atienden a quien no habla portugues?', a: 'Si. Atencion en portugues, ingles y espanol.' }, { q: 'Mi proceso en AIMA esta parado. Pueden ayudar?', a: 'Si, mediante escritos fundamentados y medidas adecuadas.' }, { q: 'Hay garantia de resultado?', a: 'No. El compromiso es rigor tecnico, estrategia y acompanamiento.' }]; }

createRoot(document.getElementById('root')!).render(<App />);
