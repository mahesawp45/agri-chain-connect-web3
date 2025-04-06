import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  ClipboardList,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  CalendarIcon,
  ShoppingCart,
  AlertCircle,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { DateRange } from "react-day-picker";

// Mock data for order books
const orderBooksData = [
  {
    id: "OB259",
    buyerName: "PT Indofood Sukses Makmur",
    commodity: "Beras Putih",
    gradeRequired: "Premium",
    quantity: 1000,
    unit: "kg",
    deadline: "2025-05-15",
    location: "Jawa Barat",
    estimatedPrice: 17500000,
    description: "Beras putih premium untuk kebutuhan produksi mie instan",
    status: "menunggu_konfirmasi"
  },
  {
    id: "OB258",
    buyerName: "PT Mayora Indah",
    commodity: "Kopi Arabika",
    gradeRequired: "Premium",
    quantity: 500,
    unit: "kg",
    deadline: "2025-05-10",
    location: "Bali, Aceh",
    estimatedPrice: 35000000,
    description: "Kopi Arabika kualitas premium untuk produk kopi instan",
    status: "menunggu_konfirmasi"
  },
  {
    id: "OB257",
    buyerName: "PT Sinar Mas Agro",
    commodity: "Kedelai",
    gradeRequired: "A",
    quantity: 2500,
    unit: "kg",
    deadline: "2025-05-05",
    location: "Jawa Timur",
    estimatedPrice: 37500000,
    description: "Kedelai berkualitas untuk produksi minyak kedelai dan produk turunannya",
    status: "menunggu_konfirmasi"
  },
  {
    id: "OB256",
    buyerName: "PT ABC President",
    commodity: "Gula Aren",
    gradeRequired: "Premium",
    quantity: 750,
    unit: "kg",
    deadline: "2025-04-30",
    location: "Jawa Barat",
    estimatedPrice: 22500000,
    description: "Gula aren organik untuk produksi minuman ready-to-drink",
    status: "accepted"
  },
  {
    id: "OB255",
    buyerName: "PT Nestle Indonesia",
    commodity: "Jagung Manis",
    gradeRequired: "A",
    quantity: 1500,
    unit: "kg",
    deadline: "2025-04-25",
    location: "Jawa Timur",
    estimatedPrice: 22500000,
    description: "Jagung manis berkualitas untuk bahan baku produk makanan",
    status: "accepted"
  },
  {
    id: "OB254",
    buyerName: "PT Heinz ABC",
    commodity: "Cabai Merah",
    gradeRequired: "B",
    quantity: 300,
    unit: "kg",
    deadline: "2025-04-20",
    location: "Jawa Barat",
    estimatedPrice: 9000000,
    description: "Cabai merah untuk produksi saus sambal",
    status: "expired"
  },
];

// Mock data for commodity list
const myKomoditasData = [
  { 
    id: "KM001", 
    name: "Beras Putih", 
    type: "Padi", 
    quantity: 5000, 
    unit: "kg", 
    grade: "Premium", 
    location: "Cianjur, Jawa Barat" 
  },
  { 
    id: "KM002", 
    name: "Jagung Manis", 
    type: "Jagung", 
    quantity: 2500, 
    unit: "kg", 
    grade: "A", 
    location: "Malang, Jawa Timur" 
  },
  { 
    id: "KM003", 
    name: "Kedelai", 
    type: "Kedelai", 
    quantity: 1800, 
    unit: "kg", 
    grade: "B", 
    location: "Jember, Jawa Timur" 
  },
];

