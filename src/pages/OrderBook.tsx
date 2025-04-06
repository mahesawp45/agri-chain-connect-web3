
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ClipboardList } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const OrderBook = () => {
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Order Book</h1>
        <p className="text-gray-600">Lihat dan terima permintaan komoditas dari pembeli</p>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Order Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          Halaman Order Book - Konten akan dimuat di sini
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OrderBook;
