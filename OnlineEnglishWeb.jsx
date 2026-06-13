import { useState, useRef, useEffect } from "react";

/* ── PALETTE ─────────────────────────────────────── */
const C = {
  navy:       "#0F2447",
  navyDark:   "#0A1A35",
  navyMid:    "#1A3A6E",
  navyLight:  "#2A5298",
  cream:      "#FDF8EE",
  creamDark:  "#F0E8D0",
  creamMid:   "#E8DEC0",
  gold:       "#C9960C",
  goldLight:  "#F5C842",
  goldPale:   "#FFF3C0",
  red:        "#C0392B",
  white:      "#FFFFFF",
  text:       "#1A1A2E",
  textMute:   "#5A6A8A",
};

/* ── KEYFRAMES injected once ──────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700;800&display=swap');

@keyframes fadeUp   { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
@keyframes fadeIn   { from{opacity:0} to{opacity:1} }
@keyframes scaleIn  { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }
@keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes pulse    { 0%,100%{box-shadow:0 0 0 0 rgba(197,150,12,0.55)} 70%{box-shadow:0 0 0 14px rgba(197,150,12,0)} }
@keyframes shimmer  { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
@keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
@keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
@keyframes ticker   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
@keyframes starPop  { 0%{opacity:0;transform:scale(0) rotate(-20deg)} 60%{transform:scale(1.3) rotate(5deg)} 100%{opacity:1;transform:scale(1) rotate(0)} }
@keyframes countUp  { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
@keyframes waveBar  { 0%,100%{height:8px} 50%{height:28px} }
@keyframes ripple   { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }

.anim-fadeUp   { animation: fadeUp  0.65s cubic-bezier(.22,.68,0,1.2) both }
.anim-fadeIn   { animation: fadeIn  0.5s ease both }
.anim-scaleIn  { animation: scaleIn 0.5s cubic-bezier(.22,.68,0,1.2) both }
.anim-float    { animation: float   3.5s ease-in-out infinite }
.anim-pulse    { animation: pulse   1.8s infinite }

.btn-glow {
  position:relative; overflow:hidden;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-glow:hover  { transform:translateY(-2px); box-shadow:0 8px 28px rgba(197,150,12,0.45)!important; }
.btn-glow:active { transform:scale(0.97); }
.btn-glow::after {
  content:''; position:absolute; inset:0;
  background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.28) 50%,transparent 60%);
  background-size:400px 100%;
  animation: shimmer 2.4s linear infinite;
}

.card-hover {
  transition: transform 0.22s, box-shadow 0.22s;
  cursor:default;
}
.card-hover:hover {
  transform:translateY(-5px);
  box-shadow:0 16px 40px rgba(15,36,71,0.18)!important;
}

.feature-icon {
  transition: transform 0.25s;
}
.feature-card:hover .feature-icon {
  transform: scale(1.25) rotate(-6deg);
}

input:focus, textarea:focus {
  border-color: ${C.navyLight} !important;
  box-shadow: 0 0 0 3px rgba(42,82,152,0.15);
}

html, body { overflow-x: hidden; max-width: 100%; }

.lews-page { width: 100%; max-width: 100%; overflow-x: hidden; }

.lews-review-row span:last-child {
  text-align: right;
  word-break: break-word;
  max-width: 58%;
}

.lews-upi-id {
  word-break: break-all;
  overflow-wrap: anywhere;
}

.lews-hero-cta {
  max-width: 100%;
}

@media (max-width: 768px) {
  .lews-nav {
    padding: 0 14px !important;
    height: 56px !important;
  }
  .lews-nav-logo {
    font-size: 16px !important;
    line-height: 1.2;
  }
  .lews-nav-links {
    display: none !important;
  }
  .lews-nav-cta {
    padding: 8px 14px !important;
    font-size: 12px !important;
    white-space: nowrap;
  }
  .lews-hero {
    padding: 48px 16px 56px !important;
  }
  .lews-hero-sub {
    letter-spacing: 2px !important;
    font-size: 12px !important;
  }
  .lews-hero-tagline {
    font-size: 13px !important;
    letter-spacing: 0.5px !important;
  }
  .lews-badge-wrap {
    padding: 14px 28px !important;
  }
  .lews-features {
    gap: 12px !important;
    padding: 18px 14px !important;
    justify-content: center !important;
  }
  .lews-feature-item {
    min-width: 72px !important;
    flex: 1 1 28% !important;
  }
  .lews-hero-cta {
    width: 100% !important;
    max-width: 320px !important;
    padding: 16px 20px !important;
    font-size: 15px !important;
    justify-content: center !important;
  }
  .lews-stats-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px 12px !important;
  }
  .lews-info-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }
  .lews-cards-grid {
    grid-template-columns: 1fr !important;
    gap: 12px !important;
  }
  .lews-section {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }
  .lews-banner-cta {
    width: calc(100% - 32px) !important;
    max-width: 320px !important;
    padding: 16px 24px !important;
    font-size: 15px !important;
  }
  .lews-contact {
    flex-direction: column !important;
    align-items: stretch !important;
  }
  .lews-contact-btn {
    width: 100% !important;
    text-align: center;
  }
  .lews-form-card {
    padding: 24px 18px !important;
    border-radius: 20px !important;
  }
  .lews-form-banner {
    padding: 22px 16px !important;
    border-radius: 16px !important;
  }
  .lews-success-card {
    padding: 24px 18px !important;
    border-radius: 20px !important;
  }
  .lews-action-btns {
    flex-direction: column !important;
  }
  .lews-action-btns button {
    flex: none !important;
    width: 100% !important;
  }
  .lews-step-connector {
    width: 28px !important;
    margin: 0 4px !important;
  }
  .lews-step-label {
    font-size: 11px !important;
    text-align: center;
  }
  .lews-upi-id {
    font-size: 13px !important;
  }
  .lews-payment-qr img {
    width: min(168px, 72vw) !important;
    height: min(168px, 72vw) !important;
  }
  input, select, textarea {
    font-size: 16px !important;
  }
}

@media (max-width: 400px) {
  .lews-nav-logo {
    font-size: 14px !important;
  }
  .lews-info-grid {
    grid-template-columns: 1fr !important;
  }
  .lews-stats-label {
    font-size: 10px !important;
  }
}
`;

/* ── PARTICLES ────────────────────────────────────── */
function Particles() {
  const pts = useRef(
    Array.from({length:18}, (_,i) => ({
      id:i,
      x: Math.random()*100,
      y: Math.random()*100,
      r: 3 + Math.random()*5,
      dur: 3 + Math.random()*4,
      del: Math.random()*3,
      op: 0.06 + Math.random()*0.12,
    }))
  ).current;
  return (
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      {pts.map(p=>(
        <div key={p.id} style={{
          position:"absolute", left:`${p.x}%`, top:`${p.y}%`,
          width:p.r*2, height:p.r*2, borderRadius:"50%",
          background:C.goldLight, opacity:p.op,
          animation:`float ${p.dur}s ${p.del}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ── TICKER ───────────────────────────────────────── */
function Ticker() {
  const items = ["📅 Classes Start 15/6/26","⏰ 8:00 PM – 9:00 PM","🎥 Google Meet Live","🪑 Limited Seats Only","💰 ₹999 Only","🏆 50-Day Programme","📅 Classes Start 15/6/26","⏰ 8:00 PM – 9:00 PM","🎥 Google Meet Live","🪑 Limited Seats Only","💰 ₹999 Only","🏆 50-Day Programme"];
  return (
    <div style={{background:C.gold,overflow:"hidden",padding:"8px 0",whiteSpace:"nowrap"}}>
      <div style={{display:"inline-flex",gap:48,animation:"ticker 22s linear infinite"}}>
        {items.map((t,i)=>(
          <span key={i} style={{color:C.navy,fontWeight:700,fontSize:13,letterSpacing:0.5}}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ── WAVE BARS (decorative) ───────────────────────── */
function WaveBars() {
  return (
    <div style={{display:"flex",alignItems:"center",gap:3,height:32}}>
      {[0,0.15,0.3,0.15,0].map((d,i)=>(
        <div key={i} style={{
          width:4,borderRadius:2,background:C.goldLight,
          animation:`waveBar 1.1s ${d}s ease-in-out infinite`,
        }}/>
      ))}
    </div>
  );
}

/* ── WAVE BARS (decorative) ───────────────────────── */
const STEPS = ["Your Details","Review & Pay"];
function StepBar({step}) {
  return (
    <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:0,marginBottom:28}}>
      {STEPS.map((s,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center"}}>
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
            <div style={{
              width:34,height:34,borderRadius:"50%",
              background: i<step?C.navy : i===step?C.goldLight:"transparent",
              border: `2px solid ${i<=step?C.navy:C.creamMid}`,
              color: i<step?"#fff" : i===step?C.navy:C.textMute,
              display:"flex",alignItems:"center",justifyContent:"center",
              fontSize:13,fontWeight:700,transition:"all 0.35s",
              boxShadow: i===step?`0 0 0 4px rgba(245,200,66,0.3)`:"none",
            }}>{i<step?"✓":i+1}</div>
            <span className="lews-step-label" style={{fontSize:12,color:i===step?C.navy:C.textMute,fontWeight:i===step?700:400}}>{s}</span>
          </div>
          {i<STEPS.length-1&&(
            <div className="lews-step-connector" style={{width:56,height:2,background:i<step?C.navy:C.creamMid,margin:"0 8px",marginBottom:20,transition:"background 0.35s"}}/>
          )}
        </div>
      ))}
    </div>
  );
}

const UPI_ID = "anushaselvan123-1@oksbi";
const GPayQR = "/gpay-qr.png";

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string" || !result.includes(",")) {
        reject(new Error("Could not read image file"));
        return;
      }
      resolve(result.split(",")[1]);
    };
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });
}

function isImageFile(file) {
  if (file.type && file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|webp|heic|heif)$/i.test(file.name || "");
}

function PaymentQR({ compact = false }) {
  const size = compact ? 130 : 168;
  return (
    <div className="lews-payment-qr" style={{ textAlign: "center", margin: compact ? "10px 0 6px" : "14px 0 10px" }}>
      <img
        src={GPayQR}
        alt="Scan to pay with Google Pay"
        style={{
          width: size,
          height: size,
          maxWidth: "100%",
          objectFit: "contain",
          borderRadius: 10,
          border: `2px solid ${C.creamMid}`,
          background: C.white,
          padding: 6,
        }}
      />
      <p style={{ color: C.textMute, fontSize: 11, margin: "8px 0 0", fontFamily: "Inter,sans-serif" }}>
        Scan to pay ₹300 via Google Pay
      </p>
    </div>
  );
}

function WelcomeGuide({ name }) {
  const section = { marginBottom: 18, textAlign: "left" };
  const heading = { fontSize: 13, fontWeight: 800, color: C.navy, margin: "0 0 8px", fontFamily: "Inter,sans-serif" };
  const list = { margin: 0, paddingLeft: 18, color: C.textMute, fontSize: 13, lineHeight: 1.75, fontFamily: "Inter,sans-serif" };
  return (
    <div style={{ textAlign: "left" }}>
      <p style={{ color: C.textMute, fontSize: 14, lineHeight: 1.75, margin: "0 0 18px", fontFamily: "Inter,sans-serif" }}>
        Good Evening! 😊<br/>
        Thank you for your interest in our Spoken English Course — we're excited to have you on board{name ? `, ${name}` : ""}!
        Here's everything you need to know before we get started:
      </p>
      <div style={section}>
        <p style={heading}>📋 What You'll Need</p>
        <ul style={list}>
          <li>A notebook &amp; pen for notes and tasks</li>
          <li>A mobile or laptop with a stable internet connection</li>
          <li>An open mind — mistakes are part of learning, and speaking is how you grow!</li>
        </ul>
      </div>
      <div style={section}>
        <p style={heading}>💻 How Classes Work</p>
        <ul style={list}>
          <li>Sessions are held via Google Meet</li>
          <li>One link will be shared and used for all classes throughout the course</li>
        </ul>
      </div>
      <div style={{ ...section, background: C.goldPale, border: `1px solid ${C.gold}`, borderRadius: 12, padding: "14px 16px" }}>
        <p style={heading}>💰 Fee Details</p>
        <ul style={list}>
          <li>Initial payment: <strong style={{ color: C.navy }}>₹300</strong> (due before Monday afternoon)</li>
          <li>Pay to UPI: <strong className="lews-upi-id" style={{ color: C.navy, fontFamily: "monospace" }}>{UPI_ID}</strong></li>
          <li>Remaining balance can be cleared within 10 days of joining</li>
        </ul>
        <PaymentQR compact />
      </div>
      <div style={section}>
        <p style={heading}>✅ A Few Things to Keep in Mind</p>
        <ul style={list}>
          <li>Regular attendance makes a big difference</li>
          <li>Tasks and speaking activities are mandatory for the best results</li>
        </ul>
      </div>
      <p style={{ color: C.textMute, fontSize: 13, lineHeight: 1.75, margin: 0, fontFamily: "Inter,sans-serif" }}>
        We're here to help you speak with confidence and fluency. See you in class! 🙌<br/>
        <strong style={{ color: C.navy }}>Thank you.</strong>
      </p>
    </div>
  );
}

/* ── FEATURES ─────────────────────────────────────── */
const FEATURES = [
  {icon:"💬",label:"Speak Fluently"},
  {icon:"📖",label:"Improve Grammar"},
  {icon:"🎤",label:"Clear Pronunciation"},
  {icon:"👥",label:"Real Conversations"},
  {icon:"🎯",label:"Build Confidence"},
];

/* ════════════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════════════ */
export default function App() {
  const [view,setView]=useState("home");
  const [step,setStep]=useState(0);
  const [form,setForm]=useState({name:"",email:"",phone:"",city:""});
  const [errors,setErrors]=useState({});
  const [hovBtn,setHovBtn]=useState(false);
  const [submitting,setSubmitting]=useState(false);
  const [submitError,setSubmitError]=useState("");
  const [paymentScreenshot,setPaymentScreenshot]=useState(null);
  const [screenshotPreview,setScreenshotPreview]=useState(null);
  const galleryRef=useRef(null);
  const cameraRef=useRef(null);

  useEffect(()=>()=>{ if(screenshotPreview) URL.revokeObjectURL(screenshotPreview); },[screenshotPreview]);

  function handleScreenshotPick(e){
    const file=e.target.files?.[0];
    setSubmitError("");
    setErrors(x=>({...x,screenshot:""}));
    e.target.value="";
    if(!file) return;
    if(!isImageFile(file)){
      setErrors(x=>({...x,screenshot:"Please upload an image (JPG, PNG, etc.)"}));
      return;
    }
    if(file.size>5*1024*1024){
      setErrors(x=>({...x,screenshot:"Image must be under 5 MB"}));
      return;
    }
    if(screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setPaymentScreenshot(file);
    setScreenshotPreview(URL.createObjectURL(file));
  }

  function clearScreenshot(){
    if(screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
    setErrors(x=>({...x,screenshot:""}));
    if(galleryRef.current) galleryRef.current.value="";
    if(cameraRef.current) cameraRef.current.value="";
  }

  function resetRegistration(){
    clearScreenshot();
    setView("home");
    setStep(0);
    setForm({name:"",email:"",phone:"",city:""});
    setSubmitError("");
  }

  function update(f,v){setForm(x=>({...x,[f]:v}));setErrors(e=>({...e,[f]:""}))}
  async function confirmBooking(){
    if(!validate()) return;
    const accessKey=import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
    const sheetUrl=import.meta.env.VITE_GOOGLE_SHEET_URL;
    if(!paymentScreenshot){
      setSubmitError("Please upload your payment screenshot before confirming.");
      return;
    }
    if(!sheetUrl){
      setSubmitError("Screenshot upload is not set up yet. Please contact learnenglishwithshas@gmail.com.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    const payload={
      name:form.name,
      email:form.email,
      phone:form.phone,
      city:form.city,
      course:"Speak English With Confidence",
      fee:"₹300 initial",
    };
    try{
      const imageBase64=await fileToBase64(paymentScreenshot);
      const sheetRes=await fetch(sheetUrl,{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          ...payload,
          imageBase64,
          imageName:paymentScreenshot.name||"payment.jpg",
        }),
      });
      const sheetData=await sheetRes.json();
      if(!sheetData.success) throw new Error(sheetData.message||"Could not save registration");
      const screenshotUrl=sheetData.screenshotUrl||"";
      if(accessKey){
        const res=await fetch("https://api.web3forms.com/submit",{
          method:"POST",
          headers:{"Content-Type":"application/json",Accept:"application/json"},
          body:JSON.stringify({
            access_key:accessKey,
            subject:`New course registration: ${form.name}`,
            from_name:form.name,
            email:form.email,
            phone:form.phone,
            city:form.city,
            message:[
              `Name: ${form.name}`,
              `Email: ${form.email}`,
              `WhatsApp: ${form.phone}`,
              `City: ${form.city}`,
              `Course: ${payload.course}`,
              `Initial fee: ${payload.fee}`,
              screenshotUrl?`Payment screenshot: ${screenshotUrl}`:"Payment screenshot: saved in Google Sheet",
            ].join("\n"),
          }),
        });
        const data=await res.json();
        if(!data.success) throw new Error(data.message||"Submission failed");
      }
      clearScreenshot();
      setView("success");
    }catch(err){
      setSubmitError(err.message||"Could not send registration. Please email learnenglishwithshas@gmail.com instead.");
    }finally{
      setSubmitting(false);
    }
  }
  function validate(){
    const e={};
    if(!form.name.trim())e.name="Name is required";
    if(!form.email.trim()||!/\S+@\S+\.\S+/.test(form.email))e.email="Valid email required";
    if(!form.phone.trim()||form.phone.replace(/\D/g,"").length<10)e.phone="Valid 10-digit phone required";
    if(!form.city.trim())e.city="City is required";
    setErrors(e);
    return Object.keys(e).length===0;
  }

  const inp = {
    width:"100%",padding:"12px 16px",
    border:`2px solid ${C.creamMid}`,
    borderRadius:10,fontSize:15,background:C.cream,color:C.text,
    outline:"none",boxSizing:"border-box",fontFamily:"Inter,sans-serif",
    transition:"border-color 0.2s, box-shadow 0.2s",
  };
  const lbl={fontSize:12,fontWeight:700,color:C.navyMid,marginBottom:6,display:"block",textTransform:"uppercase",letterSpacing:0.8};
  const errS={color:C.red,fontSize:12,marginTop:4};

  /* ── SUCCESS ── */
  if(view==="success") return (
    <>
      <style>{CSS}</style>
      <div className="lews-page" style={{minHeight:"100vh",background:C.cream,padding:"24px 16px"}}>
        <div className="anim-scaleIn lews-success-card" style={{background:C.white,borderRadius:24,padding:"36px 28px",maxWidth:560,margin:"0 auto",border:`1px solid ${C.creamMid}`}}>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{width:72,height:72,borderRadius:"50%",background:C.goldPale,display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 16px",fontSize:32,animation:"starPop 0.6s cubic-bezier(.22,.68,0,1.2) both"}}>🎓</div>
            <h2 style={{fontFamily:"Playfair Display,serif",fontSize:26,color:C.navy,marginBottom:6,fontWeight:900}}>You're In!</h2>
            <p style={{color:C.textMute,fontSize:14,margin:0}}>
              Welcome, <strong style={{color:C.navy}}>{form.name}</strong> — you've secured your seat in{" "}
              <strong style={{color:C.gold}}>Speak English With Confidence</strong>
            </p>
          </div>
          <div style={{background:`linear-gradient(135deg,${C.navy},${C.navyMid})`,borderRadius:14,padding:"14px 18px",marginBottom:22,textAlign:"center"}}>
            <p style={{color:C.goldLight,fontWeight:700,fontSize:13,margin:"0 0 4px"}}>📅 Classes start: 15 June 2026 (Mon)</p>
            <p style={{color:"rgba(255,255,255,0.75)",fontSize:12,margin:0}}>🕗 8:00 – 9:00 PM · Google Meet link via WhatsApp: <strong>{form.phone}</strong></p>
          </div>
          <WelcomeGuide name={form.name.split(" ")[0]}/>
          <button className="btn-glow anim-pulse" onClick={resetRegistration}
            style={{width:"100%",marginTop:24,background:C.navy,color:C.goldLight,border:"none",borderRadius:12,padding:"13px 36px",fontSize:15,cursor:"pointer",fontFamily:"Inter,sans-serif",fontWeight:700,letterSpacing:0.5}}>
            ← Back to Home
          </button>
        </div>
      </div>
    </>
  );

  /* ── REGISTER ── */
  if(view==="register") return (
    <>
      <style>{CSS}</style>
      <div className="lews-page" style={{minHeight:"100vh",background:C.cream,padding:"24px 16px"}}>
        <div style={{maxWidth:520,margin:"0 auto",width:"100%"}}>
          <button onClick={()=>setView("home")} style={{background:"none",border:"none",color:C.navyLight,cursor:"pointer",fontSize:14,marginBottom:20,padding:0,fontWeight:700,fontFamily:"Inter,sans-serif"}}>
            ← Back to Home
          </button>

          {/* Header banner */}
          <div className="anim-fadeUp lews-form-banner" style={{background:`linear-gradient(135deg,${C.navyDark},${C.navyMid})`,borderRadius:20,padding:"28px 24px",marginBottom:20,textAlign:"center",position:"relative",overflow:"hidden"}}>
            <Particles/>
            <p style={{color:C.goldLight,fontSize:11,textTransform:"uppercase",letterSpacing:2.5,marginBottom:6,fontWeight:700}}>Online Live Class</p>
            <h1 style={{fontFamily:"Playfair Display,serif",color:C.white,fontSize:28,fontWeight:900,margin:"0 0 4px"}}>Speak English</h1>
            <p style={{color:C.goldLight,fontSize:15,fontWeight:800,margin:"0 0 14px",letterSpacing:1}}>WITH CONFIDENCE</p>
            <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
              <span style={{background:C.gold,color:C.white,borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:800}}>50 DAYS</span>
              <span style={{background:C.cream,color:C.navy,borderRadius:20,padding:"4px 14px",fontSize:12,fontWeight:800}}>₹999 ONLY</span>
              <span style={{color:"rgba(255,255,255,0.6)",fontSize:12,padding:"4px 0"}}>Starts 15/6/26</span>
            </div>
          </div>

          <div className="anim-fadeUp lews-form-card" style={{background:C.white,borderRadius:24,padding:"36px 32px",border:`1px solid ${C.creamMid}`,animationDelay:"0.1s"}}>
            <StepBar step={step}/>

            {step===0 && (
              <div className="anim-fadeIn">
                <h2 style={{fontSize:20,fontWeight:800,color:C.navy,marginBottom:4,fontFamily:"Playfair Display,serif"}}>Enter your details</h2>
                <p style={{color:C.textMute,fontSize:13,marginBottom:24}}>We'll send your Google Meet link to your WhatsApp.</p>
                {[
                  {key:"name",  label:"Full Name",      type:"text",  ph:"Your full name"},
                  {key:"email", label:"Email Address",   type:"email", ph:"you@email.com"},
                  {key:"phone", label:"WhatsApp Number", type:"tel",   ph:"+91 98765 43210"},
                  {key:"city",  label:"City",            type:"text",  ph:"Your city"},
                ].map(({key,label,type,ph})=>(
                  <div key={key} style={{marginBottom:16}}>
                    <label style={lbl}>{label}</label>
                    <input style={inp} type={type} value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={ph}/>
                    {errors[key]&&<p style={errS}>{errors[key]}</p>}
                  </div>
                ))}
                <button className="btn-glow" onClick={()=>{if(validate())setStep(1)}}
                  style={{width:"100%",marginTop:8,background:`linear-gradient(135deg,${C.navy},${C.navyMid})`,color:C.goldLight,border:"none",borderRadius:12,padding:"15px",fontSize:16,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif",letterSpacing:0.5}}>
                  Continue →
                </button>
              </div>
            )}

            {step===1 && (
              <div className="anim-fadeIn">
                <h2 style={{fontSize:20,fontWeight:800,color:C.navy,marginBottom:20,fontFamily:"Playfair Display,serif"}}>Review & Confirm</h2>
                <div style={{background:C.cream,border:`1px solid ${C.creamMid}`,borderRadius:14,padding:"20px",marginBottom:20}}>
                  <p style={{fontWeight:800,color:C.navy,fontSize:15,margin:"0 0 4px",fontFamily:"Playfair Display,serif"}}>Speak English With Confidence</p>
                  <p style={{color:C.textMute,fontSize:13,margin:"0 0 14px"}}>50-Day Live Course · Mon–Fri · 8–9 PM</p>
                  {[["Name",form.name],["Email",form.email],["WhatsApp",form.phone],["City",form.city]].map(([k,v])=>(
                    <div key={k} className="lews-review-row" style={{display:"flex",justifyContent:"space-between",gap:12,padding:"7px 0",borderBottom:`1px solid ${C.creamMid}`,fontSize:13}}>
                      <span style={{color:C.textMute,flexShrink:0}}>{k}</span><span style={{color:C.navy,fontWeight:600}}>{v}</span>
                    </div>
                  ))}
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:14}}>
                    <span style={{fontWeight:700,color:C.navy}}>Initial Payment</span>
                    <span style={{fontWeight:900,color:C.gold,fontSize:26,fontFamily:"Playfair Display,serif"}}>₹300</span>
                  </div>
                  <p style={{color:C.textMute,fontSize:12,margin:"8px 0 0"}}>Due before Monday afternoon · remaining balance within 10 days of joining</p>
                </div>
                {/* UPI */}
                <div style={{background:C.goldPale,border:`1px solid ${C.gold}`,borderRadius:12,padding:"16px 18px",marginBottom:20}}>
                  <p style={{fontWeight:700,color:C.navy,fontSize:14,margin:"0 0 6px"}}>💳 Pay via UPI / GPay / PhonePe</p>
                  <p style={{color:C.textMute,fontSize:13,margin:"0 0 4px"}}>Send ₹300 to:</p>
                  <p className="lews-upi-id" style={{color:C.navy,fontWeight:800,fontSize:15,margin:"0 0 4px",fontFamily:"monospace",textAlign:"center"}}>{UPI_ID}</p>
                  <PaymentQR />
                  <p style={{color:C.textMute,fontSize:12,margin:"12px 0 0",textAlign:"center"}}>Then upload your payment screenshot below.</p>
                </div>
                <div style={{background:C.white,border:`2px dashed ${paymentScreenshot?C.navyLight:C.creamMid}`,borderRadius:12,padding:"18px",marginBottom:20,textAlign:"center"}}>
                  <p style={{fontWeight:700,color:C.navy,fontSize:14,margin:"0 0 10px",fontFamily:"Inter,sans-serif"}}>📎 Upload Payment Screenshot</p>
                  {screenshotPreview?(
                    <div>
                      <img src={screenshotPreview} alt="Payment screenshot preview" style={{maxWidth:"100%",maxHeight:220,borderRadius:10,border:`1px solid ${C.creamMid}`,objectFit:"contain"}}/>
                      <p style={{color:C.textMute,fontSize:12,margin:"8px 0 0",fontFamily:"Inter,sans-serif"}}>{paymentScreenshot.name}</p>
                      <button type="button" onClick={clearScreenshot} disabled={submitting}
                        style={{marginTop:10,background:"transparent",color:C.navy,border:`1px solid ${C.navyMid}`,borderRadius:8,padding:"8px 14px",fontSize:12,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
                        Remove & choose another
                      </button>
                    </div>
                  ):(
                    <>
                      <p style={{color:C.textMute,fontSize:12,margin:"0 0 12px",fontFamily:"Inter,sans-serif"}}>JPG or PNG · max 5 MB</p>
                      <input ref={galleryRef} type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif" onChange={handleScreenshotPick} style={{display:"none"}}/>
                      <input ref={cameraRef} type="file" accept="image/*" capture="environment" onChange={handleScreenshotPick} style={{display:"none"}}/>
                      <div style={{display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap"}}>
                        <button type="button" onClick={()=>galleryRef.current?.click()}
                          style={{background:C.navy,color:C.goldLight,border:"none",borderRadius:10,padding:"12px 18px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
                          📁 From gallery
                        </button>
                        <button type="button" onClick={()=>cameraRef.current?.click()}
                          style={{background:"transparent",color:C.navy,border:`2px solid ${C.navyMid}`,borderRadius:10,padding:"12px 18px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
                          📷 Take photo
                        </button>
                      </div>
                    </>
                  )}
                  {errors.screenshot&&<p style={{...errS,textAlign:"center",marginTop:10}}>{errors.screenshot}</p>}
                </div>
                {submitError&&<p style={{...errS,textAlign:"center",marginBottom:12}}>{submitError}</p>}
                <div className="lews-action-btns" style={{display:"flex",gap:10}}>
                  <button onClick={()=>setStep(0)} disabled={submitting}
                    style={{flex:1,background:"transparent",color:C.navy,border:`2px solid ${C.navyMid}`,borderRadius:12,padding:"13px",fontSize:15,fontWeight:700,cursor:submitting?"not-allowed":"pointer",opacity:submitting?0.6:1,fontFamily:"Inter,sans-serif",transition:"all 0.2s"}}>
                    ← Back
                  </button>
                  <button className="btn-glow anim-pulse" onClick={confirmBooking} disabled={submitting}
                    style={{flex:2,background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,color:C.navy,border:"none",borderRadius:12,padding:"13px",fontSize:15,fontWeight:800,cursor:submitting?"not-allowed":"pointer",opacity:submitting?0.7:1,fontFamily:"Inter,sans-serif"}}>
                    {submitting?"Sending…":"Confirm Booking 🎉"}
                  </button>
                </div>
                <p style={{fontSize:11,color:C.textMute,textAlign:"center",marginTop:10}}>Limited seats · Small batch · Personal attention</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  /* ══════════════════ HOME ══════════════════ */
  return (
    <div className="lews-page">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className="lews-nav" style={{background:C.navyDark,padding:"0 28px",display:"flex",alignItems:"center",justifyContent:"space-between",height:60,position:"sticky",top:0,zIndex:100}}>
        <span className="lews-nav-logo" style={{fontFamily:"Playfair Display,serif",fontSize:20,color:C.white,fontWeight:900,letterSpacing:0.5}}>
          LEARN WITH<span style={{color:C.goldLight}}> SHAS</span>
        </span>
        <div style={{display:"flex",gap:20,alignItems:"center"}}>
          <div className="lews-nav-links" style={{display:"flex",gap:20,alignItems:"center"}}>
          {["Courses","Schedule","About"].map(l=>(
            <span key={l} style={{color:"rgba(255,255,255,0.55)",fontSize:13,cursor:"pointer",fontFamily:"Inter,sans-serif",transition:"color 0.2s"}}
              onMouseEnter={e=>e.target.style.color=C.goldLight} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.55)"}>{l}</span>
          ))}
          </div>
          <button className="btn-glow lews-nav-cta" onClick={()=>setView("register")}
            style={{background:C.gold,color:C.navy,border:"none",borderRadius:8,padding:"9px 20px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
            Book Seat →
          </button>
        </div>
      </nav>

      {/* TICKER */}
      <Ticker/>

      {/* HERO */}
      <div className="lews-hero" style={{background:`linear-gradient(155deg,${C.navyDark} 0%,${C.navyMid} 100%)`,padding:"72px 20px 80px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <Particles/>
        {/* Decorative rings */}
        <div style={{position:"absolute",top:-80,right:-80,width:320,height:320,borderRadius:"50%",border:`1px solid rgba(245,200,66,0.12)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",top:-40,right:-40,width:200,height:200,borderRadius:"50%",border:`1px solid rgba(245,200,66,0.08)`,pointerEvents:"none"}}/>
        <div style={{position:"absolute",bottom:-60,left:-60,width:260,height:260,borderRadius:"50%",border:`1px solid rgba(245,200,66,0.1)`,pointerEvents:"none"}}/>

        <div className="anim-fadeUp" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(201,150,12,0.18)",border:`1px solid rgba(201,150,12,0.4)`,borderRadius:24,padding:"6px 18px",marginBottom:24}}>
          <div style={{width:7,height:7,borderRadius:"50%",background:C.goldLight,animation:"blink 1.2s infinite"}}/>
          <span style={{color:C.goldLight,fontSize:12,fontWeight:700,letterSpacing:2,textTransform:"uppercase"}}>Online Live Class</span>
        </div>

        <h1 className="anim-fadeUp" style={{fontFamily:"Playfair Display,serif",color:C.white,fontSize:"clamp(46px,11vw,88px)",fontWeight:900,lineHeight:1,margin:"0 0 0",textTransform:"uppercase",letterSpacing:-2,animationDelay:"0.08s"}}>
          SPEAK
        </h1>
        <h1 className="anim-fadeUp" style={{fontFamily:"Playfair Display,serif",color:C.goldLight,fontSize:"clamp(46px,11vw,88px)",fontWeight:900,lineHeight:1,margin:"0 0 12px",textTransform:"uppercase",letterSpacing:-2,animationDelay:"0.16s"}}>
          ENGLISH
        </h1>
        <p className="anim-fadeUp lews-hero-sub" style={{color:"rgba(255,255,255,0.85)",fontSize:"clamp(13px,3vw,18px)",fontWeight:700,letterSpacing:4,textTransform:"uppercase",marginBottom:20,animationDelay:"0.24s",fontFamily:"Inter,sans-serif"}}>
          WITH CONFIDENCE
        </p>
        <p className="anim-fadeUp lews-hero-tagline" style={{color:"rgba(255,255,255,0.45)",fontSize:14,marginBottom:40,animationDelay:"0.3s",fontFamily:"Inter,sans-serif"}}>
          Learn &nbsp;|&nbsp; Practice &nbsp;|&nbsp; Speak &nbsp;|&nbsp; Succeed
        </p>

        {/* 50 DAYS BADGE */}
        <div className="anim-scaleIn anim-float" style={{display:"inline-block",marginBottom:36,animationDelay:"0.38s"}}>
          <div className="lews-badge-wrap" style={{background:C.white,borderRadius:18,padding:"18px 48px",display:"inline-block",border:`3px solid ${C.goldLight}`}}>
            <p style={{color:C.navy,fontSize:"clamp(30px,7vw,52px)",fontWeight:900,margin:0,fontFamily:"Playfair Display,serif",letterSpacing:-1}}>50 DAYS</p>
          </div>
          <div style={{background:C.gold,borderRadius:10,padding:"7px 24px",marginTop:-6}}>
            <p style={{color:C.white,fontWeight:800,fontSize:13,margin:0,letterSpacing:2,textTransform:"uppercase",fontFamily:"Inter,sans-serif"}}>Transform Your English</p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="anim-fadeUp lews-features" style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(4px)",border:"1px solid rgba(255,255,255,0.12)",borderRadius:20,padding:"24px 20px",margin:"0 auto",maxWidth:620,display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:20,animationDelay:"0.44s"}}>
          {FEATURES.map(f=>(
            <div key={f.label} className="feature-card lews-feature-item" style={{textAlign:"center",minWidth:90}}>
              <div className="feature-icon" style={{fontSize:30,marginBottom:8}}>{f.icon}</div>
              <p style={{fontSize:11,fontWeight:700,color:"rgba(255,255,255,0.8)",margin:0,textTransform:"uppercase",lineHeight:1.4,fontFamily:"Inter,sans-serif",letterSpacing:0.5}}>{f.label}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="anim-fadeUp" style={{marginTop:40,animationDelay:"0.52s"}}>
          <button className="btn-glow anim-pulse lews-hero-cta" onClick={()=>setView("register")}
            style={{background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,color:C.navy,border:"none",borderRadius:16,padding:"18px 52px",fontSize:18,fontWeight:900,cursor:"pointer",fontFamily:"Inter,sans-serif",letterSpacing:0.5,display:"inline-flex",alignItems:"center",gap:10}}>
            <WaveBars/> Book Your Seat Now <WaveBars/>
          </button>
          <p style={{color:"rgba(255,255,255,0.35)",fontSize:12,marginTop:12,fontFamily:"Inter,sans-serif"}}>⚡ Limited seats — small batch only</p>
        </div>
      </div>

      {/* 3 CARDS */}
      <div className="lews-section" style={{background:C.cream,padding:"56px 20px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <p style={{color:C.gold,fontSize:11,textTransform:"uppercase",letterSpacing:2.5,textAlign:"center",marginBottom:8,fontWeight:700,fontFamily:"Inter,sans-serif"}}>Act Fast</p>
          <h2 style={{fontFamily:"Playfair Display,serif",color:C.navy,textAlign:"center",fontSize:"clamp(22px,4vw,32px)",fontWeight:900,marginBottom:32}}>Class Details at a Glance</h2>
          <div className="lews-cards-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
            {[
              {bg:C.navyDark,label:"Starts From",val:"15 / 6 / 26",sub:"Monday",lc:"rgba(255,255,255,0.5)",vc:C.white,sc:C.goldLight},
              {bg:C.gold,    label:"Limited Seats",val:"🪑",sub:"Small batch · Personal attention",lc:"rgba(15,36,71,0.6)",vc:C.navy,sc:"rgba(15,36,71,0.7)"},
              {bg:C.navy,    label:"Course Fee",val:"₹999",sub:"One-time only",lc:"rgba(255,255,255,0.5)",vc:C.goldLight,sc:C.white},
            ].map((c,i)=>(
              <div key={i} className="card-hover anim-scaleIn" style={{background:c.bg,borderRadius:18,padding:"22px 16px",textAlign:"center",animationDelay:`${i*0.1}s`}}>
                <p style={{fontSize:11,fontWeight:700,color:c.lc,textTransform:"uppercase",letterSpacing:1,margin:"0 0 8px",fontFamily:"Inter,sans-serif"}}>{c.label}</p>
                <p style={{fontSize:c.val.startsWith("₹")?28:c.val==="🪑"?32:20,fontWeight:900,color:c.vc,margin:"0 0 4px",fontFamily:"Playfair Display,serif"}}>{c.val}</p>
                <p style={{fontSize:11,color:c.sc,margin:0,fontWeight:600,fontFamily:"Inter,sans-serif"}}>{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{background:C.creamDark,padding:"56px 20px"}}>
        <div style={{maxWidth:680,margin:"0 auto"}}>
          <p style={{color:C.gold,fontSize:11,textTransform:"uppercase",letterSpacing:2.5,textAlign:"center",marginBottom:8,fontWeight:700,fontFamily:"Inter,sans-serif"}}>Student Stories</p>
          <h2 style={{fontFamily:"Playfair Display,serif",color:C.navy,textAlign:"center",fontSize:"clamp(22px,4vw,30px)",fontWeight:900,marginBottom:32}}>What Our Learners Say</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:16}}>
            {[
              {name:"Priya S.",role:"Marketing Executive",q:"In three months I was presenting in English at work.Now I'm able to express myself clearly! Looking forward to the next session."},
              {name:"Arun K.",role:"CRO",q:"Initially I was afraid to speak in front of others. After attending this session,I gained confidence. Got a job in Dubai after clearing the interview."},
              {name:"Meena R.",role:"Team Lead",q:"Basically, I'm a shy person and I was afraid to speak in front of others. But after attending the English class, i organized a team meeting in English and now i'm confident to speak in front of others."},
            ].map((t,i)=>(
              <div key={t.name} className="card-hover anim-fadeUp" style={{background:C.white,borderRadius:18,padding:"24px 20px",border:`1px solid ${C.creamMid}`,animationDelay:`${i*0.1}s`}}>
                <div style={{color:C.gold,fontSize:18,marginBottom:12,letterSpacing:2}}>★★★★★</div>
                <p style={{fontSize:13,color:"#4A4A4A",lineHeight:1.75,marginBottom:16,fontFamily:"Inter,sans-serif"}}>"{t.q}"</p>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:36,height:36,borderRadius:"50%",background:C.navy,display:"flex",alignItems:"center",justifyContent:"center",color:C.goldLight,fontWeight:800,fontSize:13,fontFamily:"Inter,sans-serif"}}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{fontWeight:700,color:C.navy,fontSize:13,margin:0,fontFamily:"Inter,sans-serif"}}>{t.name}</p>
                    <p style={{fontSize:11,color:C.textMute,margin:0,fontFamily:"Inter,sans-serif"}}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA BANNER */}
      <div style={{background:`linear-gradient(135deg,${C.navyDark},${C.navyMid})`,padding:"64px 20px",textAlign:"center",position:"relative",overflow:"hidden"}}>
        <Particles/>
        <p className="anim-fadeUp" style={{color:C.goldLight,fontSize:11,textTransform:"uppercase",letterSpacing:2.5,marginBottom:12,fontWeight:700,fontFamily:"Inter,sans-serif"}}>Don't Miss Out</p>
        <h2 className="anim-fadeUp" style={{fontFamily:"Playfair Display,serif",color:C.white,fontSize:"clamp(24px,5vw,40px)",fontWeight:900,marginBottom:12,animationDelay:"0.08s"}}>LIMITED SEATS</h2>
        <p className="anim-fadeUp" style={{color:"rgba(255,255,255,0.6)",fontSize:15,marginBottom:36,animationDelay:"0.16s",fontFamily:"Inter,sans-serif"}}>Hurry — small batch fills up fast. Reserve yours today.</p>
        <button className="btn-glow anim-pulse lews-banner-cta" onClick={()=>setView("register")} style={{background:`linear-gradient(135deg,${C.gold},${C.goldLight})`,color:C.navy,border:"none",borderRadius:16,padding:"18px 52px",fontSize:17,fontWeight:900,cursor:"pointer",fontFamily:"Inter,sans-serif",letterSpacing:0.5}}>
          Book Your Seat Now →
        </button>
      </div>

      {/* CONTACT */}
      <div style={{background:C.navyDark,padding:"36px 24px"}}>
        <div className="lews-contact" style={{maxWidth:640,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:20}}>
          <div style={{display:"flex",gap:32,flexWrap:"wrap"}}>
            <div>
              <p style={{color:C.gold,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 4px",fontFamily:"Inter,sans-serif"}}>📧 Email</p>
              <p style={{color:"rgba(255,255,255,0.8)",fontSize:13,margin:0,fontFamily:"Inter,sans-serif",wordBreak:"break-word"}}>learnenglishwithshas@gmail.com</p>
            </div>
            <div>
              <p style={{color:C.gold,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:1,margin:"0 0 4px",fontFamily:"Inter,sans-serif"}}>📸 Instagram</p>
              <p style={{color:"rgba(255,255,255,0.8)",fontSize:13,margin:0,fontFamily:"Inter,sans-serif"}}>@learn.with.shas</p>
            </div>
          </div>
          <button className="btn-glow lews-contact-btn" onClick={()=>setView("register")}
            style={{background:C.gold,color:C.navy,border:"none",borderRadius:10,padding:"11px 22px",fontSize:13,fontWeight:800,cursor:"pointer",fontFamily:"Inter,sans-serif"}}>
            Book Seat →
          </button>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:C.navy,padding:"18px 20px",textAlign:"center",borderTop:`2px solid ${C.gold}`}}>
        <p style={{color:"rgba(255,255,255,0.7)",fontSize:13,margin:0,fontFamily:"Inter,sans-serif"}}>
          📅 <strong style={{color:C.goldLight}}>Classes start: 15/6/26 (Monday)</strong>
        </p>
        <p style={{color:"rgba(255,255,255,0.35)",fontSize:11,marginTop:6,margin:"6px 0 0",fontFamily:"Inter,sans-serif",letterSpacing:1}}>CONSISTENCY TODAY · CONFIDENCE TOMORROW</p>
      </div>
    </div>
  );
}
