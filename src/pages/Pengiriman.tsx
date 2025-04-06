
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
  Truck,
  Search,
  Package,
  Eye,
  Check,
  Clock,
  CalendarIcon,
  MapPin,
  CheckCircle2,
  CircleAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for deliveries
const deliveriesData = [
  {
    id: "DEL7825",
    transactionId: "TX7825",
    buyerName: "PT Agrimax",
    commodity: "Beras Putih",
    quantity: 500,
    unit: "kg",
    date: "2025-04-05",
    status: "persiapan_pengiriman",
    destination: "Jakarta Pusat",
    estimatedArrival: "2025-04-08",
    origin: "Cianjur, Jawa Barat",
    contact: "0812-3456-7890"
  },
  {
    id: "DEL7824",
    transactionId: "TX7824",
    buyerName: "CV Pangan Sejahtera",
    commodity: "Jagung Manis",
    quantity: 250,
    unit: "kg",
    date: "2025-04-04",
    status: "sedang_dikirim",
    destination: "Bandung",
    estimatedArrival: "2025-04-07",
    origin: "Malang, Jawa Timur",
    contact: "0813-2345-6789"
  },
  {
    id: "DEL7823",
    transactionId: "TX7823",
    buyerName: "PT Indofood",
    commodity: "Kedelai",
    quantity: 1000,
    unit: "kg",
    date: "2025-04-03",
    status: "sudah_dikirim",
    destination: "Tangerang",
    estimatedArrival: "2025-04-06",
    origin: "Jember, Jawa Timur",
    contact: "0814-3456-7890"
  },
  {
    id: "DEL7822",
    transactionId: "TX7822",
    buyerName: "PT Gula Nusantara",
    commodity: "Gula Aren",
    quantity: 100,
    unit: "kg",
    date: "2025-04-01",
    status: "diterima",
    destination: "Jakarta Selatan",
    estimatedArrival: "2025-04-04",
    origin: "Bandung, Jawa Barat",
    contact: "0815-4567-8901"
  },
  {
    id: "DEL7821",
    transactionId: "TX7821",
    buyerName: "PT Kopi Indonesia",
    commodity: "Kopi Arabika",
    quantity: 75,
    unit: "kg",
    date: "2025-03-30",
    status: "selesai",
    destination: "Surabaya",
    estimatedArrival: "2025-04-02",
    origin: "Bali",
    contact: "0816-5678-9012"
  },
];

