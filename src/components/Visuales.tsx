// Las maquetas de cada proyecto, hechas con código en vez de capturas sueltas.
// Los datos que muestran son reales: el lote y los m² salen de MojonApp, el
// chat es un caso de prueba del bot, y los números de QA salen de los repos.
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Idioma } from "../textos";

function Flotar({ children, demora = 0, className = "" }: { children: ReactNode; demora?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: demora }}
    >
      {children}
    </motion.div>
  );
}

function Ventana({ url, children, className = "" }: { url: string; children: ReactNode; className?: string }) {
  return (
    <div className={`vidrio overflow-hidden rounded-2xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-full bg-white/5 px-3 py-0.5 font-mono text-[11px] text-suave">{url}</span>
      </div>
      {children}
    </div>
  );
}

const Escena = ({ children }: { children: ReactNode }) => (
  <div className="relative flex h-full w-full items-center justify-center p-[6%] [perspective:1400px]">
    <div className="pointer-events-none absolute inset-[10%] rounded-full bg-acento-fuerte/25 blur-[90px]" aria-hidden="true" />
    {/* En pantalla chica el panel mide un tercio del alto: todo un poco más chico */}
    <div className="relative flex h-full w-full items-center justify-center max-[1025px]:scale-[0.86]">{children}</div>
  </div>
);

export function VisualMojonApp({ idioma }: { idioma: Idioma }) {
  return (
    <Escena>
      <Ventana url="mojonapp · Merlo, San Luis" className="relative w-full max-w-[640px] [transform:rotateY(-8deg)_rotateX(4deg)]">
        <div className="relative aspect-[16/10]">
          <img src="/proyectos/mojonapp.jpg" alt="" className="absolute inset-0 h-full w-full object-cover object-[50%_55%]" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 160 100" preserveAspectRatio="none" aria-hidden="true">
            {[
              "M58,31 L74,31 L74,44 L58,44 Z",
              "M76,31 L92,31 L92,44 L76,44 Z",
              "M58,47 L74,47 L74,60 L58,60 Z",
              "M94,47 L110,47 L110,60 L94,60 Z",
            ].map((d, i) => (
              <path key={d} d={d} fill={i === 3 ? "rgba(34,211,238,0.28)" : "rgba(167,139,250,0.16)"} stroke={i === 3 ? "#22d3ee" : "#a78bfa"} strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
            ))}
          </svg>
        </div>
      </Ventana>
      <Flotar className="absolute right-[4%] bottom-[12%]">
        <div className="vidrio rounded-xl px-4 py-3">
          <p className="font-mono text-[10px] tracking-widest text-cian uppercase">{idioma === "es" ? "Disponible" : "Available"}</p>
          <p className="mt-1 font-display text-lg font-semibold">1.250 m²</p>
          <p className="font-mono text-[10px] text-suave">00-06-44-05-000118</p>
        </div>
      </Flotar>
      <Flotar demora={1.5} className="absolute top-[12%] left-[6%] max-[1025px]:hidden">
        <div className="vidrio rounded-full px-3 py-1.5 font-mono text-[11px] text-acento">✦ Claude API</div>
      </Flotar>
    </Escena>
  );
}

export function VisualBot({ idioma }: { idioma: Idioma }) {
  const es = idioma === "es";
  const chat: [lado: "c" | "l", texto: string][] = [
    ["c", es ? "¿Mañana a las 10 hs?" : "Tomorrow at 10?"],
    ["l", "11:30"],
    ["c", es ? "Ok. Te lo llevo 👍" : "Ok, I'll bring it 👍"],
  ];
  return (
    <Escena>
      <div className="vidrio relative w-full max-w-[380px] rounded-[28px] p-4 [transform:rotateY(8deg)] max-[1025px]:self-start">
        <div className="mb-3 flex items-center gap-3 border-b border-white/10 pb-3 max-[1025px]:hidden">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-acento to-cian font-display text-sm font-bold text-fondo">G</span>
          <div>
            <p className="text-sm font-medium">Graciela</p>
            <p className="font-mono text-[10px] text-suave">WhatsApp · {es ? "el bot solo escucha" : "the bot only listens"}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {chat.map(([lado, texto], i) => (
            <motion.p
              key={texto}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 * i }}
              className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-sm max-[1025px]:px-3 max-[1025px]:py-1.5 max-[1025px]:text-xs ${lado === "c" ? "self-start rounded-bl-sm bg-white/8" : "self-end rounded-br-sm bg-acento-fuerte/70"}`}
            >
              {texto}
            </motion.p>
          ))}
        </div>
      </div>
      <Flotar className="absolute right-[5%] bottom-[10%] max-[1025px]:-right-[3%] max-[1025px]:-bottom-[8%]">
        <div className="vidrio rounded-xl border-cian/40 px-4 py-3 max-[1025px]:px-3 max-[1025px]:py-2 shadow-[0_0_40px_rgba(34,211,238,0.25)]">
          <p className="font-mono text-[10px] tracking-widest text-cian uppercase max-[1025px]:tracking-normal">Google Calendar · {es ? "creado" : "created"}</p>
          <p className="mt-1 font-display text-lg font-semibold max-[1025px]:text-base">{es ? "mié 30/09 · 11:30" : "Wed 30/09 · 11:30"}</p>
          <p className="text-xs text-suave max-[1025px]:hidden">{es ? "Lavado completo · 120 min" : "Full wash · 120 min"}</p>
        </div>
      </Flotar>
      <Flotar demora={2} className="absolute top-[10%] left-[5%] max-[1025px]:hidden">
        <div className="vidrio rounded-full px-3 py-1.5 font-mono text-[11px] text-acento">US$ 0,0015 / {es ? "mensaje" : "message"}</div>
      </Flotar>
    </Escena>
  );
}

