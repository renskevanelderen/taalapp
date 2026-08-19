// Genereert de app-iconen zonder externe libraries: twee halve cirkels,
// blauw voor Frans en oranje voor Spaans.
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "icons");
mkdirSync(OUT, { recursive: true });

// Licht icoon dat past bij het nieuwe design: een cirkel die half Frans
// blauw en half Spaans oranje is, op een romige achtergrond.
const BG = [250, 246, 240];
const FR = [59, 91, 219];
const ES = [226, 89, 12];

function crc32(buf) {
  let c;
  const table = [];
  for (let n = 0; n < 256; n++) {
    c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  let crc = 0xffffffff;
  for (const b of buf) crc = table[(crc ^ b) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}

function png(size) {
  const raw = Buffer.alloc(size * (size * 3 + 1));
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.40;
  const gap = size * 0.026;

  let p = 0;
  for (let y = 0; y < size; y++) {
    raw[p++] = 0; // filter type
    for (let x = 0; x < size; x++) {
      const dx = x - cx + 0.5;
      const dy = y - cy + 0.5;
      let col = BG;
      if (dx * dx + dy * dy <= r * r && Math.abs(dx) > gap) {
        col = dx < 0 ? FR : ES;
      }
      raw[p++] = col[0];
      raw[p++] = col[1];
      raw[p++] = col[2];
    }
  }

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // colour type: truecolour

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

for (const size of [180, 192, 512]) {
  writeFileSync(join(OUT, `icon-${size}.png`), png(size));
  console.log(`icons/icon-${size}.png`);
}
