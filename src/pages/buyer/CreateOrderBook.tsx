
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/hooks/use-toast";
import { CommodityType, CommodityUnit } from "@/lib/data/types";

// Sample data (in a real app, this would come from an API)
const commodityTypes: CommodityType[] = [
  "Padi", "Jagung", "Kedelai", "Kopi", "Kakao", "Gula", "Sayuran", "Buah"
];

const commodityUnits: CommodityUnit[] = [
  "kg", "ton", "karung", "kuintal", "gram", "ikat"
];

const CreateOrderBook = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: language === "id" ? "Order Book Berhasil Dibuat" : "Order Book Created",
        description: language === "id" 
          ? "Order book telah berhasil dibuat" 
          : "The order book has been created successfully",
      });
      
      navigate("/buyer/order-book");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "id" ? "Gagal Membuat Order Book" : "Failed to Create Order Book",
        description: language === "id"
          ? "Terjadi kesalahan saat membuat order book"
          : "An error occurred while creating the order book",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          {language === "id" ? "Buat Order Book Baru" : "Create New Order Book"}
        </h1>
        <p className="text-gray-600">
          {language === "id" 
            ? "Isi formulir di bawah untuk membuat order book baru" 
            : "Fill out the form below to create a new order book"}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{language === "id" ? "Form Order Book" : "Order Book Form"}</CardTitle>
          <CardDescription>
            {language === "id" 
              ? "Lengkapi semua field yang diperlukan" 
              : "Please complete all required fields"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>
                  {language === "id" ? "Jenis Komoditas" : "Commodity Type"}
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      language === "id" ? "Pilih jenis komoditas" : "Select commodity type"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {commodityTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Satuan" : "Unit"}</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      language === "id" ? "Pilih satuan" : "Select unit"
                    } />
                  </SelectTrigger>
                  <SelectContent>
                    {commodityUnits.map((unit) => (
                      <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Jumlah" : "Quantity"}</Label>
                <Input type="number" min="1" required />
              </div>

              <div className="space-y-2">
                <Label>{language === "id" ? "Tanggal Pengiriman" : "Delivery Date"}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input type="date" className="pl-10" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label>
                  {language === "id" ? "File Terms and Condition" : "Terms and Conditions File"}
                </Label>
                <div className="flex gap-2 items-center">
                  <Button type="button" variant="outline" className="flex gap-2">
                    <FileText className="h-4 w-4" />
                    {language === "id" ? "Pilih File" : "Choose File"}
                  </Button>
                  <span className="text-sm text-gray-500">
                    {language === "id" ? "Belum ada file dipilih" : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/buyer/order-book")}
              >
                {language === "id" ? "Batal" : "Cancel"}
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="gap-2 bg-gradient-to-r from-earth-dark-green to-earth-medium-green hover:from-earth-medium-green hover:to-earth-dark-green"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    {language === "id" ? "Menyimpan..." : "Saving..."}
                  </div>
                ) : (
                  language === "id" ? "Simpan" : "Save"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CreateOrderBook;
