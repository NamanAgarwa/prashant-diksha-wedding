import { useEffect, useState } from "react";

export function VenueCards({ lang, dirLabel }: { lang: string; dirLabel: string }) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    // Sangeet is on 19 Nov 2026 — grey out from 20 Nov 2026 (IST)
    setPast(Date.now() >= new Date("2026-11-20T00:00:00+05:30").getTime());
  }, []);
  const hi = lang === "hi";
  const venues = [
    { key: "s", past, badge: hi ? "महिला संगीत स्थल" : "Sangeet Venue", date: hi ? "19 नवम्बर 2026 · गुरुवार" : "19 Nov 2026 · Thursday",
      name: hi ? "जय माँ दुर्गा होटल एण्ड रिसोर्ट" : "Jai Maa Durga Hotel & Resort",
      addr: hi ? "133, श्री श्याम वाटिका, बैनाड़ रोड, लोहामण्डी, जयपुर" : "133, Shri Shyam Vatika, Benad Road, Lohamandi, Jaipur",
      q: "Jai+Maa+Durga+Hotel+Lohamandi+Jaipur", color: "#7b3fa0" },
    { key: "w", past: false, badge: hi ? "विवाह स्थल" : "Wedding Venue", date: hi ? "21 नवम्बर 2026 · शनिवार" : "21 Nov 2026 · Saturday",
      name: hi ? "लक्की मैरिज गार्डन" : "Lucky Marriage Garden",
      addr: hi ? "वन तालाब रोड, आमेर, जयपुर" : "Van Talab Road, Amer, Jaipur",
      q: "Lucky+Marriage+Garden+Van+Talab+Road+Amer+Jaipur", color: "var(--wine)" },
  ];
  return (
    <div style={{ display: "grid", gap: "2rem", marginTop: "1.5rem" }}>
      {venues.map((v) => (
        <div key={v.key} style={{ border: `2px solid ${v.past ? "#bbb" : v.color}`, borderRadius: 18, padding: "1.25rem", background: "rgba(255,250,240,.85)", filter: v.past ? "grayscale(1)" : "none", opacity: v.past ? 0.55 : 1 }}>
          <div style={{ display: "inline-block", background: v.past ? "#888" : v.color, color: "#fff", padding: ".45rem 1.2rem", borderRadius: 999, fontWeight: 700, fontSize: "1.05rem", letterSpacing: hi ? 0 : ".08em", textTransform: hi ? "none" : "uppercase" }}>{v.badge}</div>
          <div style={{ marginTop: ".5rem", fontWeight: 600, color: v.past ? "#777" : v.color }}>{v.date}</div>
          {v.past && <div style={{ marginTop: ".4rem", fontWeight: 700, color: "#666" }}>{hi ? "✓ कार्यक्रम सम्पन्न" : "✓ Event completed"}</div>}
          <h3 style={{ color: v.past ? "#666" : "var(--wine)", fontSize: "1.5rem", marginTop: ".4rem" }}>{v.name}</h3>
          <p>{v.addr}</p>
          <iframe title={`${v.badge} map`} src={`https://www.google.com/maps?q=${v.q}&output=embed`} style={{ width: "100%", height: 260, border: 0, borderRadius: 14 }} loading="lazy" />
          {!v.past && <a className="btn" href={`https://maps.google.com/?q=${v.q}`} target="_blank" rel="noreferrer">{dirLabel}</a>}
        </div>
      ))}
    </div>
  );
}
