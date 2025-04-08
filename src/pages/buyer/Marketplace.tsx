
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, Filter, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Mock commodity data
const commodities = [
  {
    id: "cm-001",
    name: "Beras Putih Premium",
    type: "Padi",
    grade: "Premium",
    unit: "kg",
    quantity: 1000,
    price: 12000,
    farmerName: "Koperasi Tani Makmur",
    location: "Karawang, Jawa Barat",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cm-002",
    name: "Jagung Manis",
    type: "Jagung",
    grade: "A",
    unit: "kg",
    quantity: 500,
    price: 8000,
    farmerName: "Kelompok Tani Sejahtera",
    location: "Malang, Jawa Timur",
    imageUrl: "/placeholder.svg"
  },
  {
    id: "cm-003",
    name: "Kedelai Organik",
    type: "Kedelai",
    grade: "Premium",
    unit: "kg",
    quantity: 300,
    price: 15000,
    farmerName: "PT Agro Nusantara",
    location: "Sleman, Yogyakarta",
    imageUrl: "/placeholder.svg"
  },
];

export default function BuyerMarketplace() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [commodityType, setCommodityType] = useState("");
  
  const filteredCommodities = commodities.filter(commodity => {
    const matchesSearch = commodity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          commodity.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = commodityType === "" || commodity.type === commodityType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-earth-dark-green">{t("buyer.marketplace.title")}</h1>
          <p className="text-earth-dark-green/70">{t("buyer.marketplace.description")}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5" />
              {t("buyer.marketplace.filters")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("buyer.marketplace.search")}
              </label>
              <Input 
                placeholder={t("buyer.marketplace.searchPlaceholder")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">
                {t("buyer.marketplace.commodityType")}
              </label>
              <Select value={commodityType} onValueChange={setCommodityType}>
                <SelectTrigger>
                  <SelectValue placeholder={t("buyer.marketplace.allTypes")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">{t("buyer.marketplace.allTypes")}</SelectItem>
                  <SelectItem value="Padi">Padi</SelectItem>
                  <SelectItem value="Jagung">Jagung</SelectItem>
                  <SelectItem value="Kedelai">Kedelai</SelectItem>
                  <SelectItem value="Kopi">Kopi</SelectItem>
                  <SelectItem value="Kakao">Kakao</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCommodities.map((commodity) => (
              <Card key={commodity.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-40 bg-gray-100 relative">
                  <img 
                    src={commodity.imageUrl} 
                    alt={commodity.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-earth-dark-green text-white text-xs px-2 py-1 rounded-full">
                      Grade {commodity.grade}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{commodity.name}</CardTitle>
                  <CardDescription>
                    {commodity.farmerName} · {commodity.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <span className="text-earth-dark-green font-medium">
                        Rp {commodity.price.toLocaleString()}/{commodity.unit}
                      </span>
                    </div>
                    <div className="text-sm text-earth-dark-green/70">
                      {commodity.quantity.toLocaleString()} {commodity.unit} {t("buyer.marketplace.available")}
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    {t("buyer.marketplace.buy")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
