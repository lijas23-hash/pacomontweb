"use client";
import { useState, useEffect, useCallback } from "react";

const B = {
  carbon: "#1A1A1A", beige: "#EFE3D3", brown: "#6B5346",
  topo: "#8C7868", arena: "#DCCBBB", font: "'Manrope', system-ui, sans-serif",
};

interface NotaEntry { fecha: string; texto: string; }

interface Client {
  _row: number; ID: string; Fecha: string;
  Nombre: string; Apellido: string; Email: string; Telefono: string; Edad: string;
  Objetivo: string; PorQueAhora: string; Lesiones: string;
  ExperienciaEntrenador: string; MayorObstaculo: string; Importancia: string; Inversion: string;
  Estado: string; Comprado: string; Notas: string; UltimaLlamada: string;
  PlanContratado: string; FechaInicio: string; ProximaLlamada: string;
  NivelCondicion: string; EstadoPlan: string;
  Nutricion: string; Motivacion: string; FactoresExternos: string; NotasSeguimiento: string;
  Modalidad: string; ProximoCobro: string;
}

const ESTADOS_LEAD = ["Pendiente llamada","Llamada programada","Llamada hecha","Compró","No compró"];
const PLANES = ["Entreno + Nutrición","Solo Entreno","Solo Nutrición","Preparación HYROX","Otro"];
const NIVELES = ["—","Principiante","Intermedio","Avanzado"];
const ESTADOS_PLAN = ["Activo","Pausado","Cancelado","Finalizado"];
const MODALIDADES: Record<string,{precio:number;meses:number;label:string}> = {
  "Trimestral": {precio:299, meses:3,  label:"cada 3 meses"},
  "Semestral":  {precio:459, meses:6,  label:"cada 6 meses"},
};
const CORTE = 0.70;
function precioInfo(modalidad:string) {
  const m = MODALIDADES[modalidad];
  if (!m) return null;
  return { precio: m.precio, corte: Math.round(m.precio*CORTE*100)/100, label: m.label, meses: m.meses };
}
function sumarMeses(fecha:string, meses:number): string {
  const d = new Date(fecha); d.setMonth(d.getMonth()+meses);
  return d.toISOString().split("T")[0];
}

const LEAD_BADGE: Record<string,{bg:string;text:string;border:string}> = {
  "Pendiente llamada": {bg:"#fffbeb",text:"#92400e",border:"#fde68a"},
  "Llamada programada":{bg:"#eff6ff",text:"#1e40af",border:"#bfdbfe"},
  "Llamada hecha":     {bg:"#f5f3ff",text:"#5b21b6",border:"#ddd6fe"},
  "Compró":            {bg:"#f0fdf4",text:"#166534",border:"#bbf7d0"},
  "No compró":         {bg:"#fef2f2",text:"#991b1b",border:"#fecaca"},
};
const PLAN_BADGE: Record<string,{bg:string;text:string}> = {
  "Activo":    {bg:"#f0fdf4",text:"#166534"},
  "Pausado":   {bg:"#fffbeb",text:"#92400e"},
  "Cancelado": {bg:"#fef2f2",text:"#991b1b"},
  "Finalizado":{bg:"#f3f4f6",text:"#374151"},
};

function parseNotas(raw: string): NotaEntry[] {
  try {
    const p = JSON.parse(raw);
    if (Array.isArray(p)) return p;
  } catch {}
  if (raw && raw.trim()) return [{ fecha: new Date().toISOString(), texto: raw.trim() }];
  return [];
}

function needsMonthlyCall(c: Client): boolean {
  const isActive = c.EstadoPlan === "Activo" || !c.EstadoPlan;
  if (!isActive) return false;
  if (c.ProximaLlamada && new Date(c.ProximaLlamada) < new Date()) return true;
  const startDays = c.FechaInicio ? Math.floor((Date.now()-new Date(c.FechaInicio).getTime())/864e5) : 0;
  if (startDays < 30) return false;
  const notas = parseNotas(c.NotasSeguimiento||"");
  if (notas.length === 0) return true;
  const daysSince = Math.floor((Date.now()-new Date(notas[0].fecha).getTime())/864e5);
  return daysSince >= 30;
}

function callStatus(dateStr: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr); const now = new Date();
  const days = Math.ceil((d.getTime() - now.getTime()) / 864e5);
  if (days < 0)  return {label:`Vencida (${-days}d)`, color:"#991b1b", bg:"#fef2f2"};
  if (days <= 3) return {label:`En ${days} días ⚡`,  color:"#92400e", bg:"#fffbeb"};
  if (days <= 7) return {label:`Esta semana`,         color:"#166534", bg:"#f0fdf4"};
  return {label: d.toLocaleDateString("es-ES",{day:"numeric",month:"short"}), color:B.topo, bg:"transparent"};
}

function SmallBadge({text,bg,color,border}:{text:string;bg:string;color:string;border?:string}) {
  return <span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:bg,color,border:`1px solid ${border||bg}`}}>{text}</span>;
}

function Logo({size=32}:{size?:number}) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="42" fill="none" stroke={B.carbon} strokeWidth="5.5" strokeLinecap="round"/>
      <path d="M 8 50 C 28 8, 72 92, 92 50" fill="none" stroke={B.carbon} strokeWidth="5.5" strokeLinecap="round"/>
    </svg>
  );
}

// ── Login ────────────────────────────────────────────────────────────────────
function LoginScreen({onLogin}:{onLogin:()=>void}) {
  const [pw,setPw]=useState(""); const [err,setErr]=useState(""); const [loading,setLoading]=useState(false);
  const submit = async (e:React.FormEvent) => {
    e.preventDefault(); setLoading(true); setErr("");
    try {
      const res = await fetch("/api/crm-auth",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:pw})});
      const d = await res.json();
      if (d.ok) { localStorage.setItem("crm_token",d.token); onLogin(); } else setErr("Contraseña incorrecta.");
    } catch { setErr("Error de conexión."); } finally { setLoading(false); }
  };
  return (
    <div style={{minHeight:"100vh",background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",padding:24,fontFamily:B.font}}>
      <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:16,padding:40,width:"100%",maxWidth:360}}>
        <div style={{textAlign:"center",marginBottom:32}}>
          <Logo size={48}/><p style={{fontSize:18,fontWeight:700,color:B.carbon,margin:"14px 0 2px"}}>PACOMONT</p>
          <p style={{fontSize:11,letterSpacing:"0.15em",color:B.topo,margin:0}}>Panel de gestión</p>
        </div>
        <form onSubmit={submit}>
          <label style={{display:"block",fontSize:12,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:7}}>Contraseña</label>
          <input type="password" value={pw} onChange={e=>setPw(e.target.value)} autoFocus style={{width:"100%",padding:"12px 14px",borderRadius:8,border:`1.5px solid ${B.arena}`,background:B.beige,color:B.carbon,fontSize:15,fontFamily:B.font,outline:"none",boxSizing:"border-box",marginBottom:12}}/>
          {err && <p style={{color:"#b91c1c",fontSize:13,margin:"0 0 12px"}}>{err}</p>}
          <button type="submit" disabled={loading} style={{width:"100%",padding:"12px",borderRadius:8,border:"none",background:loading?B.topo:B.carbon,color:B.beige,fontSize:14,fontWeight:600,cursor:loading?"not-allowed":"pointer",fontFamily:B.font}}>{loading?"Verificando…":"Entrar"}</button>
        </form>
      </div>
    </div>
  );
}

