import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generatePngIcons() {
  const svgPath = path.join(process.cwd(), 'public', 'icon.svg');
  const outDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(svgPath)) {
    console.error('Source icon.svg template not found in public/ directory!');
    process.exit(1);
  }

  try {
    console.log('Rendering 192x192 app icon...');
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(outDir, 'icon-192.png'));

    console.log('Rendering 512x512 app store icon...');
    await sharp(svgPath)
      .resize(512, 512)
      .png()
      .toFile(path.join(outDir, 'icon-512.png'));

    console.log('Rendering safety maskable icon...');
    await sharp(svgPath)
      .resize(192, 192)
      .png()
      .toFile(path.join(outDir, 'icon-maskable.png'));

    console.log('Successfully completed generating all high-performance physical PNG icons!');
  } catch (error) {
    console.error('Error generating PNG icons with Sharp:', error);
    process.exit(1);
  }
}

generatePngIcons();
