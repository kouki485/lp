import { useState, useEffect, useRef } from "react";

const c = {
  bgP: "#0a0a0f", bgS: "#12121a", bgC: "#1a1a26", bgCH: "#222233",
  ac: "#e84393", acG: "rgba(232,67,147,0.3)", acS: "rgba(232,67,147,0.12)",
  gd: "#f9ca24", gdS: "rgba(249,202,36,0.12)",
  tP: "#f0f0f5", tS: "#9090a8", tM: "#606078",
  bd: "rgba(255,255,255,0.06)", gA: "linear-gradient(135deg,#e84393,#fd79a8)",
};

const IMAGES = { heroMockup: null };

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry?.isIntersecting) setV(true); },
      { threshold: 0, rootMargin: "10px" }
    );
    observer.observe(el);
    const fallback = setTimeout(() => setV(true), 800);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);
  return <div ref={ref} style={{ ...style, opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>{children}</div>;
};

const CTA = ({ href = "#waitlist", children, sm = false }) => (
  <a href={href} style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: sm ? "14px 32px" : "18px 48px", background: c.gA, color: "#fff", fontSize: sm ? "0.92rem" : "1.05rem", fontWeight: 700, border: "none", borderRadius: 60, cursor: "pointer", textDecoration: "none", boxShadow: `0 4px 30px ${c.acG}`, transition: "transform 0.25s" }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px) scale(1.03)"; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}>
    {children}
    <svg width={sm ? 16 : 18} height={sm ? 16 : 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  </a>
);

const PhoneMockup = ({ src }) => (
  <div style={{ position: "relative", width: 280, flexShrink: 0 }}>
    <div style={{ position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)", width: 340, height: 440, background: `radial-gradient(ellipse,${c.acG} 0%,transparent 70%)`, filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
    <div style={{ position: "relative", zIndex: 1, width: 280, borderRadius: 36, background: "#1a1a1a", padding: 8, boxShadow: `0 20px 80px rgba(0,0,0,0.6),0 0 60px ${c.acG}` }}>
      <div style={{ position: "absolute", top: 8, left: "50%", transform: "translateX(-50%)", width: 120, height: 28, background: "#1a1a1a", borderRadius: "0 0 16px 16px", zIndex: 10 }} />
      <div style={{ borderRadius: 28, overflow: "hidden", background: "#fff", minHeight: 520 }}>
        {src ? <img src={src} alt="ikkutok" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} /> : <MockScreen />}
      </div>
    </div>
  </div>
);

