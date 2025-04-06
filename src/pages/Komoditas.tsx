
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, QrCode, Filter } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { commodities, commodityTypes, commodityUnits, commodityGrades, farmerLocations } from "@/lib/data/mockData";
import { formatDate } from "@/lib/utils";

export default function Komoditas() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [newCommodity, setNewCommodity] = useState({
    name: "",
    type: "",
    unit: "",
    quantity: "",
    location: "",
    grade: "",
    imageUrl: null as File | null,
    gradingFileUrl: null as File | null,
  });
  const navigate = useNavigate();

  const filteredCommodities = commodities.filter((commodity) => {
    const matchesSearch = commodity.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !selectedType || commodity.type === selectedType;
    return matchesSearch && matchesType;
  });

  const handleAddCommodity = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call
    console.log("Adding new commodity:", newCommodity);
    setOpenAddDialog(false);
    // Reset form
    setNewCommodity({
      name: "",
      type: "",
      unit: "",
      quantity: "",
      location: "",
      grade: "",
      imageUrl: null,
      gradingFileUrl: null,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'gradingFileUrl') => {
    if (e.target.files && e.target.files[0]) {
      setNewCommodity({
        ...newCommodity,
        [field]: e.target.files[0]
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight">Komoditas</h1>
          <div className="flex gap-2">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Cari komoditas..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" /> Tambah Komoditas
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Tambah Komoditas Baru</DialogTitle>
                  <DialogDescription>
                    Lengkapi informasi komoditas yang ingin Anda tambahkan.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleAddCommodity} className="space-y-5 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nama Komoditas</Label>
                      <Input
                        id="name"
                        value={newCommodity.name}
                        onChange={(e) => setNewCommodity({ ...newCommodity, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Jenis Komoditas</Label>
                      <Select
                        value={newCommodity.type}
                        onValueChange={(value) => setNewCommodity({ ...newCommodity, type: value })}
                        required
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Pilih jenis komoditas" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Jenis Komoditas</SelectLabel>
                            {commodityTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="unit">Satuan</Label>
                      <Select
                        value={newCommodity.unit}
                        onValueChange={(value) => setNewCommodity({ ...newCommodity, unit: value })}
                        required
                      >
                        <SelectTrigger id="unit">
                          <SelectValue placeholder="Pilih satuan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Satuan</SelectLabel>
                            {commodityUnits.map((unit) => (
                              <SelectItem key={unit} value={unit}>
                                {unit}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="quantity">Jumlah</Label>
                      <Input
                        id="quantity"
                        type="number"
                        min="1"
                        value={newCommodity.quantity}
                        onChange={(e) => setNewCommodity({ ...newCommodity, quantity: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Lokasi</Label>
                      <Select
                        value={newCommodity.location}
                        onValueChange={(value) => setNewCommodity({ ...newCommodity, location: value })}
                        required
                      >
                        <SelectTrigger id="location">
                          <SelectValue placeholder="Pilih lokasi" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Lokasi</SelectLabel>
                            {farmerLocations.map((location) => (
                              <SelectItem key={location} value={location}>
                                {location}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="grade">Status Grade</Label>
                      <Select
                        value={newCommodity.grade}
                        onValueChange={(value) => setNewCommodity({ ...newCommodity, grade: value })}
                        required
                      >
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Pilih grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Grade</SelectLabel>
                            {commodityGrades.map((grade) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Foto Komoditas</Label>
                      <Input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 'imageUrl')}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="gradingFile">File Grading</Label>
                      <Input
                        id="gradingFile"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => handleImageChange(e, 'gradingFileUrl')}
                        required
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Simpan Komoditas</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="table" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="table">Tabel</TabsTrigger>
            <TabsTrigger value="card">Kartu</TabsTrigger>
          </TabsList>
          <TabsContent value="table" className="space-y-4">
            <div className="flex items-center gap-2">
              <Select
                value={selectedType || ""}
                onValueChange={(value) => setSelectedType(value === "" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Jenis</SelectItem>
                  {commodityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden border">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-700">
                    <tr>
                      <th className="py-3 px-4 text-left font-medium">Nama</th>
                      <th className="py-3 px-4 text-left font-medium">Jenis</th>
                      <th className="py-3 px-4 text-left font-medium">Jumlah</th>
                      <th className="py-3 px-4 text-left font-medium">Grade</th>
                      <th className="py-3 px-4 text-left font-medium">Lokasi</th>
                      <th className="py-3 px-4 text-left font-medium">Tanggal Dibuat</th>
                      <th className="py-3 px-4 text-center font-medium">QR Code</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredCommodities.map((commodity) => (
                      <tr key={commodity.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/komoditas/${commodity.id}`)}>
                        <td className="py-3 px-4">{commodity.name}</td>
                        <td className="py-3 px-4">{commodity.type}</td>
                        <td className="py-3 px-4">
                          {commodity.quantity} {commodity.unit}
                        </td>
                        <td className="py-3 px-4">{commodity.grade}</td>
                        <td className="py-3 px-4">{commodity.location}</td>
                        <td className="py-3 px-4">{formatDate(commodity.createdAt)}</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="icon">
                            <QrCode className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="card" className="space-y-4">
            <div className="flex items-center gap-2">
              <Select
                value={selectedType || ""}
                onValueChange={(value) => setSelectedType(value === "" ? null : value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter jenis" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Semua Jenis</SelectItem>
                  {commodityTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredCommodities.map((commodity) => (
                <div
                  key={commodity.id}
                  className="bg-white border rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/komoditas/${commodity.id}`)}
                >
                  <div className="h-48 bg-gray-200">
                    <img
                      src={commodity.imageUrl}
                      alt={commodity.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{commodity.name}</h3>
                        <p className="text-sm text-gray-500">{commodity.type}</p>
                      </div>
                      <div className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        Grade {commodity.grade}
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <p className="text-sm">
                        <span className="font-medium">Jumlah:</span>{" "}
                        {commodity.quantity} {commodity.unit}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Lokasi:</span>{" "}
                        {commodity.location}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Tanggal:</span>{" "}
                        {formatDate(commodity.createdAt)}
                      </p>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="ghost" size="sm" className="text-agriGreen-600">
                        <QrCode className="h-4 w-4 mr-1" /> QR Code
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
