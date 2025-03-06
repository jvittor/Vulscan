'use client';

import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';

interface MapComponentProps {
  areasVulneraveis: number[][][];
}

const MapComponent: React.FC<MapComponentProps> = ({ areasVulneraveis }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new Map({
        basemap: 'topo-vector',
      });

      const view = new MapView({
        container: mapRef.current,
        map: map,
        center: [-46.6333, -23.5505], // Coordenadas de exemplo
        zoom: 10,
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      // Adicionar áreas vulneráveis ao mapa
      areasVulneraveis.forEach((area) => {
        const polygon = new Polygon({
          rings: area,
          spatialReference: { wkid: 4326 }, // WGS84
        });

        const graphic = new Graphic({
          geometry: polygon,
          symbol: {
            type: 'simple-fill',
            color: [255, 0, 0, 0.5], // Vermelho com 50% de transparência
            outline: {
              color: [255, 0, 0],
              width: 1,
            },
          },
        });

        graphicsLayer.add(graphic);
      });

      return () => {
        view.destroy();
      };
    }
  }, [areasVulneraveis]);

  return <div ref={mapRef} style={{ height: '600px', width: '100%' }}></div>;
};

export default MapComponent;
