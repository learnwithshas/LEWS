import { useState } from "react";

const FEATURES = [
  { icon: "💬", label: "Speak Fluently" },
  { icon: "📖", label: "Improve Grammar" },
  { icon: "🎤", label: "Clear Pronunciation" },
  { icon: "👥", label: "Real Life Conversations" },
  { icon: "🎯", label: "Build Confidence" },
];

const INFO = [
  { icon: "📅", top: "MON TO FRIDAY", bottom: "WEEKDAYS ONLY" },
  { icon: "🕗", top: "8:00 PM – 9:00 PM", bottom: "1 HOUR DAILY" },
  { icon: "🎥", top: "GOOGLE MEET", bottom: "LIVE CLASSES" },
  { icon: "🗓", top: "TOTAL DURATION", bottom: "50 DAYS" },
];

const STEPS = ["Your Details", "Review & Pay"];

function StepDots({ step }) {
  return (
    <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28 }}>
      {STEPS.map((s, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: i <= step ? "#6B21A8" : "#E5E7EB",
              color: i <= step ? "#fff" : "#9CA3AF",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 600,
            }}>{i < step ? "✓" : i + 1}</div>
            <span style={{ fontSize: 13, color: i === step ? "#6B21A8" : "#9CA3AF", fontWeight: i === step ? 600 : 400 }}>{s}</span>
          </div>
          {i < STEPS.length - 1 && <div style={{ width: 32, height: 2, background: i < step ? "#6B21A8" : "#E5E7EB" }} />}
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("home"); // home | register | success
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", city: "" });
  const [errors, setErrors] = useState({});

  function update(f, v) { setForm(x => ({ ...x, [f]: v })); setErrors(e => ({ ...e, [f]: "" })); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone.trim() || form.phone.replace(/\D/g, "").length < 10) e.phone = "Valid 10-digit phone required";
    if (!form.city.trim()) e.city = "City is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  const inp = {
    width: "100%", padding: "11px 14px", border: "2px solid #E5E7EB",
    borderRadius: 10, fontSize: 15, background: "#fff", color: "#1F1F1F",
    outline: "none", boxSizing: "border-box", fontFamily: "inherit", transition: "border-color 0.2s",
  };
  const errStyle = { color: "#DC2626", fontSize: 12, marginTop: 4 };
  const lbl = { fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6, display: "block", textTransform: "uppercase", letterSpacing: 0.5 };

  // ── SUCCESS ──
  if (view === "success") return (
    <div style={{ minHeight: "100vh", background: "#FBF7F0", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: "48px 40px", maxWidth: 460, textAlign: "center", boxShadow: "0 4px 32px rgba(0,0,0,0.08)" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "#DCFCE7", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 32 }}>🎉</div>
        <h2 style={{ fontFamily: "Georgia,serif", fontSize: 26, color: "#6B21A8", marginBottom: 8, fontWeight: 700 }}>Seat Booked!</h2>
        <p style={{ color: "#4B5563", lineHeight: 1.7, marginBottom: 6 }}>
          Hi <strong>{form.name}</strong>, you're registered for<br />
          <strong style={{ color: "#E11D48" }}>Speak English With Confidence</strong>
        </p>
        <p style={{ color: "#6B7280", fontSize: 14, marginBottom: 8 }}>Confirmation sent to <strong>{form.email}</strong></p>
        <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 10, padding: "14px 20px", margin: "20px 0 28px" }}>
          <p style={{ fontSize: 13, color: "#6B21A8", margin: 0, fontWeight: 600 }}>📅 Classes start: 15/6/26 (Monday)</p>
          <p style={{ fontSize: 13, color: "#7C3AED", margin: "4px 0 0" }}>🕗 8:00 PM – 9:00 PM via Google Meet</p>
        </div>
        <p style={{ fontSize: 13, color: "#9CA3AF", marginBottom: 24 }}>Our team will WhatsApp you the Google Meet link shortly at <strong>{form.phone}</strong></p>
        <button onClick={() => { setView("home"); setStep(0); setForm({ name:"",email:"",phone:"",city:"" }); }}
          style={{ background: "#6B21A8", color: "#fff", border: "none", borderRadius: 10, padding: "12px 32px", fontSize: 15, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
          ← Back to Home
        </button>
      </div>
    </div>
  );

  // ── REGISTER ──
  if (view === "register") return (
    <div style={{ minHeight: "100vh", background: "#FBF7F0", padding: "32px 16px" }}>
      <div style={{ maxWidth: 520, margin: "0 auto" }}>
        <button onClick={() => setView("home")} style={{ background: "none", border: "none", color: "#7C3AED", cursor: "pointer", fontSize: 14, marginBottom: 20, padding: 0, fontWeight: 600 }}>
          ← Back
        </button>
        {/* Header card */}
        <div style={{ background: "linear-gradient(135deg,#6B21A8,#7C3AED)", borderRadius: 16, padding: "24px", marginBottom: 20, textAlign: "center" }}>
          <p style={{ color: "#DDD6FE", fontSize: 12, textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Online Live Class</p>
          <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 800, margin: "0 0 4px", fontFamily: "Georgia,serif" }}>Speak English</h1>
          <p style={{ color: "#E11D48", fontSize: 16, fontWeight: 700, margin: "0 0 12px" }}>WITH CONFIDENCE</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
            <span style={{ background: "#F59E0B", color: "#fff", borderRadius: 20, padding: "4px 14px", fontSize: 13, fontWeight: 700 }}>50 DAYS</span>
            <span style={{ color: "#C4B5FD", fontSize: 13 }}>·</span>
            <span style={{ color: "#FDE68A", fontSize: 14, fontWeight: 700 }}>₹999 ONLY</span>
            <span style={{ color: "#C4B5FD", fontSize: 13 }}>·</span>
            <span style={{ color: "#C4B5FD", fontSize: 13 }}>Starts 15/6/26</span>
          </div>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: "32px 28px", boxShadow: "0 2px 20px rgba(0,0,0,0.07)" }}>
          <StepDots step={step} />

          {step === 0 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F1F1F", marginBottom: 20 }}>Enter your details</h2>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Full Name</label>
                <input style={inp} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your full name" />
                {errors.name && <p style={errStyle}>{errors.name}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>Email Address</label>
                <input style={inp} type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@email.com" />
                {errors.email && <p style={errStyle}>{errors.email}</p>}
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={lbl}>WhatsApp Number</label>
                <input style={inp} type="tel" value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="+91 98765 43210" />
                <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 4 }}>Google Meet link will be sent here</p>
                {errors.phone && <p style={errStyle}>{errors.phone}</p>}
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={lbl}>City</label>
                <input style={inp} value={form.city} onChange={e => update("city", e.target.value)} placeholder="Your city" />
                {errors.city && <p style={errStyle}>{errors.city}</p>}
              </div>
              <button onClick={() => { if (validate()) setStep(1); }}
                style={{ width: "100%", background: "#6B21A8", color: "#fff", border: "none", borderRadius: 10, padding: "14px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                Continue →
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: "#1F1F1F", marginBottom: 20 }}>Confirm & Pay</h2>
              {/* Order summary */}
              <div style={{ background: "#F5F3FF", border: "1px solid #DDD6FE", borderRadius: 12, padding: "20px", marginBottom: 20 }}>
                <div style={{ borderBottom: "1px solid #DDD6FE", paddingBottom: 12, marginBottom: 12 }}>
                  <p style={{ fontWeight: 700, color: "#6B21A8", fontSize: 15, margin: "0 0 4px" }}>Speak English With Confidence</p>
                  <p style={{ color: "#7C3AED", fontSize: 13, margin: 0 }}>50-Day Online Live Course · Mon–Fri · 8–9 PM</p>
                </div>
                {[["Name", form.name], ["Email", form.email], ["WhatsApp", form.phone], ["City", form.city]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "4px 0" }}>
                    <span style={{ color: "#6B7280" }}>{k}</span>
                    <span style={{ color: "#1F1F1F", fontWeight: 500 }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: "1px solid #DDD6FE", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#1F1F1F" }}>Course Fee</span>
                  <span style={{ fontWeight: 800, color: "#6B21A8", fontSize: 22 }}>₹999</span>
                </div>
              </div>

              {/* UPI instruction */}
              <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 12, padding: "16px 18px", marginBottom: 20 }}>
                <p style={{ fontWeight: 700, color: "#92400E", fontSize: 14, margin: "0 0 6px" }}>💳 Payment via UPI / Bank Transfer</p>
                <p style={{ color: "#92400E", fontSize: 13, margin: "0 0 4px" }}>UPI / Google Pay / PhonePe:</p>
                <p style={{ color: "#1F1F1F", fontWeight: 700, fontSize: 15, margin: "0 0 8px", fontFamily: "monospace" }}>learnenglishwithshas@gmail.com</p>
                <p style={{ color: "#78350F", fontSize: 12, margin: 0 }}>After payment, send your screenshot to the same email or WhatsApp our team.</p>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setStep(0)}
                  style={{ flex: 1, background: "#fff", color: "#6B21A8", border: "2px solid #6B21A8", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  ← Back
                </button>
                <button onClick={() => setView("success")}
                  style={{ flex: 2, background: "#E11D48", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  Book My Seat! 🎉
                </button>
              </div>
              <p style={{ fontSize: 11, color: "#9CA3AF", textAlign: "center", marginTop: 10 }}>Limited seats · Small batch · Personal attention</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  // ── HOME ──
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: "#FBF7F0", minHeight: "100vh" }}>

      {/* Nav */}
      <nav style={{ background: "#6B21A8", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
        <span style={{ color: "#fff", fontWeight: 800, fontSize: 18, fontFamily: "Georgia,serif" }}>
          Learn.<span style={{ color: "#FCD34D" }}>Speak.</span>Succeed.
        </span>
        <button onClick={() => setView("register")} style={{ background: "#E11D48", color: "#fff", border: "none", borderRadius: 8, padding: "8px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Book Seat →
        </button>
      </nav>

      {/* Hero */}
      <div style={{ background: "linear-gradient(160deg,#6B21A8 0%,#4C1D95 100%)", padding: "56px 20px 64px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#E11D48", color: "#fff", borderRadius: 20, padding: "5px 18px", fontSize: 12, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>
          Online Live Class
        </div>
        <h1 style={{ color: "#fff", fontSize: "clamp(40px,10vw,80px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 4px", textTransform: "uppercase", letterSpacing: -1 }}>
          SPEAK
        </h1>
        <h1 style={{ color: "#E11D48", fontSize: "clamp(40px,10vw,80px)", fontWeight: 900, lineHeight: 1.05, margin: "0 0 10px", textTransform: "uppercase", letterSpacing: -1 }}>
          ENGLISH
        </h1>
        <p style={{ color: "#DDD6FE", fontSize: "clamp(14px,3vw,20px)", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 20 }}>
          WITH CONFIDENCE
        </p>
        <p style={{ color: "#C4B5FD", fontSize: 15, marginBottom: 28 }}>Learn &nbsp;|&nbsp; Practice &nbsp;|&nbsp; Speak &nbsp;|&nbsp; Succeed</p>

        {/* 50 Days badge */}
        <div style={{ display: "inline-block", marginBottom: 12 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: "16px 40px", display: "inline-block" }}>
            <p style={{ color: "#6B21A8", fontSize: "clamp(28px,6vw,48px)", fontWeight: 900, margin: 0, letterSpacing: -1 }}>50 DAYS</p>
          </div>
          <div style={{ background: "#F59E0B", borderRadius: 8, padding: "6px 20px", marginTop: -6 }}>
            <p style={{ color: "#fff", fontWeight: 800, fontSize: 13, margin: 0, letterSpacing: 1.5, textTransform: "uppercase" }}>Transform Your English</p>
          </div>
        </div>

        {/* Features row */}
        <div style={{ background: "#fff", borderRadius: 16, padding: "20px 16px", margin: "24px auto 0", maxWidth: 600, display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {FEATURES.map(f => (
            <div key={f.label} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{f.icon}</div>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#374151", margin: 0, textTransform: "uppercase", lineHeight: 1.3 }}>{f.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Class info */}
      <div style={{ background: "#4C1D95", padding: "28px 20px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {INFO.map(item => (
            <div key={item.top} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 26, marginBottom: 8 }}>{item.icon}</div>
              <p style={{ color: "#fff", fontSize: 12, fontWeight: 700, margin: "0 0 2px", lineHeight: 1.3 }}>{item.top}</p>
              <p style={{ color: "#FCD34D", fontSize: 11, fontWeight: 700, margin: 0, textTransform: "uppercase" }}>{item.bottom}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Start date / seats / fee */}
      <div style={{ padding: "24px 20px", maxWidth: 640, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ background: "#0F766E", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
          <p style={{ color: "#99F6E4", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 8px" }}>Starts From</p>
          <p style={{ color: "#fff", fontSize: 20, fontWeight: 900, margin: 0 }}>15/6/26</p>
          <p style={{ color: "#FCD34D", fontSize: 12, fontWeight: 700, margin: "4px 0 0" }}>MONDAY</p>
        </div>
        <div style={{ background: "#F59E0B", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
          <div style={{ fontSize: 22, marginBottom: 4 }}>🪑</div>
          <p style={{ color: "#78350F", fontSize: 13, fontWeight: 800, margin: "0 0 2px", textTransform: "uppercase" }}>Limited Seats</p>
          <p style={{ color: "#78350F", fontSize: 11, fontWeight: 600, margin: 0 }}>Small Batch · Personal Attention</p>
        </div>
        <div style={{ background: "#6B21A8", borderRadius: 14, padding: "18px 14px", textAlign: "center" }}>
          <p style={{ color: "#DDD6FE", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>Course Fee</p>
          <p style={{ color: "#fff", fontSize: 26, fontWeight: 900, margin: 0 }}>₹999</p>
          <div style={{ background: "#FCD34D", borderRadius: 6, padding: "2px 10px", display: "inline-block", marginTop: 4 }}>
            <span style={{ color: "#6B21A8", fontWeight: 800, fontSize: 11 }}>ONLY</span>
          </div>
        </div>
      </div>

      {/* LIMITED SEATS banner */}
      <div style={{ textAlign: "center", padding: "8px 20px 28px" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
          <div style={{ height: 3, width: 40, background: "#E11D48", borderRadius: 2 }} />
          <p style={{ color: "#E11D48", fontSize: "clamp(22px,5vw,36px)", fontWeight: 900, margin: 0, letterSpacing: 1.5 }}>LIMITED SEATS</p>
          <div style={{ height: 3, width: 40, background: "#E11D48", borderRadius: 2 }} />
        </div>
        <p style={{ color: "#6B7280", fontSize: 13, marginTop: 6 }}>Hurry — small batch fills up fast!</p>
      </div>

      {/* CTA */}
      <div style={{ padding: "0 20px 40px", textAlign: "center" }}>
        <button onClick={() => setView("register")}
          style={{ background: "#6B21A8", color: "#fff", border: "none", borderRadius: 14, padding: "18px 48px", fontSize: 18, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 10 }}>
          Book Your Seat Now! →
        </button>
      </div>

      {/* Contact */}
      <div style={{ background: "#1F1F1F", padding: "28px 20px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>📧 Contact Us</p>
              <p style={{ color: "#E5E7EB", fontSize: 13, margin: 0 }}>learnenglishwithshas@gmail.com</p>
            </div>
            <div>
              <p style={{ color: "#9CA3AF", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: "0 0 4px" }}>📸 Instagram</p>
              <p style={{ color: "#E5E7EB", fontSize: 13, margin: 0 }}>@learn.with.shas</p>
            </div>
          </div>
          <button onClick={() => setView("register")}
            style={{ background: "#E11D48", color: "#fff", border: "none", borderRadius: 10, padding: "12px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
            Book Seat →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: "#6B21A8", padding: "16px 20px", textAlign: "center" }}>
        <p style={{ color: "#DDD6FE", fontSize: 13, margin: 0 }}>
          📅 <strong style={{ color: "#FCD34D" }}>Classes start from: 15/6/26 (Monday)</strong>
        </p>
        <p style={{ color: "#A78BFA", fontSize: 12, marginTop: 4, margin: "4px 0 0" }}>Consistency Today. Confidence Tomorrow.</p>
      </div>
    </div>
  );
}
