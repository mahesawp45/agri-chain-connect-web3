
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeftIcon, ArrowRightIcon, Store, FileCheck, Leaf, MapPin, Phone, ShoppingBag, User, UserCircle2 } from "lucide-react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("petani");

  const handleRegister = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      toast({
        title: type === "petani" ? "Pendaftaran petani berhasil!" : "Pendaftaran konsumen berhasil!",
        description: "Silakan masuk ke akun Anda",
      });
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-earth-pale-green to-white overflow-hidden">
      {/* Left Section - Visual & Information */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center relative">
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-earth-light-green/20 rounded-full blur-3xl" />
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-earth-wheat/30 rounded-full blur-3xl" />
        
        <div className="max-w-md mx-auto z-10">
          <div className="flex items-center mb-6">
            <Leaf className="h-12 w-12 text-earth-dark-green mr-4" />
            <h1 className="text-4xl font-bold text-earth-dark-green">TaniTrack</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-earth-dark-green mb-6">
            {activeTab === "petani" 
              ? "Daftar sebagai Petani" 
              : "Daftar sebagai Konsumen"}
          </h2>
          
          <div className="bg-white p-5 rounded-lg shadow-md border border-earth-light-green/50 mb-6">
            <h3 className="font-semibold mb-3 text-earth-dark-green text-lg">
              {activeTab === "petani" 
                ? "Manfaat untuk Petani:" 
                : "Manfaat untuk Konsumen:"}
            </h3>
            
            {activeTab === "petani" ? (
              <ul className="space-y-3">
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <ShoppingBag className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Jual hasil panen langsung ke konsumen</span>
                </li>
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <FileCheck className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Lacak pertumbuhan tanaman & hasil panen</span>
                </li>
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <Store className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Dapatkan harga pasar yang lebih baik</span>
                </li>
              </ul>
            ) : (
              <ul className="space-y-3">
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <ShoppingBag className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Beli produk pertanian segar langsung dari petani</span>
                </li>
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <FileCheck className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Lacak asal-usul produk yang Anda beli</span>
                </li>
                <li className="flex items-center text-earth-medium-green">
                  <div className="bg-earth-pale-green p-1.5 rounded-full mr-3">
                    <Store className="h-4 w-4 text-earth-dark-green" />
                  </div>
                  <span>Dukung petani lokal dan pertanian berkelanjutan</span>
                </li>
              </ul>
            )}
          </div>
          
          <div className="mt-8 relative">
            <img 
              src="/lovable-uploads/74ad6f02-a99d-46d0-a365-91b2411675c1.png" 
              alt="TaniTrack Card" 
              className="rounded-lg shadow-lg border-4 border-white"
            />
            <div className="absolute -right-4 -bottom-4 bg-earth-dark-green text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
              TaniTrack Card
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white md:bg-transparent">
        <Card className="w-full max-w-md shadow-lg border-none overflow-hidden bg-white md:bg-white/90 backdrop-blur-sm">
          <Tabs defaultValue="petani" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-earth-pale-green">
              <TabsTrigger 
                value="petani" 
                className="data-[state=active]:bg-earth-medium-green data-[state=active]:text-white text-earth-dark-green"
              >
                Petani
              </TabsTrigger>
              <TabsTrigger 
                value="konsumen" 
                className="data-[state=active]:bg-earth-medium-green data-[state=active]:text-white text-earth-dark-green"
              >
                Konsumen
              </TabsTrigger>
            </TabsList>
            
            <CardHeader className="bg-gradient-to-r from-earth-medium-green to-earth-dark-green text-white">
              <CardTitle className="text-center text-2xl">Pendaftaran</CardTitle>
              <CardDescription className="text-center text-white/90">
                {activeTab === "petani" 
                  ? "Isi formulir untuk mendaftar sebagai petani" 
                  : "Isi formulir untuk mendaftar sebagai konsumen"}
              </CardDescription>
            </CardHeader>

            <TabsContent value="petani">
              <form onSubmit={(e) => handleRegister(e, "petani")}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="ktp" className="text-earth-dark-green flex items-center">
                      <UserCircle2 className="h-4 w-4 mr-2" />
                      No. KTP
                    </Label>
                    <Input 
                      id="ktp" 
                      placeholder="Masukkan nomor KTP" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-earth-dark-green flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Nama (Optional)
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap" 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hp" className="text-earth-dark-green flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      No. HP/Whatsapp
                    </Label>
                    <Input 
                      id="hp" 
                      placeholder="Masukkan nomor HP" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-earth-dark-green flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Alamat Utama
                    </Label>
                    <Input 
                      id="address" 
                      placeholder="Masukkan alamat" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother" className="text-earth-dark-green">Nama Ibu Kandung</Label>
                    <Input 
                      id="mother" 
                      placeholder="Masukkan nama ibu kandung" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" required className="border-earth-medium-green text-earth-dark-green data-[state=checked]:bg-earth-medium-green data-[state=checked]:text-white" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none text-earth-dark-green"
                    >
                      Saya menyetujui syarat dan ketentuan
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-6">
                  <Button 
                    className="w-full bg-earth-dark-green hover:bg-earth-medium-green rounded-full h-12 text-base"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Memproses..." : "Daftar Sekarang"}
                    {!loading && <ArrowRightIcon className="ml-2 h-5 w-5" />}
                  </Button>
                  <div className="text-sm text-center text-earth-medium-green">
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-earth-dark-green hover:underline"
                    >
                      Masuk di sini
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="konsumen">
              <form onSubmit={(e) => handleRegister(e, "konsumen")}>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="ktp-konsumen" className="text-earth-dark-green flex items-center">
                      <UserCircle2 className="h-4 w-4 mr-2" />
                      No. KTP
                    </Label>
                    <Input 
                      id="ktp-konsumen" 
                      placeholder="Masukkan nomor KTP" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-konsumen" className="text-earth-dark-green flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Nama (Optional)
                    </Label>
                    <Input 
                      id="name-konsumen" 
                      placeholder="Masukkan nama lengkap" 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchant" className="text-earth-dark-green flex items-center">
                      <Store className="h-4 w-4 mr-2" />
                      Nama Perusahaan/Merchant
                    </Label>
                    <Input 
                      id="merchant" 
                      placeholder="Masukkan nama perusahaan" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hp-konsumen" className="text-earth-dark-green flex items-center">
                      <Phone className="h-4 w-4 mr-2" />
                      No. HP/Whatsapp
                    </Label>
                    <Input 
                      id="hp-konsumen" 
                      placeholder="Masukkan nomor HP" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-konsumen" className="text-earth-dark-green flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Alamat Utama
                    </Label>
                    <Input 
                      id="address-konsumen" 
                      placeholder="Masukkan alamat" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother-konsumen" className="text-earth-dark-green">Nama Ibu Kandung</Label>
                    <Input 
                      id="mother-konsumen" 
                      placeholder="Masukkan nama ibu kandung" 
                      required 
                      className="border-earth-light-green focus-visible:ring-earth-dark-green"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms-konsumen" 
                      required 
                      className="border-earth-medium-green text-earth-dark-green data-[state=checked]:bg-earth-medium-green data-[state=checked]:text-white"
                    />
                    <label
                      htmlFor="terms-konsumen"
                      className="text-sm font-medium leading-none text-earth-dark-green"
                    >
                      Saya menyetujui syarat dan ketentuan
                    </label>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-4 pb-6">
                  <Button 
                    className="w-full bg-earth-dark-green hover:bg-earth-medium-green rounded-full h-12 text-base"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Memproses..." : "Daftar Sekarang"}
                    {!loading && <ArrowRightIcon className="ml-2 h-5 w-5" />}
                  </Button>
                  <div className="text-sm text-center text-earth-medium-green">
                    Sudah punya akun?{" "}
                    <Link
                      to="/login"
                      className="font-semibold text-earth-dark-green hover:underline"
                    >
                      Masuk di sini
                    </Link>
                  </div>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