const MockScreen = () => (
  <div style={{ padding: "44px 20px 20px", fontFamily: "'Noto Sans JP',sans-serif" }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#999", marginBottom: 20, paddingTop: 4 }}><span>9:41</span><div style={{ display: "flex", gap: 4 }}><div style={{ width: 16, height: 10, borderRadius: 2, background: "#ccc" }} /><div style={{ width: 22, height: 10, borderRadius: 2, background: "#333" }} /></div></div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.3rem", fontWeight: 800, background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ikkutok</div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>👤</div>
    </div>
    <div style={{ background: "linear-gradient(135deg,#e84393,#fd79a8)", borderRadius: 16, padding: "20px 18px", marginBottom: 16, color: "#fff" }}>
      <div style={{ fontSize: "0.65rem", opacity: 0.85, marginBottom: 4 }}>今月の売上</div>
      <div style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800 }}>¥892,350</div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
        <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 8, padding: "4px 10px", fontSize: "0.6rem", fontWeight: 600 }}>還元率 90%</div>
        <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 8, padding: "4px 10px", fontSize: "0.6rem", fontWeight: 600 }}>翌日振込</div>
      </div>
    </div>
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: "0.7rem", color: "#888", marginBottom: 8, fontWeight: 500 }}>売上推移</div>
      <svg width="100%" height="80" viewBox="0 0 240 80"><defs><linearGradient id="cg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#e84393" stopOpacity="0.3" /><stop offset="100%" stopColor="#e84393" stopOpacity="0.02" /></linearGradient></defs><path d="M0 70 Q30 65 50 55 T100 40 T150 30 T200 18 T240 8 L240 80 L0 80Z" fill="url(#cg)" /><path d="M0 70 Q30 65 50 55 T100 40 T150 30 T200 18 T240 8" fill="none" stroke="#e84393" strokeWidth="2.5" strokeLinecap="round" /></svg>
    </div>
    <div style={{ background: "#f8f8fc", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <div><div style={{ fontSize: "0.65rem", color: "#999", marginBottom: 2 }}>次回振込</div><div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#222" }}>明日 (3/6)</div></div>
      <div style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: "0.6rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>処理中</div>
    </div>
    <div style={{ fontSize: "0.65rem", color: "#999", marginBottom: 8, fontWeight: 500 }}>最近の取引</div>
    {[{ n: "プラン加入", a: "+¥4,980", t: "2分前" }, { n: "単品購入", a: "+¥1,500", t: "18分前" }, { n: "プラン加入", a: "+¥4,980", t: "1時間前" }].map((tx, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0f0f4" : "none" }}>
        <div><div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#333" }}>{tx.n}</div><div style={{ fontSize: "0.6rem", color: "#bbb" }}>{tx.t}</div></div>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#e84393" }}>{tx.a}</div>
      </div>
    ))}
  </div>
);

const FAQ = ({ q, a }) => {
  const [o, setO] = useState(false);
  return (
    <div style={{ background: c.bgC, border: `1px solid ${c.bd}`, borderRadius: 10, overflow: "hidden" }}>
      <div onClick={() => setO(!o)} style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = c.bgCH)} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <span style={{ width: 28, height: 28, borderRadius: 6, background: c.acS, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: c.ac, flexShrink: 0 }}>Q</span>
        <span style={{ flex: 1, fontSize: "0.95rem", fontWeight: 500 }}>{q}</span>
        <span style={{ fontSize: "1.2rem", color: c.tM, transition: "transform 0.3s", transform: o ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
      </div>
      <div style={{ maxHeight: o ? 300 : 0, overflow: "hidden", transition: "max-height 0.4s ease,padding 0.4s ease", padding: o ? "0 24px 20px 66px" : "0 24px 0 66px" }}>
        <p style={{ fontSize: "0.9rem", color: c.tS, lineHeight: 1.8 }}>{a}</p>
      </div>
    </div>
  );
};

const MigrationVisual = () => {
  const pf = [{ name: "myfans", cl: "#6c5ce7" }, { name: "FANTUBE", cl: "#00b894" }, { name: "Fantia", cl: "#e17055" }, { name: "candfans", cl: "#0984e3" }];
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, flexWrap: "wrap", margin: "36px 0 12px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
        {pf.map((p) => (
          <div key={p.name} style={{ background: c.bgC, border: `1px solid ${c.bd}`, borderRadius: 10, padding: "10px 20px", fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 8, minWidth: 130 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: p.cl, flexShrink: 0 }} />{p.name}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <svg width="60" height="40" viewBox="0 0 60 40"><defs><linearGradient id="ag" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor={c.tM} /><stop offset="100%" stopColor={c.ac} /></linearGradient></defs><path d="M5 20H45M38 10L50 20L38 30" fill="none" stroke="url(#ag)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        <div style={{ background: c.gA, borderRadius: 20, padding: "6px 16px", fontSize: "0.7rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>ボタン1つで移行</div>
      </div>
      <div style={{ background: `linear-gradient(135deg,${c.acS},rgba(253,121,168,0.08))`, border: "2px solid rgba(232,67,147,0.3)", borderRadius: 16, padding: "28px 24px", textAlign: "center", minWidth: 140 }}>
        <div style={{ fontFamily: "Outfit,sans-serif", fontSize: "1.5rem", fontWeight: 800, background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 6 }}>ikkutok</div>
        <div style={{ fontSize: "0.7rem", color: c.tS }}>コンテンツ移行完了</div>
      </div>
    </div>
  );
};

/* ===== PAYMENT STABILITY VISUAL ===== */
const PaymentShield = () => (
  <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap", margin: "36px 0 16px" }}>
    {[
      { icon: "🔀", title: "複数決済経路", desc: "1社に依存しない設計。経路Aが止まっても経路Bで継続。" },
      { icon: "🛡️", title: "売上保護ポリシー", desc: "万が一の決済障害時にも、確定済み売上は全額保護。" },
      { icon: "📡", title: "24時間モニタリング", desc: "決済状況をリアルタイム監視。異常時は即座に経路切替。" },
    ].map((item) => (
      <div key={item.title} style={{
        background: c.bgC, border: `1px solid ${c.bd}`, borderRadius: 14,
        padding: "28px 22px", flex: "1 1 200px", maxWidth: 260, textAlign: "center",
      }}>
        <div style={{ fontSize: "2rem", marginBottom: 12 }}>{item.icon}</div>
        <div style={{ fontSize: "0.95rem", fontWeight: 700, marginBottom: 8 }}>{item.title}</div>
        <div style={{ fontSize: "0.82rem", color: c.tS, lineHeight: 1.7 }}>{item.desc}</div>
      </div>
    ))}
  </div>
);

export default function IkkutokLP() {
  return (
    <div style={{ fontFamily: "'Noto Sans JP',sans-serif", background: c.bgP, color: c.tP, WebkitFontSmoothing: "antialiased", overflowX: "hidden", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ===== HERO ===== */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20%", left: "30%", transform: "translateX(-50%)", width: 700, height: 700, background: `radial-gradient(circle,${c.acG} 0%,transparent 70%)`, pointerEvents: "none", opacity: 0.4 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 56, maxWidth: 1050, width: "100%", position: "relative", zIndex: 1, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: "1 1 380px", minWidth: 280 }}>
            <FadeIn><div style={{ fontFamily: "Outfit,sans-serif", fontSize: "clamp(2.5rem,7vw,4.5rem)", fontWeight: 900, letterSpacing: "-0.03em", background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>ikkutok</div></FadeIn>
            <FadeIn delay={0.1}><p style={{ fontSize: "0.8rem", color: c.tS, fontWeight: 300, letterSpacing: "0.12em", marginBottom: 36 }}>CREATOR PLATFORM — COMING JUNE 2026</p></FadeIn>
            <FadeIn delay={0.2}><h1 style={{ fontSize: "clamp(1.3rem,3.5vw,2rem)", fontWeight: 700, lineHeight: 1.65, marginBottom: 20 }}>売上の<span style={{ background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>90%</span>があなたのもの。<br />しかも<span style={{ background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>翌日</span>振込。</h1></FadeIn>
            <FadeIn delay={0.3}><p style={{ fontSize: "0.92rem", color: c.tS, lineHeight: 1.85, marginBottom: 40, maxWidth: 440 }}>クリエイターの収益を最大化する次世代ファンクラブプラットフォーム。事前登録受付中。</p></FadeIn>
            <FadeIn delay={0.4}><CTA>事前登録する（無料）</CTA></FadeIn>
          </div>
          <FadeIn delay={0.3} style={{ flex: "0 0 auto" }}><PhoneMockup src={IMAGES.heroMockup} /></FadeIn>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section style={{ background: c.bgS, padding: "100px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: c.ac, marginBottom: 16 }}>Benefits</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, marginBottom: 52 }}>ikkutokが選ばれる6つの理由</h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>

            {/* 01: Revenue */}
            <FadeIn delay={0.05} style={{ gridColumn: "1/-1", background: `linear-gradient(135deg,${c.acS},rgba(253,121,168,0.04))`, border: "1px solid rgba(232,67,147,0.15)", borderRadius: 16, padding: "40px 32px", position: "relative", overflow: "hidden" }}>
              <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "4rem", fontWeight: 900, background: "linear-gradient(180deg,rgba(255,255,255,0.07),transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>01</span>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.acS, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, fontSize: "1.4rem" }}>💰</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 10 }}>業界最高水準の還元率 90%</h3>
              <p style={{ fontSize: "0.9rem", color: c.tS, lineHeight: 1.8, marginBottom: 28 }}>手数料はわずか10%。あなたの売上の90%をそのまま受け取れます。</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[{ l: "ikkutok", p: "90%", w: "90%", on: true }, { l: "他社平均", p: "78〜83%", w: "80%", on: false }].map((b) => (
                  <div key={b.l} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 80, fontSize: "0.8rem", color: c.tS, textAlign: "right", flexShrink: 0 }}>{b.l}</span>
                    <div style={{ flex: 1, height: 34, background: "rgba(255,255,255,0.03)", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{ width: b.w, height: "100%", borderRadius: 8, background: b.on ? c.gA : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 12, fontFamily: "Outfit", fontSize: "0.85rem", fontWeight: 700, color: b.on ? "#fff" : c.tS }}>{b.p}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {[{ v: "+7.5万円", l: "月100万売上時の差額" }, { v: "+90万円", l: "年間の手取り増加額" }].map((s) => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Outfit", fontSize: "clamp(2rem,5vw,2.8rem)", fontWeight: 900, background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
                    <div style={{ fontSize: "0.8rem", color: c.tS, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Small cards */}
            {[
              { n: "02", i: "⚡", bg: c.gdS, t: "翌日出金", d: "売上が翌日にはあなたの口座に。月末まで待つ必要はもうありません。" },
              { n: "03", i: "🤝", bg: c.acS, t: "専任サポート", d: "LINEでの個別サポート。始め方から売上アップまで全面バックアップ。" },
              { n: "04", i: "🔓", bg: c.gdS, t: "縛りなし・併用OK", d: "独占契約は不要。他プラットフォームとの併用も自由。" },
              { n: "05", i: "📦", bg: c.acS, t: "かんたんコンテンツ移行", d: "myfans・Fantia等の投稿をボタンひとつで丸ごと移行。再アップロード不要。" },
            ].map((cd, i) => (
              <FadeIn key={cd.n} delay={0.08 + i * 0.04} style={{ background: c.bgC, border: `1px solid ${c.bd}`, borderRadius: 16, padding: "36px 28px", position: "relative", overflow: "hidden" }}>
                <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "3.5rem", fontWeight: 900, background: "linear-gradient(180deg,rgba(255,255,255,0.06),transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{cd.n}</span>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: cd.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.4rem" }}>{cd.i}</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 10 }}>{cd.t}</h3>
                <p style={{ fontSize: "0.88rem", color: c.tS, lineHeight: 1.8 }}>{cd.d}</p>
              </FadeIn>
            ))}

            {/* 06: Payment Stability — Full width, special treatment */}
            <FadeIn delay={0.2} style={{
              gridColumn: "1/-1",
              background: `linear-gradient(135deg, rgba(249,202,36,0.06), rgba(249,202,36,0.02))`,
              border: "1px solid rgba(249,202,36,0.15)", borderRadius: 16,
              padding: "40px 32px", position: "relative", overflow: "hidden",
            }}>
              <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "4rem", fontWeight: 900, background: "linear-gradient(180deg,rgba(255,255,255,0.07),transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>06</span>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: c.gdS, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, fontSize: "1.4rem" }}>🛡️</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 10 }}>決済安定性を最優先に設計</h3>
              <p style={{ fontSize: "0.9rem", color: c.tS, lineHeight: 1.9, maxWidth: 680 }}>
                この業界では、決済停止によってクリエイターの売上が一夜にして消えるケースが繰り返されてきました。<br />
                ikkutokはその教訓を踏まえ、<strong style={{ color: c.tP }}>決済の安定性をプラットフォーム設計の最優先事項</strong>に据えています。<br />
                複数の決済経路を確保し、1社が停止しても他の経路で購入を継続できる構造を構築中です。
              </p>

              {/* 3 pillars */}
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginTop: 28 }}>
                {[
                  { icon: "🔀", label: "複数決済経路", sub: "1社依存しないマルチ経路設計" },
                  { icon: "🛡️", label: "売上保護ポリシー", sub: "確定済み売上は決済障害時も全額保護" },
                  { icon: "📡", label: "リアルタイム監視", sub: "異常検知時に即座に経路を自動切替" },
                ].map((p) => (
                  <div key={p.label} style={{
                    flex: "1 1 180px", background: "rgba(255,255,255,0.03)",
                    borderRadius: 12, padding: "18px 16px",
                    display: "flex", gap: 12, alignItems: "flex-start",
                  }}>
                    <span style={{ fontSize: "1.3rem", flexShrink: 0, marginTop: 2 }}>{p.icon}</span>
                    <div>
                      <div style={{ fontSize: "0.88rem", fontWeight: 700, marginBottom: 2 }}>{p.label}</div>
                      <div style={{ fontSize: "0.78rem", color: c.tS, lineHeight: 1.6 }}>{p.sub}</div>
                    </div>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: "0.78rem", color: c.tM, marginTop: 20, lineHeight: 1.6 }}>
                ※ 決済経路の詳細はローンチ時にご案内します。業界全体の構造的課題に対して、最善の対策を講じることをお約束します。
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== MIGRATION ===== */}
      <section style={{ padding: "100px 24px", background: c.bgP, overflow: "hidden" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: c.ac, marginBottom: 16 }}>Easy Migration</p>
            <h2 style={{ fontSize: "clamp(1.4rem,3.5vw,1.9rem)", fontWeight: 700, lineHeight: 1.5, marginBottom: 12 }}>
              他プラットフォームからの移行は<br /><span style={{ background: c.gA, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ボタンひとつ</span>で完了
            </h2>
            <p style={{ fontSize: "0.92rem", color: c.tS, lineHeight: 1.8, maxWidth: 540, margin: "0 auto" }}>
              myfans・FANTUBE・Fantia・candfansで公開していた写真・動画・プラン情報を、ikkutokにそのままインポート。再アップロードの手間ゼロ。
            </p>
          </FadeIn>
          <FadeIn delay={0.15}><MigrationVisual /></FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
              {[{ i: "🖼️", t: "写真・動画を一括移行" }, { i: "📋", t: "プラン設定もそのまま" }, { i: "⏱️", t: "最短数分で完了" }].map((f) => (
                <div key={f.t} style={{ background: c.bgC, border: `1px solid ${c.bd}`, borderRadius: 12, padding: "16px 22px", display: "flex", alignItems: "center", gap: 10, fontSize: "0.88rem", fontWeight: 500 }}>
                  <span style={{ fontSize: "1.1rem" }}>{f.i}</span>{f.t}
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.25}>
            <p style={{ fontSize: "0.82rem", color: c.tM, marginTop: 28, lineHeight: 1.7 }}>※ 対応プラットフォームは順次拡大予定です。</p>
          </FadeIn>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "100px 24px", background: c.bgS }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: c.ac, marginBottom: 16 }}>How it works</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, marginBottom: 52 }}>事前登録から活動開始まで</h2>
          </FadeIn>
          <div style={{ position: "relative", paddingLeft: 52 }}>
            <div style={{ position: "absolute", left: 19, top: 28, bottom: 28, width: 2, background: `linear-gradient(180deg,${c.ac},rgba(232,67,147,0.1))` }} />
            {[
              { n: "1", t: "事前登録（今すぐ・無料）", d: "フォームからメールアドレスとSNSアカウントを登録。30秒で完了。" },
              { n: "2", t: "優先案内の受信", d: "ローンチ日確定時に優先案内。一般公開前にアカウント開設可能。" },
              { n: "3", t: "コンテンツ移行 or 新規投稿", d: "既存コンテンツはワンクリック移行。新規投稿もすぐに始められます。" },
              { n: "4", t: "収益化スタート", d: "ファンクラブ公開 → コンテンツ投稿 → 翌日には売上振込。" },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "22px 0", position: "relative" }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: c.bgC, border: `2px solid ${c.ac}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Outfit", fontWeight: 800, fontSize: "1rem", color: c.ac, flexShrink: 0, position: "absolute", left: -52, zIndex: 1 }}>{s.n}</div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 6 }}>{s.t}</h3>
                  <p style={{ fontSize: "0.88rem", color: c.tS, lineHeight: 1.7 }}>{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ padding: "100px 24px", background: c.bgP }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: c.ac, marginBottom: 16 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(1.5rem,4vw,2rem)", fontWeight: 700, marginBottom: 48 }}>よくある質問</h2>
          </FadeIn>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "他のプラットフォームと併用できますか？", a: "はい。独占契約は不要。myfans、Fantia、candfans等と並行してご活用いただけます。" },
              { q: "コンテンツの移行はどうやるの？", a: "管理画面から移行元を選択し、ボタンひとつで写真・動画・プラン設定をまとめてインポートできます。再アップロードは不要です。" },
              { q: "決済が止まる心配はありませんか？", a: "決済安定性はikkutokの最優先課題です。複数の決済経路を確保し、1社が停止しても他の経路で購入を継続できる設計を進めています。また、確定済みの売上は決済障害時にもクリエイターに全額お支払いするポリシーを設けています。" },
              { q: "手数料90%還元は本当ですか？", a: "はい。プラットフォーム手数料は売上の10%のみ。初期費用・月額費用は一切かかりません。" },
              { q: "事前登録に費用はかかりますか？", a: "完全無料です。ローンチまで費用は一切発生しません。" },
              { q: "風営法の届出は必要ですか？", a: "アダルトコンテンツ配信の場合は届出が必要です。届出のご相談もサポートいたします。" },
              { q: "ローンチはいつ頃ですか？", a: "2026年6月予定。確定次第、事前登録者へ優先的にご連絡します。" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.04}><FAQ q={item.q} a={item.a} /></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="waitlist" style={{ padding: "120px 24px", background: c.bgS, textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -200, left: "50%", transform: "translateX(-50%)", width: 600, height: 600, background: `radial-gradient(circle,${c.acG} 0%,transparent 70%)`, pointerEvents: "none", opacity: 0.5 }} />
        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: c.ac, marginBottom: 16 }}>Waitlist</p>
            <h2 style={{ fontSize: "clamp(1.3rem,3.5vw,1.9rem)", fontWeight: 700, lineHeight: 1.6, marginBottom: 16 }}>あなたの作品に、<br />最大限の対価を。</h2>
            <p style={{ fontSize: "0.92rem", color: c.tS, marginBottom: 40, lineHeight: 1.8 }}>事前登録で、ローンチ時の優先案内と<br />初期クリエイター限定の特別条件をお届けします。</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <CTA href="#">事前登録する（無料）</CTA>
            <p style={{ fontSize: "0.76rem", color: c.tM, marginTop: 24 }}>※ 登録は無料です。ローンチ前に解除も可能です。</p>
          </FadeIn>
        </div>
      </section>

      <footer style={{ padding: "36px 24px", textAlign: "center", borderTop: `1px solid ${c.bd}`, background: c.bgP }}>
        <p style={{ fontSize: "0.73rem", color: c.tM }}>
          <a href="#" style={{ color: c.tM, textDecoration: "none", margin: "0 10px" }}>利用規約</a>
          <a href="#" style={{ color: c.tM, textDecoration: "none", margin: "0 10px" }}>プライバシーポリシー</a>
          <a href="#" style={{ color: c.tM, textDecoration: "none", margin: "0 10px" }}>特商法表示</a>
        </p>
        <p style={{ fontSize: "0.73rem", color: c.tM, marginTop: 14 }}>運営 株式会社 Nemesis Code &nbsp;|&nbsp; 東京都新宿区西新宿</p>
        <p style={{ fontSize: "0.73rem", color: c.tM, marginTop: 6 }}>© 2026 Nemesis Code Inc.</p>
      </footer>
    </div>
  );
}
