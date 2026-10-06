import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import "@/styles/invite.css";
import { startVandana } from "@/lib/vandana";
import ganesh from "@/assets/ganesh.png.asset.json";
import welcomeBg from "@/assets/welcome-bg.png.asset.json";
import weddingBg from "@/assets/wedding-bg.png.asset.json";
import shivaParvati from "@/assets/shiva-parvati.png.asset.json";
import sangeetBg from "@/assets/sangeet-bg.png.asset.json";
import haldiBg from "@/assets/haldi-bg.png.asset.json";
import petal from "@/assets/petal.png.asset.json";
import daisy from "@/assets/daisy.png.asset.json";
import couple from "@/assets/couple.png.asset.json";
import mehndiCouple from "@/assets/mehndi-couple.png.asset.json";
import sangeetCouple from "@/assets/sangeet-couple.png.asset.json";
import envBg from "@/assets/envelope-bg.png.asset.json";
import maroonEnv from "@/assets/maroon-envelope.png.asset.json";
import couplePhoto from "@/assets/couple-photo.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "शुभ विवाह | प्रशान्त संग झनक | 21 नवम्बर 2026" },
      { name: "description", content: "Prashant weds Jhanak (Diksha) — 21 November 2026, Jaipur. प्रशान्त संग झनक का शुभ विवाह निमंत्रण।" },
      { property: "og:title", content: "शुभ विवाह | Prashant weds Jhanak" },
      { property: "og:description", content: "21 नवम्बर 2026, जयपुर — आप सादर आमंत्रित हैं।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Amita:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Marcellus+SC&family=Pinyon+Script&family=Tiro+Devanagari+Hindi&display=swap",
      },
    ],
  }),
  component: Invite,
});

type Lang = "hi" | "en";
const WEDDING = new Date("2026-11-21T11:15:00+05:30").getTime();

const T = {
  invited: { hi: "आप आमंत्रित हैं", en: "You're Invited" },
  tap: { hi: "निमंत्रण खोलने के लिए लिफ़ाफ़े को छुएँ", en: "Tap the envelope to open our invitation" },
  om: { hi: "॥ श्री गणेशाय नमः ॥", en: "|| Om Shree Ganeshaya Namah ||" },
  request: {
    hi: "परमपिता परमेश्वर की असीम अनुकम्पा से, हमारे परिवार के मांगलिक परिणयोत्सव पर आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है",
    en: "We request the honour of your gracious presence on the auspicious occasion of the wedding celebration of",
  },
  groom: { hi: "प्रशान्त", en: "Prashant" },
  bride: { hi: "झनक", en: "Jhanak" },
  groomPar: { hi: "सुपुत्र श्रीमती सुधा देवी एवं श्री श्रवण दाधीच", en: "S/o Mrs. Sudha Devi & Mr. Shravan Dadhich" },
  groomGp: { hi: "सुपौत्र स्व. श्रीमती गीता देवी एवं श्री रामेश्वर लाल दाधीच", en: "Grandson of Late Mrs. Geeta Devi & Mr. Rameshwar Lal Dadhich" },
  bridePar: { hi: "सुपुत्री श्रीमती राधा देवी एवं श्री शिवराज जी दाधीच", en: "D/o Mrs. Radha Devi & Mr. Shivraj Ji Dadhich" },
  brideGp: { hi: "अचरोल, जयपुर", en: "Achrol, Jaipur" },
  weds: { hi: "संग", en: "weds" },
  save: { hi: "तारीख़ याद रखें", en: "Save the Date" },
  date: { hi: "शनिवार, 21 नवम्बर 2026", en: "Saturday, 21st November 2026" },
  units: { hi: ["दिन", "घंटे", "मिनट", "सेकंड"], en: ["Days", "Hours", "Minutes", "Seconds"] },
  events: { hi: "मुख्य आयोजन", en: "Events Schedule" },
  celebrate: { hi: "हमारे साथ जश्न मनाएँ", en: "Celebrate with us" },
  program: { hi: "वैवाहिक कार्यक्रम", en: "Wedding Programme" },
  venue: { hi: "कार्यक्रम स्थल", en: "Venue" },
  directions: { hi: "रास्ता देखें", en: "Get Directions" },
  call: { hi: "फ़ोन करें", en: "Call" },
  padharo: { hi: "पधारो सा!", en: "Padharo Sa!" },
  family: { hi: "बोरायड़ा परिवार आपका हार्दिक अभिनन्दन करता है।", en: "The Boraida family warmly welcomes you." },
};

