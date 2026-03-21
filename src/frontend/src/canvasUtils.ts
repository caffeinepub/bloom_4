/**
 * Parses an encoded message string that may contain TO/FROM/MSG sections.
 * Format: "TO:name||FROM:name||MSG:body" or plain message.
 */
export function parseMessage(raw: string): {
  to: string;
  from: string;
  body: string;
} {
  if (raw.includes("||MSG:")) {
    const toPart = raw.match(/^TO:(.*?)\|\|FROM:/);
    const fromPart = raw.match(/\|\|FROM:(.*?)\|\|MSG:/);
    const msgPart = raw.match(/\|\|MSG:([\s\S]*)$/);
    return {
      to: toPart?.[1]?.trim() ?? "",
      from: fromPart?.[1]?.trim() ?? "",
      body: msgPart?.[1]?.trim() ?? raw,
    };
  }
  return { to: "", from: "", body: raw };
}

/**
 * Renders a bouquet image with an overlaid message card onto an offscreen canvas
 * and returns a JPEG data URL.
 *
 * Canvas is Ultra HD 2400×3200 (3:4 portrait).
 * Message card is positioned at bottom-right, slightly overlapping the bouquet wrap.
 * The bouquet image is always drawn using contain-fit logic — NEVER stretched or cropped.
 */
export async function renderBouquetWithCard(
  imageUrl: string,
  message: string,
  addWatermark = false,
  msgFont = "Cormorant Garamond",
  msgColor = "#3b2a1a",
): Promise<string> {
  await Promise.all([
    document.fonts.load('600 22px "Dancing Script"'),
    document.fonts.load('400 20px "Dancing Script"'),
  ]);

  // Ultra HD 3x canvas — 2400×3200 (exact 3:4)
  const CANVAS_W = 2400;
  const CANVAS_H = 3200;

  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_W;
  canvas.height = CANVAS_H;
  const ctx = canvas.getContext("2d")!;

  // Warm beige background
  ctx.fillStyle = "#f5efe6";
  ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const srcW = img.naturalWidth || img.width;
      const srcH = img.naturalHeight || img.height;

      // Contain-fit: scale to fill canvas while preserving aspect ratio
      const scaleByH = CANVAS_H / srcH;
      const scaleByW = CANVAS_W / srcW;
      const scale = Math.min(scaleByH, scaleByW);

      const drawW = srcW * scale;
      const drawH = srcH * scale;
      const drawX = (CANVAS_W - drawW) / 2;
      const drawY = (CANVAS_H - drawH) / 2;

      ctx.drawImage(img, drawX, drawY, drawW, drawH);
      resolve();
    };
    img.onerror = reject;
    img.src = imageUrl;
  });

  const { to, from, body } = parseMessage(message);

  // ── Message card: bottom-right, slightly overlapping the bouquet wrap ──
  // Positioned so card overlaps the kraft paper wrap area (lower ~30% of image)
  const cardW = 720;
  const cardH = 580;
  const cardX = CANVAS_W - cardW - 60; // 60px from right edge
  const cardY = CANVAS_H - cardH - 140; // sits in wrap area, slightly up from bottom

  const cardCX = cardX + cardW / 2;
  const cardCY = cardY + cardH / 2;

  ctx.save();
  ctx.translate(cardCX, cardCY);
  ctx.rotate(0.03); // very slight tilt for elegance

  // Shadow
  ctx.shadowBlur = 48;
  ctx.shadowColor = "rgba(0,0,0,0.22)";
  ctx.shadowOffsetX = 6;
  ctx.shadowOffsetY = 10;

  // Cream card background
  ctx.fillStyle = "rgba(255, 250, 240, 0.97)";
  ctx.beginPath();
  const rx = -cardW / 2;
  const ry = -cardH / 2;
  ctx.roundRect(rx, ry, cardW, cardH, 20);
  ctx.fill();

  // Clear shadow
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Gold border
  ctx.strokeStyle = "rgba(184, 154, 106, 0.5)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.roundRect(rx, ry, cardW, cardH, 20);
  ctx.stroke();

  // "Bloom" header
  ctx.fillStyle = "#B89A6A";
  ctx.font = '600 52px "Dancing Script", cursive';
  ctx.textAlign = "center";
  ctx.fillText("Bloom", 0, ry + 68);

  // Divider
  ctx.strokeStyle = "rgba(184, 154, 106, 0.35)";
  ctx.lineWidth = 1.8;
  ctx.beginPath();
  ctx.moveTo(rx + 48, ry + 96);
  ctx.lineTo(rx + cardW - 48, ry + 96);
  ctx.stroke();

  let currentY = ry + 140;

  // "To:" line
  if (to) {
    ctx.fillStyle = "#B89A6A";
    ctx.font = 'italic 400 34px "Dancing Script", cursive';
    ctx.textAlign = "left";
    ctx.fillText(`To: ${to}`, rx + 48, currentY);
    currentY += 52;

    ctx.strokeStyle = "rgba(184, 154, 106, 0.22)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rx + 48, currentY - 10);
    ctx.lineTo(rx + cardW - 48, currentY - 10);
    ctx.stroke();
    currentY += 16;
  }

  // Body message
  const cardFont = msgFont || "Cormorant Garamond";
  const cardColor = msgColor || "#3D2B1F";
  const maxWidth = cardW - 112;
  const lineHeight = 58;
  const maxLines = to || from ? 5 : 7;
  const minFontSize = 30;

  function measureLines(fs: number): string[] {
    ctx.font = `400 ${fs}px "${cardFont}", serif`;
    const words = body.split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);
    return lines;
  }

  let fontSize = 46;
  let lines = measureLines(fontSize);
  while (lines.length > maxLines && fontSize > minFontSize) {
    fontSize -= 4;
    lines = measureLines(fontSize);
  }

  ctx.font = `400 ${fontSize}px "${cardFont}", serif`;
  ctx.fillStyle = cardColor;
  ctx.textAlign = "left";
  for (const ln of lines.slice(0, maxLines)) {
    ctx.fillText(ln, rx + 56, currentY);
    currentY += lineHeight;
  }

  // "From:" line
  if (from) {
    ctx.strokeStyle = "rgba(184, 154, 106, 0.22)";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(rx + 48, ry + cardH - 80);
    ctx.lineTo(rx + cardW - 48, ry + cardH - 80);
    ctx.stroke();

    ctx.fillStyle = "#B89A6A";
    ctx.font = 'italic 400 32px "Dancing Script", cursive';
    ctx.textAlign = "right";
    ctx.fillText(`From: ${from}`, rx + cardW - 48, ry + cardH - 36);
  } else {
    ctx.fillStyle = "rgba(111, 106, 99, 0.8)";
    ctx.font = 'italic 400 28px "Playfair Display", Georgia, serif';
    ctx.textAlign = "center";
    ctx.fillText("— with love", 0, ry + cardH - 30);
  }

  ctx.restore();

  // Watermark for free users
  if (addWatermark) {
    ctx.save();
    ctx.font = "32px sans-serif";
    ctx.fillStyle = "rgba(180,150,120,0.6)";
    ctx.textAlign = "left";
    ctx.fillText("Created with Bloom \uD83D\uDC90", 28, CANVAS_H - 28);
    ctx.restore();
  }

  return canvas.toDataURL("image/jpeg", 1.0);
}
