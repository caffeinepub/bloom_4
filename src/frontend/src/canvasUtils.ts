/**
 * Renders a bouquet image with an overlaid message card onto an offscreen canvas
 * and returns a JPEG data URL.
 */
export async function renderBouquetWithCard(
  imageUrl: string,
  message: string,
): Promise<string> {
  // Load fonts before drawing
  await Promise.all([
    document.fonts.load('600 18px "Dancing Script"'),
    document.fonts.load('400 16px "Dancing Script"'),
  ]);

  const canvas = document.createElement("canvas");
  canvas.width = 800;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d")!;

  // Load bouquet image
  await new Promise<void>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 800, 1000);
      resolve();
    };
    img.onerror = reject;
    img.src = imageUrl;
  });

  // Card dimensions and position
  const cardX = 470;
  const cardY = 670;
  const cardW = 290;
  const cardH = 230;
  const cardCX = cardX + cardW / 2;
  const cardCY = cardY + cardH / 2;

  ctx.save();
  ctx.translate(cardCX, cardCY);
  ctx.rotate(0.04);

  // Card shadow
  ctx.shadowBlur = 16;
  ctx.shadowColor = "rgba(0,0,0,0.18)";
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 4;

  // Card background
  ctx.fillStyle = "rgba(255, 250, 240, 0.97)";
  ctx.beginPath();
  const rx = -cardW / 2;
  const ry = -cardH / 2;
  ctx.roundRect(rx, ry, cardW, cardH, 8);
  ctx.fill();

  // Card border
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  ctx.strokeStyle = "rgba(184, 154, 106, 0.45)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.roundRect(rx, ry, cardW, cardH, 8);
  ctx.stroke();

  // "Bloom" script header
  ctx.fillStyle = "#B89A6A";
  ctx.font = '600 17px "Dancing Script", cursive';
  ctx.textAlign = "center";
  ctx.fillText("Bloom", 0, ry + 26);

  // Thin divider
  ctx.strokeStyle = "rgba(184, 154, 106, 0.3)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.moveTo(rx + 20, ry + 36);
  ctx.lineTo(rx + cardW - 20, ry + 36);
  ctx.stroke();

  // Message text — word-wrap within card
  ctx.fillStyle = "#3D2B1F";
  ctx.font = '400 15px "Dancing Script", cursive';
  ctx.textAlign = "left";

  const maxWidth = cardW - 36;
  const lineHeight = 22;
  const startX = rx + 18;
  let currentY = ry + 58;
  const maxLines = 6;

  const words = message.split(" ");
  let line = "";
  let lineCount = 0;

  for (let i = 0; i < words.length && lineCount < maxLines; i++) {
    const testLine = line ? `${line} ${words[i]}` : words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxWidth && line) {
      ctx.fillText(line, startX, currentY);
      line = words[i];
      currentY += lineHeight;
      lineCount++;
    } else {
      line = testLine;
    }
  }
  if (lineCount < maxLines && line) {
    ctx.fillText(line, startX, currentY);
  }

  // "with love" footer
  ctx.fillStyle = "rgba(111, 106, 99, 0.8)";
  ctx.font = 'italic 400 11px "Playfair Display", Georgia, serif';
  ctx.textAlign = "center";
  ctx.fillText("— with love", 0, ry + cardH - 14);

  ctx.restore();

  return canvas.toDataURL("image/jpeg", 0.95);
}
