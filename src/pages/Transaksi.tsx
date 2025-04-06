
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
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Check,
  X,
  Clock,
  ArrowUpDown,
  CalendarIcon
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { id } from 'date-fns/locale';
import { useToast } from "@/hooks/use-toast";

// Mock data for transactions
const transactionsData = [
  {
    id: "TX7825",
    type: "reguler",
    buyerName: "PT Agrimax",
    commodity: "Beras Putih",
    quantity: 500,
    unit: "kg",
    date: "2025-04-03",
    status: "menunggu_konfirmasi",
    amount: 8750000,
    location: "Cianjur, Jawa Barat"
  },
  {
    id: "TX7824",
    type: "reguler",
    buyerName: "CV Pangan Sejahtera",
    commodity: "Jagung Manis",
    quantity: 250,
    unit: "kg",
    date: "2025-04-02",
    status: "dikonfirmasi",
    amount: 3750000,
    location: "Malang, Jawa Timur"
  },
  {
    id: "TX7823",
    type: "order_book",
    buyerName: "PT Indofood",
    commodity: "Kedelai",
    quantity: 1000,
    unit: "kg",
    date: "2025-04-01",
    status: "negosiasi",
    amount: 15000000,
    location: "Jember, Jawa Timur"
  },
  {
    id: "TX7822",
    type: "reguler",
    buyerName: "PT Gula Nusantara",
    commodity: "Gula Aren",
    quantity: 100,
    unit: "kg",
    date: "2025-03-29",
    status: "dibayar",
    amount: 2750000,
    location: "Bandung, Jawa Barat"
  },
  {
    id: "TX7821",
    type: "order_book",
    buyerName: "PT Kopi Indonesia",
    commodity: "Kopi Arabika",
    quantity: 75,
    unit: "kg",
    date: "2025-03-28",
    status: "sudah_dikirim",
    amount: 5250000,
    location: "Bali"
  },
  {
    id: "TX7820",
    type: "reguler",
    buyerName: "PT Bumbu Dapur",
    commodity: "Cabai Merah",
    quantity: 150,
    unit: "kg",
    date: "2025-03-27",
    status: "selesai",
    amount: 4500000,
    location: "Bandung, Jawa Barat"
  },
];

