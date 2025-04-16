import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { ClipboardList, Search, Filter, Eye, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TransactionFlowExplorerDialog } from "@/components/transaction/TransactionFlowExplorerDialog";
import { useLanguage } from "@/contexts/LanguageContext";

const OrderBookList = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  // Function to navigate to create new order book
  const handleCreateOrderBook = () => {
    navigate("/buyer/order-book/create");
  };

  return (
    <MainLayout>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {language === "id" ? "Daftar Order Book" : "Order Book List"}
          </h1>
          <p className="text-gray-600">
            {language === "id" 
              ? "Kelola permintaan pembelian komoditas Anda" 
              : "Manage your commodity purchase requests"}
          </p>
        </div>
        <div className="flex gap-2">
          <TransactionFlowExplorerDialog />
          <Button 
            onClick={handleCreateOrderBook}
            className="gap-2 bg-gradient-to-r from-earth-dark-green to-earth-medium-green hover:from-earth-medium-green hover:to-earth-dark-green"
          >
            <Plus className="h-4 w-4" />
            {language === "id" ? "Tambah Order Book" : "Add Order Book"}
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <ClipboardList className="h-5 w-5 mr-2" />
            {language === "id" ? "Daftar Order Book" : "Order Book List"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder={language === "id" ? "Cari Order Book..." : "Search Order Books..."}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                {language === "id" ? "Filter" : "Filter"}
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>{language === "id" ? "Komoditas" : "Commodity"}</TableHead>
                    <TableHead>{language === "id" ? "Jumlah" : "Quantity"}</TableHead>
                    <TableHead>{language === "id" ? "Status" : "Status"}</TableHead>
                    <TableHead className="text-right">{language === "id" ? "Aksi" : "Actions"}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      {language === "id" 
                        ? "Belum ada data order book. Klik tombol 'Tambah Order Book' untuk membuat baru." 
                        : "No order book data yet. Click 'Add Order Book' button to create a new one."}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default OrderBookList;
