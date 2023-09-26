import * as sharp from 'sharp';

export async function compressFile(
  file: Express.Multer.File,
  maximumImageWidth: number,
) {
  const compressImageFile = await sharp(file.buffer)
    .resize({
      width: maximumImageWidth,
    })
    .toBuffer();
  return compressImageFile;
}
