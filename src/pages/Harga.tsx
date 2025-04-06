
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
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  RefreshCcw,
  ChevronUp,
  ChevronDown,
  BarChart3,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCurrency } from "@/lib/utils";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Mock data for commodity prices
const commodityPricesData = [
  { 
    id: 1, 
    name: "Beras Putih", 
    type: "Padi", 
    price: 10500, 
    unit: "kg", 
    change: 2.5, 
    region: "Nasional", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 10000 },
      { date: "Feb", price: 10200 },
      { date: "Mar", price: 10300 },
      { date: "Apr", price: 10500 },
    ]
  },
  { 
    id: 2, 
    name: "Beras Putih", 
    type: "Padi", 
    price: 9500, 
    unit: "kg", 
    change: 1.8, 
    region: "Jawa Barat", 
    grade: "A",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 9000 },
      { date: "Feb", price: 9300 },
      { date: "Mar", price: 9400 },
      { date: "Apr", price: 9500 },
    ]
  },
  { 
    id: 3, 
    name: "Jagung Manis", 
    type: "Jagung", 
    price: 7000, 
    unit: "kg", 
    change: -1.5, 
    region: "Nasional", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 7300 },
      { date: "Feb", price: 7200 },
      { date: "Mar", price: 7100 },
      { date: "Apr", price: 7000 },
    ]
  },
  { 
    id: 4, 
    name: "Kedelai", 
    type: "Kedelai", 
    price: 12500, 
    unit: "kg", 
    change: 3.2, 
    region: "Nasional", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 11800 },
      { date: "Feb", price: 12000 },
      { date: "Mar", price: 12200 },
      { date: "Apr", price: 12500 },
    ]
  },
  { 
    id: 5, 
    name: "Gula Aren", 
    type: "Gula", 
    price: 28000, 
    unit: "kg", 
    change: 1.2, 
    region: "Jawa Barat", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 27500 },
      { date: "Feb", price: 27600 },
      { date: "Mar", price: 27800 },
      { date: "Apr", price: 28000 },
    ]
  },
  { 
    id: 6, 
    name: "Kopi Arabika", 
    type: "Kopi", 
    price: 70000, 
    unit: "kg", 
    change: 4.5, 
    region: "Bali", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 65000 },
      { date: "Feb", price: 66500 },
      { date: "Mar", price: 68000 },
      { date: "Apr", price: 70000 },
    ]
  },
  { 
    id: 7, 
    name: "Cabai Merah", 
    type: "Cabai", 
    price: 35000, 
    unit: "kg", 
    change: -5.2, 
    region: "Nasional", 
    grade: "A",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 38000 },
      { date: "Feb", price: 37000 },
      { date: "Mar", price: 36000 },
      { date: "Apr", price: 35000 },
    ]
  },
  { 
    id: 8, 
    name: "Bawang Merah", 
    type: "Bawang", 
    price: 32000, 
    unit: "kg", 
    change: -2.8, 
    region: "Jawa Timur", 
    grade: "Premium",
    lastUpdated: "2025-04-06",
    chartData: [
      { date: "Jan", price: 34000 },
      { date: "Feb", price: 33500 },
      { date: "Mar", price: 32500 },
      { date: "Apr", price: 32000 },
    ]
  },
];

// Historical price data for the price chart
const historicalPriceData = [
  { month: 'Jan', beras: 10000, jagung: 7300, kedelai: 11800, gula: 27500, kopi: 65000 },
  { month: 'Feb', beras: 10200, jagung: 7200, kedelai: 12000, gula: 27600, kopi: 66500 },
  { month: 'Mar', beras: 10300, jagung: 7100, kedelai: 12200, gula: 27800, kopi: 68000 },
  { month: 'Apr', beras: 10500, jagung: 7000, kedelai: 12500, gula: 28000, kopi: 70000 },
  { month: 'May', beras: 10600, jagung: 6950, kedelai: 12700, gula: 28200, kopi: 71000 },
  { month: 'Jun', beras: 10550, jagung: 6900, kedelai: 12650, gula: 28300, kopi: 71500 },
];

