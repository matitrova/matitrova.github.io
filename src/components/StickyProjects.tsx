// Adaptado de "Sticky Content Wrapper" de Hyperiux (21st.dev). La animación
// (GSAP ScrollTrigger con scrub y snap, cortina de imagen y escala) queda igual.
// Cambios: los links funcionan (el original los anulaba), sin el indicador
// "scroll" fijo que quedaba visible en toda la página, colores del portfolio y
// solo las props que usa el portfolio.
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface Proyecto {
  heading: string;
  paragraph: string;
  list: readonly string[];
  link: { href: string; text: string };
  visual: ReactNode;
}

const ENTRA = 2; // yPercent del texto que entra
const SALE = -2; // yPercent del texto que sale
const DURACION = 0.9;
const DEMORA = 0.35;
const PASO = 2;
// Más sutil que el original (1.5 / 1.2 / 1): son maquetas, no fotos para recortar.
const ESCALA_INICIAL = 1.12;
const ESCALA_ACTIVA = 1;
const ESCALA_SALIDA = 0.94;

const reducirMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Contenido({ item, numero, total }: { item: Proyecto; numero: number; total: number }) {
  const externo = item.link.href.startsWith("http");
  return (
    <div className="flex h-full w-full flex-col text-tinta">
      <span className="mb-[1vw] block font-mono text-[0.8vw] tracking-[0.3em] text-cian max-[1025px]:mb-[2vw] max-[1025px]:text-[2vw] max-md:text-[3vw]">
        {String(numero).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
      <h3 className="degrade font-display font-semibold tracking-tight">{item.heading}</h3>
      <p className="text-suave">{item.paragraph}</p>
      <ul className="flex flex-col text-tinta/90">
        {item.list.map((linea) => (
          <li key={linea} className="flex gap-3">
            <span className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-acento" aria-hidden="true" />
            {linea}
          </li>
        ))}
      </ul>
      <a
        href={item.link.href}
        target={externo ? "_blank" : undefined}
        rel={externo ? "noreferrer" : undefined}
        className="group mt-[1vw] inline-flex w-fit items-center gap-2 leading-[1.2] text-acento no-underline"
      >
        <span className="relative inline-block w-fit after:absolute after:bottom-[-2%] after:left-0 after:h-[1.5px] after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.62,0.05,0.01,0.99)] after:content-[''] group-hover:after:origin-left group-hover:after:scale-x-100 group-focus-visible:after:origin-left group-focus-visible:after:scale-x-100">
          {item.link.text}
        </span>
        <svg className="h-[1em] w-[1em] flex-none transition-transform duration-300 group-hover:-rotate-45 group-focus-visible:-rotate-45" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </div>
  );
}

export default function StickyProjects({ items }: { items: readonly Proyecto[] }) {
  const seccion = useRef<HTMLElement | null>(null);
  const textos = useRef<(HTMLDivElement | null)[]>([]);
  const imagenes = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!seccion.current || !items.length) return;
    const reducido = reducirMovimiento();

    const contexto = gsap.context(() => {
      textos.current.forEach((t, i) => gsap.set(t, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : ENTRA, zIndex: items.length - i }));
      imagenes.current.forEach((img, i) =>
        gsap.set(img, {
          autoAlpha: reducido ? (i === 0 ? 1 : 0) : 1,
          zIndex: items.length - i,
          clipPath: "inset(0% 0% 0% 0%)",
          scale: reducido ? 1 : i === 0 ? ESCALA_ACTIVA : ESCALA_INICIAL,
          transformOrigin: "center center",
        }),
      );

      const linea = gsap.timeline({
        scrollTrigger: {
          trigger: seccion.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          snap:
            items.length > 1
              ? // inertia: false (como el original): sin eso, un scroll largo "adivina" y salta al último
                { snapTo: items.map((_, i) => i / (items.length - 1)), duration: { min: 0.2, max: 0.5 }, ease: "power2.inOut", delay: 0, inertia: false }
              : undefined,
        },
      });

      items.forEach((_, i) => {
        if (i === items.length - 1) return;
        const inicio = i * PASO;
        linea
          .to(textos.current[i], { autoAlpha: 0, yPercent: SALE, duration: DURACION, ease: "power2.inOut" }, inicio)
          .fromTo(textos.current[i + 1], { autoAlpha: 0, yPercent: ENTRA }, { autoAlpha: 1, yPercent: 0, duration: DURACION, ease: "power2.inOut" }, inicio + DURACION + DEMORA)
          .to(
            imagenes.current[i],
            reducido
              ? { autoAlpha: 0, duration: PASO, ease: "none" }
              : { clipPath: "inset(0% 0% 100% 0%)", scale: ESCALA_SALIDA, duration: PASO, ease: "none" },
            inicio,
          );
        linea.to(imagenes.current[i + 1], reducido ? { autoAlpha: 1, duration: PASO, ease: "none" } : { scale: ESCALA_ACTIVA, duration: PASO, ease: "none" }, inicio);
      });

      linea.duration(Math.max(1, (items.length - 1) * PASO));
      ScrollTrigger.refresh();
    }, seccion);

    // Las fuentes y las imágenes cambian el alto de la página al cargar: si GSAP
    // se queda con las posiciones de antes, el snap lleva a otro proyecto.
    const recalcular = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(recalcular);
    window.addEventListener("load", recalcular);

    return () => {
      window.removeEventListener("load", recalcular);
      contexto.revert();
    };
  }, [items]);

  return (
    <section ref={seccion} className="relative flex w-full justify-between" style={{ height: `${items.length * 100}vh` }}>
      <div className="sticky top-0 flex h-screen w-full justify-between max-[1025px]:flex-col-reverse max-[1025px]:justify-start max-[1025px]:px-[5vw] max-md:px-[6vw]">
        <div className="relative h-full w-[42%] max-[1025px]:h-[55%] max-[1025px]:w-full">
          {items.map((item, i) => (
            <div
              key={item.heading}
              ref={(el) => {
                textos.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full pt-[30%] pl-[5vw] opacity-0 [&_a]:mb-[1vw] [&_a]:text-[1.2vw] [&_h3]:mb-[2vw] [&_h3]:text-[4vw] [&_h3]:leading-none [&_li]:mb-[0.6vw] [&_li]:text-[1.05vw] [&_p]:mb-[1.4vw] [&_p]:text-[1.2vw] [&_p]:leading-relaxed [&_ul]:mb-[1.2vw] max-[1025px]:pt-[7%] max-[1025px]:pl-0 max-[1025px]:[&_a]:mb-[3vw] max-[1025px]:[&_a]:text-[2.8vw] max-[1025px]:[&_h3]:mb-[4vw] max-[1025px]:[&_h3]:text-[6vw] max-[1025px]:[&_li]:mb-[1vw] max-[1025px]:[&_li]:text-[2.5vw] max-[1025px]:[&_p]:mb-[3vw] max-[1025px]:[&_p]:text-[2.8vw] max-[1025px]:[&_ul]:mb-[4vw] max-md:pt-[10%] max-md:[&_a]:text-[4.5vw] max-md:[&_h3]:text-[9vw] max-md:[&_li]:text-[3.8vw] max-md:[&_p]:text-[4vw]"
            >
              <Contenido item={item} numero={i + 1} total={items.length} />
            </div>
          ))}
        </div>

        <div className="relative h-full w-1/2 overflow-hidden min-[1026px]:mr-[3vw] max-[1025px]:mt-[10vh] max-[1025px]:h-[35%] max-[1025px]:w-full max-[1025px]:rounded-[3.5vw]">
          {items.map((item, i) => (
            <div
              key={item.heading}
              ref={(el) => {
                imagenes.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full bg-fondo opacity-0"
            >
              {item.visual}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