export function VisualPaginas() {
  return (
    <Escena>
      <Ventana url="autoshine · estética vehicular" className="w-[88%] max-w-[600px] [transform:rotateY(-6deg)]">
        <img src="/proyectos/autoshine.jpg" alt="" className="aspect-[16/10] w-full object-cover object-top" />
      </Ventana>
      <Flotar className="absolute right-[6%] bottom-[8%] w-[26%] max-w-[150px]">
        <div className="vidrio overflow-hidden rounded-[22px] p-1.5">
          <img src="/proyectos/autoshine.jpg" alt="" className="aspect-[9/17] w-full rounded-[16px] object-cover object-[22%_20%]" />
        </div>
      </Flotar>
    </Escena>
  );
}

export function VisualQA({ idioma }: { idioma: Idioma }) {
  const es = idioma === "es";
  const numeros: [numero: string, que: string][] = [
    ["69", "Pytest + Playwright"],
    ["22", es ? "API · Newman" : "API · Newman"],
    ["139", "E2E · MojonApp"],
  ];
  const pruebas = es
    ? ["Obtener token: responde 200", "Clave incorrecta: no devuelve token", "PATCH no toca el resto de la reserva", "Borrar sin token: 403"]
    : ["Get token: responds 200", "Wrong password: no token returned", "PATCH leaves the rest untouched", "Delete without token: 403"];
  return (
    <Escena>
      <div className="vidrio w-full max-w-[560px] rounded-2xl p-6 max-[1025px]:p-4 [transform:rotateY(-6deg)_rotateX(3deg)]">
        <div className="flex items-center justify-between">
          <p className="font-mono text-xs tracking-widest text-suave uppercase">{es ? "Suites de prueba" : "Test suites"}</p>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-[11px] text-emerald-300">● PASS</span>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {numeros.map(([numero, que]) => (
            <div key={que} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
              <p className="degrade font-display text-3xl font-bold">{numero}</p>
              <p className="mt-1 font-mono text-[10px] leading-tight text-suave">{que}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cian" initial={{ width: "0%" }} whileInView={{ width: "100%" }} transition={{ duration: 1.6, ease: "easeOut" }} />
        </div>
        <ul className="mt-5 space-y-2 font-mono text-[12px] max-[1025px]:hidden">
          {pruebas.map((p) => (
            <li key={p} className="flex gap-2 text-tinta/85">
              <span className="text-emerald-300">✓</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </Escena>
  );
}
