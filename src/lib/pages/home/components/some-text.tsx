'use client';

import React, { useEffect, useRef, useState } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as GeoTIFF from 'geotiff';
import Graphic from '@arcgis/core/Graphic';

const ArcGISMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [mapView, setMapView] = useState<MapView | null>(null);
  const [params, setParams] = useState({
    nivelMar: 0,
    mareAlta: 0,
    alturaOndas: 0,
    projecaoFutura: 0,
  });

  useEffect(() => {
    if (!mapDiv.current) return;

    const webMap = new WebMap({ basemap: 'topo-vector' });
    const view = new MapView({
      container: mapDiv.current,
      map: webMap,
      center: [-51, -14], // Brasil
      zoom: 4,
    });

    setMapView(view);
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !mapView) return;

    const file = event.target.files[0];
    const tiff = await GeoTIFF.fromBlob(file);
    const image = await tiff.getImage();
    const rasterData = await image.readRasters();
    const [values] = rasterData;
    const width = image.getWidth();
    const height = image.getHeight();
    const elevacaoCritica =
      params.nivelMar +
      params.mareAlta +
      params.alturaOndas +
      params.projecaoFutura;

    const features = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const i = y * width + x;
        if (values[i] < elevacaoCritica) {
          const point = new Graphic({
            geometry: {
              type: 'point',
              x: x * 0.01 - 60,
              y: y * 0.01 - 10,
            },
            attributes: { id: i },
          });
          features.push(point);
        }
      }
    }

    const newLayer = new FeatureLayer({
      source: features,
      renderer: {
        type: 'simple',
        symbol: {
          type: 'simple-marker',
          color: 'red',
          size: 4,
        },
      },
      objectIdField: 'id',
      fields: [{ name: 'id', type: 'oid' }],
      title: 'Vulnerable Areas Layer',
    });

    mapView.map.add(newLayer);
  };

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <input
        type="file"
        accept=".tif"
        onChange={handleFileUpload}
        style={{ position: 'absolute', top: 10, left: 10, zIndex: 1000 }}
      />

      {/* 🔢 Inputs dos parâmetros */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'white',
          padding: 10,
          zIndex: 1000,
        }}
      >
        <label>Nível do Mar (m):</label>
        <input
          type="number"
          onChange={(e) =>
            setParams({ ...params, nivelMar: parseFloat(e.target.value) })
          }
        />
        <label>Maré Alta (m):</label>
        <input
          type="number"
          onChange={(e) =>
            setParams({ ...params, mareAlta: parseFloat(e.target.value) })
          }
        />
        <label>Altura das Ondas (m):</label>
        <input
          type="number"
          onChange={(e) =>
            setParams({ ...params, alturaOndas: parseFloat(e.target.value) })
          }
        />
        <label>Projeção Futura (m):</label>
        <input
          type="number"
          onChange={(e) =>
            setParams({ ...params, projecaoFutura: parseFloat(e.target.value) })
          }
        />
      </div>
      <div ref={mapDiv} style={{ width: '100%', height: '100%' }}></div>
    </div>
  );
};

export default ArcGISMap;
