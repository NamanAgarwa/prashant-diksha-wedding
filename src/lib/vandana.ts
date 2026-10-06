// Background music for the invitation.
// To use your own song: put any mp3 in the `public/audio/` folder and set
// SONG_URL to its path, e.g. "/audio/ganesh-vandana.mp3" (or any https mp3 link).
// If SONG_URL is empty or the file fails to load, a synthesised temple
// ambience (conch, bells, tanpura drone) plays instead.
export const SONG_URL = "https://swapnil-ritu.invitationmedia.in/audio/background.mp3";
export const SONG_VOLUME = 0.6;

type Player = { stop: () => void };

export function startVandana(url: string = SONG_URL): Player {
  if (url) {
    const a = new Audio(url);
    a.loop = true;
    a.volume = SONG_VOLUME;
    let fallback: Player | null = null;
    let stopped = false;
    const useSynth = () => {
      if (!stopped && !fallback) fallback = startSynth();
    };
    a.addEventListener("error", useSynth);
    a.play().catch((err: Error) => {
      if (err?.name !== "NotAllowedError") useSynth();
    });
    return {
      stop: () => {
        stopped = true;
        a.pause();
        fallback?.stop();
      },
    };
  }
  return startSynth();
}

function startSynth(): Player {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0.5;
  master.connect(ctx.destination);

  const conch = (t: number) => {
    [220, 440, 660].forEach((f, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = i ? "sine" : "sawtooth";
      o.frequency.setValueAtTime(f * 0.94, t);
      o.frequency.linearRampToValueAtTime(f, t + 0.6);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.12 / (i + 1), t + 0.5);
      g.gain.setValueAtTime(0.12 / (i + 1), t + 2.2);
      g.gain.linearRampToValueAtTime(0, t + 3.2);
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 1400;
      o.connect(lp).connect(g).connect(master);
      o.start(t);
      o.stop(t + 3.3);
    });
  };

  const bell = (t: number, f: number) => {
    [1, 2.76, 5.4].forEach((m, i) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = f * m;
      g.gain.setValueAtTime(0.18 / (i + 1), t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.5 - i);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + 3.6);
    });
  };

  // tanpura drone: Sa (C3) + Pa + upper Sa
  const drone = ctx.createGain();
  drone.gain.value = 0;
  drone.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 4);
  drone.connect(master);
  const oscs = [130.8, 196, 261.6, 130.8 * 1.003].map((f) => {
    const o = ctx.createOscillator();
    o.type = "triangle";
    o.frequency.value = f;
    o.connect(drone);
    o.start();
    return o;
  });

  const now = ctx.currentTime;
  conch(now + 0.1);
  const notes = [523, 659, 784, 587];
  let n = 0;
  bell(now + 3, 523);
  const id = window.setInterval(() => bell(ctx.currentTime, notes[n++ % notes.length] ?? 523), 2600);

  return {
    stop: () => {
      clearInterval(id);
      oscs.forEach((o) => o.stop());
      ctx.close();
    },
  };
}