const WARDROBE = [
  { color: "#c07a00", hi: ["हल्दी", "पीली रंगत", "पीले रंग के आरामदायक उत्सवी परिधान।"], en: ["Haldi", "Sunshine Shades", "Comfortable festive wear in cheerful shades of yellow."] },
  { color: "#1f6b4a", hi: ["मेहन्दी", "हरियाली", "हरे रंग के साथ उत्सवी झलक।"], en: ["Mehndi", "Henna Hues", "Vibrant greens with festive accents."] },
  { color: "#4a2a78", hi: ["महिला संगीत", "चमक-दमक", "इंडो-वेस्टर्न परिधान और थोड़ी सी चमक।"], en: ["Sangeet", "Glitz & Glam", "Elegant Indo-Western looks with a touch of sparkle."] },
  { color: "#7a1426", hi: ["शुभ विवाह", "शाही रंग", "साड़ी, लहंगा, शेरवानी — राजसी रंगों में।"], en: ["Wedding", "Royal Wedding Hues", "Sarees, lehengas, sherwanis in rich, regal tones."] },
];

type Row = [string, string, string, string];
const EVENTS: { bg: string; img: string | null; color: string; tag: string; name: { hi: string; en: string }; line: { hi: string; en: string }; when: { hi: string; en: string }; list: Row[] }[] = [
  { bg: welcomeBg.url, img: ganesh.url, color: "#a3162e", tag: "#ShubhAarambh", name: { hi: "गणेश निमंत्रण", en: "Ganesh Nimantran" }, line: { hi: "प्रथम पूज्य श्री गणेश को प्रथम निमंत्रण", en: "The first invitation to Lord Ganesha." }, when: { hi: "बुधवार, 18 नवम्बर 2026", en: "Wednesday, 18th Nov 2026" }, list: [["पीला चावल · गणेश निमंत्रण", "Peela Chawal · Ganesh Nimantran", "प्रातः 11:15", "11:15 AM"]] },
  { bg: sangeetBg.url, img: sangeetCouple.url, color: "#4a2a78", tag: "#YeShaamShandaar", name: { hi: "महिला संगीत", en: "Sangeet Celebration" }, line: { hi: "ढोलक की थाप, गीतों की बरसात", en: "Where melodies meet memories and hearts dance with joy." }, when: { hi: "गुरुवार, 19 नवम्बर 2026", en: "Thursday, 19th Nov 2026" }, list: [["जनेऊ", "Janeu", "प्रातः 8:15", "8:15 AM"], ["मायरा", "Mayra", "प्रातः 10:30", "10:30 AM"], ["चाक", "Chaak", "दोपहर 1:15", "1:15 PM"], ["तिलक", "Tilak", "दोपहर 4:00", "4:00 PM"], ["महिला संगीत", "Mahila Sangeet", "सायं 6:15", "6:15 PM"], ["प्रीतिभोज", "Dinner", "सायं 7:15", "7:15 PM"]] },
  { bg: welcomeBg.url, img: mehndiCouple.url, color: "#1f6b4a", tag: "#MehndiHaiRachneWali", name: { hi: "मेहन्दी", en: "Mehndi Ceremony" }, line: { hi: "रचेगी मेहन्दी, सजेगी महफ़िल", en: "Vibrant hues, joyful moments and the fragrance of henna." }, when: { hi: "शुक्रवार, 20 नवम्बर 2026 · प्रातः", en: "Friday, 20th Nov 2026 · Morning" }, list: [["बान सांकड़ी", "Baan Sankadi", "प्रातः 8:15", "8:15 AM"], ["मेहन्दी", "Mehndi", "प्रातः 9:15", "9:15 AM"]] },
  { bg: haldiBg.url, img: null, color: "#b0560a", tag: "#HaldiKiRangat", name: { hi: "हल्दी", en: "Haldi Ceremony" }, line: { hi: "हल्दी की रंगत, खुशियों की सौगात", en: "Filled with love, laughter and turmeric." }, when: { hi: "शुक्रवार, 20 नवम्बर 2026 · सायं", en: "Friday, 20th Nov 2026 · Evening" }, list: [["हल्दी", "Haldi", "सायं 5:15", "5:15 PM"]] },
  { bg: weddingBg.url, img: couple.url, color: "#7a1426", tag: "#PrashantKiJhanak", name: { hi: "शुभ विवाह", en: "Wedding Ceremony" }, line: { hi: "सात फेरे, सात वचन, एक नया जीवन", en: "Two hearts, two families and two journeys become one." }, when: { hi: "शनिवार, 21 नवम्बर 2026", en: "Saturday, 21st Nov 2026" }, list: [["निकासी", "Nikasi", "प्रातः 11:15", "11:15 AM"], ["बारात प्रस्थान", "Baraat Departure", "दोपहर 12:15", "12:15 PM"]] },
];

