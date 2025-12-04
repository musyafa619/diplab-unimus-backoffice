import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const iconsDir = path.resolve(process.cwd(), 'public/icons');

async function generateIcons() {
  console.log('Generating icons from SVG...');

  try {
    // 192x192
    await sharp(path.join(iconsDir, 'icon-192x192.svg'))
      .png()
      .toFile(path.join(iconsDir, 'icon-192x192.png'));
    console.log('✓ Generated icon-192x192.png');

    // 512x512
    await sharp(path.join(iconsDir, 'icon-512x512.svg'))
      .png()
      .toFile(path.join(iconsDir, 'icon-512x512.png'));
    console.log('✓ Generated icon-512x512.png');

    // Maskable versions (same as regular for now, can be customized later)
    await sharp(path.join(iconsDir, 'icon-192x192.svg'))
      .png()
      .toFile(path.join(iconsDir, 'icon-maskable-192x192.png'));
    console.log('✓ Generated icon-maskable-192x192.png');

    await sharp(path.join(iconsDir, 'icon-512x512.svg'))
      .png()
      .toFile(path.join(iconsDir, 'icon-maskable-512x512.png'));
    console.log('✓ Generated icon-maskable-512x512.png');

    // Create a simple screenshot placeholder (540x720 for narrow, 1280x720 for wide)
    const screenshotDir = path.join(iconsDir);

    const screenshotNarrow = await sharp({
      text: {
        text: 'Diplab Unimus\nBackoffice',
        font: 'Arial',
        fontSize: 60,
        align: 'center',
      },
    })
      .resize(540, 720, {
        fit: 'cover',
        background: { r: 25, g: 118, b: 210, alpha: 1 },
      })
      .composite([
        {
          input: Buffer.from(
            `<svg width="540" height="720" xmlns="http://www.w3.org/2000/svg"><text x="270" y="360" font-size="80" fill="white" text-anchor="middle" dominant-baseline="middle">📊</text></svg>`
          ),
          top: 100,
          left: 0,
        },
      ])
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(screenshotDir, 'screenshot-540x720.png'), screenshotNarrow);
    console.log('✓ Generated screenshot-540x720.png');

    // Wide screenshot
    const screenshotWide = await sharp({
      text: {
        text: 'Diplab Unimus Backoffice',
        font: 'Arial',
        fontSize: 60,
        align: 'center',
      },
    })
      .resize(1280, 720, {
        fit: 'cover',
        background: { r: 25, g: 118, b: 210, alpha: 1 },
      })
      .png()
      .toBuffer();

    fs.writeFileSync(path.join(screenshotDir, 'screenshot-1280x720.png'), screenshotWide);
    console.log('✓ Generated screenshot-1280x720.png');

    console.log('\n✅ All icons generated successfully!');
  } catch (err) {
    console.error('❌ Error generating icons:', err);
    process.exit(1);
  }
}

generateIcons();