const Harga = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tab, setTab] = useState("all");
  const [type, setType] = useState<string>("");
  const [region, setRegion] = useState<string>("");
  const [grade, setGrade] = useState<string>("");
  const [selectedCommodities, setSelectedCommodities] = useState<string[]>(["beras"]);
  
  // Apply filters to commodity prices
  const filteredCommodityPrices = commodityPricesData.filter(item => {
    // Text search
    const textMatch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.region.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Tab filter
    const tabMatch = tab === "all" || tab === item.type.toLowerCase();
    
    // Type filter
    const typeMatch = !type || item.type === type;
    
    // Region filter
    const regionMatch = !region || item.region === region;
    
    // Grade filter
    const gradeMatch = !grade || item.grade === grade;
    
    return textMatch && tabMatch && typeMatch && regionMatch && gradeMatch;
  });

  // Toggle commodity selection for chart
  const toggleCommoditySelection = (commodity: string) => {
    setSelectedCommodities(prev => 
      prev.includes(commodity) 
        ? prev.filter(item => item !== commodity) 
        : [...prev, commodity]
    );
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Harga Komoditas</h1>
        <p className="text-gray-600">Pantau harga komoditas pertanian terkini</p>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-tani-green-dark" />
            Tren Harga Komoditas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalPriceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Legend />
                {selectedCommodities.includes("beras") && (
                  <Line type="monotone" dataKey="beras" stroke="#4CAF50" name="Beras" />
                )}
                {selectedCommodities.includes("jagung") && (
                  <Line type="monotone" dataKey="jagung" stroke="#FFC107" name="Jagung" />
                )}
                {selectedCommodities.includes("kedelai") && (
                  <Line type="monotone" dataKey="kedelai" stroke="#2196F3" name="Kedelai" />
                )}
                {selectedCommodities.includes("gula") && (
                  <Line type="monotone" dataKey="gula" stroke="#E91E63" name="Gula" />
                )}
                {selectedCommodities.includes("kopi") && (
                  <Line type="monotone" dataKey="kopi" stroke="#795548" name="Kopi" />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: "beras", name: "Beras", color: "#4CAF50" },
              { id: "jagung", name: "Jagung", color: "#FFC107" },
              { id: "kedelai", name: "Kedelai", color: "#2196F3" },
              { id: "gula", name: "Gula", color: "#E91E63" },
              { id: "kopi", name: "Kopi", color: "#795548" },
            ].map(commodity => (
              <Badge 
                key={commodity.id}
                variant={selectedCommodities.includes(commodity.id) ? "default" : "outline"}
                className="cursor-pointer"
                style={{ 
                  backgroundColor: selectedCommodities.includes(commodity.id) ? commodity.color : "transparent",
                  borderColor: commodity.color,
                  color: selectedCommodities.includes(commodity.id) ? "white" : commodity.color
                }}
                onClick={() => toggleCommoditySelection(commodity.id)}
              >
                {commodity.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input 
                className="pl-10" 
                placeholder="Cari komoditas..." 
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
                  <SelectItem value="Padi">Padi</SelectItem>
                  <SelectItem value="Jagung">Jagung</SelectItem>
                  <SelectItem value="Kedelai">Kedelai</SelectItem>
                  <SelectItem value="Gula">Gula</SelectItem>
                  <SelectItem value="Kopi">Kopi</SelectItem>
                  <SelectItem value="Cabai">Cabai</SelectItem>
                  <SelectItem value="Bawang">Bawang</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Wilayah" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Wilayah</SelectItem>
                  <SelectItem value="Nasional">Nasional</SelectItem>
                  <SelectItem value="Jawa Barat">Jawa Barat</SelectItem>
                  <SelectItem value="Jawa Timur">Jawa Timur</SelectItem>
                  <SelectItem value="Jawa Tengah">Jawa Tengah</SelectItem>
                  <SelectItem value="Sumatera">Sumatera</SelectItem>
                  <SelectItem value="Bali">Bali</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Grade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Grade</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                </SelectContent>
              </Select>
              
              <TooltipProvider>
                <UITooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Perbarui harga</p>
                  </TooltipContent>
                </UITooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-tani-green-dark" />
            Daftar Harga Komoditas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={tab} onValueChange={setTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="all">Semua</TabsTrigger>
              <TabsTrigger value="padi">Padi</TabsTrigger>
              <TabsTrigger value="jagung">Jagung</TabsTrigger>
              <TabsTrigger value="kedelai">Kedelai</TabsTrigger>
              <TabsTrigger value="gula">Gula</TabsTrigger>
              <TabsTrigger value="kopi">Kopi</TabsTrigger>
            </TabsList>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nama</TableHead>
                    <TableHead>Wilayah</TableHead>
                    <TableHead className="hidden md:table-cell">Grade</TableHead>
                    <TableHead className="text-right">Harga/kg</TableHead>
                    <TableHead className="text-right">Perubahan</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCommodityPrices.length > 0 ? (
                    filteredCommodityPrices.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.region}</TableCell>
                        <TableCell className="hidden md:table-cell">{item.grade}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(item.price)} / {item.unit}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className={`flex items-center justify-end ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change >= 0 ? (
                              <ChevronUp className="h-4 w-4 mr-1" />
                            ) : (
                              <ChevronDown className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(item.change)}%
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        Tidak ada data harga komoditas yang ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4 text-xs text-gray-500 flex items-center">
              <Info className="h-3 w-3 mr-1" />
              Data harga diperbarui pada {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Harga;
