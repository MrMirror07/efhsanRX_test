// Renders the favicon and the social image from the brand mark with sharp.
import sharp from "sharp";
import { writeFileSync } from "node:fs";

const mark = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f4553"/><stop offset="1" stop-color="#0f2733"/></linearGradient></defs>
  <circle cx="24" cy="24" r="24" fill="url(#g)"/>
  <circle cx="24" cy="24" r="21.5" fill="none" stroke="#ffffff" stroke-opacity="0.12"/>
  <path d="M31.8 16.2c-1.5-2.4-4.3-3.7-7.4-3.7-4.7 0-8.2 2.8-8.2 6.6 0 4 3.3 5.6 7.8 6.8 4.2 1.1 6.8 2.4 6.8 5.6 0 3.5-3.1 5.8-7.5 5.8-3.6 0-6.7-1.7-8.3-4.5" fill="none" stroke="#fafaf8" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="34.6" cy="12.6" r="2.7" fill="#df6f96"/>
</svg>`;
writeFileSync("public/favicon.svg", mark.trim());
await sharp(Buffer.from(mark)).resize(64, 64).png().toFile("public/favicon.png");
await sharp(Buffer.from(mark)).resize(180, 180).png().toFile("public/apple-touch-icon.png");

const og = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#163544"/><stop offset="1" stop-color="#0f2733"/></linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.2" r="0.6"><stop offset="0" stop-color="#3c6f7f" stop-opacity="0.8"/><stop offset="1" stop-color="#0f2733" stop-opacity="0"/></radialGradient>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1f4553"/><stop offset="1" stop-color="#0f2733"/></linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g transform="translate(80 84) scale(1.6)">
    <circle cx="24" cy="24" r="24" fill="#fafaf8"/>
    <path d="M31.8 16.2c-1.5-2.4-4.3-3.7-7.4-3.7-4.7 0-8.2 2.8-8.2 6.6 0 4 3.3 5.6 7.8 6.8 4.2 1.1 6.8 2.4 6.8 5.6 0 3.5-3.1 5.8-7.5 5.8-3.6 0-6.7-1.7-8.3-4.5" fill="none" stroke="#0f2733" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="34.6" cy="12.6" r="2.7" fill="#df6f96"/>
  </g>
  <text x="180" y="138" font-family="Georgia, 'Times New Roman', serif" font-size="46" fill="#fafaf8">SheWell<tspan fill="#eb9db8" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="30" dy="-8">RX</tspan></text>
  <text x="80" y="330" font-family="Georgia, 'Times New Roman', serif" font-size="74" fill="#fafaf8">You know something is off.</text>
  <text x="80" y="415" font-family="Georgia, 'Times New Roman', serif" font-size="74" font-style="italic" fill="#eb9db8">We listen until we find it.</text>
  <text x="80" y="520" font-family="Helvetica, Arial, sans-serif" font-size="26" fill="#b6cdd3">Women's telehealth with a board certified ObGyn · One flat fee · New Jersey</text>
</svg>`;
await sharp(Buffer.from(og)).jpeg({ quality: 88 }).toFile("public/og-image.jpg");
console.log("brand assets written");
