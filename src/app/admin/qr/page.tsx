"use client";

import { useState, useRef } from "react";
import QRCode from "react-qr-code";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Download, Link as LinkIcon, Printer, QrCode as QrIcon, Info } from "lucide-react";

export default function QrManagementPage() {
  const [url, setUrl] = useState("https://bookletku.vercel.app");
  const qrRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "menu-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 p-2 md:p-0">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/30 border border-white/40 rounded-2xl p-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] rounded-xl shadow-lg shadow-[#A27B5C]/30">
            <QrIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              QR Management
            </h2>
            <p className="text-gray-600 mt-1">
              Buat dan unduh QR Code untuk akses menu restoran
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kolom Kiri: Konfigurasi */}
        <Card className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="w-5 h-5 text-[#A27B5C]" />
              Konfigurasi URL
            </CardTitle>
            <CardDescription>
              Masukkan alamat website restoran Anda di sini.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-700 font-semibold">Website URL</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                <Input
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="pl-10 bg-white/50 backdrop-blur-sm border-white/60 focus:border-[#A27B5C] rounded-xl"
                  placeholder="https://..."
                />
              </div>
              <div className="flex items-start gap-2 p-3 bg-blue-50/50 backdrop-blur-sm border border-blue-200/50 rounded-xl">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-700">
                  Pastikan URL diawali dengan http:// atau https://
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleDownload}
                className="flex-1 bg-gradient-to-br from-[#A27B5C] to-[#8d6a4d] hover:from-[#8d6a4d] hover:to-[#7a5d44] text-white shadow-lg shadow-[#A27B5C]/30 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PNG
              </Button>
              <Button
                onClick={handlePrint}
                variant="outline"
                className="flex-1 backdrop-blur-sm bg-white/50 border-white/60 hover:bg-white/70 hover:border-[#A27B5C]/30 transition-all duration-300"
              >
                <Printer className="w-4 h-4 mr-2" />
                Print
              </Button>
            </div>

            {/* Tips Section */}
            <div className="mt-6 p-4 backdrop-blur-xl bg-gradient-to-br from-[#A27B5C]/10 to-[#8d6a4d]/10 border border-[#A27B5C]/20 rounded-xl">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <QrIcon className="w-4 h-4 text-[#A27B5C]" />
                Tips Penggunaan
              </h4>
              <ul className="text-sm text-gray-600 space-y-1.5">
                <li className="flex items-start gap-2">
                  <span className="text-[#A27B5C] mt-0.5">•</span>
                  <span>Download QR code dan cetak untuk di tempatkan di meja</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A27B5C] mt-0.5">•</span>
                  <span>QR code akan otomatis update jika URL berubah</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#A27B5C] mt-0.5">•</span>
                  <span>Gunakan level koreksi error "High" untuk hasil terbaik</span>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Kolom Kanan: Preview QR */}
        <Card className="backdrop-blur-xl bg-white/30 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center">
          <CardContent className="p-8 text-center">
            <div
              ref={qrRef}
              className="bg-white p-6 rounded-2xl border-2 border-dashed border-gray-300 inline-block shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="bg-white p-3">
                <QRCode
                  value={url}
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  viewBox={`0 0 256 256`}
                  level="H"
                />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-[#A27B5C]/10 to-[#8d6a4d]/10 rounded-full">
                <QrIcon className="w-4 h-4 text-[#A27B5C]" />
                <h3 className="font-bold text-gray-800">Scan Menu</h3>
              </div>
              <p className="text-gray-600 text-sm mt-3 max-w-xs mx-auto break-all px-4 py-2 bg-gray-50/50 backdrop-blur-sm rounded-lg border border-gray-200/50">
                {url}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
