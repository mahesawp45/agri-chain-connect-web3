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
  Calendar as CalendarIcon,
  Filter,
  Package,
  Eye,
  X,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";
import { DateRange } from "react-day-picker";

// Mock data for deliveries
let deliveriesData = [
  {
    id: "DLV-20231101-001",
    date: "2023-11-01",
    origin: "Gudang Cianjur",
    destination: "Pasar Induk Kramat Jati",
    items: [
      { name: "Beras Putih", quantity: 500, unit: "kg" },
    ],
    status: "dalam_perjalanan",
    estimatedArrival: "2023-11-02",
    transactionId: "TX7825",
    courier: "JNE Trucking",
    trackingNumber: "JNE12345678",
  },
  {
    id: "DLV-20231105-002",
    date: "2023-11-05",
    origin: "Gudang Malang",
    destination: "Supermarket Surabaya",
    items: [
      { name: "Jagung Manis", quantity: 300, unit: "kg" },
    ],
    status: "tiba_di_tujuan",
    estimatedArrival: "2023-11-06",
    transactionId: "TX7824",
    courier: "SiCepat Express",
    trackingNumber: "SICEPAT67890",
  },
  {
    id: "DLV-20231110-003",
    date: "2023-11-10",
    origin: "Gudang Jember",
    destination: "Restoran Jakarta",
    items: [
      { name: "Kedelai", quantity: 1000, unit: "kg" },
    ],
    status: "selesai",
    estimatedArrival: "2023-11-12",
    transactionId: "TX7823",
    courier: "Gojek Instant",
    trackingNumber: "GOJEK3456789",
  },
  {
    id: "DLV-20231115-004",
    date: "2023-11-15",
    origin: "Gudang Bandung",
    destination: "Toko Kue Bogor",
    items: [
      { name: "Gula Aren", quantity: 200, unit: "kg" },
    ],
    status: "dalam_persiapan",
    estimatedArrival: "2023-11-16",
    transactionId: "TX7822",
    courier: "GrabExpress",
    trackingNumber: "GRABEXPRESS23456",
  },
  {
    id: "DLV-20231120-005",
    date: "2023-11-20",
    origin: "Gudang Bali",
    destination: "Cafe Denpasar",
    items: [
      { name: "Kopi Arabika", quantity: 50, unit: "kg" },
    ],
    status: "menunggu",
    estimatedArrival: "2023-11-21",
    transactionId: "TX7821",
    courier: "J&T Express",
    trackingNumber: "JNT789012345",
  },
];

// Simple component for demonstration
const Pengiriman = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [status, setStatus] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null);
  const { toast } = useToast();

  // Simplified functions and rendering for the minimum viable component
  const handleViewDelivery = (delivery: any) => {
    setSelectedDelivery(delivery);
    setViewDialogOpen(true);
  };

  const handleUpdateStatus = (delivery: any, newStatus: string) => {
    // Find and update the delivery
    deliveriesData = deliveriesData.map(d => 
      d.id === delivery.id ? { ...d, status: newStatus } : d
    );
    
    toast({
      title: "Status Pengiriman Diperbarui",
      description: `Pengiriman ${delivery.id} sekarang ${getStatusLabel(newStatus)}`,
    });
    
    setViewDialogOpen(false);
  };

  const getStatusLabel = (status: string) => {
    const statusMap: Record<string, string> = {
      "menunggu": "Menunggu",
      "dalam_persiapan": "Dalam Persiapan",
      "dalam_perjalanan": "Dalam Perjalanan",
      "tiba_di_tujuan": "Tiba di Tujuan",
      "selesai": "Selesai",
    };
    
    return statusMap[status] || status;
  };

  // Simplified version of getStatusBadge
  const getStatusBadge = (status: string) => {
    return <Badge>{getStatusLabel(status)}</Badge>;
  };

  // Basic render
  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Pengiriman</h1>
        <p className="text-gray-600">Kelola pengiriman komoditas Anda</p>
      </div>
      
      <Card className="mb-6">
        <CardContent className="p-6">
          Halaman Pengiriman - Konten akan dimuat di sini
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Pengiriman;
