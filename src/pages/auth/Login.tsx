
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { ArrowRightIcon, HelpCircle, Leaf, ShieldCheck, Store, Tractor } from "lucide-react";
import { TaniTrackCard } from "@/components/custom/TaniTrackCard";

export default function Login() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate sending OTP
    setTimeout(() => {
      toast({
        title: "Kode OTP telah dikirim!",
        description: "Silakan masukkan kode OTP yang telah dikirim ke perangkat TaniTrack Card Anda",
      });
      setShowOtpInput(true);
      setLoading(false);
    }, 1000);
  };

  const verifyOtp = () => {
    setLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otp.length === 6) {
        toast({
          title: "Login berhasil!",
          description: "Selamat datang kembali di TaniTrack",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Gagal masuk",
          description: "Kode OTP tidak valid",
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-earth-pale-green to-white overflow-hidden">
      {/* Left Section - Visual & Explanation */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center relative">
        <div className="absolute -bottom-64 -left-64 w-96 h-96 bg-earth-light-green/20 rounded-full blur-3xl" />
        <div className="absolute -top-64 -right-64 w-96 h-96 bg-earth-wheat/30 rounded-full blur-3xl" />
        
        <div className="max-w-md mx-auto z-10">
          <div className="flex items-center mb-6">
            <div className="h-12 w-12 rounded-md overflow-hidden flex items-center justify-center bg-white/90 mr-4">
              <img 
                src="/lovable-uploads/f7fb75ca-ee07-4d12-a8ab-4e5152e13679.png" 
                alt="TaniTrack Logo" 
                className="h-full w-full object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-earth-dark-green">TaniTrack</h1>
          </div>
          
          <h2 className="text-2xl font-bold text-earth-dark-green mb-6">
            Aplikasi Pengelolaan Pertanian untuk Kesejahteraan Petani
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow-md border border-earth-light-green/50 flex items-start">
              <Tractor className="h-6 w-6 text-earth-medium-green mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-earth-dark-green">Mudah Digunakan</h3>
                <p className="text-earth-medium-green text-sm">
                  Dirancang khusus untuk petani dengan antarmuka sederhana dan terintuitif, tanpa perlu keahlian teknologi tinggi.
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-earth-light-green/50 flex items-start">
              <ShieldCheck className="h-6 w-6 text-earth-medium-green mr-3 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1 text-earth-dark-green">Keamanan Tinggi</h3>
                <p className="text-earth-medium-green text-sm">
                  TaniTrack Card menjamin keamanan akun Anda dengan sistem OTP yang terproteksi.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center">
              <TaniTrackCard 
                type="farmer"
                name="AGUS SURYANA"
                id="F-230599-JB"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-white md:bg-transparent">
        <Card className="w-full max-w-md shadow-lg border-earth-light-brown/40 overflow-hidden bg-white md:bg-white/95 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-earth-dark-green to-earth-medium-green text-white py-6">
            <CardTitle className="text-center text-2xl">Masuk ke TaniTrack</CardTitle>
            <CardDescription className="text-center text-white/90 mt-2">
              {showOtpInput
                ? "Masukkan kode OTP yang dikirim ke perangkat Anda"
                : "Masukkan ID TaniTrack untuk memulai"}
            </CardDescription>
          </CardHeader>

          {!showOtpInput ? (
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-5 pt-6 px-8">
                <div className="space-y-3">
                  <label htmlFor="tanitrack-id" className="text-earth-dark-green font-medium block">
                    ID TaniTrack
                  </label>
                  <Input
                    id="tanitrack-id"
                    type="text"
                    placeholder="Masukkan ID TaniTrack"
                    required
                    className="border-earth-light-brown focus-visible:ring-earth-medium-green text-base h-12"
                  />
                  <div className="flex items-start text-xs text-earth-dark-green">
                    <HelpCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0 text-earth-medium-green" />
                    <span>Format: F-XXXXXX-XX (Petani) atau B-XXXXXX-XX (Konsumen). ID ini terdapat pada kartu TaniTrack Anda.</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pb-8 px-8">
                <Button 
                  type="submit" 
                  className="w-full bg-earth-dark-green hover:bg-earth-medium-green rounded-full h-12 text-base"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Lanjutkan"}
                  {!loading && <ArrowRightIcon className="ml-2 h-5 w-5" />}
                </Button>
                <div className="text-sm text-center text-earth-dark-green">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-earth-medium-green hover:underline"
                  >
                    Daftar sekarang
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <div>
              <CardContent className="space-y-6 pt-6 px-8">
                <div className="space-y-3">
                  <p className="text-earth-dark-green font-medium text-center">Masukkan 6 Digit Kode OTP</p>
                  <p className="text-sm text-earth-dark-green text-center mb-4">
                    Kode dikirim ke perangkat yang terhubung dengan TaniTrack Card Anda
                  </p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                        <InputOTPSlot index={1} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                        <InputOTPSlot index={2} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                        <InputOTPSlot index={3} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                        <InputOTPSlot index={4} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                        <InputOTPSlot index={5} className="border-earth-medium-green focus-visible:ring-earth-dark-green h-14 w-14 text-xl" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4 pb-8 px-8">
                <Button 
                  onClick={verifyOtp} 
                  className="w-full bg-earth-dark-green hover:bg-earth-medium-green rounded-full h-12 text-base"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Memverifikasi..." : "Verifikasi & Masuk"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-earth-light-brown text-earth-dark-green hover:bg-earth-pale-green rounded-full"
                  onClick={() => setShowOtpInput(false)}
                >
                  Kembali
                </Button>
              </CardFooter>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
