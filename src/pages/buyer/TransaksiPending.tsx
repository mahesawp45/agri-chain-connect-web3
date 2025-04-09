
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { ClipboardList, FileCheck, ExternalLink, Check, X, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for pending transactions
const mockPendingTransactions = [
  {
    id: "1",
    type: "Order Book",
    status: "Menunggu Persetujuan",
    statusEn: "Waiting for Approval",
    date: "2025-04-02",
    commodity: "Beras Organik",
    farmer: "Pak Joko",
    quantity: 500,
    unit: "kg",
    createdAt: "2025-04-01"
  },
  {
    id: "2",
    type: "Regular",
    status: "Menunggu Konfirmasi Harga",
    statusEn: "Waiting for Price Confirmation",
    date: "2025-04-03",
    commodity: "Beras Merah",
    farmer: "Bu Siti",
    quantity: 200,
    unit: "kg",
    createdAt: "2025-04-02"
  },
  {
    id: "3",
    type: "Order Book",
    status: "Menunggu Tanda Tangan",
    statusEn: "Waiting for Signature",
    date: "2025-04-05",
    commodity: "Beras Hitam",
    farmer: "Pak Budi",
    quantity: 100,
    unit: "kg",
    createdAt: "2025-04-01"
  }
];

const TransaksiPending = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);
  
  const handleView = (transaction: any) => {
    setSelectedTransaction(transaction);
  };
  
  const handleApprove = (id: string) => {
    // In a real application, this would send an approval to the backend
    console.log(`Approving transaction ${id}`);
    navigate(`/transaksi/${id}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Menunggu Persetujuan":
      case "Waiting for Approval":
        return <Badge className="bg-amber-400 text-amber-900">
          {t("language") === "id" ? "Menunggu Persetujuan" : "Waiting for Approval"}
        </Badge>;
      case "Menunggu Konfirmasi Harga":
      case "Waiting for Price Confirmation":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">
          {t("language") === "id" ? "Menunggu Konfirmasi Harga" : "Waiting for Price"}
        </Badge>;
      case "Menunggu Tanda Tangan":
      case "Waiting for Signature":
        return <Badge className="bg-purple-100 text-purple-800 border border-purple-300">
          {t("language") === "id" ? "Menunggu Tanda Tangan" : "Waiting for Signature"}
        </Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Transaksi Tertunda</h1>
            <p className="text-muted-foreground">
              {t("language") === "id" 
                ? "Kelola dan tinjau transaksi yang memerlukan persetujuan atau tindakan Anda." 
                : "Manage and review transactions that require your approval or action."}
            </p>
          </div>
        </div>
        
        <Card>
          <CardHeader className="bg-earth-pale-green/50 pb-4">
            <CardTitle className="text-lg text-earth-dark-green">
              {t("language") === "id" ? "Daftar Transaksi Tertunda" : "Pending Transactions List"}
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
                  <TableHead>Petani</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockPendingTransactions.map((tx) => (
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
                    <TableCell>{tx.farmer}</TableCell>
                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleView(tx)}>
                              Detail
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Detail Transaksi #{tx.id}</DialogTitle>
                              <DialogDescription>
                                {t("language") === "id" 
                                  ? "Informasi lengkap tentang transaksi tertunda ini." 
                                  : "Complete information about this pending transaction."}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Jenis Transaksi:</div>
                                <div className="col-span-2 text-sm">
                                  {tx.type === "Order Book" ? "Order Book" : "Regular"}
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Status:</div>
                                <div className="col-span-2 text-sm">
                                  {getStatusBadge(tx.status)}
                                </div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Tanggal Dibuat:</div>
                                <div className="col-span-2 text-sm">{tx.createdAt}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Tanggal Jatuh Tempo:</div>
                                <div className="col-span-2 text-sm">{tx.date}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Komoditas:</div>
                                <div className="col-span-2 text-sm">{tx.commodity}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Petani:</div>
                                <div className="col-span-2 text-sm">{tx.farmer}</div>
                              </div>
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-sm font-medium">Jumlah:</div>
                                <div className="col-span-2 text-sm">{tx.quantity} {tx.unit}</div>
                              </div>
                              
                              {tx.status === "Menunggu Persetujuan" && (
                                <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mt-4">
                                  <p className="text-sm text-amber-800">
                                    {t("language") === "id" 
                                      ? "Petani telah menyetujui order book Anda. Silakan tinjau dan berikan persetujuan untuk melanjutkan transaksi." 
                                      : "The farmer has approved your order book. Please review and give your approval to continue the transaction."}
                                  </p>
                                </div>
                              )}
                              
                              {tx.status === "Menunggu Konfirmasi Harga" && (
                                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-4">
                                  <p className="text-sm text-blue-800">
                                    {t("language") === "id" 
                                      ? "Silakan hubungi petani untuk negosiasi harga transaksi ini." 
                                      : "Please contact the farmer to negotiate the price for this transaction."}
                                  </p>
                                  <Button variant="outline" size="sm" className="mt-2">
                                    <Phone className="h-4 w-4 mr-1" />
                                    Hubungi Petani
                                  </Button>
                                </div>
                              )}
                              
                              {tx.status === "Menunggu Tanda Tangan" && (
                                <div className="bg-purple-50 border border-purple-200 rounded-md p-3 mt-4">
                                  <p className="text-sm text-purple-800">
                                    {t("language") === "id" 
                                      ? "Harga sudah dikonfirmasi. Silakan tanda tangani dokumen untuk melanjutkan transaksi." 
                                      : "Price has been confirmed. Please sign the document to continue the transaction."}
                                  </p>
                                  <Button variant="outline" size="sm" className="mt-2">
                                    <FileCheck className="h-4 w-4 mr-1" />
                                    Tanda Tangani Dokumen
                                  </Button>
                                </div>
                              )}
                            </div>
                            <DialogFooter>
                              {tx.status === "Menunggu Persetujuan" && (
                                <div className="flex gap-2 w-full">
                                  <Button variant="outline" className="flex-1">
                                    <X className="h-4 w-4 mr-1" />
                                    Tolak
                                  </Button>
                                  <Button className="flex-1 bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleApprove(tx.id)}>
                                    <Check className="h-4 w-4 mr-1" />
                                    Setujui
                                  </Button>
                                </div>
                              )}
                              
                              {tx.status !== "Menunggu Persetujuan" && (
                                <Button onClick={() => navigate(`/transaksi/${tx.id}`)}>
                                  Lihat Detail Lengkap
                                </Button>
                              )}
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        
                        {tx.status === "Menunggu Persetujuan" && (
                          <Button size="sm" className="bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleApprove(tx.id)}>
                            <Check className="h-4 w-4 mr-1" />
                            Setujui
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
      </div>
    </MainLayout>
  );
};

export default TransaksiPending;
