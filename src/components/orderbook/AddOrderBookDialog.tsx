
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Sample commodity types - replace with API data
const commodityTypes = ["Padi", "Jagung", "Kedelai", "Cabai"];
const units = ["kg", "ton", "kwintal"];

export function AddOrderBookDialog() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    commodityType: "",
    quantity: "",
    unit: "",
    termsFile: null as File | null,
    deliveryDate: undefined as Date | undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Here you would normally send the data to your API
      console.log("Form submitted:", formData);
      
      toast({
        title: language === "id" ? "Berhasil" : "Success",
        description: language === "id" 
          ? "Order Book berhasil dibuat" 
          : "Order Book has been created successfully",
      });
      
      setOpen(false);
      // Optionally redirect or refresh the list
      navigate("/order-book");
    } catch (error) {
      toast({
        variant: "destructive",
        title: language === "id" ? "Gagal" : "Error",
        description: language === "id" 
          ? "Terjadi kesalahan saat membuat Order Book" 
          : "An error occurred while creating the Order Book",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      commodityType: "",
      quantity: "",
      unit: "",
      termsFile: null,
      deliveryDate: undefined,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-gradient-to-r from-earth-dark-green to-earth-medium-green hover:from-earth-medium-green hover:to-earth-dark-green">
          <Plus className="h-4 w-4" />
          {language === "id" ? "Tambah Order Book" : "Add Order Book"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {language === "id" ? "Tambah Order Book Baru" : "Add New Order Book"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commodityType">
              {language === "id" ? "Jenis Komoditas" : "Commodity Type"}
            </Label>
            <Select 
              value={formData.commodityType}
              onValueChange={(value) => setFormData(prev => ({ ...prev, commodityType: value }))}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder={language === "id" ? "Pilih komoditas" : "Select commodity"} />
              </SelectTrigger>
              <SelectContent>
                {commodityTypes.map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">{language === "id" ? "Jumlah" : "Quantity"}</Label>
              <Input
                id="quantity"
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                required
                min="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">{language === "id" ? "Satuan" : "Unit"}</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData(prev => ({ ...prev, unit: value }))}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder={language === "id" ? "Pilih satuan" : "Select unit"} />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="deliveryDate">
              {language === "id" ? "Tanggal Pengiriman" : "Delivery Date"}
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="deliveryDate"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deliveryDate && "text-muted-foreground"
                  )}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {formData.deliveryDate ? (
                    format(formData.deliveryDate, "PPP")
                  ) : (
                    <span>{language === "id" ? "Pilih tanggal" : "Pick a date"}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.deliveryDate}
                  onSelect={(date) => setFormData(prev => ({ ...prev, deliveryDate: date }))}
                  initialFocus
                  disabled={(date) => date < new Date()}
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms">
              {language === "id" ? "Terms and Conditions" : "Terms and Conditions"}
            </Label>
            <Input
              id="terms"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setFormData(prev => ({ ...prev, termsFile: file }));
              }}
              className="cursor-pointer"
              accept=".pdf,.doc,.docx"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <DialogClose asChild>
              <Button 
                variant="outline" 
                type="button"
              >
                {language === "id" ? "Batal" : "Cancel"}
              </Button>
            </DialogClose>
            <Button type="submit">
              {language === "id" ? "Simpan" : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
