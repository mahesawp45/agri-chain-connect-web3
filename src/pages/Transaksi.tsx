
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ShoppingCart, Search, Filter, Eye, CheckCheck, XCircle } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample transaction data
const transactions = [
  {
    id: "TX-2023-001",
    date: new Date("2023-11-05"),
    commodityName: "Beras Putih",
    quantity: 500,
    unit: "kg",
    price: 10000,
    totalPrice: 5000000,
    status: "dikonfirmasi",
    buyerName: "PT Agrimax",
  },
  {
    id: "TX-2023-002",
    date: new Date("2023-11-08"),
    commodityName: "Jagung Manis",
    quantity: 300,
    unit: "kg",
    price: 8000,
    totalPrice: 2400000,
    status: "dibayar",
    buyerName: "Supermarket Sinar",
  },
  {
    id: "TX-2023-003",
    date: new Date("2023-11-10"),
    commodityName: "Kedelai",
    quantity: 1000,
    unit: "kg",
    price: 12000,
    totalPrice: 12000000,
    status: "selesai",
    buyerName: "Pabrik Tahu Jaya",
  },
  {
    id: "TX-2023-004",
    date: new Date("2023-11-12"),
    commodityName: "Kopi Arabika",
    quantity: 50,
    unit: "kg",
    price: 80000,
    totalPrice: 4000000,
    status: "sedang_dikirim",
    buyerName: "Kafe Denpasar",
  },
  {
    id: "TX-2023-005",
    date: new Date("2023-11-15"),
    commodityName: "Gula Aren",
    quantity: 200,
    unit: "kg",
    price: 25000,
    totalPrice: 5000000,
    status: "menunggu_konfirmasi",
    buyerName: "Toko Kue Bogor",
  },
];

const Transaksi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on search query and status
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.buyerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" &&
        ["menunggu_konfirmasi", "dikonfirmasi", "dibayar", "sedang_dikirim"].includes(
          transaction.status
        )) ||
      (activeTab === "completed" && transaction.status === "selesai") ||
      (activeTab === "canceled" && transaction.status === "dibatalkan");

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      menunggu_konfirmasi: {
        label: "Menunggu Konfirmasi",
        className: "bg-yellow-100 text-yellow-800",
      },
      dikonfirmasi: {
        label: "Dikonfirmasi",
        className: "bg-blue-100 text-blue-800",
      },
      dibayar: {
        label: "Dibayar",
        className: "bg-green-100 text-green-800",
      },
      sedang_dikirim: {
        label: "Sedang Dikirim",
        className: "bg-blue-100 text-blue-800",
      },
      selesai: {
        label: "Selesai",
        className: "bg-teal-100 text-teal-800",
      },
      dibatalkan: {
        label: "Dibatalkan",
        className: "bg-red-100 text-red-800",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status.replace(/_/g, " "),
      className: "bg-gray-100 text-gray-800",
    };

    return (
      <Badge className={`${statusInfo.className}`}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Transaksi</h1>
        <p className="text-gray-600">Kelola transaksi komoditas Anda</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari transaksi..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={statusFilter}
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Status</SelectItem>
                    <SelectItem value="menunggu_konfirmasi">Menunggu Konfirmasi</SelectItem>
                    <SelectItem value="dikonfirmasi">Dikonfirmasi</SelectItem>
                    <SelectItem value="dibayar">Dibayar</SelectItem>
                    <SelectItem value="sedang_dikirim">Sedang Dikirim</SelectItem>
                    <SelectItem value="selesai">Selesai</SelectItem>
                    <SelectItem value="dibatalkan">Dibatalkan</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  Filter Lanjutan
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="active">Aktif</TabsTrigger>
                <TabsTrigger value="completed">Selesai</TabsTrigger>
                <TabsTrigger value="canceled">Dibatalkan</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Harga Total</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>{transaction.commodityName}</TableCell>
                            <TableCell>
                              {transaction.quantity} {transaction.unit}
                            </TableCell>
                            <TableCell>{formatCurrency(transaction.totalPrice)}</TableCell>
                            <TableCell>{transaction.buyerName}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {["menunggu_konfirmasi", "dikonfirmasi"].includes(
                                  transaction.status
                                ) && (
                                  <>
                                    <Button variant="ghost" size="icon" className="text-green-600">
                                      <CheckCheck className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Tidak ada transaksi yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="active" className="mt-0">
                {/* Same table structure as "all" tab, filtered for active transactions */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Harga Total</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>{transaction.commodityName}</TableCell>
                            <TableCell>
                              {transaction.quantity} {transaction.unit}
                            </TableCell>
                            <TableCell>{formatCurrency(transaction.totalPrice)}</TableCell>
                            <TableCell>{transaction.buyerName}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {["menunggu_konfirmasi", "dikonfirmasi"].includes(
                                  transaction.status
                                ) && (
                                  <>
                                    <Button variant="ghost" size="icon" className="text-green-600">
                                      <CheckCheck className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600">
                                      <XCircle className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Tidak ada transaksi aktif yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="completed" className="mt-0">
                {/* Same table structure, filtered for completed transactions */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Harga Total</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>{transaction.commodityName}</TableCell>
                            <TableCell>
                              {transaction.quantity} {transaction.unit}
                            </TableCell>
                            <TableCell>{formatCurrency(transaction.totalPrice)}</TableCell>
                            <TableCell>{transaction.buyerName}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Tidak ada transaksi selesai yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              <TabsContent value="canceled" className="mt-0">
                {/* Same table structure, filtered for canceled transactions */}
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Transaksi</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Harga Total</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{formatDate(transaction.date)}</TableCell>
                            <TableCell>{transaction.commodityName}</TableCell>
                            <TableCell>
                              {transaction.quantity} {transaction.unit}
                            </TableCell>
                            <TableCell>{formatCurrency(transaction.totalPrice)}</TableCell>
                            <TableCell>{transaction.buyerName}</TableCell>
                            <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            Tidak ada transaksi dibatalkan yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Transaksi;
