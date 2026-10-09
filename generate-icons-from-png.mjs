import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC = 'C:\\Users\\leyea\\Downloads\\Gemini_Generated_Image_3bqxtr3bqxtr3bqx.png';

const PWA_ICONS = [
  { file: 'public/icon-192.png', size: 192 },
  { file: 'public/icon-512.png', size: 512 },
  { file: 'public/icon-maskable.png', size: 192 },
];

const ANDROID_ICONS = [
  { density: 'mipmap-mdpi',    size: 48  },
  { density: 'mipmap-hdpi',    size: 72  },
  { density: 'mipmap-xhdpi',   size: 96  },
  { density: 'mipmap-xxhdpi',  size: 144 },
  { density: 'mipmap-xxxhdpi', size: 192 },
];

const ANDROID_RES = 'android/app/src/main/res';

async function run() {
  if (!fs.existsSync(SRC)) {
    console.error('Source image not found:', SRC);
    process.exit(1);
  }

  console.log('Generating PWA icons...');
  for (const { file, size } of PWA_ICONS) {
    await sharp(SRC).resize(size, size).png().toFile(file);
    console.log(`  ✓ ${file} (${size}x${size})`);
  }

  console.log('Generating Android mipmap icons...');
  for (const { density, size } of ANDROID_ICONS) {
    const dir = path.join(ANDROID_RES, density);
    await sharp(SRC).resize(size, size).png().toFile(path.join(dir, 'ic_launcher.png'));
    await sharp(SRC).resize(size, size).png().toFile(path.join(dir, 'ic_launcher_round.png'));
    await sharp(SRC).resize(size, size).png().toFile(path.join(dir, 'ic_launcher_foreground.png'));
    console.log(`  ✓ ${density} (${size}x${size})`);
  }

  // Google Play Store requires 512x512
  await sharp(SRC).resize(512, 512).png().toFile('icon-play-store-512.png');
  console.log('  ✓ icon-play-store-512.png (Google Play Store upload)');

  console.log('\nAll icons generated successfully!');
}

run().catch(e => { console.error(e); process.exit(1); });
