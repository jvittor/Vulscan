'use client';

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  const [messages, setMessages] = useState<{ text: string; id: number }[]>([]);

  useEffect(() => {
    if (isLoading) {
      setMessages([]);
      const steps = [
        'Carregando dados...',
        'Analisando elevação...',
        'Calculando vulnerabilidade...',
        'Gerando arquivo GeoJSON...',
        'Finalizando processamento...',
      ];

      steps.forEach((step, index) => {
        setTimeout(() => {
          setMessages((prev) => [...prev, { text: step, id: index }]);
        }, index * 1500);
      });

      return () => setMessages([]);
    }
  }, [isLoading]);

  return (
    <div className="absolute bottom-10 left-1/2 flex w-full max-w-xl -translate-x-1/2 transform items-center justify-center px-4">
      <div className="flex max-h-40 flex-col justify-end overflow-hidden">
        {messages.length > 0 && (
          <div
            key={messages[messages.length - 1].id}
            className="mb-2 flex items-center space-x-2 text-lg font-bold text-black opacity-100 transition-opacity duration-1000"
          >
            <CircularProgress size={20} color="inherit" />
            <span>{messages[messages.length - 1].text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
