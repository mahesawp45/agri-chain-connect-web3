import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { ClipboardList, Search, Calendar, Filter, Eye, Check, X } from "lucide-react";
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
import { formatDate } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample order book data
const orderBooks = [
  {
    id: "OB-2023-001",
    buyerName: "PT Agrimax",
    commodityType: "Padi",
    quantity: 1000,
    unit: "kg",
    requestedGrade: "A",
    requestedDeliveryDate: new Date("2023-12-15"),
    offerExpiryDate: new Date("2023-11-30"),
    status: "open",
    termsConditions: "Kualitas premium, kadar air maksimal 14%",
    createdAt: new Date("2023-11-05"),
  },
  {
    id: "OB-2023-002",
    buyerName: "Restoran Padang Jaya",
    commodityType: "Kedelai",
    quantity: 500,
    unit: "kg",
    requestedGrade: "Premium",
    requestedDeliveryDate: new Date("2023-12-10"),
    offerExpiryDate: new Date("2023-11-25"),
    status: "accepted",
    termsConditions: "Ukuran biji seragam, bebas kotoran",
    createdAt: new Date("2023-11-08"),
  },
  {
    id: "OB-2023-003",
    buyerName: "Pabrik Tepung Makmur",
    commodityType: "Jagung",
    quantity: 2000,
    unit: "kg",
    requestedGrade: "B",
    requestedDeliveryDate: new Date("2023-12-20"),
    offerExpiryDate: new Date("2023-12-05"),
    status: "open",
    termsConditions: "Jagung kering, tidak berjamur",
    createdAt: new Date("2023-11-10"),
  },
  {
    id: "OB-2023-004",
    buyerName: "Kafe Denpasar",
    commodityType: "Kopi",
    quantity: 200,
    unit: "kg",
    requestedGrade: "Premium",
    requestedDeliveryDate: new Date("2023-12-05"),
    offerExpiryDate: new Date("2023-11-20"),
    status: "completed",
    termsConditions: "Biji kopi arabika, roasting medium",
    createdAt: new Date("2023-11-01"),
  },
  {
    id: "OB-2023-005",
    buyerName: "Pabrik Gula Jawa",
    commodityType: "Gula",
    quantity: 1500,
    unit: "kg",
    requestedGrade: "A",
    requestedDeliveryDate: new Date("2023-12-25"),
    offerExpiryDate: new Date("2023-12-10"),
    status: "expired",
    termsConditions: "Gula kristal putih, kemasan 50kg",
    createdAt: new Date("2023-10-25"),
  },
];

const OrderBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter order books based on search query and status
  const filteredOrderBooks = orderBooks.filter((orderBook) => {
    const matchesSearch =
      orderBook.commodityType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderBook.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderBook.buyerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || orderBook.status === statusFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "open" && orderBook.status === "open") ||
      (activeTab === "accepted" && orderBook.status === "accepted") ||
      (activeTab === "completed" && orderBook.status === "completed") ||
      (activeTab === "expired" && 
        (orderBook.status === "expired" || orderBook.status === "cancelled"));

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      open: {
        label: "Terbuka",
        className: "bg-blue-100 text-blue-800",
      },
      accepted: {
        label: "Diterima",
        className: "bg-green-100 text-green-800",
      },
      completed: {
        label: "Selesai",
        className: "bg-teal-100 text-teal-800",
      },
      expired: {
        label: "Kedaluwarsa",
        className: "bg-gray-100 text-gray-800",
      },
      cancelled: {
        label: "Dibatalkan",
        className: "bg-red-100 text-red-800",
      },
    };

    const statusInfo = statusMap[status] || {
      label: status,
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
        <h1 className="text-2xl font-bold mb-2">Order Book</h1>
        <p className="text-gray-600">Lihat dan terima permintaan komoditas dari pembeli</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Order Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Cari order book..."
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
                    <SelectItem value="open">Terbuka</SelectItem>
                    <SelectItem value="accepted">Diterima</SelectItem>
                    <SelectItem value="completed">Selesai</SelectItem>
                    <SelectItem value="expired">Kedaluwarsa</SelectItem>
                    <SelectItem value="cancelled">Dibatalkan</SelectItem>
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
                <TabsTrigger value="open">Terbuka</TabsTrigger>
                <TabsTrigger value="accepted">Diterima</TabsTrigger>
                <TabsTrigger value="completed">Selesai</TabsTrigger>
                <TabsTrigger value="expired">Kedaluwarsa</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Order</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Tanggal Pengiriman</TableHead>
                        <TableHead>Tanggal Kedaluwarsa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrderBooks.length > 0 ? (
                        filteredOrderBooks.map((orderBook) => (
                          <TableRow key={orderBook.id}>
                            <TableCell className="font-medium">{orderBook.id}</TableCell>
                            <TableCell>{orderBook.buyerName}</TableCell>
                            <TableCell>{orderBook.commodityType}</TableCell>
                            <TableCell>
                              {orderBook.quantity} {orderBook.unit}
                            </TableCell>
                            <TableCell>{orderBook.requestedGrade}</TableCell>
                            <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(orderBook.offerExpiryDate)}</TableCell>
                            <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                {orderBook.status === "open" && (
                                  <>
                                    <Button variant="ghost" size="icon" className="text-green-600">
                                      <Check className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="text-red-600">
                                      <X className="h-4 w-4" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                            Tidak ada order book yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Other tabs have similar structure but filtered by status */}
              <TabsContent value="open" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Order</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Tanggal Pengiriman</TableHead>
                        <TableHead>Tanggal Kedaluwarsa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrderBooks.length > 0 ? (
                        filteredOrderBooks.map((orderBook) => (
                          <TableRow key={orderBook.id}>
                            <TableCell className="font-medium">{orderBook.id}</TableCell>
                            <TableCell>{orderBook.buyerName}</TableCell>
                            <TableCell>{orderBook.commodityType}</TableCell>
                            <TableCell>
                              {orderBook.quantity} {orderBook.unit}
                            </TableCell>
                            <TableCell>{orderBook.requestedGrade}</TableCell>
                            <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(orderBook.offerExpiryDate)}</TableCell>
                            <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-green-600">
                                  <Check className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-600">
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                            Tidak ada order book terbuka yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              {/* Similar structures for accepted, completed, and expired tabs */}
              <TabsContent value="accepted" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Order</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Tanggal Pengiriman</TableHead>
                        <TableHead>Tanggal Kedaluwarsa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrderBooks.length > 0 ? (
                        filteredOrderBooks.map((orderBook) => (
                          <TableRow key={orderBook.id}>
                            <TableCell className="font-medium">{orderBook.id}</TableCell>
                            <TableCell>{orderBook.buyerName}</TableCell>
                            <TableCell>{orderBook.commodityType}</TableCell>
                            <TableCell>
                              {orderBook.quantity} {orderBook.unit}
                            </TableCell>
                            <TableCell>{orderBook.requestedGrade}</TableCell>
                            <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(orderBook.offerExpiryDate)}</TableCell>
                            <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                            Tidak ada order book diterima yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Order</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Tanggal Pengiriman</TableHead>
                        <TableHead>Tanggal Kedaluwarsa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrderBooks.length > 0 ? (
                        filteredOrderBooks.map((orderBook) => (
                          <TableRow key={orderBook.id}>
                            <TableCell className="font-medium">{orderBook.id}</TableCell>
                            <TableCell>{orderBook.buyerName}</TableCell>
                            <TableCell>{orderBook.commodityType}</TableCell>
                            <TableCell>
                              {orderBook.quantity} {orderBook.unit}
                            </TableCell>
                            <TableCell>{orderBook.requestedGrade}</TableCell>
                            <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(orderBook.offerExpiryDate)}</TableCell>
                            <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                            Tidak ada order book selesai yang ditemukan
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="expired" className="mt-0">
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID Order</TableHead>
                        <TableHead>Pembeli</TableHead>
                        <TableHead>Komoditas</TableHead>
                        <TableHead>Kuantitas</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Tanggal Pengiriman</TableHead>
                        <TableHead>Tanggal Kedaluwarsa</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrderBooks.length > 0 ? (
                        filteredOrderBooks.map((orderBook) => (
                          <TableRow key={orderBook.id}>
                            <TableCell className="font-medium">{orderBook.id}</TableCell>
                            <TableCell>{orderBook.buyerName}</TableCell>
                            <TableCell>{orderBook.commodityType}</TableCell>
                            <TableCell>
                              {orderBook.quantity} {orderBook.unit}
                            </TableCell>
                            <TableCell>{orderBook.requestedGrade}</TableCell>
                            <TableCell>{formatDate(orderBook.requestedDeliveryDate)}</TableCell>
                            <TableCell>{formatDate(orderBook.offerExpiryDate)}</TableCell>
                            <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                            Tidak ada order book kedaluwarsa yang ditemukan
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

export default OrderBook;
