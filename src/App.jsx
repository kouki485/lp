import { useState, useEffect, useRef } from "react";

const colors = {
  bgPrimary: "#0a0a0f",
  bgSecondary: "#12121a",
  bgCard: "#1a1a26",
  bgCardHover: "#222233",
  accent: "#e84393",
  accentGlow: "rgba(232, 67, 147, 0.3)",
  accentSoft: "rgba(232, 67, 147, 0.12)",
  gold: "#f9ca24",
  goldSoft: "rgba(249, 202, 36, 0.12)",
  textPrimary: "#f0f0f5",
  textSecondary: "#9090a8",
  textMuted: "#606078",
  border: "rgba(255, 255, 255, 0.06)",
  gradientAccent: "linear-gradient(135deg, #e84393, #fd79a8)",
};

/* ===== IMAGE CONFIG: Replace with real images after generation ===== */
const IMAGES = {
  heroMockup: null, // Set to URL string to replace CSS mockup with real image
};

const FadeIn = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`
    }}>
      {children}
    </div>
  );
};

const CTAButton = ({ href = "#waitlist", children }) => (
  <a href={href} style={{
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "18px 48px",
    background: colors.gradientAccent,
    color: "#fff",
    fontSize: "1.05rem",
    fontWeight: 700,
    border: "none",
    borderRadius: 60,
    cursor: "pointer",
    textDecoration: "none",
    boxShadow: `0 4px 30px ${colors.accentGlow}`,
    transition: "transform 0.25s, box-shadow 0.25s",
  }}
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-3px) scale(1.03)";
    e.currentTarget.style.boxShadow = `0 8px 40px ${colors.accentGlow}`;
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "none";
    e.currentTarget.style.boxShadow = `0 4px 30px ${colors.accentGlow}`;
  }}>
    {children}
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
  </a>
);

/* ===== PHONE MOCKUP ===== */
const PhoneMockup = ({ imageSrc }) => (
  <div style={{ position: "relative", width: 280, flexShrink: 0 }}>
    {/* Glow */}
    <div style={{
      position: "absolute",
      top: "10%",
      left: "50%",
      transform: "translateX(-50%)",
      width: 340,
      height: 440,
      background: `radial-gradient(ellipse, ${colors.accentGlow} 0%, transparent 70%)`,
      filter: "blur(40px)",
      pointerEvents: "none",
      zIndex: 0
    }} />
    {/* Frame */}
    <div style={{
      position: "relative",
      zIndex: 1,
      width: 280,
      borderRadius: 36,
      background: "#1a1a1a",
      padding: 8,
      boxShadow: `0 20px 80px rgba(0,0,0,0.6), 0 0 60px ${colors.accentGlow}`
    }}>
      {/* Notch */}
      <div style={{
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 120,
        height: 28,
        background: "#1a1a1a",
        borderRadius: "0 0 16px 16px",
        zIndex: 10
      }} />
      {/* Screen */}
      <div style={{
        borderRadius: 28,
        overflow: "hidden",
        background: "#fff",
        minHeight: 520,
        position: "relative"
      }}>
        {imageSrc ? (
          <img src={imageSrc} alt="ikkutok app" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <CSSMockupScreen />
        )}
      </div>
    </div>
  </div>
);

const CSSMockupScreen = () => (
  <div style={{ padding: "44px 20px 20px", fontFamily: "'Noto Sans JP', sans-serif" }}>
    {/* Status bar */}
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.65rem", color: "#999", marginBottom: 20, paddingTop: 4 }}>
      <span>9:41</span>
      <div style={{ display: "flex", gap: 4 }}>
        <div style={{ width: 16, height: 10, borderRadius: 2, background: "#ccc" }} />
        <div style={{ width: 22, height: 10, borderRadius: 2, background: "#333" }} />
      </div>
    </div>

    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div style={{ fontFamily: "Outfit, sans-serif", fontSize: "1.3rem", fontWeight: 800, background: colors.gradientAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ikkutok</div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#f0f0f4", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem" }}>👤</div>
    </div>

    {/* Revenue card */}
    <div style={{ background: "linear-gradient(135deg, #e84393, #fd79a8)", borderRadius: 16, padding: "20px 18px", marginBottom: 16, color: "#fff" }}>
      <div style={{ fontSize: "0.65rem", opacity: 0.85, marginBottom: 4 }}>今月の売上</div>
      <div style={{ fontFamily: "Outfit", fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.02em" }}>¥892,350</div>
      <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
        <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 8, padding: "4px 10px", fontSize: "0.6rem", fontWeight: 600 }}>還元率 90%</div>
        <div style={{ background: "rgba(255,255,255,0.22)", borderRadius: 8, padding: "4px 10px", fontSize: "0.6rem", fontWeight: 600 }}>翌日振込</div>
      </div>
    </div>

    {/* Chart */}
    <div style={{ marginBottom: 16 }}>
      <div style={{ fontSize: "0.7rem", color: "#888", marginBottom: 8, fontWeight: 500 }}>売上推移</div>
      <svg width="100%" height="80" viewBox="0 0 240 80">
        <defs>
          <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e84393" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#e84393" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <path d="M0 70 Q30 65 50 55 T100 40 T150 30 T200 18 T240 8 L240 80 L0 80Z" fill="url(#cg)" />
        <path d="M0 70 Q30 65 50 55 T100 40 T150 30 T200 18 T240 8" fill="none" stroke="#e84393" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>

    {/* Payout */}
    <div style={{ background: "#f8f8fc", borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
      <div>
        <div style={{ fontSize: "0.65rem", color: "#999", marginBottom: 2 }}>次回振込</div>
        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#222" }}>明日 (3/6)</div>
      </div>
      <div style={{ background: "#e8f5e9", color: "#2e7d32", fontSize: "0.6rem", fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>処理中</div>
    </div>

    {/* Transactions */}
    <div style={{ fontSize: "0.65rem", color: "#999", marginBottom: 8, fontWeight: 500 }}>最近の取引</div>
    {[
      { name: "プラン加入", amount: "+¥4,980", time: "2分前" },
      { name: "単品購入", amount: "+¥1,500", time: "18分前" },
      { name: "プラン加入", amount: "+¥4,980", time: "1時間前" },
    ].map((tx, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i < 2 ? "1px solid #f0f0f4" : "none" }}>
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, color: "#333" }}>{tx.name}</div>
          <div style={{ fontSize: "0.6rem", color: "#bbb" }}>{tx.time}</div>
        </div>
        <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "#e84393" }}>{tx.amount}</div>
      </div>
    ))}
  </div>
);

const FAQItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: colors.bgCard, border: `1px solid ${colors.border}`, borderRadius: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        gap: 14,
        cursor: "pointer",
        transition: "background 0.2s"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = colors.bgCardHover)}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
        <span style={{ width: 28, height: 28, borderRadius: 6, background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.8rem", color: colors.accent, flexShrink: 0 }}>Q</span>
        <span style={{ flex: 1, fontSize: "0.95rem", fontWeight: 500 }}>{q}</span>
        <span style={{ fontSize: "1.2rem", color: colors.textMuted, transition: "transform 0.3s", transform: open ? "rotate(45deg)" : "none", flexShrink: 0 }}>+</span>
      </div>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: "hidden",
        transition: "max-height 0.4s ease, padding 0.4s ease",
        padding: open ? "0 24px 20px 66px" : "0 24px 0 66px"
      }}>
        <p style={{ fontSize: "0.9rem", color: colors.textSecondary, lineHeight: 1.8 }}>{a}</p>
      </div>
    </div>
  );
};

export default function IkkutokLP() {
  return (
    <div style={{
      fontFamily: "'Noto Sans JP', sans-serif",
      background: colors.bgPrimary,
      color: colors.textPrimary,
      WebkitFontSmoothing: "antialiased",
      overflowX: "hidden",
      minHeight: "100vh"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700;900&family=Outfit:wght@300;400;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ===== HERO ===== */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "60px 24px",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          top: "-20%",
          left: "30%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: 0.4
        }} />

        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 56,
          maxWidth: 1050,
          width: "100%",
          position: "relative",
          zIndex: 1,
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {/* Left text */}
          <div style={{ flex: "1 1 380px", minWidth: 280 }}>
            <FadeIn>
              <div style={{
                fontFamily: "Outfit, sans-serif",
                fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                background: colors.gradientAccent,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                marginBottom: 8
              }}>ikkutok</div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p style={{ fontSize: "0.8rem", color: colors.textSecondary, fontWeight: 300, letterSpacing: "0.12em", marginBottom: 36 }}>CREATOR PLATFORM — COMING JUNE 2026</p>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 style={{ fontSize: "clamp(1.3rem, 3.5vw, 2rem)", fontWeight: 700, lineHeight: 1.65, marginBottom: 20 }}>
                売上の<span style={{ background: colors.gradientAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>90%</span>があなたのもの。<br />
                しかも<span style={{ background: colors.gradientAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>翌日</span>振込。
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p style={{ fontSize: "0.92rem", color: colors.textSecondary, lineHeight: 1.85, marginBottom: 40, maxWidth: 440 }}>
                クリエイターの収益を最大化する次世代ファンクラブプラットフォーム。事前登録受付中。
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <CTAButton>事前登録する（無料）</CTAButton>
            </FadeIn>
          </div>

          {/* Right phone */}
          <FadeIn delay={0.3} style={{ flex: "0 0 auto" }}>
            <PhoneMockup imageSrc={IMAGES.heroMockup} />
          </FadeIn>
        </div>
      </section>

      {/* ===== BENEFITS ===== */}
      <section style={{ background: colors.bgSecondary, padding: "100px 24px" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>Benefits</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, lineHeight: 1.4, marginBottom: 52 }}>ikkutokが選ばれる4つの理由</h2>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
            {/* Card 1 */}
            <FadeIn delay={0.05} style={{
              gridColumn: "1 / -1",
              background: `linear-gradient(135deg, ${colors.accentSoft}, rgba(253,121,168,0.04))`,
              border: `1px solid rgba(232,67,147,0.15)`,
              borderRadius: 16,
              padding: "40px 32px",
              position: "relative",
              overflow: "hidden"
            }}>
              <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "4rem", fontWeight: 900, background: "linear-gradient(180deg, rgba(255,255,255,0.07), transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>01</span>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: colors.accentSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22, fontSize: "1.4rem" }}>💰</div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 10 }}>業界最高水準の還元率 90%</h3>
              <p style={{ fontSize: "0.9rem", color: colors.textSecondary, lineHeight: 1.8, marginBottom: 28 }}>手数料はわずか10%。あなたが稼いだ売上の90%をそのまま受け取れます。</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {[{ label: "ikkutok", pct: "90%", w: "90%", on: true }, { label: "他社平均", pct: "78〜83%", w: "80%", on: false }].map((b) => (
                  <div key={b.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ width: 80, fontSize: "0.8rem", color: colors.textSecondary, textAlign: "right", flexShrink: 0 }}>{b.label}</span>
                    <div style={{ flex: 1, height: 34, background: "rgba(255,255,255,0.03)", borderRadius: 8, overflow: "hidden" }}>
                      <div style={{
                        width: b.w,
                        height: "100%",
                        borderRadius: 8,
                        background: b.on ? colors.gradientAccent : "rgba(255,255,255,0.08)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingRight: 12,
                        fontFamily: "Outfit",
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: b.on ? "#fff" : colors.textSecondary
                      }}>{b.pct}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 36, flexWrap: "wrap" }}>
                {[{ v: "+7.5万円", l: "月100万売上時の差額" }, { v: "+90万円", l: "年間の手取り増加額" }].map((s) => (
                  <div key={s.l} style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "Outfit", fontSize: "clamp(2rem, 5vw, 2.8rem)", fontWeight: 900, background: colors.gradientAccent, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.v}</div>
                    <div style={{ fontSize: "0.8rem", color: colors.textSecondary, marginTop: 4 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </FadeIn>

            {[
              { n: "02", icon: "⚡", iconBg: colors.goldSoft, title: "翌日出金", desc: "売上が翌日にはあなたの口座に。月末まで待つ必要はもうありません。" },
              { n: "03", icon: "🤝", iconBg: colors.accentSoft, title: "専任サポート", desc: "LINEでの個別サポート。始め方から売上アップまで全面バックアップ。" },
            ].map((c, i) => (
              <FadeIn key={c.n} delay={0.1 + i * 0.05} style={{
                background: colors.bgCard,
                border: `1px solid ${colors.border}`,
                borderRadius: 16,
                padding: "36px 28px",
                position: "relative",
                overflow: "hidden"
              }}>
                <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "3.5rem", fontWeight: 900, background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{c.n}</span>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: c.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.4rem" }}>{c.icon}</div>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 10 }}>{c.title}</h3>
                <p style={{ fontSize: "0.88rem", color: colors.textSecondary, lineHeight: 1.8 }}>{c.desc}</p>
              </FadeIn>
            ))}

            <FadeIn delay={0.15} style={{
              gridColumn: "1 / -1",
              background: colors.bgCard,
              border: `1px solid ${colors.border}`,
              borderRadius: 16,
              padding: "36px 28px",
              position: "relative",
              overflow: "hidden"
            }}>
              <span style={{ position: "absolute", top: 12, right: 20, fontFamily: "Outfit", fontSize: "3.5rem", fontWeight: 900, background: "linear-gradient(180deg, rgba(255,255,255,0.06), transparent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>04</span>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: colors.goldSoft, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: "1.4rem" }}>🔓</div>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: 10 }}>縛りなし・併用OK</h3>
              <p style={{ fontSize: "0.88rem", color: colors.textSecondary, lineHeight: 1.8 }}>独占契約は不要。他プラットフォームとの併用も自由。ikkutokに投稿するだけで手取りが増えます。</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section style={{ padding: "100px 24px", background: colors.bgPrimary }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>How it works</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, marginBottom: 52 }}>事前登録から活動開始まで</h2>
          </FadeIn>

          <div style={{ position: "relative", paddingLeft: 52 }}>
            <div style={{ position: "absolute", left: 19, top: 28, bottom: 28, width: 2, background: `linear-gradient(180deg, ${colors.accent}, rgba(232,67,147,0.1))` }} />
            {[
              { n: "1", t: "事前登録（今すぐ・無料）", d: "フォームからメールアドレスとSNSアカウントを登録。30秒で完了。" },
              { n: "2", t: "優先案内の受信", d: "ローンチ日確定時に優先案内。一般公開前にアカウント開設可能。" },
              { n: "3", t: "コンテンツ投稿・収益化スタート", d: "ファンクラブ作成 → コンテンツ投稿 → 翌日には売上振込。" },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 0.1} style={{ display: "flex", gap: 24, alignItems: "flex-start", padding: "22px 0", position: "relative" }}>
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: colors.bgCard,
                  border: `2px solid ${colors.accent}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Outfit",
                  fontWeight: 800,
                  fontSize: "1rem",
                  color: colors.accent,
                  flexShrink: 0,
                  position: "absolute",
                  left: -52,
                  zIndex: 1
                }}>{s.n}</div>
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 6 }}>{s.t}</h3>
                  <p style={{ fontSize: "0.88rem", color: colors.textSecondary, lineHeight: 1.7 }}>{s.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section style={{ padding: "100px 24px", background: colors.bgSecondary }}>
        <div style={{ maxWidth: 750, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>FAQ</p>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", fontWeight: 700, marginBottom: 48 }}>よくある質問</h2>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { q: "他のプラットフォームと併用できますか？", a: "はい。独占契約は不要。myfans、Fantia、candfans等と並行してご活用いただけます。" },
              { q: "手数料90%還元は本当ですか？", a: "はい。プラットフォーム手数料は売上の10%のみ。初期費用・月額費用は一切かかりません。" },
              { q: "事前登録に費用はかかりますか？", a: "完全無料です。ローンチまで費用は一切発生しません。" },
              { q: "風営法の届出は必要ですか？", a: "アダルトコンテンツ配信の場合は届出が必要です。届出のご相談もサポートいたします。" },
              { q: "ローンチはいつ頃ですか？", a: "2026年6月予定。確定次第、事前登録者へ優先的にご連絡します。" },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 0.05}><FAQItem q={item.q} a={item.a} /></FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section id="waitlist" style={{
        padding: "120px 24px",
        background: colors.bgPrimary,
        textAlign: "center",
        position: "relative",
        overflow: "hidden"
      }}>
        <div style={{
          position: "absolute",
          bottom: -200,
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          background: `radial-gradient(circle, ${colors.accentGlow} 0%, transparent 70%)`,
          pointerEvents: "none",
          opacity: 0.5
        }} />

        <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <FadeIn>
            <p style={{ fontFamily: "Outfit", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: colors.accent, marginBottom: 16 }}>Waitlist</p>
            <h2 style={{ fontSize: "clamp(1.3rem, 3.5vw, 1.9rem)", fontWeight: 700, lineHeight: 1.6, marginBottom: 16 }}>
              あなたの作品に、<br />最大限の対価を。
            </h2>
            <p style={{ fontSize: "0.92rem", color: colors.textSecondary, marginBottom: 40, lineHeight: 1.8 }}>
              事前登録で、ローンチ時の優先案内と<br />初期クリエイター限定の特別条件をお届けします。
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <CTAButton href="#">事前登録する（無料）</CTAButton>
            <p style={{ fontSize: "0.76rem", color: colors.textMuted, marginTop: 24 }}>※ 登録は無料です。ローンチ前に解除も可能です。</p>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: "36px 24px", textAlign: "center", borderTop: `1px solid ${colors.border}` }}>
        <p style={{ fontSize: "0.73rem", color: colors.textMuted }}>
          <a href="#" style={{ color: colors.textMuted, textDecoration: "none", margin: "0 10px" }}>利用規約</a>
          <a href="#" style={{ color: colors.textMuted, textDecoration: "none", margin: "0 10px" }}>プライバシーポリシー</a>
          <a href="#" style={{ color: colors.textMuted, textDecoration: "none", margin: "0 10px" }}>特商法表示</a>
        </p>
        <p style={{ fontSize: "0.73rem", color: colors.textMuted, marginTop: 14 }}>運営 株式会社 Nemesis Code &nbsp;|&nbsp; 東京都新宿区西新宿</p>
        <p style={{ fontSize: "0.73rem", color: colors.textMuted, marginTop: 6 }}>© 2026 Nemesis Code Inc.</p>
      </footer>
    </div>
  );
}