// ── Add Modal ────────────────────────────────────────────────────────────────
function AddModal({defaultEstado, onClose, onAdded}:{defaultEstado:string; onClose:()=>void; onAdded:()=>void}) {
  const [form, setForm] = useState({
    Nombre:"", Apellido:"", Email:"", Telefono:"", Edad:"",
    Objetivo:"", Notas:"", Estado: defaultEstado,
  });
  const [saving, setSaving] = useState(false);
  const [err,    setErr]    = useState("");

  const set = (k: keyof typeof form, v: string) => setForm(f=>({...f,[k]:v}));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.Nombre || !form.Email) { setErr("Nombre y email son obligatorios."); return; }
    setSaving(true); setErr("");
    try {
      const res = await fetch("/api/crm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const d = await res.json();
      if (d.ok) { onAdded(); onClose(); }
      else setErr("Error al guardar. Inténtalo de nuevo.");
    } catch { setErr("Error de conexión."); }
    finally { setSaving(false); }
  };

  const inp: React.CSSProperties = {width:"100%",padding:"10px 12px",borderRadius:8,border:`1.5px solid ${B.arena}`,background:"#f9f7f5",color:B.carbon,fontSize:14,fontFamily:B.font,outline:"none",boxSizing:"border-box"};
  const lbl: React.CSSProperties = {display:"block",fontSize:11,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6};

  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(26,26,26,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:16,backdropFilter:"blur(2px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{width:"100%",maxWidth:520,background:"#fff",borderRadius:18,overflow:"hidden",boxShadow:"0 24px 60px rgba(0,0,0,0.25)",fontFamily:B.font}}>
        <div style={{background:B.carbon,padding:"20px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h2 style={{color:"#fff",fontSize:18,fontWeight:700,margin:0}}>Añadir manualmente</h2>
          <button onClick={onClose} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",width:30,height:30,borderRadius:"50%",cursor:"pointer",fontSize:15,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <form onSubmit={submit} style={{padding:"24px"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><label style={lbl}>Nombre *</label><input value={form.Nombre} onChange={e=>set("Nombre",e.target.value)} placeholder="Nombre" style={inp}/></div>
            <div><label style={lbl}>Apellido</label><input value={form.Apellido} onChange={e=>set("Apellido",e.target.value)} placeholder="Apellido" style={inp}/></div>
          </div>
          <div style={{marginBottom:12}}>
            <label style={lbl}>Email *</label>
            <input type="email" value={form.Email} onChange={e=>set("Email",e.target.value)} placeholder="email@ejemplo.com" style={inp}/>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
            <div><label style={lbl}>Teléfono</label><input type="tel" value={form.Telefono} onChange={e=>set("Telefono",e.target.value)} placeholder="+34 600 000 000" style={inp}/></div>
            <div><label style={lbl}>Edad</label><input type="number" value={form.Edad} onChange={e=>set("Edad",e.target.value)} placeholder="Edad" style={inp}/></div>
          </div>
          <div style={{marginBottom:12}}>
            <label style={lbl}>Objetivo</label>
            <input value={form.Objetivo} onChange={e=>set("Objetivo",e.target.value)} placeholder="Perder grasa, HYROX, ganar músculo…" style={inp}/>
          </div>
          <div style={{marginBottom:12}}>
            <label style={lbl}>Estado</label>
            <select value={form.Estado} onChange={e=>set("Estado",e.target.value)} style={{...inp}}>
              {ESTADOS_LEAD.map(s=><option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{marginBottom:20}}>
            <label style={lbl}>Notas iniciales</label>
            <textarea value={form.Notas} onChange={e=>set("Notas",e.target.value)} placeholder="Contexto, cómo ha llegado, referido por…" style={{...inp,minHeight:72,resize:"vertical"}}/>
          </div>
          {err&&<p style={{color:"#b91c1c",fontSize:13,background:"#fef2f2",border:"1px solid #fecaca",borderRadius:8,padding:"10px 14px",marginBottom:14}}>{err}</p>}
          <button type="submit" disabled={saving} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:saving?B.topo:B.carbon,color:B.beige,fontSize:14,fontWeight:600,cursor:saving?"not-allowed":"pointer",fontFamily:B.font}}>
            {saving?"Guardando…":"Añadir"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Detail Modal ─────────────────────────────────────────────────────────────
function DetailModal({client,onClose,onSave}:{client:Client;onClose:()=>void;onSave:(u:Partial<Client>)=>Promise<void>}) {
  const isClient = client.Estado === "Compró";

  const [estado,      setEstado]    = useState(client.Estado||"Pendiente llamada");
  const [notas,       setNotas]     = useState(client.Notas||"");
  const [ultimaLl,    setUltimaLl]  = useState(client.UltimaLlamada||"");
  const [plan,        setPlan]      = useState(client.PlanContratado||"");
  const [inicio,      setInicio]    = useState(client.FechaInicio||"");
  const [proxima,     setProxima]   = useState(client.ProximaLlamada||"");
  const [nivel,       setNivel]     = useState(client.NivelCondicion||"—");
  const [estadoPlan,  setEstadoPlan]= useState(client.EstadoPlan||"Activo");
  const [modalidad,   setModalidad] = useState(client.Modalidad||"");
  const [proxCobro,   setProxCobro] = useState(client.ProximoCobro||"");
  const [nutricion,   setNutricion] = useState(client.Nutricion||"");
  const [motivacion,  setMotivacion]= useState(client.Motivacion||"");
  const [factores,    setFactores]  = useState(client.FactoresExternos||"");
  const [historial,   setHistorial] = useState<NotaEntry[]>(()=>parseNotas(client.NotasSeguimiento||""));
  const [nuevaNota,   setNuevaNota] = useState("");
  const [saving,      setSaving]    = useState(false);
  const [savingNota,  setSavingNota]= useState(false);
  const [showForm,    setShowForm]  = useState(false);

  const info = precioInfo(modalidad);

  const handleModalidad = (m:string) => {
    setModalidad(m);
    if (inicio && !proxCobro) {
      const mi = MODALIDADES[m];
      if (mi) setProxCobro(sumarMeses(inicio, mi.meses));
    }
  };

  const saveAll = async () => {
    setSaving(true);
    const comprado = estado==="Compró"?"Sí":estado==="No compró"?"No":client.Comprado;
    await onSave({Estado:estado,Notas:notas,UltimaLlamada:ultimaLl,Comprado:comprado,
      PlanContratado:plan,FechaInicio:inicio,ProximaLlamada:proxima,NivelCondicion:nivel,
      EstadoPlan:estadoPlan,Modalidad:modalidad,ProximoCobro:proxCobro,
      Nutricion:nutricion,Motivacion:motivacion,
      FactoresExternos:factores,NotasSeguimiento:JSON.stringify(historial)});
    setSaving(false);
  };

  const addNota = async () => {
    if (!nuevaNota.trim()) return;
    setSavingNota(true);
    const entry: NotaEntry = { fecha: new Date().toISOString(), texto: nuevaNota.trim() };
    const updated = [entry, ...historial];
    setHistorial(updated);
    setNuevaNota("");
    await onSave({ NotasSeguimiento: JSON.stringify(updated) });
    setSavingNota(false);
  };

  const inp: React.CSSProperties = {width:"100%",padding:"10px 12px",borderRadius:8,border:`1.5px solid ${B.arena}`,background:"#f9f7f5",color:B.carbon,fontSize:14,fontFamily:B.font,outline:"none",boxSizing:"border-box"};
  const ta:  React.CSSProperties = {...inp,minHeight:80,resize:"vertical"};
  const lbl: React.CSSProperties = {display:"block",fontSize:11,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.05em",marginBottom:6};
  const fld = (l:string,v:string) => v ? <div style={{marginBottom:10}}><p style={{...lbl,margin:"0 0 3px"}}>{l}</p><p style={{fontSize:14,color:B.carbon,margin:0,lineHeight:1.5}}>{v}</p></div> : null;

  return (
    <div style={{position:"fixed",inset:0,zIndex:100,background:"rgba(26,26,26,0.5)",display:"flex",alignItems:"center",justifyContent:"center",padding:"16px",backdropFilter:"blur(2px)"}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{width:"100%",maxWidth:740,maxHeight:"92vh",background:"#fff",borderRadius:18,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 24px 60px rgba(0,0,0,0.25)",fontFamily:B.font}}>

        {/* Header oscuro */}
        <div style={{background:B.carbon,padding:"22px 28px",flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
            <div style={{flex:1}}>
              <h2 style={{color:"#fff",fontSize:22,fontWeight:700,margin:"0 0 8px",letterSpacing:"-0.02em"}}>{client.Nombre} {client.Apellido}</h2>
              <div style={{display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
                {isClient&&plan&&<span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:B.brown,color:B.beige}}>{plan}</span>}
                {isClient&&<span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:PLAN_BADGE[estadoPlan||"Activo"]?.bg,color:PLAN_BADGE[estadoPlan||"Activo"]?.text}}>{estadoPlan||"Activo"}</span>}
                {!isClient&&<span style={{padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:LEAD_BADGE[client.Estado]?.bg,color:LEAD_BADGE[client.Estado]?.text}}>{client.Estado}</span>}
              </div>
            </div>
            <button onClick={onClose} style={{background:"rgba(255,255,255,0.12)",border:"none",color:"#fff",width:32,height:32,borderRadius:"50%",cursor:"pointer",fontSize:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>✕</button>
          </div>
          <div style={{display:"flex",gap:20,marginTop:16,flexWrap:"wrap"}}>
            <a href={`mailto:${client.Email}`} style={{color:B.arena,fontSize:13,textDecoration:"none"}}>✉ {client.Email}</a>
            <a href={`https://wa.me/${(client.Telefono||"").replace(/\D/g,"")}`} target="_blank" rel="noreferrer" style={{color:"#4ade80",fontSize:13,textDecoration:"none"}}>📱 {client.Telefono}</a>
            {client.Edad&&<span style={{color:B.arena,fontSize:13}}>🎂 {client.Edad} años</span>}
          </div>
        </div>

        {/* Cuerpo scrollable */}
        <div style={{overflowY:"auto",flex:1,padding:"24px 28px"}}>

          {isClient && (
            <>
              {/* Ficha */}
              <p style={{fontSize:11,fontWeight:700,color:B.brown,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 16px"}}>Ficha de cliente</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div>
                  <label style={lbl}>Plan contratado</label>
                  <select value={plan} onChange={e=>setPlan(e.target.value)} style={{...inp}}>
                    <option value="">— Seleccionar —</option>
                    {PLANES.map(p=><option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Nivel de condición</label>
                  <select value={nivel} onChange={e=>setNivel(e.target.value)} style={{...inp}}>
                    {NIVELES.map(n=><option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div>
                  <label style={lbl}>Fecha de inicio</label>
                  <input type="date" value={inicio} onChange={e=>setInicio(e.target.value)} style={inp}/>
                </div>
                <div>
                  <label style={lbl}>Próxima llamada</label>
                  <input type="date" value={proxima} onChange={e=>setProxima(e.target.value)} style={inp}/>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
                <div>
                  <label style={lbl}>Estado del plan</label>
                  <select value={estadoPlan} onChange={e=>setEstadoPlan(e.target.value)} style={{...inp}}>
                    {ESTADOS_PLAN.map(s=><option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Modalidad de pago</label>
                  <select value={modalidad} onChange={e=>handleModalidad(e.target.value)} style={{...inp}}>
                    <option value="">— Seleccionar —</option>
                    <option value="Trimestral">Trimestral (299€)</option>
                    <option value="Semestral">Semestral (459€)</option>
                  </select>
                </div>
              </div>

              {/* Resumen económico */}
              {info && (
                <div style={{background:B.carbon,borderRadius:12,padding:"16px 20px",marginBottom:20,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
                  <div>
                    <p style={{fontSize:11,color:B.arena,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>Precio plan</p>
                    <p style={{fontSize:20,fontWeight:800,color:"#fff",margin:0}}>{info.precio}€</p>
                    <p style={{fontSize:11,color:B.topo,margin:0}}>{info.label}</p>
                  </div>
                  <div>
                    <p style={{fontSize:11,color:B.arena,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:600}}>Tu parte (70%)</p>
                    <p style={{fontSize:20,fontWeight:800,color:"#4ade80",margin:0}}>{info.corte}€</p>
                    <p style={{fontSize:11,color:B.topo,margin:0}}>{info.label}</p>
                  </div>
                  <div>
                    <label style={{...lbl,color:B.arena,margin:"0 0 6px"}}>Próximo cobro</label>
                    <input type="date" value={proxCobro} onChange={e=>setProxCobro(e.target.value)} style={{width:"100%",padding:"7px 10px",borderRadius:7,border:`1.5px solid ${B.topo}`,background:"rgba(255,255,255,0.1)",color:"#fff",fontSize:13,fontFamily:B.font,outline:"none",boxSizing:"border-box",colorScheme:"dark"}}/>
                  </div>
                </div>
              )}
              {!info && (
                <div style={{marginBottom:20}}>
                  <label style={lbl}>Próximo cobro</label>
                  <input type="date" value={proxCobro} onChange={e=>setProxCobro(e.target.value)} style={{...inp,maxWidth:220}}/>
                </div>
              )}

              {/* Perfil del atleta */}
              <div style={{borderTop:`1px solid ${B.arena}`,paddingTop:20,marginBottom:20}}>
                <p style={{fontSize:11,fontWeight:700,color:B.brown,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 16px"}}>Perfil del atleta</p>
                <div style={{marginBottom:12}}>
                  <label style={lbl}>Motivación principal</label>
                  <textarea value={motivacion} onChange={e=>setMotivacion(e.target.value)} placeholder="Qué le mueve, por qué quiere cambiar…" style={ta}/>
                </div>
                <div style={{marginBottom:12}}>
                  <label style={lbl}>Factores externos</label>
                  <textarea value={factores} onChange={e=>setFactores(e.target.value)} placeholder="Trabajo, familia, viajes, horarios, estrés…" style={ta}/>
                </div>
                <div>
                  <label style={lbl}>Nutrición (preferencias / restricciones)</label>
                  <textarea value={nutricion} onChange={e=>setNutricion(e.target.value)} placeholder="Alergias, intolerancias, preferencias, comedor de empresa…" style={ta}/>
                </div>
              </div>

              {/* Historial de seguimiento */}
              <div style={{borderTop:`1px solid ${B.arena}`,paddingTop:20,marginBottom:20}}>
                <p style={{fontSize:11,fontWeight:700,color:B.brown,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 16px"}}>Historial de seguimiento</p>
                <div style={{marginBottom:20}}>
                  <label style={lbl}>Nueva nota</label>
                  <textarea value={nuevaNota} onChange={e=>setNuevaNota(e.target.value)} placeholder="Resumen de la llamada, ajustes del plan, observaciones…" style={{...ta,minHeight:90}}/>
                  <button onClick={addNota} disabled={savingNota||!nuevaNota.trim()} style={{marginTop:8,padding:"9px 18px",borderRadius:8,border:"none",background:savingNota||!nuevaNota.trim()?B.arena:B.brown,color:"#fff",fontSize:13,fontWeight:600,cursor:savingNota||!nuevaNota.trim()?"not-allowed":"pointer",fontFamily:B.font}}>
                    {savingNota?"Guardando…":"+ Guardar nota"}
                  </button>
                </div>
                {historial.length===0?(
                  <p style={{fontSize:13,color:B.arena,textAlign:"center",padding:"16px 0"}}>Sin notas todavía.</p>
                ):(
                  <div>
                    {historial.map((n,i)=>(
                      <div key={i} style={{display:"flex",gap:14,marginBottom:i<historial.length-1?20:0}}>
                        <div style={{flexShrink:0,display:"flex",flexDirection:"column",alignItems:"center"}}>
                          <div style={{width:9,height:9,borderRadius:"50%",background:B.brown,marginTop:3}}/>
                          {i<historial.length-1&&<div style={{width:2,background:B.arena,flex:1,marginTop:4}}/>}
                        </div>
                        <div style={{flex:1,paddingBottom:i<historial.length-1?0:0}}>
                          <p style={{fontSize:12,fontWeight:600,color:B.topo,margin:"0 0 5px"}}>
                            {new Date(n.fecha).toLocaleDateString("es-ES",{day:"numeric",month:"long",year:"numeric"})}
                            <span style={{fontWeight:400,marginLeft:6}}>{new Date(n.fecha).toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}</span>
                          </p>
                          <p style={{fontSize:14,color:B.carbon,margin:0,lineHeight:1.65,whiteSpace:"pre-wrap"}}>{n.texto}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {/* Gestión del lead */}
          <div style={{borderTop:isClient?`1px solid ${B.arena}`:"none",paddingTop:isClient?20:0,marginBottom:20}}>
            <p style={{fontSize:11,fontWeight:700,color:B.brown,textTransform:"uppercase",letterSpacing:"0.08em",margin:"0 0 16px"}}>Gestión</p>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <div>
                <label style={lbl}>Estado</label>
                <select value={estado} onChange={e=>setEstado(e.target.value)} style={{...inp}}>
                  {ESTADOS_LEAD.map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={lbl}>Última llamada</label>
                <input type="date" value={ultimaLl} onChange={e=>setUltimaLl(e.target.value)} style={inp}/>
              </div>
            </div>
            <div>
              <label style={lbl}>Notas de llamada</label>
              <textarea value={notas} onChange={e=>setNotas(e.target.value)} placeholder="Resumen, próximos pasos…" style={{...ta,minHeight:70}}/>
            </div>
          </div>

          {/* Respuestas formulario */}
          <div style={{borderTop:`1px solid ${B.arena}`,paddingTop:16,marginBottom:24}}>
            <button onClick={()=>setShowForm(!showForm)} style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",background:"none",border:"none",cursor:"pointer",padding:0,fontFamily:B.font}}>
              <p style={{fontSize:11,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.06em",margin:0}}>Respuestas del formulario</p>
              <span style={{color:B.topo,fontSize:14,transform:showForm?"rotate(180deg)":"none",transition:"transform 0.2s"}}>▾</span>
            </button>
            {showForm&&(
              <div style={{marginTop:14}}>
                {fld("Objetivo",client.Objetivo)}
                {fld("Por qué ahora",client.PorQueAhora)}
                {fld("Lesiones / limitaciones",client.Lesiones)}
                {fld("Experiencia con entrenadores",client.ExperienciaEntrenador)}
                {fld("Mayor obstáculo",client.MayorObstaculo)}
                {fld("Importancia (1-10)",client.Importancia)}
                {fld("Inversión mensual",client.Inversion)}
              </div>
            )}
          </div>
        </div>

        {/* Footer fijo */}
        <div style={{borderTop:`1px solid ${B.arena}`,padding:"16px 28px",flexShrink:0,background:"#fff"}}>
          <button onClick={saveAll} disabled={saving} style={{width:"100%",padding:"13px",borderRadius:10,border:"none",background:saving?B.topo:B.carbon,color:B.beige,fontSize:14,fontWeight:600,cursor:saving?"not-allowed":"pointer",fontFamily:B.font,letterSpacing:"0.02em"}}>
            {saving?"Guardando…":"Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Pipeline Card ────────────────────────────────────────────────────────────
function PipelineCard({c,type,onUpdate,onOpen}:{c:Client;type:"pending"|"called"|"closed";onUpdate:(u:Partial<Client>)=>void;onOpen:()=>void}) {
  const since = c.Fecha ? Math.round((Date.now()-new Date(c.Fecha).getTime())/3600e3) : null;
  const timeLabel = since===null?"":since<24?`hace ${since}h`:`hace ${Math.floor(since/24)}d`;
  const btn = (label:string, onClick:()=>void, style?:React.CSSProperties) => (
    <button onClick={onClick} style={{border:"none",borderRadius:7,padding:"7px 11px",fontFamily:B.font,fontSize:13,fontWeight:600,cursor:"pointer",...style}}>{label}</button>
  );
  return (
    <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:10,padding:"14px 16px",marginBottom:8}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:2}}>
        <p style={{fontSize:14,fontWeight:700,color:B.carbon,margin:0}}>{c.Nombre} {c.Apellido}</p>
        <span style={{fontSize:11,color:B.topo,flexShrink:0,marginLeft:8}}>{timeLabel}</span>
      </div>
      {c.Telefono&&<p style={{fontSize:13,color:B.topo,margin:"0 0 4px"}}>{c.Telefono}</p>}
      {c.Objetivo&&<p style={{fontSize:12,color:B.brown,margin:"0 0 10px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.Objetivo}</p>}
      {!c.Objetivo&&<div style={{marginBottom:10}}/>}
      <div style={{display:"flex",gap:7,flexWrap:"wrap"}}>
        {type==="pending"&&<>
          {btn("Llamé ✓",()=>onUpdate({Estado:"Llamada hecha",UltimaLlamada:new Date().toLocaleDateString("es-ES")}),{flex:1,background:B.carbon,color:B.beige})}
          {btn("Ver ficha",onOpen,{background:B.beige,border:`1px solid ${B.arena}`,color:B.brown})}
        </>}
        {type==="called"&&<>
          {btn("Compró ✓",()=>onUpdate({Estado:"Compró"}),{flex:1,background:"#166534",color:"#fff"})}
          {btn("No compró",()=>onUpdate({Estado:"No compró"}),{flex:1,background:"#fef2f2",color:"#991b1b",border:"1px solid #fecaca"})}
          {btn("Ver",onOpen,{background:B.beige,border:`1px solid ${B.arena}`,color:B.brown})}
        </>}
        {type==="closed"&&<SmallBadge text={c.Estado} bg={LEAD_BADGE[c.Estado]?.bg||"#f3f4f6"} color={LEAD_BADGE[c.Estado]?.text||"#374151"} border={LEAD_BADGE[c.Estado]?.border}/>}
      </div>
    </div>
  );
}

// ── Main CRM ─────────────────────────────────────────────────────────────────
export default function CrmPage() {
  const [authed,  setAuthed]   = useState(false);
  const [clients, setClients]  = useState<Client[]>([]);
  const [loading, setLoading]  = useState(false);
  const [view,         setView]        = useState<"pipeline"|"leads"|"clientes">("pipeline");
  const [filter,       setFilter]      = useState("Todos");
  const [filterPlan,   setFilterPlan]  = useState("Todos");
  const [filterMod,    setFilterMod]   = useState("Todos");
  const [filterCobro,  setFilterCobro] = useState("Todos");
  const [filterCalls,  setFilterCalls] = useState(false);
  const [selected,     setSelected]    = useState<Client|null>(null);
  const [addOpen,      setAddOpen]     = useState(false);
  const [search,       setSearch]      = useState("");
  const [pipeForm,     setPipeForm]    = useState({Nombre:"",Telefono:"",Fuente:"WhatsApp"});
  const [pipeAdding,   setPipeAdding]  = useState(false);

  useEffect(()=>{ if (localStorage.getItem("crm_token")) setAuthed(true); },[]);

  const fetchClients = useCallback(async()=>{
    setLoading(true);
    try { const res=await fetch("/api/crm"); const d=await res.json(); if(d.rows) setClients(d.rows.reverse()); }
    finally { setLoading(false); }
  },[]);

  useEffect(()=>{ if(authed) fetchClients(); },[authed,fetchClients]);

  const quickUpdate = useCallback(async(c:Client,updates:Partial<Client>)=>{
    await fetch("/api/crm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_action:"update",_row:c._row,...updates})});
    setClients(prev=>prev.map(x=>x._row===c._row?{...x,...updates}:x));
  },[]);

  const quickAdd = async()=>{
    if(!pipeForm.Nombre||pipeAdding) return;
    setPipeAdding(true);
    try {
      const res=await fetch("/api/crm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Nombre:pipeForm.Nombre,Telefono:pipeForm.Telefono,Notas:`Via ${pipeForm.Fuente}`,Estado:"Pendiente llamada"})});
      const d=await res.json();
      if(d.ok){await fetchClients();setPipeForm({Nombre:"",Telefono:"",Fuente:"WhatsApp"});}
    }finally{setPipeAdding(false);}
  };

  const handleSave = async(updated:Partial<Client>)=>{
    if(!selected) return;
    await fetch("/api/crm",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({_action:"update",_row:selected._row,...updated})});
    setClients(prev=>prev.map(c=>c._row===selected._row?{...c,...updated}:c));
    setSelected(c=>c?{...c,...updated}:c);
  };

  if (!authed) return <LoginScreen onLogin={()=>setAuthed(true)}/>;

  const leads    = clients.filter(c=>c.Estado!=="Compró");
  const clientes = clients.filter(c=>c.Estado==="Compró");

  const TABS_LEAD = ["Todos",...ESTADOS_LEAD];
  const filteredLeads = leads.filter(c=>{
    const ok = filter==="Todos"||c.Estado===filter;
    const q  = search.toLowerCase();
    return ok && (!q||(c.Nombre+" "+c.Apellido).toLowerCase().includes(q)||c.Email?.toLowerCase().includes(q)||c.Objetivo?.toLowerCase().includes(q));
  });
  const filteredClients = clientes.filter(c=>{
    const q = search.toLowerCase();
    if (q && !(c.Nombre+" "+c.Apellido).toLowerCase().includes(q) && !c.PlanContratado?.toLowerCase().includes(q) && !c.Email?.toLowerCase().includes(q)) return false;
    if (filterPlan!=="Todos") {
      const ep = c.EstadoPlan||"Activo";
      if (ep!==filterPlan) return false;
    }
    if (filterMod!=="Todos") {
      if (filterMod==="Sin asignar" ? !!c.Modalidad : c.Modalidad!==filterMod) return false;
    }
    if (filterCobro!=="Todos") {
      const days = c.ProximoCobro ? Math.ceil((new Date(c.ProximoCobro).getTime()-Date.now())/864e5) : null;
      if (filterCobro==="Vencidos"   && (days===null||days>=0)) return false;
      if (filterCobro==="Esta semana"&& (days===null||days<0||days>7)) return false;
      if (filterCobro==="Este mes"   && (days===null||days<0||days>30)) return false;
      if (filterCobro==="Sin fecha"  && days!==null) return false;
    }
    if (filterCalls && !needsMonthlyCall(c)) return false;
    return true;
  });

  const proximaSemana = clientes.filter(c=>{
    if(!c.ProximaLlamada) return false;
    const days=Math.ceil((new Date(c.ProximaLlamada).getTime()-Date.now())/864e5);
    return days>=0&&days<=7;
  }).length;

  const inp: React.CSSProperties = {padding:"9px 14px",borderRadius:8,border:`1.5px solid ${B.arena}`,background:"#f9f7f5",color:B.carbon,fontSize:14,fontFamily:B.font,outline:"none",boxSizing:"border-box",width:"100%"};

  return (
    <div style={{minHeight:"100vh",background:"#fff",fontFamily:B.font}}>
      {/* Topbar */}
      <div style={{background:"#fff",borderBottom:`1px solid ${B.arena}`,padding:"14px 24px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <Logo size={30}/>
          <div><p style={{fontSize:13,fontWeight:700,color:B.carbon,margin:0,letterSpacing:"0.05em"}}>PACOMONT</p><p style={{fontSize:9,letterSpacing:"0.12em",color:B.topo,margin:0}}>ONLINE COACHING</p></div>
        </div>
        <div style={{display:"flex",gap:10}}>
          <button onClick={()=>setAddOpen(true)} style={{background:B.carbon,border:"none",color:B.beige,padding:"7px 16px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:B.font,fontWeight:600}}>+ Añadir</button>
          <button onClick={fetchClients} disabled={loading} style={{background:B.beige,border:`1px solid ${B.arena}`,color:B.brown,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:B.font,fontWeight:500}}>{loading?"…":"↻ Actualizar"}</button>
          <button onClick={()=>{localStorage.removeItem("crm_token");setAuthed(false);}} style={{background:"none",border:`1px solid ${B.arena}`,color:B.topo,padding:"7px 14px",borderRadius:8,cursor:"pointer",fontSize:13,fontFamily:B.font}}>Salir</button>
        </div>
      </div>

      {/* Main tabs */}
      <div style={{borderBottom:`1px solid ${B.arena}`,padding:"0 24px",background:"#fff",display:"flex"}}>
        {([
          ["pipeline","Pipeline",leads.filter(c=>c.Estado==="Pendiente llamada").length],
          ["leads","Leads",leads.length],
          ["clientes","Clientes",clientes.length],
        ] as const).map(([id,label,count])=>(
          <button key={id} onClick={()=>{setView(id);setSearch("");setFilter("Todos");setFilterPlan("Todos");setFilterMod("Todos");setFilterCobro("Todos");setFilterCalls(false);}} style={{padding:"14px 20px",border:"none",background:"none",cursor:"pointer",fontFamily:B.font,fontSize:14,fontWeight:view===id?700:400,color:view===id?B.carbon:B.topo,borderBottom:view===id?`2px solid ${B.carbon}`:"2px solid transparent",transition:"all 0.15s"}}>
            {label} <span style={{fontSize:12,marginLeft:4,padding:"2px 7px",borderRadius:20,background:view===id?B.carbon:B.arena,color:view===id?B.beige:B.topo,fontWeight:600}}>{count}</span>
          </button>
        ))}
      </div>

      <div style={{maxWidth:1200,margin:"0 auto",padding:"24px"}}>

        {/* ── PIPELINE ── */}
        {view==="pipeline"&&(
          <>
            {/* Quick add */}
            <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,padding:"16px 20px",marginBottom:20}}>
              <p style={{fontSize:12,fontWeight:700,color:B.topo,textTransform:"uppercase",letterSpacing:"0.06em",margin:"0 0 12px"}}>Añadir contacto rápido</p>
              <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                <input placeholder="Nombre *" value={pipeForm.Nombre} onChange={e=>setPipeForm(f=>({...f,Nombre:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&quickAdd()} style={{...inp,flex:"1 1 160px",maxWidth:220}}/>
                <input placeholder="Teléfono" value={pipeForm.Telefono} onChange={e=>setPipeForm(f=>({...f,Telefono:e.target.value}))} style={{...inp,flex:"1 1 140px",maxWidth:180}}/>
                <select value={pipeForm.Fuente} onChange={e=>setPipeForm(f=>({...f,Fuente:e.target.value}))} style={{...inp,flex:"0 0 auto"}}>
                  {["WhatsApp","Instagram","Referido","Formulario","Otro"].map(s=><option key={s}>{s}</option>)}
                </select>
                <button onClick={quickAdd} disabled={pipeAdding||!pipeForm.Nombre} style={{background:B.carbon,color:B.beige,border:"none",borderRadius:8,padding:"9px 18px",fontFamily:B.font,fontSize:14,fontWeight:600,cursor:!pipeForm.Nombre||pipeAdding?"not-allowed":"pointer",opacity:!pipeForm.Nombre?0.5:1}}>
                  {pipeAdding?"…":"+ Añadir"}
                </button>
              </div>
            </div>

            {(()=>{
              const pending    = leads.filter(c=>c.Estado==="Pendiente llamada");
              const called     = leads.filter(c=>c.Estado==="Llamada hecha"||c.Estado==="Llamada programada");
              const closedWeek = leads.filter(c=>(c.Estado==="Compró"||c.Estado==="No compró")&&!!c.Fecha&&(Date.now()-new Date(c.Fecha).getTime())<7*864e5);
              return (
                <>
                  {/* Stat chips */}
                  <div style={{display:"flex",gap:10,marginBottom:20,flexWrap:"wrap"}}>
                    {[
                      {l:"Por llamar",    v:pending.length,    c:"#92400e",bg:"#fffbeb"},
                      {l:"Ya llamé",      v:called.length,     c:"#1e40af",bg:"#eff6ff"},
                      {l:"Cerrado semana",v:closedWeek.length, c:"#166534",bg:"#f0fdf4"},
                      {l:"Total leads",   v:leads.length,      c:B.brown,   bg:B.beige},
                    ].map(s=>(
                      <div key={s.l} style={{background:s.bg,borderRadius:10,padding:"10px 16px",display:"flex",gap:10,alignItems:"center"}}>
                        <span style={{fontSize:22,fontWeight:800,color:s.c}}>{s.v}</span>
                        <span style={{fontSize:12,color:s.c}}>{s.l}</span>
                      </div>
                    ))}
                  </div>

                  {/* Kanban columns */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16,alignItems:"start"}}>
                    <div>
                      <p style={{fontSize:11,fontWeight:700,color:"#92400e",textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 12px"}}>📥 Por llamar ({pending.length})</p>
                      {pending.length===0
                        ?<p style={{color:B.topo,fontSize:13}}>¡Ninguno pendiente!</p>
                        :pending.map(c=><PipelineCard key={c._row} c={c} type="pending" onUpdate={u=>quickUpdate(c,u)} onOpen={()=>setSelected(c)}/>)
                      }
                    </div>
                    <div>
                      <p style={{fontSize:11,fontWeight:700,color:"#1e40af",textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 12px"}}>📞 Ya llamé ({called.length})</p>
                      {called.length===0
                        ?<p style={{color:B.topo,fontSize:13}}>Ninguna todavía.</p>
                        :called.map(c=><PipelineCard key={c._row} c={c} type="called" onUpdate={u=>quickUpdate(c,u)} onOpen={()=>setSelected(c)}/>)
                      }
                    </div>
                    <div>
                      <p style={{fontSize:11,fontWeight:700,color:"#166534",textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 12px"}}>✅ Cerrado esta semana ({closedWeek.length})</p>
                      {closedWeek.length===0
                        ?<p style={{color:B.topo,fontSize:13}}>Nada esta semana.</p>
                        :closedWeek.map(c=><PipelineCard key={c._row} c={c} type="closed" onUpdate={u=>quickUpdate(c,u)} onOpen={()=>setSelected(c)}/>)
                      }
                    </div>
                  </div>
                </>
              );
            })()}
          </>
        )}

        {/* ── LEADS ── */}
        {view==="leads"&&(
          <>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:12,marginBottom:20}}>
              {[{l:"Total leads",v:leads.length,c:B.brown},{l:"Pendiente",v:leads.filter(c=>c.Estado==="Pendiente llamada").length,c:"#92400e"},{l:"Compraron",v:clientes.length,c:"#166534"},{l:"No compraron",v:leads.filter(c=>c.Estado==="No compró").length,c:"#991b1b"}].map(s=>(
                <div key={s.l} style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,padding:"16px 20px"}}>
                  <p style={{fontSize:28,fontWeight:800,color:s.c,margin:"0 0 2px"}}>{s.v}</p>
                  <p style={{fontSize:12,color:B.topo,margin:0}}>{s.l}</p>
                </div>
              ))}
            </div>
            <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,padding:"16px 20px",marginBottom:14}}>
              <input placeholder="Buscar nombre, email u objetivo…" value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,marginBottom:14}}/>
              <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                {TABS_LEAD.map(t=>{const active=filter===t;const s=LEAD_BADGE[t];return(
                  <button key={t} onClick={()=>setFilter(t)} style={{padding:"5px 13px",borderRadius:20,fontSize:13,fontFamily:B.font,cursor:"pointer",border:active?`1.5px solid ${s?.border||B.arena}`:`1.5px solid ${B.arena}`,background:active?(s?.bg||B.beige):"#fff",color:active?(s?.text||B.carbon):B.topo,fontWeight:active?600:400}}>
                    {t}{t!=="Todos"&&<span style={{opacity:0.6,marginLeft:4}}>({leads.filter(c=>c.Estado===t).length})</span>}
                  </button>
                );})}
              </div>
            </div>
            {loading?<p style={{color:B.topo,textAlign:"center",padding:48}}>Cargando…</p>
            :filteredLeads.length===0?<p style={{color:B.topo,textAlign:"center",padding:48}}>Sin resultados.</p>
            :(
              <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                    <thead><tr style={{borderBottom:`1px solid ${B.arena}`,background:B.beige}}>
                      {["Fecha","Nombre","Email","Teléfono","Objetivo","Estado","Últ. llamada"].map(h=>(
                        <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredLeads.map((c,i)=>(
                        <tr key={c._row} onClick={()=>setSelected(c)} style={{borderBottom:i<filteredLeads.length-1?`1px solid ${B.beige}`:"none",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.background=B.beige)} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                          <td style={{padding:"12px 16px",fontSize:13,color:B.topo,whiteSpace:"nowrap"}}>{c.Fecha?new Date(c.Fecha).toLocaleDateString("es-ES",{day:"numeric",month:"short"}):"—"}</td>
                          <td style={{padding:"12px 16px",fontSize:14,fontWeight:600,color:B.carbon,whiteSpace:"nowrap"}}>{c.Nombre} {c.Apellido}</td>
                          <td style={{padding:"12px 16px",fontSize:13,color:B.brown}}>{c.Email}</td>
                          <td style={{padding:"12px 16px",fontSize:13,color:B.topo,whiteSpace:"nowrap"}}>{c.Telefono}</td>
                          <td style={{padding:"12px 16px",fontSize:13,color:B.topo,maxWidth:180}}><span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",display:"block"}}>{c.Objetivo||"—"}</span></td>
                          <td style={{padding:"12px 16px"}}><SmallBadge text={c.Estado} bg={LEAD_BADGE[c.Estado]?.bg||"#f3f4f6"} color={LEAD_BADGE[c.Estado]?.text||"#374151"} border={LEAD_BADGE[c.Estado]?.border}/></td>
                          <td style={{padding:"12px 16px",fontSize:13,color:B.topo,whiteSpace:"nowrap"}}>{c.UltimaLlamada||"—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {/* ── CLIENTES ── */}
        {view==="clientes"&&(
          <>
            {(()=>{
              const sinLlamada     = clientes.filter(c=>(c.EstadoPlan==="Activo"||!c.EstadoPlan)&&needsMonthlyCall(c));
              const activosFilt    = filteredClients.filter(c=>c.EstadoPlan==="Activo"||!c.EstadoPlan);
              const mrr            = activosFilt.reduce((s,c)=>{const i=precioInfo(c.Modalidad);return s+(i?i.corte/i.meses:0);},0);
              const mrrBruto       = activosFilt.reduce((s,c)=>{const i=precioInfo(c.Modalidad);return s+(i?i.precio/i.meses:0);},0);
              const proxCobros     = filteredClients.filter(c=>{if(!c.ProximoCobro)return false;const d=Math.ceil((new Date(c.ProximoCobro).getTime()-Date.now())/864e5);return d>=0&&d<=30;}).length;
              const isFiltered     = filterPlan!=="Todos"||filterMod!=="Todos"||filterCobro!=="Todos"||filterCalls||!!search;
              return (
                <>
                  {/* Alertas de llamadas mensuales */}
                  {sinLlamada.length>0&&(
                    <div style={{background:"#1c1400",border:"1px solid #92400e",borderRadius:12,padding:"14px 18px",marginBottom:14}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                        <p style={{fontSize:13,fontWeight:700,color:"#fbbf24",margin:0}}>⚠ {sinLlamada.length} cliente{sinLlamada.length!==1?"s":""} sin llamada mensual</p>
                        <button onClick={()=>setFilterCalls(true)} style={{background:"#92400e",border:"none",color:"#fef3c7",fontSize:12,fontWeight:600,padding:"4px 10px",borderRadius:6,cursor:"pointer",fontFamily:B.font}}>Ver solo estos</button>
                      </div>
                      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                        {sinLlamada.map(c=>{
                          const notas=parseNotas(c.NotasSeguimiento||"");
                          const dias=notas.length>0?Math.floor((Date.now()-new Date(notas[0].fecha).getTime())/864e5):null;
                          return(
                            <button key={c._row} onClick={()=>setSelected(c)} style={{background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.15)",color:"#fef3c7",padding:"5px 12px",borderRadius:20,fontSize:13,cursor:"pointer",fontFamily:B.font,textAlign:"left"}}>
                              {c.Nombre} {c.Apellido}
                              <span style={{opacity:0.6,marginLeft:6}}>{dias!==null?`${dias}d sin nota`:c.ProximaLlamada&&new Date(c.ProximaLlamada)<new Date()?"llamada vencida":"sin registro"}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Tarjeta MRR — responde a filtros activos */}
                  <div style={{background:B.carbon,borderRadius:14,padding:"20px 24px",marginBottom:14}}>
                    {isFiltered&&<p style={{fontSize:11,color:B.topo,margin:"0 0 8px",textTransform:"uppercase",letterSpacing:"0.06em"}}>Mostrando {filteredClients.length} de {clientes.length} clientes</p>}
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:16}}>
                      <div>
                        <p style={{fontSize:12,fontWeight:600,color:B.topo,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:"0.06em"}}>Tu ingreso mensual{isFiltered?" (filtrado)":""}</p>
                        <p style={{fontSize:42,fontWeight:800,color:"#4ade80",margin:0,letterSpacing:"-0.02em"}}>{mrr?`${Math.round(mrr)}€`:"—"}</p>
                        <p style={{fontSize:13,color:B.arena,margin:"4px 0 0"}}>Bruto mensual: {mrrBruto?`${Math.round(mrrBruto)}€`:"—"}</p>
                      </div>
                      <div style={{display:"flex",gap:24,flexWrap:"wrap"}}>
                        <div style={{textAlign:"center"}}>
                          <p style={{fontSize:28,fontWeight:800,color:"#fff",margin:0}}>{activosFilt.length}</p>
                          <p style={{fontSize:12,color:B.topo,margin:0}}>{isFiltered?"Filtrados activos":"Activos"}</p>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <p style={{fontSize:28,fontWeight:800,color:proxCobros>0?"#fbbf24":"#fff",margin:0}}>{proxCobros}</p>
                          <p style={{fontSize:12,color:B.topo,margin:0}}>Cobros 30d</p>
                        </div>
                        <div style={{textAlign:"center"}}>
                          <p style={{fontSize:28,fontWeight:800,color:"#fff",margin:0}}>{mrr?`${Math.round(mrr*12)}€`:"—"}</p>
                          <p style={{fontSize:12,color:B.topo,margin:0}}>Proyección anual</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Stats secundarios */}
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))",gap:10,marginBottom:16}}>
                    {[
                      {l:"Total clientes",v:`${clientes.length}`,c:B.brown},
                      {l:"Trimestral",v:`${clientes.filter(c=>c.Modalidad==="Trimestral").length}`,c:B.brown,sub:"299€ · cobras 209€"},
                      {l:"Semestral",v:`${clientes.filter(c=>c.Modalidad==="Semestral").length}`,c:B.brown,sub:"459€ · cobras 321€"},
                      {l:"Sin llamada mensual",v:`${sinLlamada.length}`,c:sinLlamada.length>0?"#92400e":B.topo,clickable:true},
                    ].map(s=>(
                      <div key={s.l} onClick={"clickable" in s&&s.clickable?()=>setFilterCalls(!filterCalls):undefined}
                        style={{background:"#fff",border:`1px solid ${"clickable" in s&&s.clickable&&sinLlamada.length>0?"#fde68a":B.arena}`,borderRadius:10,padding:"14px 16px",cursor:"clickable" in s&&s.clickable?"pointer":"default"}}>
                        <p style={{fontSize:22,fontWeight:800,color:s.c,margin:"0 0 2px"}}>{s.v}</p>
                        <p style={{fontSize:12,color:B.topo,margin:0}}>{s.l}</p>
                        {"sub" in s&&s.sub&&<p style={{fontSize:11,color:B.arena,margin:"2px 0 0"}}>{s.sub}</p>}
                      </div>
                    ))}
                  </div>
                </>
              );
            })()}
            {(()=>{
              const urgentes=clientes.filter(c=>{if(!c.ProximaLlamada)return false;const d=Math.ceil((new Date(c.ProximaLlamada).getTime()-Date.now())/864e5);return d<0||d<=3;});
              return urgentes.length>0?(
                <div style={{background:"#fffbeb",border:"1px solid #fde68a",borderRadius:10,padding:"12px 16px",marginBottom:14}}>
                  <p style={{fontSize:13,fontWeight:600,color:"#92400e",margin:"0 0 6px"}}>⚡ Llamadas urgentes ({urgentes.length})</p>
                  {urgentes.map(c=>{const cs=callStatus(c.ProximaLlamada);return(
                    <p key={c._row} style={{fontSize:13,color:"#92400e",margin:"0 0 2px"}}>{c.Nombre} {c.Apellido} — <strong>{cs?.label}</strong> <button onClick={()=>setSelected(c)} style={{background:"none",border:"none",color:B.brown,fontSize:12,cursor:"pointer",textDecoration:"underline",fontFamily:B.font}}>Ver</button></p>
                  );})}
                </div>
              ):null;
            })()}
            <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,padding:"16px 20px",marginBottom:14}}>
              <input placeholder="Buscar nombre, email o plan…" value={search} onChange={e=>setSearch(e.target.value)} style={{...inp,marginBottom:14}}/>
              {/* Filtro estado del plan */}
              <div style={{marginBottom:10}}>
                <p style={{fontSize:10,fontWeight:700,color:B.topo,textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 7px"}}>Estado del plan</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(["Todos","Activo","Pausado","Cancelado","Finalizado"]).map(t=>{
                    const active=filterPlan===t;
                    const col = t==="Activo"?{bg:"#f0fdf4",text:"#166534",border:"#bbf7d0"} : t==="Pausado"?{bg:"#fffbeb",text:"#92400e",border:"#fde68a"} : t==="Cancelado"?{bg:"#fef2f2",text:"#991b1b",border:"#fecaca"} : t==="Finalizado"?{bg:"#f3f4f6",text:"#374151",border:"#d1d5db"} : null;
                    return <button key={t} onClick={()=>setFilterPlan(t)} style={{padding:"5px 13px",borderRadius:20,fontSize:13,fontFamily:B.font,cursor:"pointer",border:active&&col?`1.5px solid ${col.border}`:`1.5px solid ${B.arena}`,background:active&&col?col.bg:active?"#f3f4f6":"#fff",color:active&&col?col.text:active?B.carbon:B.topo,fontWeight:active?600:400}}>
                      {t}{t!=="Todos"&&<span style={{opacity:0.6,marginLeft:4}}>({clientes.filter(c=>(c.EstadoPlan||"Activo")===t).length})</span>}
                    </button>;
                  })}
                </div>
              </div>
              {/* Filtro modalidad */}
              <div style={{marginBottom:10}}>
                <p style={{fontSize:10,fontWeight:700,color:B.topo,textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 7px"}}>Modalidad</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(["Todos","Trimestral","Semestral","Sin asignar"]).map(t=>{
                    const active=filterMod===t;
                    return <button key={t} onClick={()=>setFilterMod(t)} style={{padding:"5px 13px",borderRadius:20,fontSize:13,fontFamily:B.font,cursor:"pointer",border:active?`1.5px solid ${B.brown}`:`1.5px solid ${B.arena}`,background:active?B.beige:"#fff",color:active?B.brown:B.topo,fontWeight:active?600:400}}>
                      {t}{t!=="Todos"&&t!=="Sin asignar"&&<span style={{opacity:0.6,marginLeft:4}}>({clientes.filter(c=>c.Modalidad===t).length})</span>}
                    </button>;
                  })}
                </div>
              </div>
              {/* Filtro próximo cobro */}
              <div style={{marginBottom:10}}>
                <p style={{fontSize:10,fontWeight:700,color:B.topo,textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 7px"}}>Próximo cobro</p>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
                  {(["Todos","Vencidos","Esta semana","Este mes","Sin fecha"]).map(t=>{
                    const active=filterCobro===t;
                    const isAlert=t==="Vencidos";
                    return <button key={t} onClick={()=>setFilterCobro(t)} style={{padding:"5px 13px",borderRadius:20,fontSize:13,fontFamily:B.font,cursor:"pointer",border:active?`1.5px solid ${isAlert?"#fecaca":B.arena}`:`1.5px solid ${B.arena}`,background:active?(isAlert?"#fef2f2":"#f3f4f6"):"#fff",color:active?(isAlert?"#991b1b":B.carbon):B.topo,fontWeight:active?600:400}}>
                      {t}
                    </button>;
                  })}
                </div>
              </div>
              {/* Filtro llamadas mensuales */}
              <div>
                <p style={{fontSize:10,fontWeight:700,color:B.topo,textTransform:"uppercase",letterSpacing:"0.07em",margin:"0 0 7px"}}>Llamadas</p>
                <button onClick={()=>setFilterCalls(!filterCalls)} style={{padding:"5px 13px",borderRadius:20,fontSize:13,fontFamily:B.font,cursor:"pointer",border:filterCalls?"1.5px solid #fde68a":"1.5px solid "+B.arena,background:filterCalls?"#fffbeb":"#fff",color:filterCalls?"#92400e":B.topo,fontWeight:filterCalls?600:400}}>
                  {filterCalls?"✓ ":""}Sin llamada mensual
                </button>
              </div>
            </div>
            {loading?<p style={{color:B.topo,textAlign:"center",padding:48}}>Cargando…</p>
            :filteredClients.length===0?<p style={{color:B.topo,textAlign:"center",padding:48}}>Sin clientes todavía.</p>
            :(
              <div style={{background:"#fff",border:`1px solid ${B.arena}`,borderRadius:12,overflow:"hidden"}}>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",borderCollapse:"collapse",minWidth:700}}>
                    <thead><tr style={{borderBottom:`1px solid ${B.arena}`,background:B.beige}}>
                      {["Nombre","Plan","Modalidad","Tu parte","Próx. cobro","Estado","Notas"].map(h=>(
                        <th key={h} style={{padding:"11px 16px",textAlign:"left",fontSize:11,fontWeight:600,color:B.topo,textTransform:"uppercase",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>{h}</th>
                      ))}
                    </tr></thead>
                    <tbody>
                      {filteredClients.map((c,i)=>{
                        const cs=callStatus(c.ProximaLlamada);
                        const notas=parseNotas(c.NotasSeguimiento||"");
                        return(
                          <tr key={c._row} onClick={()=>setSelected(c)} style={{borderBottom:i<filteredClients.length-1?`1px solid ${B.beige}`:"none",cursor:"pointer"}} onMouseEnter={e=>(e.currentTarget.style.background=B.beige)} onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
                            <td style={{padding:"13px 16px"}}>
                              <p style={{fontSize:14,fontWeight:600,color:B.carbon,margin:"0 0 2px",whiteSpace:"nowrap"}}>{c.Nombre} {c.Apellido}</p>
                              <p style={{fontSize:12,color:B.brown,margin:0}}>{c.Email}</p>
                            </td>
                            <td style={{padding:"13px 16px",fontSize:13,color:B.topo,whiteSpace:"nowrap"}}>{c.PlanContratado||"—"}</td>
                            <td style={{padding:"13px 16px",fontSize:13,color:B.topo,whiteSpace:"nowrap"}}>{c.Modalidad||"—"}</td>
                            <td style={{padding:"13px 16px",whiteSpace:"nowrap"}}>
                              {(()=>{const pi=precioInfo(c.Modalidad);return pi?<span style={{fontSize:14,fontWeight:700,color:"#166534"}}>{pi.corte}€</span>:<span style={{color:B.arena}}>—</span>;})()}
                            </td>
                            <td style={{padding:"13px 16px",whiteSpace:"nowrap"}}>
                              {(()=>{const pcs=c.ProximoCobro?callStatus(c.ProximoCobro):null;return pcs?<span style={{display:"inline-block",padding:"3px 10px",borderRadius:20,fontSize:12,fontWeight:600,background:pcs.bg,color:pcs.color}}>{pcs.label}</span>:c.ProximoCobro?<span style={{fontSize:13,color:B.topo}}>{new Date(c.ProximoCobro).toLocaleDateString("es-ES",{day:"numeric",month:"short"})}</span>:<span style={{fontSize:13,color:B.arena}}>—</span>;})()}
                            </td>
                            <td style={{padding:"13px 16px"}}><SmallBadge text={c.EstadoPlan||"Activo"} bg={PLAN_BADGE[c.EstadoPlan||"Activo"]?.bg||"#f3f4f6"} color={PLAN_BADGE[c.EstadoPlan||"Activo"]?.text||"#374151"}/></td>
                            <td style={{padding:"13px 16px",fontSize:13,color:notas.length>0?B.carbon:B.arena}}>
                              {notas.length>0?`${notas.length} nota${notas.length!==1?"s":""}`:("—")}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {selected&&<DetailModal client={selected} onClose={()=>setSelected(null)} onSave={handleSave}/>}
      {addOpen&&<AddModal defaultEstado={view==="clientes"?"Compró":"Pendiente llamada"} onClose={()=>setAddOpen(false)} onAdded={fetchClients}/>}
    </div>
  );
}
