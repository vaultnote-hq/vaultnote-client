'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import { Button } from './ui/button';

interface QRCodeProps {
  value: string;
  size?: number;
  className?: string;
}

export function QRCodeComponent({ value, size = 256, className = '' }: QRCodeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (canvasRef.current && value) {
      setIsLoading(true);
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#FFFFFF',
          },
        },
        (error) => {
          if (error) console.error('QR Code generation error:', error);
          setIsLoading(false);
        }
      );
    }
  }, [value, size]);

  const downloadQRCode = () => {
    if (canvasRef.current) {
      const url = canvasRef.current.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'vaultnote-qr-code.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="relative bg-white p-4 rounded-lg shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white rounded-lg">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}
        <canvas ref={canvasRef} className="block" />
      </div>
      <Button
        onClick={downloadQRCode}
        variant="outline"
        size="sm"
        className="gap-2"
      >
        <Download className="h-4 w-4" />
        Download QR Code
      </Button>
    </div>
  );
}
