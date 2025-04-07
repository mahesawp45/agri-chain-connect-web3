
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
        navigate("/");
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
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* Left Section - Explanation */}
      <div className="w-full md:w-1/2 bg-gray-200 p-8 flex items-center justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-tani-green-dark mb-4">
            Penjelasan Penggunaan Login dengan TaniTrack Card
          </h1>
          <p className="text-gray-700 mb-6">
            TaniTrack Card adalah kartu identitas digital yang memudahkan petani dan konsumen untuk 
            login ke platform. Kartu ini dilengkapi dengan teknologi keamanan untuk melindungi 
            akun Anda dari akses yang tidak sah.
          </p>
          
          <div className="bg-white p-4 rounded-lg shadow-md mb-8">
            <h3 className="font-semibold mb-2">Cara Menggunakan:</h3>
            <ol className="list-decimal pl-5 space-y-2">
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
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Masuk</CardTitle>
            <CardDescription className="text-center">
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
                  />
                  <p className="text-xs text-gray-500">
                    Format: F-XXXXXX-XX (Petani) atau B-XXXXXX-XX (Konsumen)
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gray-700 hover:bg-gray-800"
                  disabled={loading}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
                <p className="text-sm text-center text-gray-500">
                  Belum punya akun?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-tani-green-dark hover:text-tani-green-dark/90"
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
                  <p className="text-sm text-center mb-4">Input OTP</p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button 
                  onClick={verifyOtp} 
                  className="w-full bg-gray-700 hover:bg-gray-800"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
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