const OrderBook = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("available");
  const [status, setStatus] = useState<string>("");
  const [commodity, setCommodity] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState(false);
  const [selectedOrderBook, setSelectedOrderBook] = useState<typeof orderBooksData[0] | null>(null);
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { toast } = useToast();

  // Handle viewing order book details
  const handleViewOrderBook = (orderBook: typeof orderBooksData[0]) => {
    setSelectedOrderBook(orderBook);
    setDetailDialogOpen(true);
  };

  // Handle accepting an order book
  const handleAcceptOrderBook = () => {
    setDetailDialogOpen(false);
    setAcceptDialogOpen(true);
  };

  // Handle submit order book acceptance
  const handleSubmitAcceptance = () => {
    if (selectedOrderBook && selectedCommodities.length > 0 && agreedToTerms) {
      toast({
        title: "Order Book Diterima",
        description: `Anda telah berhasil menerima order book ${selectedOrderBook.id}`,
      });
      setAcceptDialogOpen(false);
      setSelectedCommodities([]);
      setAgreedToTerms(false);
    } else {
      toast({
        variant: "destructive",
        title: "Terjadi Kesalahan",
        description: "Pilih komoditas dan setujui syarat & ketentuan untuk melanjutkan",
      });
    }
  };

  // Apply filters to order books
  const filteredOrderBooks = orderBooksData.filter(orderBook => {
    // Text search
    const textMatch = 
      orderBook.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderBook.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      orderBook.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const tabMatch = 
      (tab === "available" && (orderBook.status === "menunggu_konfirmasi")) ||
      (tab === "accepted" && orderBook.status === "accepted") ||
      (tab === "all");
    
    // Status filter
    const statusMatch = !status || orderBook.status === status;
    
    // Commodity filter
    const commodityMatch = !commodity || orderBook.commodity === commodity;
    
    // Date range filter
    let dateMatch = true;
    if (dateRange?.from) {
      const orderBookDate = new Date(orderBook.deadline);
      if (dateRange.from && orderBookDate < orderBookDate) {
        dateMatch = false;
      }
      if (dateRange.to && orderBookDate > dateRange.to) {
        dateMatch = false;
      }
    }
    
    return textMatch && tabMatch && statusMatch && commodityMatch && dateMatch;
  });

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string, label: string }> = {
      menunggu_konfirmasi: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Tersedia" },
      accepted: { color: "bg-green-50 text-green-700 border-green-200", label: "Diambil" },
      completed: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Selesai" },
      expired: { color: "bg-gray-50 text-gray-700 border-gray-200", label: "Kedaluwarsa" },
      cancelled: { color: "bg-red-50 text-red-700 border-red-200", label: "Dibatalkan" },
    };
    
    return (
      <Badge 
        variant="outline" 
        className={statusConfig[status]?.color || "bg-gray-50 text-gray-700 border-gray-200"}
      >
        {statusConfig[status]?.label || status.replace(/_/g, ' ')}
      </Badge>
    );
  };

  // Find compatible commodities for an order book
  const findCompatibleCommodities = (orderBook: typeof orderBooksData[0]) => {
    return myKomoditasData.filter(komoditas => 
      komoditas.name === orderBook.commodity && 
      komoditas.grade === orderBook.gradeRequired &&
      komoditas.quantity >= orderBook.quantity
    );
  };

  // Toggle selection of a commodity
  const toggleCommoditySelection = (id: string) => {
    setSelectedCommodities(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Order Book</h1>
        <p className="text-gray-600">Lihat dan terima permintaan komoditas dari pembeli</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder="Cari order book..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={commodity} onValueChange={setCommodity}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Komoditas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Komoditas</SelectItem>
                  <SelectItem value="Beras Putih">Beras Putih</SelectItem>
                  <SelectItem value="Jagung Manis">Jagung Manis</SelectItem>
                  <SelectItem value="Kedelai">Kedelai</SelectItem>
                  <SelectItem value="Gula Aren">Gula Aren</SelectItem>
                  <SelectItem value="Kopi Arabika">Kopi Arabika</SelectItem>
                  <SelectItem value="Cabai Merah">Cabai Merah</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="menunggu_konfirmasi">Tersedia</SelectItem>
                  <SelectItem value="accepted">Diambil</SelectItem>
                  <SelectItem value="completed">Selesai</SelectItem>
                  <SelectItem value="expired">Kedaluwarsa</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: id })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: id })
                      )
                    ) : (
                      "Tenggat waktu"
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ClipboardList className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Order Book
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="available" value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="available">Tersedia</TabsTrigger>
              <TabsTrigger value="accepted">Diambil</TabsTrigger>
              <TabsTrigger value="all">Semua</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="mt-0">
              <OrderBookTable 
                orderBooks={filteredOrderBooks} 
                getStatusBadge={getStatusBadge}
                onViewOrderBook={handleViewOrderBook}
              />
            </TabsContent>
            <TabsContent value="accepted" className="mt-0">
              <OrderBookTable 
                orderBooks={filteredOrderBooks} 
                getStatusBadge={getStatusBadge}
                onViewOrderBook={handleViewOrderBook}
              />
            </TabsContent>
            <TabsContent value="all" className="mt-0">
              <OrderBookTable 
                orderBooks={filteredOrderBooks} 
                getStatusBadge={getStatusBadge}
                onViewOrderBook={handleViewOrderBook}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Book Detail Dialog */}
      {selectedOrderBook && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Order Book</DialogTitle>
              <DialogDescription>
                {selectedOrderBook.id} - Tenggat: {formatDate(new Date(selectedOrderBook.deadline))}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Status</span>
                {getStatusBadge(selectedOrderBook.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pembeli</h4>
                  <p className="font-medium">{selectedOrderBook.buyerName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Komoditas</h4>
                  <p className="font-medium">{selectedOrderBook.commodity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Grade</h4>
                  <p className="font-medium">{selectedOrderBook.gradeRequired}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kuantitas</h4>
                  <p className="font-medium">{selectedOrderBook.quantity} {selectedOrderBook.unit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Lokasi</h4>
                  <p className="font-medium">{selectedOrderBook.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estimasi Harga</h4>
                  <p className="font-medium text-tani-green-dark">{formatCurrency(selectedOrderBook.estimatedPrice)}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Deskripsi</h4>
                <p className="text-sm">{selectedOrderBook.description}</p>
              </div>
              
              {selectedOrderBook.status === "menunggu_konfirmasi" && (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-700" />
                  <AlertTitle className="text-blue-700">Informasi</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Jika Anda memiliki komoditas yang sesuai dengan permintaan ini, Anda dapat menerima order book ini.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                Tutup
              </Button>
              
              {selectedOrderBook.status === "menunggu_konfirmasi" && (
                <Button onClick={handleAcceptOrderBook} className="gap-2">
                  <CheckCircle className="h-4 w-4" />
                  Terima Order Book
                </Button>
              )}
              
              {selectedOrderBook.status === "accepted" && (
                <Button onClick={() => {
                  toast({
                    title: "Halaman transaksi dibuka",
                    description: "Anda telah diarahkan ke halaman detail transaksi",
                  });
                  setDetailDialogOpen(false);
                }} className="gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Lihat Transaksi
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Accept Order Book Dialog */}
      {selectedOrderBook && (
        <Dialog open={acceptDialogOpen} onOpenChange={setAcceptDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Terima Order Book</DialogTitle>
              <DialogDescription>
                Pilih komoditas Anda yang sesuai dengan permintaan ini
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Ringkasan Permintaan</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Komoditas:</span>
                    <span className="font-medium">{selectedOrderBook.commodity}</span
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Grade:</span>
                    <span className="font-medium">{selectedOrderBook.gradeRequired}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Kuantitas:</span>
                    <span className="font-medium">{selectedOrderBook.quantity} {selectedOrderBook.unit}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Komoditas Anda</h3>
                {findCompatibleCommodities(selectedOrderBook).length > 0 ? (
                  <div className="space-y-2">
                    {findCompatibleCommodities(selectedOrderBook).map((komoditas) => (
                      <div 
                        key={komoditas.id} 
                        className="flex items-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-gray-50"
                        onClick={() => toggleCommoditySelection(komoditas.id)}
                      >
                        <Checkbox 
                          id={komoditas.id} 
                          checked={selectedCommodities.includes(komoditas.id)}
                          onCheckedChange={() => toggleCommoditySelection(komoditas.id)}
                        />
                        <div className="flex-1">
                          <label 
                            htmlFor={komoditas.id} 
                            className="text-sm font-medium cursor-pointer flex items-center"
                          >
                            <Package className="h-4 w-4 mr-2 text-tani-green-dark" />
                            {komoditas.name} - {komoditas.id}
                          </label>
                          <div className="text-xs text-gray-500 mt-1">
                            <span className="mr-4">Grade: {komoditas.grade}</span>
                            <span className="mr-4">Stok: {komoditas.quantity} {komoditas.unit}</span>
                            <span>Lokasi: {komoditas.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Tidak Ada Komoditas yang Sesuai</AlertTitle>
                    <AlertDescription>
                      Anda belum memiliki komoditas yang sesuai dengan permintaan ini. Silakan tambahkan komoditas terlebih dahulu.
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="flex items-center space-x-2 pt-4">
                <Checkbox 
                  id="terms" 
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
                />
                <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
                  Saya menyetujui syarat dan ketentuan yang berlaku untuk transaksi Order Book ini
                </label>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setAcceptDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                onClick={handleSubmitAcceptance} 
                disabled={selectedCommodities.length === 0 || !agreedToTerms}
              >
                Terima Order Book
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

interface OrderBookTableProps {
  orderBooks: typeof orderBooksData;
  getStatusBadge: (status: string) => JSX.Element;
  onViewOrderBook: (orderBook: typeof orderBooksData[0]) => void;
}

const OrderBookTable = ({ orderBooks, getStatusBadge, onViewOrderBook }: OrderBookTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pembeli</TableHead>
            <TableHead className="hidden md:table-cell">Komoditas</TableHead>
            <TableHead className="hidden lg:table-cell">Tenggat</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderBooks.length > 0 ? (
            orderBooks.map((orderBook) => (
              <TableRow key={orderBook.id}>
                <TableCell className="font-medium">{orderBook.id}</TableCell>
                <TableCell>{orderBook.buyerName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {orderBook.commodity} ({orderBook.quantity} {orderBook.unit})
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(new Date(orderBook.deadline))}
                </TableCell>
                <TableCell>{getStatusBadge(orderBook.status)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onViewOrderBook(orderBook)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Tidak ada order book yang ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderBook;
