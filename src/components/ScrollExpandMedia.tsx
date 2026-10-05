// Adaptado de "Scroll Media Expansion Hero" de Arunachalam (21st.dev, MIT).
// Cambios: sin next/image ni YouTube, colores del portfolio, teclado (flechas,
// AvPág, espacio), "reducir movimiento" arranca expandido, y los links del menú
// (#seccion) expanden la portada antes de saltar.
import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc?: string;
  title: string;
  date?: string;
  scrollToExpand?: string;
  children?: ReactNode;
}

const reducirMovimiento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function ScrollExpandMedia({ mediaSrc, posterSrc, bgImageSrc, title, date, scrollToExpand, children }: Props) {
  const [progreso, setProgreso] = useState(() => (reducirMovimiento() ? 1 : 0));
  const [expandida, setExpandida] = useState(() => reducirMovimiento());
  const [inicioTouch, setInicioTouch] = useState(0);
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const avanzar = (delta: number) => {
      const nuevo = Math.min(Math.max(progreso + delta, 0), 1);
      setProgreso(nuevo);
      if (nuevo >= 1) setExpandida(true);
    };
    const enLaPunta = () => window.scrollY <= 5;

    const rueda = (e: WheelEvent) => {
      if (expandida && e.deltaY < 0 && enLaPunta()) {
        setExpandida(false);
        e.preventDefault();
      } else if (!expandida) {
        e.preventDefault();
        avanzar(e.deltaY * 0.0009);
      }
    };
    const tocar = (e: TouchEvent) => setInicioTouch(e.touches[0].clientY);
    const mover = (e: TouchEvent) => {
      if (!inicioTouch) return;
      const y = e.touches[0].clientY;
      const delta = inicioTouch - y;
      if (expandida && delta < -20 && enLaPunta()) {
        setExpandida(false);
        e.preventDefault();
      } else if (!expandida) {
        e.preventDefault();
        avanzar(delta * (delta < 0 ? 0.008 : 0.005));
        setInicioTouch(y);
      }
    };
    const soltar = () => setInicioTouch(0);
    const tecla = (e: KeyboardEvent) => {
      const abajo = ["ArrowDown", "PageDown", " ", "End"].includes(e.key);
      const arriba = ["ArrowUp", "PageUp", "Home"].includes(e.key);
      if (!expandida && abajo) {
        e.preventDefault();
        avanzar(e.key === "End" ? 1 : 0.25);
      } else if (expandida && arriba && enLaPunta()) {
        e.preventDefault();
        setExpandida(false);
        avanzar(-0.25);
      }
    };
    const fijarArriba = () => {
      if (!expandida) window.scrollTo(0, 0);
    };
    // Un link del menú (#proyectos) abre la portada y recién ahí salta.
    const saltar = () => {
      const destino = document.getElementById(location.hash.slice(1));
      if (!destino) return;
      setProgreso(1);
      setExpandida(true);
      requestAnimationFrame(() => requestAnimationFrame(() => destino.scrollIntoView()));
    };

    window.addEventListener("wheel", rueda, { passive: false });
    window.addEventListener("touchstart", tocar, { passive: false });
    window.addEventListener("touchmove", mover, { passive: false });
    window.addEventListener("touchend", soltar);
    window.addEventListener("keydown", tecla);
    window.addEventListener("scroll", fijarArriba);
    window.addEventListener("hashchange", saltar);
    return () => {
      window.removeEventListener("wheel", rueda);
      window.removeEventListener("touchstart", tocar);
      window.removeEventListener("touchmove", mover);
      window.removeEventListener("touchend", soltar);
      window.removeEventListener("keydown", tecla);
      window.removeEventListener("scroll", fijarArriba);
      window.removeEventListener("hashchange", saltar);
    };
  }, [progreso, expandida, inicioTouch]);

  useEffect(() => {
    const medir = () => setEsMovil(window.innerWidth < 768);
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, []);

  const ancho = 300 + progreso * (esMovil ? 650 : 1250);
  const alto = 400 + progreso * (esMovil ? 200 : 400);
  const separar = progreso * (esMovil ? 180 : 150);
  const [primera, ...resto] = title.split(" ");
  const mostrarContenido = expandida || progreso >= 1;

  return (
    <div className="overflow-x-hidden">
      <section className="relative flex min-h-[100dvh] flex-col items-center justify-start">
        <div className="relative flex min-h-[100dvh] w-full flex-col items-center">
          {bgImageSrc && (
            <motion.div className="absolute inset-0 z-0 h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 - progreso }} transition={{ duration: 0.1 }}>
              <img src={bgImageSrc} alt="" className="h-screen w-screen object-cover" />
              <div className="absolute inset-0 bg-black/30" />
            </motion.div>
          )}

          <div className="relative z-10 mx-auto flex w-full flex-col items-center justify-start">
            <div className="relative flex h-[100dvh] w-full flex-col items-center justify-center">
              <div
                className="absolute top-1/2 left-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-2xl"
                style={{ width: `${ancho}px`, height: `${alto}px`, maxWidth: "95vw", maxHeight: "85vh", boxShadow: "0 0 80px rgba(124, 58, 237, 0.35)" }}
              >
                <div className="pointer-events-none relative h-full w-full">
                  <video
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="h-full w-full rounded-xl object-cover"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-black/30"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.5 - progreso * 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>

                <div className="relative z-10 mt-4 flex flex-col items-center text-center">
                  {date && (
                    <p className="font-mono text-sm tracking-[0.25em] whitespace-nowrap text-cian uppercase md:text-base" style={{ transform: `translateX(-${separar}vw)` }}>
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p className="mt-1 font-mono text-xs tracking-[0.3em] text-suave uppercase" style={{ transform: `translateX(${separar}vw)` }}>
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <h1 className="relative z-10 flex w-full flex-col items-center justify-center text-center font-display text-6xl leading-[0.95] font-bold tracking-tight drop-shadow-[0_0_30px_rgba(167,139,250,0.45)] md:text-8xl lg:text-9xl">
                <span className="text-white" style={{ transform: `translateX(-${separar}vw)` }}>
                  {primera}
                </span>
                <span className="degrade" style={{ transform: `translateX(${separar}vw)` }}>
                  {resto.join(" ")}.
                </span>
              </h1>
            </div>

            <motion.section
              className="flex w-full flex-col px-6 py-10 md:px-16 lg:py-20"
              inert={!mostrarContenido}
              initial={{ opacity: 0 }}
              animate={{ opacity: mostrarContenido ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
}
