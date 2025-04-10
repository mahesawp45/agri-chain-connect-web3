
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for transaction history
const mockRegularTransactions = [
  {
    id: "TRX-2023-001",
    type: "Regular",
    status: "Selesai",
    statusEn: "Completed",
    date: "2025-03-25",
    commodity: "Beras Organik",
    farmer: "Pak Joko",
    quantity: 500,
    unit: "kg",
    price: 12000,
    total: 6000000,
    shipping: "Sudah Diterima",
    shippingEn: "Received"
  },
  {
    id: "2",
    type: "Regular",
    status: "Selesai",
    statusEn: "Completed",
    date: "2025-03-20",
    commodity: "Beras Merah",
    farmer: "Bu Siti",
    quantity: 200,
    unit: "kg",
    price: 15000,
    total: 3000000,
    shipping: "Sudah Diterima",
    shippingEn: "Received"
  },
  {
    id: "3",
    type: "Regular",
    status: "Dalam Pengiriman",
    statusEn: "Shipping",
    date: "2025-03-27",
    commodity: "Beras Hitam",
    farmer: "Pak Budi",
    quantity: 100,
    unit: "kg",
    price: 18000,
    total: 1800000,
    shipping: "Dalam Pengiriman",
    shippingEn: "In Transit"
  }
];

const mockOrderBookTransactions = [
  {
    id: "TRX-2023-002",
    type: "Order Book",
    status: "Selesai",
    statusEn: "Completed",
    date: "2025-03-15",
    commodity: "Beras Organik Premium",
    farmer: "Pak Joko",
    quantity: 1000,
    unit: "kg",
    price: 11500,
    total: 11500000,
    shipping: "Sudah Diterima",
    shippingEn: "Received"
  },
  {
    id: "5",
    type: "Order Book",
    status: "Dalam Pengiriman",
    statusEn: "Shipping",
    date: "2025-03-18",
    commodity: "Beras Ketan",
    farmer: "Bu Maya",
    quantity: 500,
    unit: "kg",
    price: 14000,
    total: 7000000,
    shipping: "Dalam Pengiriman",
    shippingEn: "In Transit"
  }
];

const History = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  
  const handleView = (id: string) => {
    // Update to use transaction/:id route for consistency
    navigate(`/transaction/${id}`);
  };
  
  const handleUpdateShippingStatus = (id: string) => {
    // In a real application, this would update the shipping status
    console.log(`Updating shipping status for transaction ${id}`);
    navigate(`/transaction/${id}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Selesai":
      case "Completed":
        return <Badge className="bg-green-100 text-green-800 border border-green-200">
          {t("language") === "id" ? "Selesai" : "Completed"}
        </Badge>;
      case "Dalam Pengiriman":
      case "Shipping":
        return <Badge className="bg-blue-100 text-blue-800 border border-blue-200">
          {t("language") === "id" ? "Dalam Pengiriman" : "Shipping"}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getShippingBadge = (shipping: string) => {
    switch(shipping) {
      case "Sudah Diterima":
      case "Received":
        return <Badge className="bg-green-100 text-green-800 border border-green-200">
          {t("language") === "id" ? "Sudah Diterima" : "Received"}
        </Badge>;
      case "Dalam Pengiriman":
      case "In Transit":
        return <Badge className="bg-amber-100 text-amber-800 border border-amber-200">
          {t("language") === "id" ? "Dalam Pengiriman" : "In Transit"}
        </Badge>;
      default:
        return <Badge variant="outline">{shipping}</Badge>;
    }
  };
  
  // Filter transactions based on the active tab
  const getDisplayedTransactions = () => {
    switch (activeTab) {
      case "regular":
        return mockRegularTransactions;
      case "orderbook":
        return mockOrderBookTransactions;
      case "all":
      default:
        return [...mockRegularTransactions, ...mockOrderBookTransactions];
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Riwayat Transaksi</h1>
            <p className="text-muted-foreground">
              {t("language") === "id" 
                ? "Lihat dan kelola riwayat transaksi Anda." 
                : "View and manage your transaction history."}
            </p>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-earth-pale-green/70">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="regular">Transaksi Reguler</TabsTrigger>
            <TabsTrigger value="orderbook">Order Book</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="pt-4">
            <Card>
              <CardHeader className="bg-earth-pale-green/50 pb-4">
                <CardTitle className="text-lg text-earth-dark-green">
                  {t("language") === "id" ? "Semua Transaksi" : "All Transactions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Komoditas</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pengiriman</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getDisplayedTransactions().map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">#{tx.id}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          {tx.type === "Order Book" ? (
                            <Badge variant="outline" className="border-earth-medium-green text-earth-dark-green">
                              Order Book
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-blue-500 text-blue-700">
                              Regular
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{tx.commodity}</TableCell>
                        <TableCell>Rp {tx.total.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        <TableCell>{getShippingBadge(tx.shipping)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleView(tx.id)}>
                              Detail
                            </Button>
                            
                            {tx.shipping === "Dalam Pengiriman" && (
                              <Button size="sm" className="bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleUpdateShippingStatus(tx.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Konfirmasi Terima
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regular" className="pt-4">
            <Card>
              <CardHeader className="bg-earth-pale-green/50 pb-4">
                <CardTitle className="text-lg text-earth-dark-green">
                  {t("language") === "id" ? "Transaksi Reguler" : "Regular Transactions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Komoditas</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pengiriman</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockRegularTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">#{tx.id}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          {tx.type === "Order Book" ? (
                            <Badge variant="outline" className="border-earth-medium-green text-earth-dark-green">
                              Order Book
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-blue-500 text-blue-700">
                              Regular
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{tx.commodity}</TableCell>
                        <TableCell>Rp {tx.total.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        <TableCell>{getShippingBadge(tx.shipping)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleView(tx.id)}>
                              Detail
                            </Button>
                            
                            {tx.shipping === "Dalam Pengiriman" && (
                              <Button size="sm" className="bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleUpdateShippingStatus(tx.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Konfirmasi Terima
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orderbook" className="pt-4">
            <Card>
              <CardHeader className="bg-earth-pale-green/50 pb-4">
                <CardTitle className="text-lg text-earth-dark-green">
                  {t("language") === "id" ? "Transaksi Order Book" : "Order Book Transactions"}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Jenis</TableHead>
                      <TableHead>Komoditas</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Pengiriman</TableHead>
                      <TableHead className="text-right">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrderBookTransactions.map((tx) => (
                      <TableRow key={tx.id}>
                        <TableCell className="font-medium">#{tx.id}</TableCell>
                        <TableCell>{tx.date}</TableCell>
                        <TableCell>
                          {tx.type === "Order Book" ? (
                            <Badge variant="outline" className="border-earth-medium-green text-earth-dark-green">
                              Order Book
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="border-blue-500 text-blue-700">
                              Regular
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{tx.commodity}</TableCell>
                        <TableCell>Rp {tx.total.toLocaleString()}</TableCell>
                        <TableCell>{getStatusBadge(tx.status)}</TableCell>
                        <TableCell>{getShippingBadge(tx.shipping)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleView(tx.id)}>
                              Detail
                            </Button>
                            
                            {tx.shipping === "Dalam Pengiriman" && (
                              <Button size="sm" className="bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleUpdateShippingStatus(tx.id)}>
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Konfirmasi Terima
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default History;
