
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

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
    <div className="min-h-screen flex flex-col md:flex-row bg-earth-pale-green">
      {/* Left Section - Explanation */}
      <div className="w-full md:w-1/2 bg-earth-light-green/30 p-8 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-earth-dark-green mb-4">
            Penjelasan Penggunaan Login dengan TaniTrack Card
          </h1>
          <p className="text-gray-700 mb-6">
            TaniTrack Card adalah kartu identitas digital yang memudahkan petani dan konsumen untuk 
            login ke platform. Kartu ini dilengkapi dengan teknologi keamanan untuk melindungi 
            akun Anda dari akses yang tidak sah.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-8 border border-earth-light-green">
            <h3 className="font-semibold mb-2 text-earth-dark-green">Cara Menggunakan:</h3>
            <ol className="list-decimal pl-5 space-y-2 text-earth-dark-green">
              <li>Masukkan ID TaniTrack Anda pada layar login</li>
              <li>Sistem akan mengirim kode OTP ke perangkat Anda</li>
              <li>Masukkan kode OTP untuk menyelesaikan proses login</li>
            </ol>
          </div>
          
          <div className="mt-8">
            <img 
              src="/lovable-uploads/dea4ed3d-edc5-4e93-be76-2a87b3ea5476.png" 
              alt="TaniTrack Card" 
              className="max-w-full rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-lg border-earth-light-green earth-card-wheat">
          <CardHeader className="earth-header-moss">
            <CardTitle className="text-center text-2xl">Masuk</CardTitle>
            <CardDescription className="text-center text-white">
              {showOtpInput
                ? "Masukkan kode OTP yang dikirim"
                : "Masukkan ID TaniTrack Anda"}
            </CardDescription>
          </CardHeader>

          {!showOtpInput ? (
            <form onSubmit={handleLogin}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Input
                    id="tanitrack-id"
                    type="text"
                    placeholder="Masukkan ID TaniTrack"
                    required
                    className="border-earth-medium-green focus:border-earth-dark-green"
                  />
                  <p className="text-xs text-gray-500">
                    Format: F-XXXXXX-XX (Petani) atau B-XXXXXX-XX (Konsumen)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full bg-earth-dark-green hover:bg-earth-medium-green"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
                <p className="text-sm text-center text-earth-dark-green">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-earth-medium-green hover:text-earth-dark-green"
                  >
                    Daftar sekarang
                  </Link>
                </p>
              </CardFooter>
            </form>
          ) : (
            <div>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <p className="text-sm text-center mb-4 text-earth-dark-green">Input OTP</p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} className="border-earth-medium-green focus:border-earth-dark-green" />
                        <InputOTPSlot index={1} className="border-earth-medium-green focus:border-earth-dark-green" />
                        <InputOTPSlot index={2} className="border-earth-medium-green focus:border-earth-dark-green" />
                        <InputOTPSlot index={3} className="border-earth-medium-green focus:border-earth-dark-green" />
                        <InputOTPSlot index={4} className="border-earth-medium-green focus:border-earth-dark-green" />
                        <InputOTPSlot index={5} className="border-earth-medium-green focus:border-earth-dark-green" />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  onClick={verifyOtp} 
                  className="w-full bg-earth-dark-green hover:bg-earth-medium-green"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-earth-light-green text-earth-dark-green hover:bg-earth-light-green/20"
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
