import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import Estrellas from "./components/Estrellas";
import ScrollExpandMedia from "./components/ScrollExpandMedia";
import StickyProjects from "./components/StickyProjects";
import { VisualBot, VisualMojonApp, VisualPaginas, VisualQA } from "./components/Visuales";
import { ENLACES, HERRAMIENTAS, TEXTOS, type Idioma } from "./textos";

const SECCIONES = ["proyectos", "experiencia", "herramientas", "contacto"] as const;

function idiomaInicial(): Idioma {
  try {
    const guardado = localStorage.getItem("idioma");
    if (guardado === "es" || guardado === "en") return guardado;
  } catch {
    // sin almacenamiento (modo privado): se decide por el navegador
  }
  return navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
}

function Menu({ idioma, alCambiar }: { idioma: Idioma; alCambiar: () => void }) {
  const t = TEXTOS[idioma];
  const [activa, setActiva] = useState<string | null>(null);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => entradas.forEach((e) => e.isIntersecting && setActiva(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    SECCIONES.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    });
    return () => observador.disconnect();
  }, []);

  return (
    <nav className="vidrio fixed top-5 left-1/2 z-50 flex max-w-[calc(100vw-16px)] -translate-x-1/2 items-center gap-0.5 rounded-full p-1 sm:gap-1">
      {SECCIONES.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          className="relative rounded-full px-2 py-2 text-[11px] font-medium text-suave transition-colors hover:text-tinta sm:px-3 sm:text-xs md:px-5 md:text-sm"
        >
          {activa === id && (
            <motion.span layoutId="luz" className="absolute inset-0 -z-10 rounded-full bg-white/10" transition={{ type: "spring", stiffness: 300, damping: 30 }}>
              <span className="absolute -top-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-t-full bg-cian">
                <span className="absolute -top-2 -left-2 h-6 w-12 rounded-full bg-cian/25 blur-md" />
              </span>
            </motion.span>
          )}
          <span className={activa === id ? "text-tinta" : ""}>{t.menu[id]}</span>
        </a>
      ))}
      <button
        type="button"
        onClick={alCambiar}
        aria-label={t.cambiarIdioma}
        className="ml-1 rounded-full border border-white/15 px-2.5 py-2 font-mono text-[11px] text-tinta transition-colors hover:border-cian hover:text-cian sm:px-3 sm:text-xs md:text-sm"
      >
        <span className="sm:hidden">{idioma === "es" ? "EN" : "ES"}</span>
        <span className="hidden sm:inline">{t.cambiarIdioma}</span>
      </button>
    </nav>
  );
}

