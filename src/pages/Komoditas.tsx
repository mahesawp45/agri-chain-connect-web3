
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Plus, 
  Search, 
  Filter, 
  Package, 
  MoreVertical, 
  FileText, 
  Edit, 
  Trash2,
  QrCode,
  DollarSign,
  Tag
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency, formatPriceInput, parsePriceInput } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { BulkPrice } from "@/lib/data/types";

// Mock data for demo purposes
const komoditasData = [
  { 
    id: "KM001", 
    name: "Beras Putih", 
    unit: "kg", 
    type: "Padi", 
    quantity: 5000, 
    location: "Cianjur, Jawa Barat", 
    grade: "Premium", 
    createdAt: "2025-04-01",
    imageUrl: "/placeholder.svg"
  },
  { 
    id: "KM002", 
    name: "Jagung Manis", 
    unit: "kg", 
    type: "Jagung", 
    quantity: 2500, 
    location: "Malang, Jawa Timur", 
    grade: "A", 
    createdAt: "2025-03-28",
    imageUrl: "/placeholder.svg"
  },
  { 
    id: "KM003", 
    name: "Kedelai", 
    unit: "kg", 
    type: "Kedelai", 
    quantity: 1800, 
    location: "Jember, Jawa Timur", 
    grade: "B", 
    createdAt: "2025-03-25",
    imageUrl: "/placeholder.svg"
  },
  { 
    id: "KM004", 
    name: "Gula Aren", 
    unit: "kg", 
    type: "Gula", 
    quantity: 750, 
    location: "Bandung, Jawa Barat", 
    grade: "Premium", 
    createdAt: "2025-03-20",
    imageUrl: "/placeholder.svg"
  },
  { 
    id: "KM005", 
    name: "Kopi Arabika", 
    unit: "kg", 
    type: "Kopi", 
    quantity: 500, 
    location: "Bali", 
    grade: "Premium", 
    createdAt: "2025-03-15",
    imageUrl: "/placeholder.svg"
  }
];

// Mock data for units and types
const units = ["kg", "ton", "gram", "liter"];
const types = ["Padi", "Jagung", "Kedelai", "Gula", "Kopi", "Cabai", "Bawang"];
const locations = ["Cianjur, Jawa Barat", "Malang, Jawa Timur", "Jember, Jawa Timur", "Bandung, Jawa Barat", "Bali"];
const grades = ["Premium", "A", "B", "C"];

