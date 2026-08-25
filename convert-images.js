const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const inputFolder = path.join(__dirname, "public/images/dresses");

async function convertImages() {
  const files = fs.readdirSync(inputFolder);

  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png|jfif)$/i)) {
      const inputPath = path.join(inputFolder, file);
      const outputName = file.replace(/\.(jpg|jpeg|png|jfif)$/i, ".webp");
      const outputPath = path.join(inputFolder, outputName);

      // No sobrescribir si ya existe el WebP
      if (fs.existsSync(outputPath)) {
        console.log(`Skipping ${file}, WebP already exists.`);
        continue;
      }

      await sharp(inputPath).webp({ quality: 85 }).toFile(outputPath);

      console.log(`Converted: ${file} → ${outputName}`);
    }
  }
}

convertImages();
