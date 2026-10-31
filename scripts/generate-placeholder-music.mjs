// Generates a soft, loopable placeholder track (public/media/music.wav).
// Replace it with the client's licensed song before publishing.
import { writeFileSync } from 'node:fs';

const rate = 22050;
const seconds = 32;
const n = rate * seconds;
const out = new Float32Array(n);
const sa = 146.83; // D3

// Tanpura-style drone: Pa, Sa, Sa, Sa (low) repeating every 2 s.
const drone = [sa * 1.5, sa * 2, sa * 2, sa];
for (let beat = 0; beat < seconds * 2; beat++) {
  const f = drone[beat % 4];
  const start = Math.floor((beat / 2) * rate);
  for (let i = 0; i < rate * 2.4 && start + i < n; i++) {
    const t = i / rate;
    const env = Math.min(1, t * 30) * Math.exp(-t * 1.1);
    let s = 0;
    for (let h = 1; h <= 6; h++) s += Math.sin(2 * Math.PI * f * h * t + h) / (h * 1.4);
    out[start + i] += s * env * 0.07;
  }
}

// Plucked melody (Raag Yaman flavour), Karplus-Strong.
const ratios = { S: 1, R: 9 / 8, G: 5 / 4, M: 45 / 32, P: 3 / 2, D: 5 / 3, N: 15 / 8, S2: 2, R2: 9 / 4, G2: 5 / 2 };
const phrase = ['N', 'R2', 'G2', '', 'R2', 'S2', 'N', '', 'D', 'P', '', 'M', 'G', '', 'R', 'S', '', '',
                'G', 'M', 'D', '', 'N', 'S2', '', 'R2', 'S2', 'N', 'D', '', 'P', '', '', ''];
const step = seconds / phrase.length;
phrase.forEach((note, k) => {
  if (!note) return;
  const f = sa * 2 * ratios[note];
  const period = Math.round(rate / f);
  const buf = Float32Array.from({ length: period }, () => Math.random() * 2 - 1);
  const start = Math.floor(k * step * rate);
  let p = 0;
  for (let i = 0; i < rate * 2.5 && start + i < n; i++) {
    const next = (p + 1) % period;
    const v = 0.996 * 0.5 * (buf[p] + buf[next]);
    out[start + i] += buf[p] * 0.16 * Math.min(1, i / 40);
    buf[p] = v;
    p = next;
  }
});

// Fade edges so the loop is seamless, then write 16-bit PCM WAV.
const fade = rate * 1.5;
for (let i = 0; i < fade; i++) { out[i] *= i / fade; out[n - 1 - i] *= i / fade; }
const data = Buffer.alloc(n * 2);
for (let i = 0; i < n; i++) data.writeInt16LE(Math.max(-1, Math.min(1, out[i])) * 32767 * 0.8, i * 2);
const head = Buffer.alloc(44);
head.write('RIFF', 0); head.writeUInt32LE(36 + data.length, 4); head.write('WAVE', 8);
head.write('fmt ', 12); head.writeUInt32LE(16, 16); head.writeUInt16LE(1, 20); head.writeUInt16LE(1, 22);
head.writeUInt32LE(rate, 24); head.writeUInt32LE(rate * 2, 28); head.writeUInt16LE(2, 32); head.writeUInt16LE(16, 34);
head.write('data', 36); head.writeUInt32LE(data.length, 40);
writeFileSync(new URL('../public/media/music.wav', import.meta.url), Buffer.concat([head, data]));
console.log('wrote public/media/music.wav');
