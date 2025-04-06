
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Transaksi = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Transaksi</h1>
        <p className="text-gray-600">Kelola transaksi komoditas Anda</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          Halaman Transaksi - Konten akan dimuat di sini
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Transaksi;
