'use client';

import { useState, useRef, useEffect } from 'react';
import { ElevationLayer } from '@arcgis/core/layers/ElevationLayer';
import { RasterLayer } from '@arcgis/core/layers/RasterLayer';
import { RasterFunction } from '@arcgis/core/tasks/support/RasterFunction';

const CoastalVulnerability: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [seaLevel, setSeaLevel] = useState(0);
  const [highTide, setHighTide] = useState(0);
  const [waveHeight, setWaveHeight] = useState(0);
  const [futureProjection, setFutureProjection] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [view, setView] = useState<SceneView | null>(null);

  useEffect(() => {
    if (mapRef.current) {
      const elevationLayer = new ElevationLayer({
        url: 'https://elevation.arcgis.com/arcgis/rest/services/WorldElevation/Terrain/ImageServer',
      });

      const newMap = new Map({
        basemap: 'topo-vector',
        ground: {
          layers: [elevationLayer],
        },
      });

      const newView = new SceneView({
        container: mapRef.current,
        map: newMap,
        camera: {
          position: {
            longitude: -118.805,
            latitude: 34.027,
            z: 5000,
          },
          tilt: 45,
        },
      });

      setMap(newMap);
      setView(newView);
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const processMDE = () => {
    if (!file || !view) {
      alert(
        'Por favor, envie um arquivo MDE primeiro e aguarde o carregamento do mapa.'
      );
      return;
    }

    const criticalElevation =
      seaLevel + highTide + waveHeight + futureProjection;
    console.log('Elevação crítica calculada:', criticalElevation);

    // Simulação da adição de um RasterLayer com os dados do MDE
    const rasterLayer = new RasterLayer({
      url: URL.createObjectURL(file),
    });

    // Aplicar uma função raster para destacar áreas vulneráveis
    const rasterFunction = new RasterFunction({
      functionName: 'Remap',
      functionArguments: {
        inputRanges: [0, criticalElevation, criticalElevation, 9999],
        outputValues: [1, 0],
        raster: rasterLayer,
      },
      outputPixelType: 'U8',
    });

    rasterLayer.rasterFunction = rasterFunction;
    map?.add(rasterLayer);
    console.log('Camada de MDE processada e adicionada ao mapa.');
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="file"
        accept=".tif,.asc"
        onChange={handleFileUpload}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Nível do mar"
        value={seaLevel}
        onChange={(e) => setSeaLevel(Number(e.target.value))}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Maré alta"
        value={highTide}
        onChange={(e) => setHighTide(Number(e.target.value))}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Altura das ondas"
        value={waveHeight}
        onChange={(e) => setWaveHeight(Number(e.target.value))}
        className="border p-2"
      />
      <input
        type="number"
        placeholder="Projeção futura"
        value={futureProjection}
        onChange={(e) => setFutureProjection(Number(e.target.value))}
        className="border p-2"
      />
      <button
        onClick={processMDE}
        className="rounded bg-blue-500 p-2 text-white"
      >
        Processar MDE
      </button>
      <div ref={mapRef} className="h-[500px] w-full rounded-lg shadow-lg" />
    </div>
  );
};

export default CoastalVulnerability;