const Transaksi = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [type, setType] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<typeof transactionsData[0] | null>(null);
  const { toast } = useToast();

  // Handle viewing transaction details
  const handleViewTransaction = (transaction: typeof transactionsData[0]) => {
    setSelectedTransaction(transaction);
    setDetailDialogOpen(true);
  };

  // Handle approving a transaction
  const handleApproveTransaction = () => {
    if (selectedTransaction) {
      toast({
        title: "Transaksi Dikonfirmasi",
        description: `Transaksi ${selectedTransaction.id} telah berhasil dikonfirmasi`,
      });
      setDetailDialogOpen(false);
    }
  };

  // Apply filters to transactions
  const filteredTransactions = transactionsData.filter(transaction => {
    // Text search
    const textMatch = 
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.commodity.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const tabMatch = 
      tab === "all" || 
      (tab === "reguler" && transaction.type === "reguler") || 
      (tab === "order_book" && transaction.type === "order_book");
    
    // Type filter
    const typeMatch = !type || transaction.type === type;
    
    // Status filter
    const statusMatch = !status || transaction.status === status;
    
    // Date range filter
    let dateMatch = true;
    if (dateRange.from) {
      const transactionDate = new Date(transaction.date);
      if (dateRange.from && transactionDate < dateRange.from) {
        dateMatch = false;
      }
      if (dateRange.to && transactionDate > dateRange.to) {
        dateMatch = false;
      }
    }
    
    return textMatch && tabMatch && typeMatch && statusMatch && dateMatch;
  });

  // Get status badge based on status
  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { color: string, label: string }> = {
      menunggu_konfirmasi: { color: "bg-yellow-50 text-yellow-700 border-yellow-200", label: "Menunggu Konfirmasi" },
      dikonfirmasi: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Dikonfirmasi" },
      negosiasi: { color: "bg-purple-50 text-purple-700 border-purple-200", label: "Negosiasi" },
      dibayar: { color: "bg-green-50 text-green-700 border-green-200", label: "Dibayar" },
      persiapan_pengiriman: { color: "bg-indigo-50 text-indigo-700 border-indigo-200", label: "Persiapan Pengiriman" },
      sedang_dikirim: { color: "bg-blue-50 text-blue-700 border-blue-200", label: "Sedang Dikirim" },
      sudah_dikirim: { color: "bg-green-50 text-green-700 border-green-200", label: "Sudah Dikirim" },
      selesai: { color: "bg-green-50 text-green-700 border-green-200", label: "Selesai" },
      dibatalkan: { color: "bg-red-50 text-red-700 border-red-200", label: "Dibatalkan" }
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
        <h1 className="text-2xl font-bold mb-2">Transaksi</h1>
        <p className="text-gray-600">Kelola transaksi komoditas Anda</p>
      </div>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder="Cari transaksi..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Jenis</SelectItem>
                  <SelectItem value="reguler">Reguler</SelectItem>
                  <SelectItem value="order_book">Order Book</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Status</SelectItem>
                  <SelectItem value="menunggu_konfirmasi">Menunggu Konfirmasi</SelectItem>
                  <SelectItem value="dikonfirmasi">Dikonfirmasi</SelectItem>
                  <SelectItem value="negosiasi">Negosiasi</SelectItem>
                  <SelectItem value="dibayar">Dibayar</SelectItem>
                  <SelectItem value="sudah_dikirim">Sudah Dikirim</SelectItem>
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
                      "Pilih tanggal"
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
              
              <Button variant="outline" className="gap-2" onClick={() => {
                setSearchQuery("");
                setType("");
                setStatus("");
                setDateRange({ from: undefined, to: undefined });
              }}>
                <X className="h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <ShoppingCart className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Transaksi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="reguler">Reguler</TabsTrigger>
              <TabsTrigger value="order_book">Order Book</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <TransactionTable 
                transactions={filteredTransactions} 
                getStatusBadge={getStatusBadge}
                onViewTransaction={handleViewTransaction}
              />
            </TabsContent>
            <TabsContent value="reguler" className="mt-0">
              <TransactionTable 
                transactions={filteredTransactions} 
                getStatusBadge={getStatusBadge}
                onViewTransaction={handleViewTransaction}
              />
            </TabsContent>
            <TabsContent value="order_book" className="mt-0">
              <TransactionTable 
                transactions={filteredTransactions} 
                getStatusBadge={getStatusBadge}
                onViewTransaction={handleViewTransaction}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      {selectedTransaction && (
        <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Transaksi</DialogTitle>
              <DialogDescription>
                {selectedTransaction.id} - {formatDate(new Date(selectedTransaction.date))}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <span className="font-medium">Status</span>
                {getStatusBadge(selectedTransaction.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Pembeli</h4>
                  <p className="font-medium">{selectedTransaction.buyerName}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Jenis Transaksi</h4>
                  <p className="font-medium capitalize">
                    {selectedTransaction.type === "order_book" ? "Order Book" : "Reguler"}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Komoditas</h4>
                  <p className="font-medium">{selectedTransaction.commodity}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Kuantitas</h4>
                  <p className="font-medium">{selectedTransaction.quantity} {selectedTransaction.unit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Lokasi</h4>
                  <p className="font-medium">{selectedTransaction.location}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-500">Nilai Transaksi</h4>
                  <p className="font-medium text-tani-green-dark">{formatCurrency(selectedTransaction.amount)}</p>
                </div>
              </div>
              
              {selectedTransaction.status === "menunggu_konfirmasi" && (
                <div className="bg-yellow-50 p-4 rounded-md">
                  <h4 className="font-medium flex items-center text-yellow-800">
                    <Clock className="h-4 w-4 mr-2" />
                    Tindakan Diperlukan
                  </h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Transaksi ini memerlukan konfirmasi Anda untuk dapat diproses lebih lanjut.
                  </p>
                </div>
              )}
            </div>
            <DialogFooter className="gap-2">
              <Button variant="outline" onClick={() => setDetailDialogOpen(false)}>
                Tutup
              </Button>
              
              {selectedTransaction.status === "menunggu_konfirmasi" && (
                <>
                  <Button variant="destructive" className="gap-2">
                    <X className="h-4 w-4" />
                    Tolak
                  </Button>
                  <Button onClick={handleApproveTransaction} className="gap-2">
                    <Check className="h-4 w-4" />
                    Konfirmasi
                  </Button>
                </>
              )}
              
              {selectedTransaction.status === "dibayar" && (
                <Button className="gap-2">
                  <Check className="h-4 w-4" />
                  Proses Pengiriman
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </MainLayout>
  );
};

interface TransactionTableProps {
  transactions: typeof transactionsData;
  getStatusBadge: (status: string) => JSX.Element;
  onViewTransaction: (transaction: typeof transactionsData[0]) => void;
}

const TransactionTable = ({ transactions, getStatusBadge, onViewTransaction }: TransactionTableProps) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Pembeli</TableHead>
            <TableHead className="hidden md:table-cell">Komoditas</TableHead>
            <TableHead className="hidden lg:table-cell">Tanggal</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.buyerName}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction.commodity} ({transaction.quantity} {transaction.unit})
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  {formatDate(new Date(transaction.date))}
                </TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onViewTransaction(transaction)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Tidak ada transaksi yang ditemukan
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Transaksi;