const Komoditas = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [addKomoditasOpen, setAddKomoditasOpen] = useState(false);
  const [qrCodeDialogOpen, setQrCodeDialogOpen] = useState(false);
  const [bulkPricingSheetOpen, setBulkPricingSheetOpen] = useState(false);
  const [selectedKomoditas, setSelectedKomoditas] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    unit: "",
    type: "",
    image: null as File | null,
    quantity: "",
    location: "",
    gradeFile: null as File | null,
    grade: "",
    basePrice: ""
  });

  // Bulk pricing state
  const [bulkPrices, setBulkPrices] = useState<BulkPrice[]>([]);
  const [newBulkPrice, setNewBulkPrice] = useState({
    minQuantity: "",
    price: ""
  });
  
  // Format display for price inputs
  const [displayPrice, setDisplayPrice] = useState("");
  const [displayBulkPrice, setDisplayBulkPrice] = useState("");

  const handleInputChange = (field: string, value: string) => {
    if (field === "basePrice") {
      // Format the input as currency
      const formattedValue = formatPriceInput(value);
      setDisplayPrice(formattedValue);
      
      // Store raw value in formData
      const numericValue = parsePriceInput(value);
      setFormData(prev => ({ ...prev, [field]: numericValue.toString() }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleFileChange = (field: string, files: FileList | null) => {
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [field]: files[0] }));
    }
  };

  const handleBulkPriceChange = (field: string, value: string) => {
    if (field === "price") {
      // Format the input as currency with thousand separators
      const formattedValue = formatPriceInput(value);
      setDisplayBulkPrice(formattedValue);
      
      // Store raw numeric value
      const numericValue = parsePriceInput(value);
      setNewBulkPrice(prev => ({ ...prev, [field]: numericValue.toString() }));
    } else {
      setNewBulkPrice(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleAddBulkPrice = () => {
    if (newBulkPrice.minQuantity && newBulkPrice.price) {
      const newPrice: BulkPrice = {
        id: `bp-${Date.now()}`,
        minQuantity: Number(newBulkPrice.minQuantity),
        price: Number(newBulkPrice.price)
      };
      
      setBulkPrices(prev => [...prev.sort((a, b) => a.minQuantity - b.minQuantity), newPrice]
        .sort((a, b) => a.minQuantity - b.minQuantity));
      
      // Reset form
      setNewBulkPrice({
        minQuantity: "",
        price: ""
      });
      setDisplayBulkPrice("");
    }
  };

  const handleRemoveBulkPrice = (id: string) => {
    setBulkPrices(prev => prev.filter(price => price.id !== id));
  };

  const handleOpenBulkPricing = () => {
    if (!formData.basePrice || !formData.unit) {
      toast({
        title: "Perhatian",
        description: "Harap isi harga dasar dan satuan terlebih dahulu",
      });
      return;
    }
    
    setBulkPricingSheetOpen(true);
  };

  const handleAddKomoditas = () => {
    toast({
      title: "Komoditas berhasil ditambahkan",
      description: `${formData.name} telah ditambahkan ke daftar komoditas Anda`,
    });
    
    setAddKomoditasOpen(false);
    
    // Show QR Code dialog after success
    setSelectedKomoditas(formData.name);
    setQrCodeDialogOpen(true);
    
    // Reset form
    setFormData({
      name: "",
      unit: "",
      type: "",
      image: null,
      quantity: "",
      location: "",
      gradeFile: null,
      grade: "",
      basePrice: ""
    });
    setBulkPrices([]);
  };

  const filteredData = komoditasData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetail = (id: string) => {
    navigate(`/komoditas/${id}`);
  };
  
  return (
    <MainLayout>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-earth-dark-green">{t("commodities.title")}</h1>
          <p className="text-earth-medium-green">{t("commodities.subtitle")}</p>
        </div>
        <Dialog open={addKomoditasOpen} onOpenChange={setAddKomoditasOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-earth-dark-green hover:bg-earth-medium-green">
              <Plus className="h-4 w-4" />
              {t("commodities.add")}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[625px] border-earth-light-green">
            <DialogHeader className="earth-header-moss">
              <DialogTitle>{t("commodities.add")}</DialogTitle>
              <DialogDescription className="text-white">
                Isi formulir di bawah ini untuk menambahkan komoditas baru ke daftar Anda.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-earth-dark-green">{t("commodities.name")}</Label>
                  <Input 
                    id="name" 
                    placeholder="Masukkan nama komoditas" 
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="border-earth-medium-green focus:border-earth-dark-green"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="unit" className="text-earth-dark-green">{t("commodities.unit")}</Label>
                  <Select 
                    value={formData.unit}
                    onValueChange={(value) => handleInputChange("unit", value)}
                  >
                    <SelectTrigger className="border-earth-medium-green">
                      <SelectValue placeholder="Pilih satuan" />
                    </SelectTrigger>
                    <SelectContent>
                      {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-earth-dark-green">{t("commodities.type")}</Label>
                  <Select 
                    value={formData.type}
                    onValueChange={(value) => handleInputChange("type", value)}
                  >
                    <SelectTrigger className="border-earth-medium-green">
                      <SelectValue placeholder="Pilih jenis komoditas" />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="image" className="text-earth-dark-green">{t("commodities.upload.image")}</Label>
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => handleFileChange("image", e.target.files)}
                    className="border-earth-medium-green focus:border-earth-dark-green"
                  />
                  <p className="text-xs text-earth-medium-green">Upload foto komoditas (maks 2MB)</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-earth-dark-green">{t("commodities.quantity")}</Label>
                  <Input 
                    id="quantity" 
                    type="number" 
                    placeholder="Masukkan jumlah" 
                    value={formData.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-earth-dark-green">{t("commodities.location")}</Label>
                  <Select 
                    value={formData.location}
                    onValueChange={(value) => handleInputChange("location", value)}
                  >
                    <SelectTrigger className="border-earth-medium-green">
                      <SelectValue placeholder="Pilih lokasi" />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((location) => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradeFile" className="text-earth-dark-green">{t("commodities.upload.grade")}</Label>
                  <Input 
                    id="gradeFile" 
                    type="file" 
                    accept="image/*,.pdf" 
                    onChange={(e) => handleFileChange("gradeFile", e.target.files)}
                  />
                  <p className="text-xs text-earth-medium-green">Upload file grading (PDF/Gambar)</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="grade" className="text-earth-dark-green">{t("commodities.grade")}</Label>
                  <Select 
                    value={formData.grade}
                    onValueChange={(value) => handleInputChange("grade", value)}
                  >
                    <SelectTrigger className="border-earth-medium-green">
                      <SelectValue placeholder="Pilih grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Price input section - updated with formatting */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basePrice" className="text-earth-dark-green">Harga Dasar</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-earth-medium-green text-sm">Rp</span>
                    </div>
                    <Input 
                      id="basePrice" 
                      type="text" 
                      placeholder="0" 
                      value={displayPrice}
                      onChange={(e) => handleInputChange("basePrice", e.target.value)}
                      className="pl-10 border-earth-medium-green focus:border-earth-dark-green"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <span className="text-earth-medium-green text-sm">/{formData.unit || 'unit'}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 flex items-end">
                  <Button 
                    onClick={handleOpenBulkPricing} 
                    variant="outline" 
                    className="w-full h-10 border-earth-medium-green text-earth-dark-green hover:bg-earth-light-green/20 gap-2"
                  >
                    <Tag className="h-4 w-4" />
                    Atur Harga Grosir
                  </Button>
                </div>
              </div>
              
              {/* Display bulk pricing summary if any */}
              {bulkPrices.length > 0 && (
                <div className="bg-earth-pale-green p-3 rounded-md border border-earth-light-green">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-earth-dark-green">Harga Grosir</h4>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-earth-medium-green hover:text-earth-dark-green hover:bg-earth-light-green/20"
                      onClick={handleOpenBulkPricing}
                    >
                      Edit
                    </Button>
                  </div>
                  <div className="space-y-1">
                    {bulkPrices.slice(0, 3).map((price, index) => (
                      <div key={price.id} className="text-xs flex justify-between text-earth-dark-green">
                        <span>≥ {price.minQuantity} {formData.unit}</span>
                        <span>Rp {price.price.toLocaleString()}/{formData.unit}</span>
                      </div>
                    ))}
                    {bulkPrices.length > 3 && (
                      <div className="text-xs text-earth-medium-green text-center mt-1">
                        +{bulkPrices.length - 3} harga grosir lainnya
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setAddKomoditasOpen(false)} className="border-earth-light-green text-earth-dark-green hover:bg-earth-light-green/20">{t("action.cancel")}</Button>
              <Button onClick={handleAddKomoditas} className="bg-earth-dark-green hover:bg-earth-medium-green">{t("action.save")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* QR Code Dialog */}
        <Dialog open={qrCodeDialogOpen} onOpenChange={setQrCodeDialogOpen}>
          <DialogContent className="sm:max-w-[400px] border-earth-light-green">
            <DialogHeader className="earth-header-moss">
              <DialogTitle>{t("commodities.qrcode")}</DialogTitle>
              <DialogDescription className="text-white">
                Gunakan QR Code ini untuk melacak komoditas Anda.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-4">
              <div className="bg-earth-pale-green p-4 rounded-lg mb-4">
                <QrCode className="h-32 w-32 text-earth-dark-green mx-auto" />
              </div>
              <p className="text-center text-sm text-earth-dark-green">
                {t("commodities.name")}: <span className="font-medium">{selectedKomoditas}</span><br />
                ID: <span className="font-medium">KM00{Math.floor(Math.random() * 1000)}</span><br />
                {t("commodities.created")}: <span className="font-medium">{new Date().toLocaleDateString('id-ID')}</span>
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setQrCodeDialogOpen(false)} className="bg-earth-dark-green hover:bg-earth-medium-green">{t("action.close")}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Bulk Pricing Sheet - Updated with ScrollArea for better scrolling */}
        <Sheet open={bulkPricingSheetOpen} onOpenChange={setBulkPricingSheetOpen}>
          <SheetContent className="sm:max-w-[500px] border-l border-earth-light-green p-0">
            <div className="flex flex-col h-full">
              <SheetHeader className="earth-header-forest rounded-t-md p-6">
                <SheetTitle className="text-white flex items-center gap-2">
                  <Tag className="h-5 w-5" />
                  Atur Harga Grosir
                </SheetTitle>
                <SheetDescription className="text-white/80">
                  Tambahkan harga khusus untuk pembelian dalam jumlah besar
                </SheetDescription>
              </SheetHeader>
              
              {/* Fix: Using ScrollArea with proper styles to ensure scrolling works */}
              <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-[calc(100vh-240px)]">
                  <div className="px-6 py-4 space-y-6">
                    {/* Pricing info */}
                    <div className="bg-earth-pale-green p-4 rounded-md border border-earth-light-green">
                      <div className="flex items-center gap-2 mb-2">
                        <DollarSign className="h-5 w-5 text-earth-dark-green" />
                        <h3 className="font-medium text-earth-dark-green">Harga Dasar</h3>
                      </div>
                      <div className="pl-7">
                        <p className="text-sm text-earth-medium-green">
                          Harga dasar: <span className="font-medium text-earth-dark-green">
                            Rp {Number(formData.basePrice).toLocaleString()}/{formData.unit || 'unit'}
                          </span>
                        </p>
                        <p className="text-xs text-earth-medium-green mt-1">
                          Harga ini berlaku untuk pembelian standar.
                        </p>
                      </div>
                    </div>
                    
                    {/* Add bulk price form - Improved formatting */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-earth-dark-green">Tambah Harga Grosir</h3>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <Label htmlFor="minQuantity" className="text-earth-medium-green text-sm">Jumlah Minimal</Label>
                          <div className="relative">
                            <Input 
                              id="minQuantity" 
                              type="text" 
                              inputMode="numeric"
                              pattern="[0-9]*"
                              placeholder="100" 
                              value={newBulkPrice.minQuantity}
                              onChange={(e) => {
                                // Only allow numeric input
                                const value = e.target.value.replace(/\D/g, '');
                                handleBulkPriceChange("minQuantity", value);
                              }}
                              className="border-earth-medium-green focus:border-earth-dark-green"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              <span className="text-earth-medium-green text-sm">{formData.unit || 'unit'}</span>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bulkPrice" className="text-earth-medium-green text-sm">
                            Harga per {formData.unit || 'unit'}
                          </Label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-earth-medium-green text-sm">Rp</span>
                            </div>
                            <Input 
                              id="bulkPrice" 
                              type="text" 
                              inputMode="numeric"
                              placeholder="0" 
                              value={displayBulkPrice}
                              onChange={(e) => handleBulkPriceChange("price", e.target.value)}
                              className="pl-10 border-earth-medium-green focus:border-earth-dark-green"
                            />
                          </div>
                        </div>
                      </div>
                      <Button 
                        onClick={handleAddBulkPrice}
                        className="w-full bg-earth-dark-green hover:bg-earth-medium-green"
                      >
                        Tambah Harga Grosir
                      </Button>
                    </div>
                    
                    {/* Bulk prices list */}
                    {bulkPrices.length > 0 ? (
                      <div className="space-y-3">
                        <h3 className="font-medium text-earth-dark-green">Daftar Harga Grosir</h3>
                        <div className="border border-earth-light-green rounded-md overflow-hidden">
                          <table className="w-full">
                            <thead className="bg-earth-light-green/30">
                              <tr>
                                <th className="px-4 py-2 text-left text-sm font-medium text-earth-dark-green">Min. Jumlah</th>
                                <th className="px-4 py-2 text-left text-sm font-medium text-earth-dark-green">Harga/{formData.unit || 'unit'}</th>
                                <th className="px-4 py-2 text-right text-sm font-medium text-earth-dark-green">Aksi</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bulkPrices.map((price) => (
                                <tr key={price.id} className="border-t border-earth-light-green">
                                  <td className="px-4 py-2 text-sm text-earth-dark-green">{price.minQuantity.toLocaleString()} {formData.unit || 'unit'}</td>
                                  <td className="px-4 py-2 text-sm text-earth-dark-green">Rp {price.price.toLocaleString()}</td>
                                  <td className="px-4 py-2 text-right">
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      className="h-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleRemoveBulkPrice(price.id)}
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                        <p className="text-xs text-earth-medium-green">
                          Harga akan otomatis diterapkan berdasarkan jumlah pembelian.
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-6 text-earth-medium-green">
                        <Tag className="h-10 w-10 mx-auto mb-2 opacity-50" />
                        <p>Belum ada harga grosir</p>
                        <p className="text-xs mt-1">Tambahkan harga grosir untuk menarik pembeli dalam jumlah besar</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </div>
              
              <SheetFooter className="border-t border-earth-light-green p-4 mt-auto">
                <SheetClose asChild>
                  <Button className="bg-earth-dark-green hover:bg-earth-medium-green">
                    Simpan Harga Grosir
                  </Button>
                </SheetClose>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Improved price input formatting in the main form */}
      <Card className="mb-6 earth-card-green">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-earth-medium-green" />
              <Input 
                className="pl-10 border-earth-medium-green focus:border-earth-dark-green" 
                placeholder={t("commodities.search")} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="gap-2 border-earth-medium-green text-earth-dark-green hover:bg-earth-light-green/20">
              <Filter className="h-4 w-4" />
              {t("action.filter")}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="earth-card-wheat">
        <CardHeader className="pb-3 earth-header-forest">
          <CardTitle className="text-lg flex items-center text-white">
            <Package className="h-5 w-5 mr-2" />
            {t("commodities.list")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-earth-light-green">
            <Table>
              <TableHeader className="bg-earth-light-green/30">
                <TableRow>
                  <TableHead className="text-earth-dark-green">{t("commodities.name")}</TableHead>
                  <TableHead className="text-earth-dark-green">{t("commodities.type")}</TableHead>
                  <TableHead className="hidden md:table-cell text-earth-dark-green">{t("commodities.quantity")}</TableHead>
                  <TableHead className="hidden lg:table-cell text-earth-dark-green">{t("commodities.location")}</TableHead>
                  <TableHead className="text-earth-dark-green">{t("commodities.grade")}</TableHead>
                  <TableHead className="text-right text-earth-dark-green">{t("commodities.action")}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-earth-pale-green">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded overflow-hidden bg-earth-light-green/20 flex items-center justify-center">
                            <img 
                              src={item.imageUrl} 
                              alt={item.name} 
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-earth-dark-green">{item.name}</div>
                            <div className="text-xs text-earth-medium-green">{item.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-earth-dark-green">{item.type}</TableCell>
                      <TableCell className="hidden md:table-cell text-earth-dark-green">
                        {item.quantity.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-earth-dark-green">{item.location}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline" 
                          className={
                            item.grade === "Premium" 
                              ? "bg-green-50 text-green-700 border-green-200" 
                              : item.grade === "A" 
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-orange-50 text-orange-700 border-orange-200"
                          }
                        >
                          {item.grade}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-earth-dark-green hover:bg-earth-light-green/20">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-earth-light-green">
                            <DropdownMenuItem onClick={() => handleViewDetail(item.id)} className="text-earth-dark-green hover:bg-earth-light-green/20">
                              <FileText className="h-4 w-4 mr-2" />
                              {t("action.view")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-earth-dark-green hover:bg-earth-light-green/20">
                              <Edit className="h-4 w-4 mr-2" />
                              {t("action.edit")}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-earth-dark-green hover:bg-earth-light-green/20">
                              <QrCode className="h-4 w-4 mr-2" />
                              {t("commodities.qrcode")}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-earth-light-green" />
                            <DropdownMenuItem className="text-red-600 hover:bg-red-50">
                              <Trash2 className="h-4 w-4 mr-2" />
                              {t("action.delete")}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-earth-medium-green">
                      {searchQuery 
                        ? `${t("commodities.notfound")} "${searchQuery}"`
                        : `${t("commodities.notfound")}. ${t("commodities.add")} to get started.`}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default Komoditas;
