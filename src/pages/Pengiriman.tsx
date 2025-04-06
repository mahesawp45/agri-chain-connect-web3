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
import { DateRange } from "react-day-picker";

// Mock data for deliveries
const deliveriesData = [
  {
    id: "DLV-20231101-001",
    date: "2023-11-01",
    buyerName: "PT. Agro Makmur",
    commodity: "Beras Putih",
    quantity: 1000,
    unit: "kg",
    destination: "Jakarta",
    status: "persiapan_pengiriman",
    pricePerUnit: 12000,
    shippingCost: 500000,
  },
  {
    id: "DLV-20231105-002",
    date: "2023-11-05",
    buyerName: "CV. Mitra Tani",
    commodity: "Jagung Manis",
    quantity: 500,
    unit: "kg",
    destination: "Surabaya",
    status: "sedang_dikirim",
    pricePerUnit: 8000,
    shippingCost: 300000,
  },
  {
    id: "DLV-20231110-003",
    date: "2023-11-10",
    buyerName: "Koperasi Sinar Harapan",
    commodity: "Kedelai",
    quantity: 750,
    unit: "kg",
    destination: "Medan",
    status: "sudah_dikirim",
    pricePerUnit: 10000,
    shippingCost: 400000,
  },
  {
    id: "DLV-20231115-004",
    date: "2023-11-15",
    buyerName: "PT. Bumi Subur",
    commodity: "Gula Aren",
    quantity: 1200,
    unit: "kg",
    destination: "Makassar",
    status: "diterima",
    pricePerUnit: 15000,
    shippingCost: 600000,
  },
  {
    id: "DLV-20231120-005",
    date: "2023-11-20",
    buyerName: "CV. Tani Jaya",
    commodity: "Kopi Arabika",
    quantity: 300,
    unit: "kg",
    destination: "Denpasar",
    status: "selesai",
    pricePerUnit: 40000,
    shippingCost: 250000,
  },
  {
    id: "DLV-20231125-006",
    date: "2023-11-25",
    buyerName: "Koperasi Agro Mandiri",
    commodity: "Cabai Merah",
    quantity: 600,
    unit: "kg",
    destination: "Palembang",
    status: "persiapan_pengiriman",
    pricePerUnit: 25000,
    shippingCost: 350000,
  },
  {
    id: "DLV-20231130-007",
    date: "2023-11-30",
    buyerName: "PT. Subur Abadi",
    commodity: "Beras Putih",
    quantity: 900,
    unit: "kg",
    destination: "Bandung",
    status: "sedang_dikirim",
    pricePerUnit: 12000,
    shippingCost: 450000,
  },
  {
    id: "DLV-20231205-008",
    date: "2023-12-05",
    buyerName: "CV. Harapan Tani",
    commodity: "Jagung Manis",
    quantity: 400,
    unit: "kg",
    destination: "Semarang",
    status: "sudah_dikirim",
    pricePerUnit: 8000,
    shippingCost: 280000,
  },
  {
    id: "DLV-20231210-009",
    date: "2023-12-10",
    buyerName: "Koperasi Makmur Jaya",
    commodity: "Kedelai",
    quantity: 800,
    unit: "kg",
    destination: "Yogyakarta",
    status: "diterima",
    pricePerUnit: 10000,
    shippingCost: 420000,
  },
  {
    id: "DLV-20231215-010",
    date: "2023-12-15",
    buyerName: "PT. Agro Sejahtera",
    commodity: "Gula Aren",
    quantity: 1100,
    unit: "kg",
    destination: "Surakarta",
    status: "selesai",
    pricePerUnit: 15000,
    shippingCost: 550000,
  },
];

