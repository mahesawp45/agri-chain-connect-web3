import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Search, 
  Filter, 
  MoreVertical, 
  ArrowDown, 
  ArrowUp, 
  Eye, 
  FileText, 
  ShoppingBag, 
  Truck,
  Plus,
  CreditCard
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate, formatCurrency } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";
import { Check } from 'lucide-react';

// Sample transaction data
const transactionsData = [
  {
    id: "TRX-2023-001",
    type: "regular",
    commodityId: "KM001",
    commodityName: "Beras Putih",
    quantity: 1000,
    unit: "kg",
    price: 12000,
    totalPrice: 12000000,
    status: "sudah_dikirim",
    buyerId: "BUY-001",
    buyerName: "PT Agrimax Food",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: "2023-12-10T08:30:00Z",
    updatedAt: "2023-12-15T14:25:00Z"
  },
  {
    id: "TRX-2023-002",
    type: "order_book",
    commodityId: "KM002",
    commodityName: "Jagung Manis",
    quantity: 500,
    unit: "kg",
    price: 8000,
    totalPrice: 4000000,
    status: "dibayar",
    buyerId: "BUY-002",
    buyerName: "Restoran Padang Jaya",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: "2023-12-08T10:45:00Z",
    updatedAt: "2023-12-14T11:30:00Z"
  },
  {
    id: "TRX-2023-003",
    type: "regular",
    commodityId: "KM003",
    commodityName: "Kedelai",
    quantity: 800,
    unit: "kg",
    price: 15000,
    totalPrice: 12000000,
    status: "selesai",
    buyerId: "BUY-003",
    buyerName: "Pabrik Tahu Murni",
    sellerId: "SEL-002",
    sellerName: "PT Agro Nusantara",
    createdAt: "2023-12-01T14:20:00Z",
    updatedAt: "2023-12-12T09:15:00Z"
  },
  {
    id: "TRX-2023-004",
    type: "order_book",
    commodityId: "KM004",
    commodityName: "Gula Aren",
    quantity: 300,
    unit: "kg",
    price: 35000,
    totalPrice: 10500000,
    status: "dikonfirmasi",
    buyerId: "BUY-004",
    buyerName: "PT Kue Indonesia",
    sellerId: "SEL-001",
    sellerName: "Koperasi Tani Makmur",
    createdAt: "2023-12-12T09:30:00Z",
    updatedAt: "2023-12-13T15:45:00Z"
  },
  {
    id: "TRX-2023-005",
    type: "regular",
    commodityId: "KM005",
    commodityName: "Kopi Arabika",
    quantity: 150,
    unit: "kg",
    price: 120000,
    totalPrice: 18000000,
    status: "menunggu_konfirmasi",
    buyerId: "BUY-005",
    buyerName: "Kafe Nusantara",
    sellerId: "SEL-003",
    sellerName: "Koperasi Petani Kopi Bali",
    createdAt: "2023-12-15T11:20:00Z",
    updatedAt: "2023-12-15T11:20:00Z"
  }
];

