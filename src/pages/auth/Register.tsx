
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-earth-pale-green">
      {/* Left Section - Explanation */}
      <div className="w-full md:w-1/2 bg-earth-light-green/30 p-8 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-earth-dark-green mb-4">
            {activeTab === "petani" 
              ? "Flow singkat dari Platform untuk Petani" 
              : "Flow singkat dari Platform untuk Konsumen"}
          </h1>
          <p className="text-earth-dark-green mb-6">
            {activeTab === "petani" 
              ? "Platform TaniTrack memudahkan petani dalam melacak dan menjual hasil pertanian mereka secara langsung ke konsumen dengan harga yang lebih baik. Sistem kami juga membantu petani mendapatkan informasi harga pasar terkini."
              : "Sebagai konsumen, Anda dapat membeli produk pertanian segar langsung dari petani, memastikan kualitas terbaik dengan harga yang transparan. TaniTrack menjamin keaslian dan kualitas produk yang Anda beli."}
          </p>
          <div className="mt-8">
            <img 
              src="/lovable-uploads/dea4ed3d-edc5-4e93-be76-2a87b3ea5476.png" 
              alt="TaniTrack Card" 
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Registration Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-earth-light-green earth-card-wheat">
          <Tabs defaultValue="petani" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-earth-light-green">
              <TabsTrigger value="petani" className="data-[state=active]:bg-earth-medium-green data-[state=active]:text-white">Petani</TabsTrigger>
              <TabsTrigger value="konsumen" className="data-[state=active]:bg-earth-medium-green data-[state=active]:text-white">Konsumen</TabsTrigger>
            </TabsList>
            
            <CardHeader className="earth-header-moss">
              <CardTitle className="text-center text-2xl">Pendaftaran</CardTitle>
              <CardDescription className="text-center text-white">
                {activeTab === "petani" 
                  ? "Daftar sebagai petani di TaniTrack" 
                  : "Daftar sebagai konsumen di TaniTrack"}
              </CardDescription>
            </CardHeader>

            <TabsContent value="petani">
              <form onSubmit={(e) => handleRegister(e, "petani")}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ktp" className="text-earth-dark-green">No.KTP</Label>
                    <Input 
                      id="ktp" 
                      placeholder="Masukkan nomor KTP" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-earth-dark-green">Nama (Optional)</Label>
                    <Input 
                      id="name" 
                      placeholder="Masukkan nama lengkap" 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hp" className="text-earth-dark-green">No.HP/Whatsapp</Label>
                    <Input 
                      id="hp" 
                      placeholder="Masukkan nomor HP" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-earth-dark-green">Alamat Utama</Label>
                    <Input 
                      id="address" 
                      placeholder="Masukkan alamat" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother" className="text-earth-dark-green">Nama Ibu Kandung</Label>
                    <Input 
                      id="mother" 
                      placeholder="Masukkan nama ibu kandung" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" required className="border-earth-medium-green text-earth-dark-green" />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-dark-green"
                    >
                      Terms and Condition
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-earth-dark-green hover:bg-earth-medium-green"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Memproses..." : "Daftar"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="konsumen">
              <form onSubmit={(e) => handleRegister(e, "konsumen")}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ktp-konsumen" className="text-earth-dark-green">No.KTP</Label>
                    <Input 
                      id="ktp-konsumen" 
                      placeholder="Masukkan nomor KTP" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name-konsumen" className="text-earth-dark-green">Nama (Optional)</Label>
                    <Input 
                      id="name-konsumen" 
                      placeholder="Masukkan nama lengkap" 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="merchant" className="text-earth-dark-green">Nama Perusahaan/Merchant</Label>
                    <Input 
                      id="merchant" 
                      placeholder="Masukkan nama perusahaan" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hp-konsumen" className="text-earth-dark-green">No.HP/Whatsapp</Label>
                    <Input 
                      id="hp-konsumen" 
                      placeholder="Masukkan nomor HP" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address-konsumen" className="text-earth-dark-green">Alamat Utama</Label>
                    <Input 
                      id="address-konsumen" 
                      placeholder="Masukkan alamat" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mother-konsumen" className="text-earth-dark-green">Nama Ibu Kandung</Label>
                    <Input 
                      id="mother-konsumen" 
                      placeholder="Masukkan nama ibu kandung" 
                      required 
                      className="border-earth-medium-green focus:border-earth-dark-green"
                    />
                  </div>
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms-konsumen" 
                      required 
                      className="border-earth-medium-green text-earth-dark-green"
                    />
                    <label
                      htmlFor="terms-konsumen"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-earth-dark-green"
                    >
                      Terms and Condition
                    </label>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full bg-earth-dark-green hover:bg-earth-medium-green"
                    disabled={loading}
                    type="submit"
                  >
                    {loading ? "Memproses..." : "Daftar"}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