const Pengiriman = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [status, setStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<typeof deliveriesData[0] | null>(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleViewDelivery = (delivery: typeof deliveriesData[0]) => {
    setSelectedDelivery(delivery);
    setDetailDialogOpen(true);
  };

  const handleUpdateStatus = (delivery: typeof deliveriesData[0], newStatus: string) => {
    setSelectedDelivery(delivery);
    setStatus(newStatus);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmStatusUpdate = () => {
    if (selectedDelivery) {
      const updatedDeliveriesData = deliveriesData.map(delivery => {
        if (delivery.id === selectedDelivery.id) {
          return { ...delivery, status: status };
        }
        return delivery;
      });
      deliveriesData = updatedDeliveriesData;
      toast({
        title: "Status Pengiriman Diperbarui",
        description: `Status pengiriman ${selectedDelivery.id} berhasil diperbarui menjadi ${status}.`,
      });
    }
    setConfirmationDialogOpen(false);
    setDetailDialogOpen(false);
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
    if (dateRange?.from) {
      const deliveryDate = new Date(delivery.date);
      if (dateRange.from && deliveryDate < deliveryDate.from) {
        dateMatch = false;
      }
      if (dateRange.to && deliveryDate > deliveryDate.to) {
        dateMatch = false;
      }
    }
    
    return textMatch && tabMatch && statusMatch && dateMatch;
  });

  const getStatusBadge = (status: string) => {
    const statusMap = {
      "persiapan_pengiriman": { label: "Persiapan Pengiriman", color: "bg-yellow-100 text-yellow-800" },
      "sedang_dikirim": { label: "Sedang Dikirim", color: "bg-blue-100 text-blue-800" },
      "sudah_dikirim": { label: "Sudah Dikirim", color: "bg-purple-100 text-purple-800" },
      "diterima": { label: "Diterima", color: "bg-green-100 text-green-800" },
      "selesai": { label: "Selesai", color: "bg-gray-100 text-gray-800" },
    };

    const { label, color } = statusMap[status] || { label: "Unknown", color: "bg-red-100 text-red-800" };

    return (
      <Badge className={color + " font-normal"}>
        {label}
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

      <Tabs defaultValue="all" className="mb-4" value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="all">Semua</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Selesai</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DeliveryTable deliveries={filteredDeliveries} onView={handleViewDelivery} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        <TabsContent value="pending" className="space-y-4">
          <DeliveryTable deliveries={filteredDeliveries} onView={handleViewDelivery} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <DeliveryTable deliveries={filteredDeliveries} onView={handleViewDelivery} onUpdateStatus={handleUpdateStatus} />
        </TabsContent>
      </Tabs>

      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detail Pengiriman</DialogTitle>
            <DialogDescription>
              Informasi lengkap mengenai pengiriman.
            </DialogDescription>
          </DialogHeader>
          {selectedDelivery && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="id" className="text-right">ID:</label>
                <Input id="id" value={selectedDelivery.id} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="date" className="text-right">Tanggal:</label>
                <Input id="date" value={formatDate(new Date(selectedDelivery.date))} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="buyerName" className="text-right">Nama Pembeli:</label>
                <Input id="buyerName" value={selectedDelivery.buyerName} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="commodity" className="text-right">Komoditas:</label>
                <Input id="commodity" value={selectedDelivery.commodity} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="quantity" className="text-right">Kuantitas:</label>
                <Input id="quantity" value={`${selectedDelivery.quantity} ${selectedDelivery.unit}`} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="destination" className="text-right">Tujuan:</label>
                <Input id="destination" value={selectedDelivery.destination} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="pricePerUnit" className="text-right">Harga per Unit:</label>
                <Input id="pricePerUnit" value={formatCurrency(selectedDelivery.pricePerUnit)} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="shippingCost" className="text-right">Biaya Pengiriman:</label>
                <Input id="shippingCost" value={formatCurrency(selectedDelivery.shippingCost)} className="col-span-3" readOnly />
              </div>
              <div className="grid grid-cols-4 gap-2">
                <label htmlFor="status" className="text-right">Status:</label>
                <div className="col-span-3">
                  {getStatusBadge(selectedDelivery.status)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button type="submit" onClick={() => setDetailDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={confirmationDialogOpen} onOpenChange={setConfirmationDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Konfirmasi</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mengubah status pengiriman ini?
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Alert>
              <CircleAlert className="h-4 w-4" />
              <AlertTitle>Peringatan!</AlertTitle>
              <AlertDescription>
                Anda akan mengubah status pengiriman ini menjadi {status}.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setConfirmationDialogOpen(false)}>
              Batal
            </Button>
            <Button type="submit" onClick={handleConfirmStatusUpdate}>
              Konfirmasi
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

interface DeliveryTableProps {
  deliveries: typeof deliveriesData;
  onView: (delivery: typeof deliveriesData[0]) => void;
  onUpdateStatus: (delivery: typeof deliveriesData[0], status: string) => void;
}

const DeliveryTable = ({ deliveries, onView, onUpdateStatus }: DeliveryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Pembeli</TableHead>
          <TableHead className="hidden md:table-cell">Komoditas</TableHead>
          <TableHead className="hidden lg:table-cell">Tujuan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <TableRow key={delivery.id}>
              <TableCell className="font-medium">{delivery.id}</TableCell>
              <TableCell>{delivery.buyerName}</TableCell>
              <TableCell className="hidden md:table-cell">
                {delivery.commodity} ({delivery.quantity} {delivery.unit})
              </TableCell>
              <TableCell className="hidden lg:table-cell">{delivery.destination}</TableCell>
              <TableCell>{getStatusBadge(delivery.status)}</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => onView(delivery)}>
                  <Eye className="h-4 w-4" />
                </Button>
                {delivery.status === "persiapan_pengiriman" && (
                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(delivery, "sedang_dikirim")}>
                    <Truck className="h-4 w-4" />
                  </Button>
                )}
                {delivery.status === "sedang_dikirim" && (
                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(delivery, "sudah_dikirim")}>
                    <Package className="h-4 w-4" />
                  </Button>
                )}
                {delivery.status === "sudah_dikirim" && (
                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(delivery, "diterima")}>
                    <CheckCircle2 className="h-4 w-4" />
                  </Button>
                )}
                {delivery.status === "diterima" && (
                  <Button variant="ghost" size="icon" onClick={() => onUpdateStatus(delivery, "selesai")}>
                    <Check className="h-4 w-4" />
                  </Button>
                )}
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
  );
};

export default Pengiriman;