const Transaksi = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Filter transactions based on search query and status
  const filteredTransactions = transactionsData.filter((transaction) => {
    const matchesSearch =
      transaction.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.sellerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || transaction.status === statusFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "menunggu" && 
        (transaction.status === "menunggu_konfirmasi" || transaction.status === "dikonfirmasi")) ||
      (activeTab === "diproses" && 
        (transaction.status === "dibayar" || transaction.status === "persiapan_pengiriman")) ||
      (activeTab === "dikirim" && 
        (transaction.status === "sedang_dikirim" || transaction.status === "sudah_dikirim")) ||
      (activeTab === "selesai" && transaction.status === "selesai");

    return matchesSearch && matchesStatus && matchesTab;
  });

  // Function to handle view detail
  const handleViewDetail = (id: string) => {
    navigate(`/transaksi/${id}`);
  };

  // Function to render status badge with appropriate color
  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { label: string; className: string }> = {
      menunggu_konfirmasi: {
        label: t("status.pending"),
        className: "bg-blue-100 text-blue-800",
      },
      dikonfirmasi: {
        label: t("status.confirmed"),
        className: "bg-purple-100 text-purple-800",
      },
      negosiasi: {
        label: t("status.negotiating"),
        className: "bg-amber-100 text-amber-800",
      },
      dibayar: {
        label: t("status.paid"),
        className: "bg-emerald-100 text-emerald-800",
      },
      persiapan_pengiriman: {
        label: t("status.processing"),
        className: "bg-indigo-100 text-indigo-800",
      },
      sedang_dikirim: {
        label: t("status.shipping"),
        className: "bg-cyan-100 text-cyan-800",
      },
      sudah_dikirim: {
        label: t("status.shipped"),
        className: "bg-green-100 text-green-800",
      },
      diterima: {
        label: t("status.received"),
        className: "bg-teal-100 text-teal-800",
      },
      selesai: {
        label: t("status.completed"),
        className: "bg-green-100 text-green-800",
      },
      dibatalkan: {
        label: t("status.canceled"),
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

  // Function to render transaction type badge
  const getTypeBadge = (type: string) => {
    return (
      <Badge 
        variant="outline" 
        className={
          type === "order_book" 
            ? "bg-purple-50 text-purple-700 border-purple-200" 
            : "bg-blue-50 text-blue-700 border-blue-200"
        }
      >
        {type === "order_book" ? "Order Book" : "Regular"}
      </Badge>
    );
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">{t("transactions.title")}</h1>
            <p className="text-gray-600">{t("transactions.subtitle")}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button className="gap-2 bg-tani-green-dark hover:bg-tani-green-dark/90">
              <Plus className="h-4 w-4" />
              New Transaction
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-emerald-100 p-3 rounded-full mr-4">
                <ArrowDown className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Incoming</p>
                <p className="text-2xl font-bold">Rp 28,500,000</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <ArrowUp className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Outgoing</p>
                <p className="text-2xl font-bold">Rp 12,000,000</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-center p-4">
              <div className="bg-tani-yellow/20 p-3 rounded-full mr-4">
                <ShoppingBag className="h-6 w-6 text-tani-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Transactions</p>
                <p className="text-2xl font-bold">{transactionsData.length}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder={t("transactions.search")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select
                value={statusFilter}
                onValueChange={setStatusFilter}
              >
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("transactions.all")}</SelectItem>
                  <SelectItem value="menunggu_konfirmasi">{t("status.pending")}</SelectItem>
                  <SelectItem value="dikonfirmasi">{t("status.confirmed")}</SelectItem>
                  <SelectItem value="dibayar">{t("status.paid")}</SelectItem>
                  <SelectItem value="sudah_dikirim">{t("status.shipped")}</SelectItem>
                  <SelectItem value="selesai">{t("status.completed")}</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                {t("action.filter")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CreditCard className="h-5 w-5 mr-2 text-tani-green-dark" />
            {t("transactions.title")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">{t("transactions.all")}</TabsTrigger>
              <TabsTrigger value="menunggu">{t("transactions.pending")}</TabsTrigger>
              <TabsTrigger value="diproses">{t("status.processing")}</TabsTrigger>
              <TabsTrigger value="dikirim">{t("status.shipped")}</TabsTrigger>
              <TabsTrigger value="selesai">{t("status.completed")}</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("transactions.id")}</TableHead>
                      <TableHead>{t("transactions.date")}</TableHead>
                      <TableHead>{t("transactions.type")}</TableHead>
                      <TableHead>{t("transactions.commodity")}</TableHead>
                      <TableHead>{t("transactions.buyer")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("transactions.price")}</TableHead>
                      <TableHead>{t("transactions.status")}</TableHead>
                      <TableHead className="text-right">{t("transactions.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{transaction.commodityName}</span>
                              <span className="text-xs text-gray-500">
                                {transaction.quantity.toLocaleString()} {transaction.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyerName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(transaction.totalPrice)}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetail(transaction.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t("action.view")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Invoice
                                </DropdownMenuItem>
                                {(transaction.status === "dibayar" || transaction.status === "persiapan_pengiriman") && (
                                  <DropdownMenuItem>
                                    <Truck className="h-4 w-4 mr-2" />
                                    Ship Order
                                  </DropdownMenuItem>
                                )}
                                {transaction.status === "menunggu_konfirmasi" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-green-600">
                                      <Check className="h-4 w-4 mr-2" />
                                      Confirm Order
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {t("transactions.notfound")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            {/* Other tabs have similar structure */}
            <TabsContent value="menunggu" className="mt-0">
              {/* ... similar structure ... */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("transactions.id")}</TableHead>
                      <TableHead>{t("transactions.date")}</TableHead>
                      <TableHead>{t("transactions.type")}</TableHead>
                      <TableHead>{t("transactions.commodity")}</TableHead>
                      <TableHead>{t("transactions.buyer")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("transactions.price")}</TableHead>
                      <TableHead>{t("transactions.status")}</TableHead>
                      <TableHead className="text-right">{t("transactions.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{transaction.commodityName}</span>
                              <span className="text-xs text-gray-500">
                                {transaction.quantity.toLocaleString()} {transaction.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyerName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(transaction.totalPrice)}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewDetail(transaction.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {t("transactions.notfound")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Remaining tabs follow the same structure */}
            <TabsContent value="diproses" className="mt-0">
              {/* Same table structure */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("transactions.id")}</TableHead>
                      <TableHead>{t("transactions.date")}</TableHead>
                      <TableHead>{t("transactions.type")}</TableHead>
                      <TableHead>{t("transactions.commodity")}</TableHead>
                      <TableHead>{t("transactions.buyer")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("transactions.price")}</TableHead>
                      <TableHead>{t("transactions.status")}</TableHead>
                      <TableHead className="text-right">{t("transactions.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{transaction.commodityName}</span>
                              <span className="text-xs text-gray-500">
                                {transaction.quantity.toLocaleString()} {transaction.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyerName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(transaction.totalPrice)}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewDetail(transaction.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {t("transactions.notfound")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="dikirim" className="mt-0">
              {/* Same table structure */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("transactions.id")}</TableHead>
                      <TableHead>{t("transactions.date")}</TableHead>
                      <TableHead>{t("transactions.type")}</TableHead>
                      <TableHead>{t("transactions.commodity")}</TableHead>
                      <TableHead>{t("transactions.buyer")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("transactions.price")}</TableHead>
                      <TableHead>{t("transactions.status")}</TableHead>
                      <TableHead className="text-right">{t("transactions.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{transaction.commodityName}</span>
                              <span className="text-xs text-gray-500">
                                {transaction.quantity.toLocaleString()} {transaction.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyerName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(transaction.totalPrice)}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleViewDetail(transaction.id)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {t("transactions.notfound")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="selesai" className="mt-0">
              {/* Same table structure */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t("transactions.id")}</TableHead>
                      <TableHead>{t("transactions.date")}</TableHead>
                      <TableHead>{t("transactions.type")}</TableHead>
                      <TableHead>{t("transactions.commodity")}</TableHead>
                      <TableHead>{t("transactions.buyer")}</TableHead>
                      <TableHead className="hidden md:table-cell">{t("transactions.price")}</TableHead>
                      <TableHead>{t("transactions.status")}</TableHead>
                      <TableHead className="text-right">{t("transactions.action")}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">{transaction.id}</TableCell>
                          <TableCell>{formatDate(new Date(transaction.createdAt))}</TableCell>
                          <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{transaction.commodityName}</span>
                              <span className="text-xs text-gray-500">
                                {transaction.quantity.toLocaleString()} {transaction.unit}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{transaction.buyerName}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {formatCurrency(transaction.totalPrice)}
                          </TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetail(transaction.id)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  {t("action.view")}
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  View Invoice
                                </DropdownMenuItem>
                                {(transaction.status === "dibayar" || transaction.status === "persiapan_pengiriman") && (
                                  <DropdownMenuItem>
                                    <Truck className="h-4 w-4 mr-2" />
                                    Ship Order
                                  </DropdownMenuItem>
                                )}
                                {transaction.status === "menunggu_konfirmasi" && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-green-600">
                                      <Check className="h-4 w-4 mr-2" />
                                      Confirm Order
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          {t("transactions.notfound")}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Transaksi;
