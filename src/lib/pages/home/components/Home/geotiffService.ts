import * as GeoTIFF from 'geotiff';

export const processGeoTIFF = async (
  file: File,
  elevacaoCritica: number
): Promise<number[][][]> => {
  const arrayBuffer = await file.arrayBuffer(); // Converte o arquivo para ArrayBuffer
  const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer); // Carrega o arquivo GeoTIFF
  const image = await tiff.getImage(); // Obtém a primeira imagem do arquivo
  const raster = await image.readRasters(); // Lê os dados raster

  const width = raster.width;
  const height = raster.height;
  const areasVulneraveis: number[][][] = [];

  // Obter informações de georreferenciamento
  const [originX, originY] = image.getOrigin(); // Canto superior esquerdo
  const [pixelWidth, pixelHeight] = image.getResolution(); // Tamanho do pixel

  // Processar os dados raster
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const value = raster[0][y * width + x]; // Valor de elevação do pixel
      if (value < elevacaoCritica) {
        // Converter coordenadas do pixel para coordenadas geográficas
        const lon = originX + x * pixelWidth;
        const lat = originY - y * pixelHeight; // O eixo Y é invertido
        areasVulneraveis.push([
          [lon, lat],
          [lon + pixelWidth, lat],
          [lon + pixelWidth, lat - pixelHeight],
          [lon, lat - pixelHeight],
        ]);
      }
    }
  }

  return areasVulneraveis;
};