function Giro({ palabras }: { palabras: readonly string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % palabras.length), 2600);
    return () => clearInterval(id);
  }, [palabras]);
  return (
    <span className="relative inline-grid align-bottom">
      {/* Todas las palabras, invisibles, reservan el alto de la más larga: si no, en
          celular la portada cambia de alto con cada palabra y corre el snap de los proyectos. */}
      {palabras.map((p) => (
        <span key={p} className="invisible col-start-1 row-start-1 font-display font-semibold" aria-hidden="true">
          {p}
        </span>
      ))}
      <AnimatePresence mode="wait">
        <motion.span
          key={palabras[i]}
          className="degrade col-start-1 row-start-1 font-display font-semibold"
          initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          {palabras[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function Titulo({ numero, children, bajada }: { numero: string; children: string; bajada?: string }) {
  return (
    <motion.header initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-20%" }} transition={{ duration: 0.8 }} className="mx-auto max-w-6xl px-6">
      <p className="font-mono text-xs tracking-[0.35em] text-cian uppercase">
        // {numero} — {children}
      </p>
      <h2 className="degrade mt-3 font-display text-5xl font-bold tracking-tight md:text-7xl">{children}</h2>
      {bajada && <p className="mt-4 max-w-xl text-lg text-suave">{bajada}</p>}
    </motion.header>
  );
}

function Experiencia({ items }: { items: (typeof TEXTOS)[Idioma]["experiencia"]["items"] }) {
  const caja = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({ target: caja, offset: ["start 70%", "end 60%"] });
  const alto = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <ol ref={caja} className="relative mx-auto mt-16 max-w-4xl px-6">
      <div className="absolute top-0 bottom-0 left-[31px] w-px bg-white/10 md:left-[calc(25%+6px)]" aria-hidden="true" />
      <motion.div style={{ height: alto }} className="absolute top-0 left-[31px] w-px bg-gradient-to-b from-acento via-cian to-cian shadow-[0_0_12px_#22d3ee] md:left-[calc(25%+6px)]" aria-hidden="true" />
      {items.map((item) => (
        <motion.li
          key={item.puesto}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.7 }}
          className="relative grid gap-2 pb-16 pl-12 md:grid-cols-4 md:gap-10 md:pl-0"
        >
          <span className="absolute top-2 left-[26px] h-3 w-3 rounded-full border-2 border-cian bg-fondo shadow-[0_0_14px_#22d3ee] md:left-[calc(25%+1px)]" aria-hidden="true" />
          <p className="font-mono text-xs tracking-widest text-cian uppercase md:pt-1.5 md:text-right">{item.fecha}</p>
          <div className="vidrio rounded-2xl p-6 md:col-span-3 md:ml-10">
            <h3 className="font-display text-2xl font-semibold md:text-3xl">{item.puesto}</h3>
            <p className="mt-1 font-mono text-xs text-acento">{item.lugar}</p>
            <p className="mt-4 leading-relaxed text-tinta/80">{item.texto}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}

export default function App() {
  const [idioma, setIdioma] = useState<Idioma>(idiomaInicial);
  const t = TEXTOS[idioma];

  useEffect(() => {
    document.documentElement.lang = idioma;
    try {
      localStorage.setItem("idioma", idioma);
    } catch {
      // no pasa nada si no se puede guardar
    }
  }, [idioma]);

  const visuales = {
    mojonapp: <VisualMojonApp idioma={idioma} />,
    bot: <VisualBot idioma={idioma} />,
    paginas: <VisualPaginas />,
    qa: <VisualQA idioma={idioma} />,
  };
  const proyectos = t.proyectos.items.map(({ visual, ...resto }) => ({ ...resto, visual: visuales[visual] }));

  return (
    <main className="relative overflow-x-clip text-tinta">
      {/* overflow-x-clip: lo que entra animado desde el costado no ensancha la página en celular (clip y no hidden, que rompe el sticky) */}
      <Estrellas />
      <Menu idioma={idioma} alCambiar={() => setIdioma(idioma === "es" ? "en" : "es")} />

      <ScrollExpandMedia mediaSrc="/media/hero.mp4" posterSrc="/media/hero-poster.jpg" title={t.portada.nombre} date={t.portada.bajada} scrollToExpand={t.portada.bajar}>
        <div className="mx-auto max-w-5xl py-10 text-center md:py-20">
          <p className="font-mono text-xs tracking-[0.35em] text-cian uppercase">{t.portada.lugar}</p>
          <p className="mt-8 font-display text-4xl leading-tight font-medium tracking-tight md:text-6xl">
            {t.portada.frase}
            <br />
            <Giro palabras={t.portada.giros} />
          </p>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-suave">{t.portada.resumen}</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#proyectos" className="rounded-full bg-gradient-to-r from-acento-fuerte to-cian px-7 py-3 text-sm font-semibold text-white shadow-[0_0_30px_rgba(124,58,237,0.5)] transition hover:shadow-[0_0_45px_rgba(34,211,238,0.6)]">
              {t.portada.verProyectos} ↗
            </a>
            <a href="#contacto" className="vidrio rounded-full px-7 py-3 text-sm font-medium transition hover:text-cian">
              {t.portada.escribime}
            </a>
          </div>
        </div>
      </ScrollExpandMedia>

      <section id="proyectos" className="pt-24">
        <Titulo numero="01" bajada={t.proyectos.bajada}>
          {t.proyectos.titulo}
        </Titulo>
        <StickyProjects key={idioma} items={proyectos} />
      </section>

      <section id="experiencia" className="py-32">
        <Titulo numero="02">{t.experiencia.titulo}</Titulo>
        <Experiencia items={t.experiencia.items} />
      </section>

      <section id="herramientas" className="py-24">
        <Titulo numero="03">{t.herramientas.titulo}</Titulo>
        <ul className="mx-auto mt-14 flex max-w-5xl flex-wrap gap-3 px-6">
          {HERRAMIENTAS.map((h, i) => (
            <motion.li
              key={h}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              whileHover={{ y: -4, scale: 1.05 }}
              className="vidrio cursor-default rounded-full px-5 py-2.5 font-mono text-sm text-tinta/90 transition-colors hover:border-cian/60 hover:text-cian hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
            >
              {h}
            </motion.li>
          ))}
        </ul>
      </section>

      <section id="contacto" className="relative overflow-hidden py-40">
        {/* haces de luz en perspectiva hacia el botón */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] [perspective:600px]" aria-hidden="true">
          <div className="absolute inset-x-[-50%] bottom-0 h-full origin-bottom [transform:rotateX(65deg)] bg-[linear-gradient(rgba(34,211,238,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.35)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:linear-gradient(to_top,black,transparent)]" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-[radial-gradient(ellipse_at_bottom,rgba(124,58,237,0.35),transparent_70%)]" aria-hidden="true" />
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs tracking-[0.35em] text-cian uppercase">// 04 — {t.menu.contacto}</p>
          <h2 className="degrade mt-4 font-display text-6xl font-bold tracking-tight md:text-8xl">{t.contacto.titulo}</h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-suave">{t.contacto.texto}</p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a href={ENLACES.email} className="rounded-full bg-gradient-to-r from-acento-fuerte to-cian px-8 py-4 font-semibold text-white shadow-[0_0_40px_rgba(124,58,237,0.55)] transition hover:shadow-[0_0_60px_rgba(34,211,238,0.7)]">
              {t.contacto.email} ↗
            </a>
            <a href={ENLACES.linkedin} target="_blank" rel="noreferrer" className="vidrio rounded-full px-8 py-4 font-medium transition hover:text-cian">
              LinkedIn ↗
            </a>
            <a href={ENLACES.github} target="_blank" rel="noreferrer" className="vidrio rounded-full px-8 py-4 font-medium transition hover:text-cian">
              GitHub ↗
            </a>
          </div>
        </motion.div>
        <p className="relative mt-32 text-center font-mono text-xs text-suave/60">
          © 2026 Matías Trovato · {t.contacto.pie}
        </p>
      </section>
    </main>
  );
}
