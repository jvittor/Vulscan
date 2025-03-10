/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { loadModules } from 'esri-loader';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Modal, Box, Button, Typography } from '@mui/material';
import LoadingOverlay from './LoadingOverlay';
import HexGrid from './HexGrid';
import LoadingWithProgress from './LoadingWithProgress';
import './home.css';

const CustomTextField = styled(TextField)({
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 1000px white inset',
    WebkitTextFillColor: 'black',
  },
  '& label': {
    fontWeight: 'bold',
  },
  '& input': {
    fontWeight: 'bold',
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const ArcGISMap: React.FC = () => {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [geojsonUrl, setGeojsonUrl] = useState<string | null>(null);
  const [isGeojsonLoaded, setIsGeojsonLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef<any>(null);
  const viewRef = useRef<any>(null);
  const geojsonLayerRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    nivel_mar: '',
    mare_alta: '',
    altura_ondas: '',
    projecao_futura: '',
  });
  const [arquivoMDE, setArquivoMDE] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [fileStatus, setFileStatus] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoadingScreen, setIsLoadingScreen] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.name.endsWith('.tif')) {
        setArquivoMDE(file);
        setFileStatus('✅ MDE carregado');
        setOpenModal(true);
      } else {
        setFileStatus('❌ Apenas arquivos .tif são aceitos');
      }
    }
  };
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!arquivoMDE) {
      console.error('Nenhum arquivo MDE selecionado.');
      return;
    }

    try {
      setIsLoading(true);

      const formDataUpload = new FormData();
      formDataUpload.append('file', arquivoMDE);

      const uploadResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      );

      const uploadData = await uploadResponse.json();
      if (!uploadData.caminho_arquivo) {
        console.error('Erro ao fazer upload do arquivo:', uploadData.erro);
        return;
      }
      const processamentoResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/processar`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            arquivo_mde: uploadData.caminho_arquivo,
            nivel_mar: parseFloat(formData.nivel_mar),
            mare_alta: parseFloat(formData.mare_alta),
            altura_ondas: parseFloat(formData.altura_ondas),
            projecao_futura: parseFloat(formData.projecao_futura),
          }),
        }
      );

      const processamentoData = await processamentoResponse.json();
      if (processamentoData.arquivo_url) {
        const nomeArquivo = processamentoData.arquivo_url.split('/').pop();
        const geojsonUrl = `${process.env.NEXT_PUBLIC_API_URL}/static/uploads/${nomeArquivo}`;
        const geojsonResponse = await fetch(geojsonUrl);
        const geojsonData = await geojsonResponse.json();

        if (geojsonData) {
          setGeojsonUrl(geojsonUrl);
          setIsGeojsonLoaded(true);
        } else {
          console.error('Erro ao obter os dados do GeoJSON:', geojsonData.erro);
        }
      } else {
        console.error('Erro ao obter URL do GeoJSON:', processamentoData.erro);
      }
    } catch (err) {
      console.error('Erro na requisição:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleLoad = () => setIsLoadingScreen(false);

      if (document.readyState === 'complete') {
        handleLoad();
      } else {
        window.addEventListener('load', handleLoad);
        return () => window.removeEventListener('load', handleLoad);
      }
    }
  }, []);

  useEffect(() => {
    loadModules([
      'esri/Map',
      'esri/views/MapView',
      'esri/layers/GeoJSONLayer',
    ]).then(([Map, MapView, GeoJSONLayer]: any[]) => {
      if (!mapRef.current) {
        const map = new Map({ basemap: 'hybrid' });
        mapRef.current = map;

        const view = new MapView({
          container: mapDiv.current!,
          map: map,
          center: [-43.3728, -12.6675],
          zoom: 4,
          ui: { components: ['zoom'] },
        });
        viewRef.current = view;

        view
          .when(() => {
            setIsLoadingScreen(false);
          })
          .catch((error: any) => {
            console.error('Erro ao carregar o mapa:', error);
            setIsLoadingScreen(false);
          });
      }

      if (geojsonUrl && isGeojsonLoaded) {
        if (geojsonLayerRef.current) {
          mapRef.current.remove(geojsonLayerRef.current);
        }

        const geojsonLayer = new GeoJSONLayer({
          url: geojsonUrl,
          renderer: {
            type: 'simple',
            symbol: {
              type: 'simple-fill',
              color: [227, 139, 79, 0.3],
              outline: { color: [255, 0, 0], width: 1.5 },
            },
          },
        });

        geojsonLayerRef.current = geojsonLayer;
        mapRef.current.add(geojsonLayer);

        geojsonLayer.when(() => {
          viewRef.current.goTo(geojsonLayer.fullExtent).catch((error: any) => {
            console.error('Erro ao ajustar a visualização:', error);
          });
        });
      }
    });
  }, [geojsonUrl, isGeojsonLoaded]);

  return (
    <div className="flex h-screen w-full flex-row">
      {isLoadingScreen ? (
        <LoadingWithProgress />
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="mb-4 h-[100vh] w-[800px] overflow-y-auto border bg-[#EEEEEE] p-10 shadow"
          >
            <div className="mt-5 mb-5 flex flex-col items-center justify-center">
              <Image src="/assets/logo.png" alt="Logo" width={70} height={70} />
              <p className="h-full text-2xl font-bold text-[#343434]">minke</p>
            </div>
            <div className="grid grid-cols-1 gap-5">
              <div className="mb-2">
                <input
                  type="file"
                  accept=".tif"
                  onChange={handleFileChange}
                  className="hidden"
                  ref={fileInputRef}
                  required
                />
                <div className="w-full">
                  <button
                    className="mt-5 w-full rounded-lg border border-[#d1d6dc] p-10 px-2 py-2 font-bold text-[#343434] hover:bg-[#343434] hover:text-white"
                    onClick={handleButtonClick}
                    style={{ cursor: 'pointer' }}
                  >
                    Enviar Arquivo MDE (.tif)
                  </button>
                </div>
                <p className="font-bold text-black">{fileStatus}</p>
              </div>
              <div>
                <p className="text-center text-xl font-bold text-black">
                  Configurações
                </p>
              </div>
              <div>
                <CustomTextField
                  required
                  id="nivel_mar"
                  name="nivel_mar"
                  label="Nivel Mar"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={formData.nivel_mar}
                />
              </div>
              <div>
                <CustomTextField
                  required
                  id="mare_alta"
                  name="mare_alta"
                  label="Maré Alta"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={formData.mare_alta}
                />
              </div>
              <div>
                <CustomTextField
                  required
                  id="altura_ondas"
                  name="altura_ondas"
                  label="Altura Ondas"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={formData.altura_ondas}
                />
              </div>
              <div>
                <CustomTextField
                  required
                  id="projecao_futura"
                  name="projecao_futura"
                  label="Projeção Futura"
                  variant="outlined"
                  type="number"
                  fullWidth
                  onChange={handleChange}
                  value={formData.projecao_futura}
                />
              </div>
              <button type="submit" className="continue-application">
                <div>
                  <div className="pencil"></div>
                  <div className="folder">
                    <div className="top">
                      <svg viewBox="0 0 24 27">
                        <path d="M1,0 L23,0 C23.5522847,-1.01453063e-16 24,0.44771525 24,1 L24,8.17157288 C24,8.70200585 23.7892863,9.21071368 23.4142136,9.58578644 L20.5857864,12.4142136 C20.2107137,12.7892863 20,13.2979941 20,13.8284271 L20,26 C20,26.5522847 19.5522847,27 19,27 L1,27 C0.44771525,27 6.76353751e-17,26.5522847 0,26 L0,1 C-6.76353751e-17,0.44771525 0.44771525,1.01453063e-16 1,0 Z"></path>
                      </svg>
                    </div>
                    <div className="paper"></div>
                  </div>
                </div>
                Processar Dados
              </button>
            </div>
          </form>

          <div
            ref={mapDiv}
            className="relative h-screen w-full"
            style={{
              width: '100%',
              height: '100vh',
            }}
          >
            {isLoading && (
              <>
                <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-white/40">
                  <p className="text-2xl font-bold text-gray-700"></p>
                  <HexGrid />
                </div>
                <LoadingOverlay isLoading={isLoading} />
              </>
            )}
          </div>

          {/* Modal de Confirmação */}
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <Box className="text-black" sx={{ ...style, width: 400 }}>
              <Typography id="modal-title" variant="h6" component="h2">
                Arquivo MDE Carregado
              </Typography>
              <Typography id="modal-description" sx={{ mt: 2 }}>
                O arquivo foi carregado com sucesso! 🎉
              </Typography>
              <Button
                className="bg-black text-white"
                variant="contained"
                onClick={() => setOpenModal(false)}
                sx={{ mt: 2 }}
              >
                Fechar
              </Button>
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
};

export default ArcGISMap;