function Petals() {
  const [items, setItems] = useState<{ l: number; d: number; t: number; s: number; img: string }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 18 }, (_, i) => ({ l: Math.random() * 100, d: 9 + Math.random() * 8, t: Math.random() * 10, s: 14 + Math.random() * 14, img: i % 2 ? petal.url : daisy.url })));
  }, []);
  return (
    <div className="petals" aria-hidden>
      {items.map((p, i) => (
        <img key={i} src={p.img} alt="" style={{ left: `${p.l}%`, width: p.s, animationDuration: `${p.d}s`, animationDelay: `${p.t}s` }} />
      ))}
    </div>
  );
}

function Bells() {
  const spots = [{ left: "5%", h: 170, d: 0 }, { left: "13%", h: 110, d: 0.6 }, { right: "13%", h: 110, d: 0.3 }, { right: "5%", h: 190, d: 0.9 }];
  return (
    <>
      {spots.map((s, i) => (
        <div key={i} className="bell" style={{ left: s.left, right: s.right, animationDelay: `${s.d}s` }} aria-hidden>
          <i style={{ height: s.h }} />
          <b />
        </div>
      ))}
    </>
  );
}

function Countdown({ lang }: { lang: Lang }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = now ? Math.max(0, WEDDING - now) : 0;
  const vals = [Math.floor(diff / 864e5), Math.floor(diff / 36e5) % 24, Math.floor(diff / 6e4) % 60, Math.floor(diff / 1e3) % 60];
  return (
    <div className="count">
      {vals.map((v, i) => (
        <div key={i}><b>{now ? String(v).padStart(2, "0") : "--"}</b>{T.units[lang][i]}</div>
      ))}
    </div>
  );
}

