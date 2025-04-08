import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { TrendingUp, Search, Filter, ArrowDown, ArrowUp, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { type CommodityPrice } from "@/lib/data/types";

// Sample commodity price data
const commodityPrices: CommodityPrice[] = [
  {
    id: "PRICE-001",
    name: "Beras Putih",
    price: 10500,
    unit: "kg",
    predictedChange: 2.5,
    region: "Jawa Barat",
    grade: "A",
    updatedAt: new Date("2023-11-20"),
  },
  {
    id: "PRICE-002",
    name: "Jagung Manis",
    price: 8000,
    unit: "kg",
    predictedChange: -1.2,
    region: "Jawa Timur",
    grade: "B",
    updatedAt: new Date("2023-11-19"),
  },
  {
    id: "PRICE-003",
    name: "Kedelai",
    price: 12500,
    unit: "kg",
    predictedChange: 3.8,
    region: "Jawa Tengah",
    grade: "Premium",
    updatedAt: new Date("2023-11-18"),
  },
  {
    id: "PRICE-004",
    name: "Kopi Arabika",
    price: 85000,
    unit: "kg",
    predictedChange: 5.2,
    region: "Aceh",
    grade: "Premium",
    updatedAt: new Date("2023-11-17"),
  },
  {
    id: "PRICE-005",
    name: "Cabai Merah",
    price: 35000,
    unit: "kg",
    predictedChange: -3.5,
    region: "Sumatera Utara",
    grade: "A",
    updatedAt: new Date("2023-11-20"),
  },
  {
    id: "PRICE-006",
    name: "Bawang Merah",
    price: 28000,
    unit: "kg",
    predictedChange: 1.8,
    region: "Jawa Barat",
    grade: "A",
    updatedAt: new Date("2023-11-19"),
  },
  {
    id: "PRICE-007",
    name: "Gula Pasir",
    price: 14500,
    unit: "kg",
    predictedChange: 0.5,
    region: "Lampung",
    grade: "A",
    updatedAt: new Date("2023-11-18"),
  },
  {
    id: "PRICE-008",
    name: "Minyak Goreng",
    price: 18000,
    unit: "kg",
    predictedChange: -0.8,
    region: "Nasional",
    updatedAt: new Date("2023-11-17"),
  },
];

const Harga = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [trendFilter, setTrendFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");

  // Get unique regions for filter
  const regions = ["all", ...new Set(commodityPrices.map((price) => price.region))];

  // Filter commodity prices based on search query, region and trend
  const filteredCommodityPrices = commodityPrices.filter((price) => {
    const matchesSearch =
      price.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      price.region.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRegion = regionFilter === "all" || price.region === regionFilter;

    const matchesTrend =
      trendFilter === "all" ||
      (trendFilter === "rising" && price.predictedChange > 0) ||
      (trendFilter === "falling" && price.predictedChange < 0) ||
      (trendFilter === "stable" && 
        price.predictedChange >= -0.5 && 
        price.predictedChange <= 0.5);

    // Match tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pangan" && 
        ["Beras Putih", "Jagung Manis", "Kedelai", "Cabai Merah", "Bawang Merah", "Gula Pasir", "Minyak Goreng"].includes(price.name)) ||
      (activeTab === "perkebunan" && 
        ["Kopi Arabika"].includes(price.name));

    return matchesSearch && matchesRegion && matchesTrend && matchesTab;
  });

  // Function to render trend indicator
  const getTrendIndicator = (change: number) => {
    if (change > 0) {
      return (
        <div className="flex items-center gap-1 text-green-700 font-medium">
          <ArrowUp className="h-4 w-4" />
          <span>{change.toFixed(1)}%</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center gap-1 text-red-700 font-medium">
          <ArrowDown className="h-4 w-4" />
          <span>{Math.abs(change).toFixed(1)}%</span>
        </div>
      );
    } else {
      return <span className="text-gray-700 font-medium">0%</span>;
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2 text-earth-dark-green">Harga Komoditas</h1>
        <p className="text-earth-medium-green font-medium">Pantau harga komoditas pertanian terkini</p>
      </div>

      <Card className="mb-6 earth-card-forest shadow-md">
        <CardHeader className="earth-header-forest">
          <CardTitle className="text-lg flex items-center text-white">
            <TrendingUp className="h-5 w-5 mr-2" />
            Daftar Harga Komoditas
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-earth-dark-green" />
                <Input
                  type="search"
                  placeholder="Cari komoditas atau wilayah..."
                  className="pl-8 border-earth-medium-green focus:ring-2 focus:ring-earth-dark-green"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={regionFilter}
                  onValueChange={setRegionFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px] border-earth-medium-green bg-white text-earth-dark-green">
                    <SelectValue placeholder="Pilih Wilayah" />
                  </SelectTrigger>
                  <SelectContent className="border-earth-light-green">
                    <SelectItem value="all">Semua Wilayah</SelectItem>
                    {regions.filter(r => r !== "all").map((region) => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={trendFilter}
                  onValueChange={setTrendFilter}
                >
                  <SelectTrigger className="w-full sm:w-[180px] border-earth-medium-green bg-white text-earth-dark-green">
                    <SelectValue placeholder="Filter Tren" />
                  </SelectTrigger>
                  <SelectContent className="border-earth-light-green">
                    <SelectItem value="all">Semua Tren</SelectItem>
                    <SelectItem value="rising">Naik</SelectItem>
                    <SelectItem value="falling">Turun</SelectItem>
                    <SelectItem value="stable">Stabil</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex gap-2 border-earth-medium-green text-earth-dark-green bg-earth-pale-green hover:bg-earth-light-green/40">
                  <Filter className="h-4 w-4" />
                  Filter Lanjutan
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="mb-4 bg-earth-pale-green">
                <TabsTrigger value="all" className="data-[state=active]:bg-earth-dark-green data-[state=active]:text-white">Semua</TabsTrigger>
                <TabsTrigger value="pangan" className="data-[state=active]:bg-earth-dark-green data-[state=active]:text-white">Pangan</TabsTrigger>
                <TabsTrigger value="perkebunan" className="data-[state=active]:bg-earth-dark-green data-[state=active]:text-white">Perkebunan</TabsTrigger>
              </TabsList>
              
              {["all", "pangan", "perkebunan"].map((tabValue) => (
                <TabsContent key={tabValue} value={tabValue} className="mt-0">
                  <div className="rounded-md border-2 border-earth-medium-green overflow-hidden shadow-sm">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-earth-medium-green/20">
                          <TableHead className="text-earth-dark-green font-bold">Komoditas</TableHead>
                          <TableHead className="text-earth-dark-green font-bold">Harga</TableHead>
                          <TableHead className="text-earth-dark-green font-bold">Grade</TableHead>
                          <TableHead className="text-earth-dark-green font-bold">Prediksi Perubahan</TableHead>
                          <TableHead className="text-earth-dark-green font-bold">Wilayah</TableHead>
                          <TableHead className="text-earth-dark-green font-bold">Terakhir Diperbarui</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCommodityPrices.length > 0 ? (
                          filteredCommodityPrices.map((price) => (
                            <TableRow key={price.id} className="hover:bg-earth-pale-green/50">
                              <TableCell className="font-medium text-earth-dark-green">{price.name}</TableCell>
                              <TableCell className="font-medium text-earth-dark-green">
                                {formatCurrency(price.price)}/{price.unit}
                              </TableCell>
                              <TableCell className="text-earth-dark-green font-medium">{price.grade || "-"}</TableCell>
                              <TableCell>{getTrendIndicator(price.predictedChange)}</TableCell>
                              <TableCell className="flex items-center gap-1 text-earth-dark-green">
                                <MapPin className="h-4 w-4 text-earth-dark-green" />
                                {price.region}
                              </TableCell>
                              <TableCell className="text-earth-dark-green">{formatDate(price.updatedAt)}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-earth-dark-green font-medium">
                              Tidak ada harga komoditas yang ditemukan
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Harga;
