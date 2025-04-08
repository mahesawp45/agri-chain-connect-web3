
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ClipboardList, Upload, Calendar, FileText } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BuyerOrderBookCreate() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    commodityType: "",
    quantity: "",
    unit: "kg",
    requestedGrade: "",
    requestedDeliveryDate: "",
    termsFile: null as File | null,
  });
  
  const [loading, setLoading] = useState(false);
  
  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        termsFile: e.target.files![0],
      }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Validate form
    if (!formData.commodityType || !formData.quantity || !formData.unit || 
        !formData.requestedGrade || !formData.requestedDeliveryDate || !formData.termsFile) {
      toast({
        title: t("error.validation"),
        description: t("error.fillAllFields"),
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: t("success.created"),
        description: t("buyer.orderbook.successMessage"),
      });
      setLoading(false);
      navigate("/buyer/order-book");
    }, 1500);
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-earth-dark-green">{t("buyer.orderbook.createTitle")}</h1>
        <p className="text-earth-dark-green/70">{t("buyer.orderbook.createDescription")}</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              {t("buyer.orderbook.formTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="commodityType">{t("buyer.orderbook.commodityType")}</Label>
                <Select 
                  value={formData.commodityType} 
                  onValueChange={(value) => handleChange("commodityType", value)}
                >
                  <SelectTrigger id="commodityType">
                    <SelectValue placeholder={t("buyer.orderbook.selectCommodity")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Padi">Padi</SelectItem>
                    <SelectItem value="Jagung">Jagung</SelectItem>
                    <SelectItem value="Kedelai">Kedelai</SelectItem>
                    <SelectItem value="Kopi">Kopi</SelectItem>
                    <SelectItem value="Kakao">Kakao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="requestedGrade">{t("buyer.orderbook.grade")}</Label>
                <Select 
                  value={formData.requestedGrade} 
                  onValueChange={(value) => handleChange("requestedGrade", value)}
                >
                  <SelectTrigger id="requestedGrade">
                    <SelectValue placeholder={t("buyer.orderbook.selectGrade")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Premium">Premium</SelectItem>
                    <SelectItem value="A">A</SelectItem>
                    <SelectItem value="B">B</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">{t("buyer.orderbook.quantity")}</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="1000"
                  value={formData.quantity}
                  onChange={(e) => handleChange("quantity", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="unit">{t("buyer.orderbook.unit")}</Label>
                <Select 
                  value={formData.unit} 
                  onValueChange={(value) => handleChange("unit", value)}
                >
                  <SelectTrigger id="unit">
                    <SelectValue placeholder={t("buyer.orderbook.selectUnit")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="ton">ton</SelectItem>
                    <SelectItem value="karung">karung</SelectItem>
                    <SelectItem value="kuintal">kuintal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requestedDeliveryDate">{t("buyer.orderbook.deliveryDate")}</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-earth-dark-green/50" />
                <Input
                  id="requestedDeliveryDate"
                  type="date"
                  className="pl-10"
                  value={formData.requestedDeliveryDate}
                  onChange={(e) => handleChange("requestedDeliveryDate", e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="termsFile">{t("buyer.orderbook.termsFile")}</Label>
              <div className="border-2 border-dashed border-earth-light-brown rounded-md p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-earth-dark-green/50" />
                <p className="text-sm text-earth-dark-green/70 mb-2">
                  {formData.termsFile ? formData.termsFile.name : t("buyer.orderbook.dragFile")}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("termsFile")?.click()}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  {t("buyer.orderbook.browseFile")}
                </Button>
                <Input
                  id="termsFile"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate("/buyer/order-book")}
            >
              {t("action.cancel")}
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? t("action.processing") : t("action.submit")}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