function Invite() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("hi");
  const [sound, setSound] = useState(false);
  const player = useRef<{ stop: () => void } | null>(null);
  const t = (k: keyof typeof T) => (T[k] as Record<Lang, string>)[lang];

  const toggleSound = (on: boolean) => {
    player.current?.stop();
    player.current = on ? startVandana() : null;
    setSound(on);
  };

  useEffect(() => () => player.current?.stop(), []);

  useEffect(() => {
    if (!open) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [open, lang]);

  return (
    <div className="inv" lang={lang}>
      <Petals />
      {open && <Bells />}

      <div className="bar">
        <button onClick={() => setLang(lang === "hi" ? "en" : "hi")} aria-label="Switch language">{lang === "hi" ? "EN" : "हिं"}</button>
        {open && <button onClick={() => toggleSound(!sound)} aria-label={sound ? "Mute" : "Play sound"}>{sound ? "🔊" : "🔇"}</button>}
      </div>

      <div className={`env ${open ? "gone" : ""}`} style={{ backgroundImage: `url(${envBg.url})` }}>
        <img className="g" src={ganesh.url} alt="Shri Ganesh" />
        <button className="envbtn" aria-label="Open invitation" onClick={() => { setOpen(true); toggleSound(true); }}>
          <img src={maroonEnv.url} alt="Invitation envelope" />
          <span className="seal">P&amp;J</span>
        </button>
        <h1>{t("invited")}</h1>
        <button className="openbtn" onClick={() => { setOpen(true); toggleSound(true); }}>{lang === "hi" ? "निमंत्रण खोलें" : "Click to Open"}</button>
        <p>{t("tap")}</p>
      </div>

      {/* Ganesh vandana card */}
      <div className="stage">
        <div className="card" style={{ backgroundImage: `url(${welcomeBg.url})` }}>
          <img src={ganesh.url} alt="Shri Ganesh" style={{ width: 90 }} />
          <div className="pill cap">{t("om")}</div>
          <div className="shloka">
            <p>विघ्न हरण मंगल करण, गणनायक गणराज।</p>
            <p>प्रथम निमंत्रण आपको, सकल सुधारो काज॥</p>
            <small>Vighna haran mangal karan, gannayak ganraj · Pratham nimantran aapko, sakal sudharo kaaj</small>
          </div>
          <p className="par" style={{ maxWidth: 440, margin: "1rem auto" }}>{t("request")}</p>
          <div className="name">{t("groom")}</div>
          <p className="par">{t("groomPar")}<em>{t("groomGp")}</em></p>
          <div className="script" style={{ fontSize: "2rem", color: "#a3162e" }}>{t("weds")}</div>
          <div className="name">{t("bride")} <span style={{ fontSize: "40%" }}>{lang === "hi" ? "(दिक्षा)" : "(Diksha)"}</span></div>
          <p className="par">{t("bridePar")}<em>{t("brideGp")}</em></p>
          <img src={shivaParvati.url} alt="Shiv Parvati" style={{ width: "min(240px,60%)", marginTop: "1.5rem" }} />
        </div>
      </div>

      <section className="sec">
        <div className="photo reveal"><img src={couplePhoto.url} alt="Prashant & Jhanak" loading="lazy" /></div>
        <div className="script" style={{ fontSize: "2rem", color: "#a3162e", margin: ".8rem 0 2rem" }}>{lang === "hi" ? "प्रशान्त & झनक" : "Prashant & Jhanak"}</div>
        <h2 className="title reveal" style={{ fontSize: "1.4rem" }}>{t("save")}</h2>
        <div className="box reveal">
          <div className="sub">{t("save")}</div>
          <div className="cap" style={{ fontSize: "1.3rem", marginTop: ".4rem" }}>{t("date")}</div>
        </div>
        <div className="reveal"><Countdown lang={lang} /></div>
      </section>

      <section className="sec">
        <h2 className="title reveal">{t("events")}</h2>
        <div className="sub" style={{ marginBottom: "2.5rem" }}>{t("celebrate")}</div>
        {EVENTS.map((e) => (
          <div key={e.tag} className="evcard reveal" style={{ backgroundImage: `url(${e.bg})`, color: e.color }}>
            <div className="glass">
              <div className="mono">P&amp;J</div>
              <div className="tag">{e.tag}</div>
              <p style={{ fontStyle: "italic", margin: ".3rem 0", color: "var(--ink)" }}>{e.line[lang]}</p>
              <h3 className="cap" style={{ color: e.color, fontSize: "1.6rem", marginTop: ".6rem" }}>{e.name[lang]}</h3>
              <span className="chip">{e.when[lang]}</span>
              <ul className="mini">{e.list.map((r) => <li key={r[1]}><span>✦ {lang === "hi" ? r[0] : r[1]}</span><b>{lang === "hi" ? r[2] : r[3]}</b></li>)}</ul>
            </div>
            {e.img ? <img className="ill" src={e.img} alt="" /> : <div style={{ height: 160 }} />}
          </div>
        ))}
      </section>

      <section className="sec">
        <div className="reveal" style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 className="title">{t("venue")}</h2>
          <h3 style={{ color: "var(--wine)", fontSize: "1.5rem", marginTop: "1rem" }}>{lang === "hi" ? "जय माँ दुर्गा होटल एण्ड रिसोर्ट" : "Jai Maa Durga Hotel & Resort"}</h3>
          <p>{lang === "hi" ? "133, श्री श्याम वाटिका, बैनाड़ रोड, लोहामण्डी, जयपुर" : "133, Shri Shyam Vatika, Benad Road, Lohamandi, Jaipur"}</p>
          <iframe title="Map" src="https://www.google.com/maps?q=Jai+Maa+Durga+Hotel+Lohamandi+Jaipur&output=embed" style={{ width: "100%", height: 300, border: 0, borderRadius: 14 }} loading="lazy" />
          <a className="btn" href="https://maps.google.com/?q=Jai+Maa+Durga+Hotel+Lohamandi+Jaipur" target="_blank" rel="noreferrer">{t("directions")}</a>
          <p style={{ marginTop: "1.5rem" }}>{lang === "hi" ? "विवाह स्थल: लक्की मैरिज गार्डन, वन तालाब रोड, आमेर · बारात प्रस्थान दोपहर 12:15" : "Wedding venue: Lucky Marriage Garden, Van Talab Road, Amer · Baraat departs 12:15 PM"}</p>
        </div>
      </section>

      <section className="sec">
        <h2 className="title reveal">{lang === "hi" ? "परिधान मार्गदर्शिका" : "Wardrobe Guide"}</h2>
        <div className="wardrobe">
          {WARDROBE.map((w) => (
            <div key={w.en[0]} className="wcard reveal" style={{ color: w.color }}>
              <div className="wdot" style={{ background: w.color }} />
              <div>
                <div className="cap" style={{ color: w.color, fontSize: ".85rem" }}>{w[lang][0]}</div>
                <div className="script" style={{ fontSize: "1.6rem" }}>{w[lang][1]}</div>
                <p style={{ color: "var(--ink)", margin: 0, fontSize: ".95rem" }}>{w[lang][2]}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="reveal">
          <div className="name" style={{ fontSize: "clamp(2.2rem,7vw,3.4rem)", color: "var(--wine)" }}>{lang === "hi" ? "आपकी गरिमामयी उपस्थिति की प्रतीक्षा" : "Awaiting Your Noble Presence"}</div>
          <p style={{ fontStyle: "italic", maxWidth: 440, margin: "1rem auto" }}>{t("family")}</p>
          <p className="sub">{lang === "hi" ? "उत्तराकांक्षी" : "Lovingly invited by"}</p>
          <div className="name" style={{ fontSize: "2.2rem" }}>{lang === "hi" ? "श्रवण प्रशांत दाधीच" : "Shravan Prashant Dadhich"}</div>
          <a className="btn" href="tel:8619668616">{t("call")}</a>
          <a className="btn" href="https://wa.me/918619668616" target="_blank" rel="noreferrer">WhatsApp</a>
        </div>
      </section>

      <footer className="foot">
        <p className="sub" style={{ color: "var(--gold-l)" }}>{lang === "hi" ? "सप्रेम" : "With love"}</p>
        <div className="name" style={{ color: "var(--gold-l)", fontSize: "clamp(2.6rem,8vw,4rem)" }}>{lang === "hi" ? "प्रशान्त & झनक" : "Prashant & Jhanak"}</div>
        <p style={{ fontSize: "1.6rem", margin: ".5rem 0" }}>❤️</p>
        <p style={{ fontStyle: "italic" }}>{lang === "hi" ? "19 – 21 नवम्बर 2026" : "19th – 21st November 2026"}</p>
        <p className="cap" style={{ color: "var(--gold-l)", fontSize: ".8rem" }}>{t("padharo")}</p>
      </footer>
    </div>
  );
}
