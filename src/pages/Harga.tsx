
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Harga = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Harga Komoditas</h1>
        <p className="text-gray-600">Pantau harga komoditas pertanian terkini</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Harga Komoditas
          </CardTitle>
        </CardHeader>
        <CardContent>
          Halaman Harga Komoditas - Konten akan dimuat di sini
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Harga;
