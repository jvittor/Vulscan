'use client';

import React, { useEffect, useRef } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import '@arcgis/core/assets/esri/themes/light/main.css';

const ArcGISMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'streets-vector',
      });

      const view = new MapView({
        container: mapDiv.current,
        map: map,
        center: [-43.3728, -12.6675], // Coordenadas de Cruz das Almas, Bahia
        zoom: 12,
      });

      return () => {
        if (view) {
          view.destroy();
        }
      };
    }
  }, []);

  return <div style={{ height: '100vh', width: '100%' }} ref={mapDiv}></div>;
};

export default ArcGISMap;
