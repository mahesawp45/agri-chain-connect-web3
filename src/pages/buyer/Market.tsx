
import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { Wheat, Info, ShoppingCart, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock data for commodity marketplace
const mockCommodities = [
  {
    id: "1",
    name: "Beras Organik Premium",
    variety: "IR 64",
    farmer: "Pak Joko",
    location: "Subang, Jawa Barat",
    quantity: 500,
    unit: "kg",
    price: 12000,
    imageUrl: "/placeholder.svg",
    description: "Beras organik premium hasil panen terbaru, bebas pestisida."
  },
  {
    id: "2",
    name: "Beras Merah",
    variety: "Red Rice",
    farmer: "Bu Siti",
    location: "Cianjur, Jawa Barat",
    quantity: 200,
    unit: "kg",
    price: 15000,
    imageUrl: "/placeholder.svg",
    description: "Beras merah organik kaya nutrisi dan serat."
  },
  {
    id: "3",
    name: "Beras Hitam",
    variety: "Black Rice",
    farmer: "Pak Budi",
    location: "Klaten, Jawa Tengah",
    quantity: 100,
    unit: "kg",
    price: 18000,
    imageUrl: "/placeholder.svg",
    description: "Beras hitam dengan kandungan antioksidan tinggi."
  },
  {
    id: "4",
    name: "Beras Ketan",
    variety: "White Glutinous",
    farmer: "Bu Maya",
    location: "Tasikmalaya, Jawa Barat",
    quantity: 150,
    unit: "kg",
    price: 14000,
    imageUrl: "/placeholder.svg",
    description: "Beras ketan putih berkualitas untuk olahan kue tradisional."
  }
];

const Market = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleBuy = (commodityId: string) => {
    // In a real application, this would initiate the purchase process
    // For demo purposes, navigate to transaction detail
    navigate(`/transaksi/${commodityId}`);
  };
  
  const handleViewDetails = (commodityId: string) => {
    navigate(`/komoditas/${commodityId}`);
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Market Komoditas</h1>
            <p className="text-muted-foreground">
              {t("language") === "id" 
                ? "Jelajahi dan beli komoditas pertanian berkualitas langsung dari petani." 
                : "Explore and purchase quality agricultural commodities directly from farmers."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate("/harga")}>
              {t("language") === "id" ? "Lihat Harga Terkini" : "See Current Prices"}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCommodities.map((commodity) => (
            <Card key={commodity.id} className="overflow-hidden border border-earth-light-brown/30 hover:shadow-md transition-shadow">
              <CardHeader className="bg-earth-pale-green/50 pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg text-earth-dark-green">{commodity.name}</CardTitle>
                    <CardDescription className="flex items-center gap-1 text-earth-medium-green">
                      <Wheat className="h-3.5 w-3.5" />
                      <span>{commodity.variety}</span>
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    Rp {commodity.price.toLocaleString()} / {commodity.unit}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Petani:</span>
                    <span className="font-medium">{commodity.farmer}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Lokasi:</span>
                    <span>{commodity.location}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Stok:</span>
                    <span>{commodity.quantity} {commodity.unit}</span>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2">{commodity.description}</p>
                </div>
              </CardContent>
              <CardFooter className="bg-white border-t border-earth-light-brown/20 flex justify-between gap-2">
                <Button variant="outline" size="sm" onClick={() => handleViewDetails(commodity.id)}>
                  <Info className="h-4 w-4 mr-1" />
                  Detail
                </Button>
                <Button size="sm" className="bg-earth-medium-green hover:bg-earth-dark-green" onClick={() => handleBuy(commodity.id)}>
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Beli
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Market;