const Pengiriman = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [status, setStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<typeof deliveriesData[0] | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { toast } = useToast();

  // Handle viewing delivery details
  const handleViewDelivery = (delivery: typeof deliveriesData[0]) => {
    setSelectedDelivery(delivery);
    setDetailDialogOpen(true);
  };

  // Handle updating delivery status to "sudah_dikirim"
  const handleUpdateStatus = () => {
    setDetailDialogOpen(false);
    setConfirmationDialogOpen(true);
  };

  // Handle confirming status update
  const handleConfirmStatusUpdate = () => {
    if (selectedDelivery) {
      toast({
        title: "Status Pengiriman Diperbarui",
        description: `Pengiriman ${selectedDelivery.id} telah diperbarui statusnya menjadi 'Sudah Dikirim'`,
      });
      setConfirmationDialogOpen(false);
    }
  };

  // Apply filters to deliveries
  const filteredDeliveries = deliveriesData.filter(delivery => {
    // Text search
    const textMatch = 
      delivery.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      delivery.destination.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const tabMatch = 
      tab === "all" || 
      (tab === "pending" && (delivery.status === "persiapan_pengiriman" || delivery.status === "sedang_dikirim")) || 
      (tab === "completed" && (delivery.status === "sudah_dikirim" || delivery.status === "diterima" || delivery.status === "selesai"));
    
    // Status filter
    const statusMatch = !status || delivery.status === status;
    
    // Date range filter
    let dateMatch = true;
    if (dateRange.from) {
      const deliveryDate = new Date(delivery.date);
      if (dateRange.from && deliveryDate < dateRange.from) {
        dateMatch = false;
      }
      if (dateRange.to && deliveryDate > dateRange.to) {
        dateMatch = false;
      }
    }
    
    return textMatch && tabMatch && statusMatch && dateMatch;
  });

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string, label: string }> = {
      persiapan_pengiriman: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Persiapan Pengiriman" },
      sedang_dikirim: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Sedang Dikirim" },
      sudah_dikirim: { color: "bg-green-50 text-green-700 border-green-200", label: "Sudah Dikirim" },
      diterima: { color: "bg-teal-50 text-teal-700 border-teal-200", label: "Diterima" },
      selesai: { color: "bg-green-50 text-green-700 border-green-200", label: "Selesai" }
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

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Pengiriman</h1>
        <p className="text-gray-600">Kelola pengiriman komoditas ke pembeli</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder="Cari pengiriman..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="persiapan_pengiriman">Persiapan Pengiriman</SelectItem>
                  <SelectItem value="sedang_dikirim">Sedang Dikirim</SelectItem>
                  <SelectItem value="sudah_dikirim">Sudah Dikirim</SelectItem>
                  <SelectItem value="diterima">Diterima</SelectItem>
                  <SelectItem value="selesai">Selesai</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "dd MMM yyyy", { locale: id })} -{" "}
                          {format(dateRange.to, "dd MMM yyyy", { locale: id })}
                        </>
                      ) : (
                        format(dateRange.from, "dd MMM yyyy", { locale: id })
                      )
                    ) : (
                      "Tanggal pengiriman"
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
            <Truck className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Pengiriman
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="pending">Dalam Proses</TabsTrigger>
              <TabsTrigger value="completed">Selesai</TabsTrigger>
            </TabsList>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Pembeli</TableHead>
                    <TableHead className="hidden md:table-cell">Komoditas</TableHead>
                    <TableHead className="hidden lg:table-cell">Tujuan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDeliveries.length > 0 ? (
                    filteredDeliveries.map((delivery) => (
                      <TableRow key={delivery.id}>
                        <TableCell className="font-medium">{delivery.id}</TableCell>
                        <TableCell>{delivery.buyerName}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {delivery.commodity} ({delivery.quantity} {delivery.unit})
                        </TableCell>
                        <TableCell className="hidden lg:table-cell">
                          {delivery.destination}
                        </TableCell>
                        <TableCell>{getStatusBadge(delivery.status)}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleViewDelivery(delivery)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        Tidak ada pengiriman yang ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delivery Detail Dialog */}
      {selectedDelivery && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Pengiriman</DialogTitle>
              <DialogDescription>
                {selectedDelivery.id} - {selectedDelivery.transactionId}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Status</span>
                {getStatusBadge(selectedDelivery.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pembeli</h4>
                  <p className="font-medium">{selectedDelivery.buyerName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kontak</h4>
                  <p className="font-medium">{selectedDelivery.contact}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Komoditas</h4>
                  <p className="font-medium">{selectedDelivery.commodity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kuantitas</h4>
                  <p className="font-medium">{selectedDelivery.quantity} {selectedDelivery.unit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Asal</h4>
                  <p className="font-medium">{selectedDelivery.origin}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tujuan</h4>
                  <p className="font-medium">{selectedDelivery.destination}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Tanggal Pengiriman</h4>
                  <p className="font-medium">{formatDate(new Date(selectedDelivery.date))}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Estimasi Tiba</h4>
                  <p className="font-medium">{formatDate(new Date(selectedDelivery.estimatedArrival))}</p>
                </div>
              </div>
              
              {selectedDelivery.status === "persiapan_pengiriman" && (
                <Alert className="bg-blue-50 border-blue-200">
                  <Clock className="h-4 w-4 text-blue-700" />
                  <AlertTitle className="text-blue-700">Persiapan Pengiriman</AlertTitle>
                  <AlertDescription className="text-blue-700">
                    Komoditas sedang dipersiapkan untuk pengiriman. Pastikan semua dokumen dan kemasan sudah siap.
                  </AlertDescription>
                </Alert>
              )}
              
              {selectedDelivery.status === "sedang_dikirim" && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <MapPin className="h-4 w-4 text-yellow-700" />
                  <AlertTitle className="text-yellow-700">Sedang Dikirim</AlertTitle>
                  <AlertDescription className="text-yellow-700">
                    Komoditas sedang dalam perjalanan menuju lokasi tujuan. Perbarui status menjadi 'Sudah Dikirim' setelah pengiriman selesai.
                  </AlertDescription>
                </Alert>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                Tutup
              </Button>
              
              {selectedDelivery.status === "sedang_dikirim" && (
                <Button onClick={handleUpdateStatus} className="gap-2">
                  <Check className="h-4 w-4" />
                  Sudah Dikirim
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Confirmation Dialog */}
      {selectedDelivery && (
        <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Konfirmasi Pengiriman</DialogTitle>
              <DialogDescription>
                Apakah Anda yakin komoditas telah terkirim ke alamat tujuan?
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <Alert className="bg-blue-50 border-blue-200">
                <CircleAlert className="h-4 w-4 text-blue-700" />
                <AlertDescription className="text-blue-700">
                  Dengan mengkonfirmasi, Anda menyatakan bahwa pengiriman telah sampai ke alamat tujuan dan siap untuk diterima oleh pembeli.
                </AlertDescription>
              </Alert>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="text-sm font-medium mb-2">Detail Pengiriman</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">ID:</div>
                  <div className="font-medium">{selectedDelivery.id}</div>
                  <div className="text-gray-500">Pembeli:</div>
                  <div className="font-medium">{selectedDelivery.buyerName}</div>
                  <div className="text-gray-500">Komoditas:</div>
                  <div className="font-medium">{selectedDelivery.commodity}</div>
                  <div className="text-gray-500">Tujuan:</div>
                  <div className="font-medium">{selectedDelivery.destination}</div>
                </div>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setConfirmationDialogOpen(false)}>
                Batal
              </Button>
              <Button 
                onClick={handleConfirmStatusUpdate} 
                className="gap-2 bg-tani-green-dark hover:bg-tani-green-dark/90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Konfirmasi Pengiriman
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

export default Pengiriman;
