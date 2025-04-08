
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Define available languages
export type Language = 'id' | 'en';

// Define translation object structure - updated to avoid circular reference
interface NestedTranslations {
  [key: string]: string | NestedTranslations;
}

// Define translations object structure
type TranslationsType = {
  [key in Language]: Record<string, string | NestedTranslations>;
};

// Translations dictionary
export const translations: TranslationsType = {
  en: {
    // General
    "app.name": "TaniTrack",
    "app.tagline": "Agricultural Supply Chain Management",
    "action.search": "Search",
    "action.filter": "Filter",
    "action.view": "View",
    "action.edit": "Edit",
    "action.delete": "Delete",
    "action.save": "Save",
    "action.cancel": "Cancel",
    "action.close": "Close",
    "action.add": "Add",
    "action.back": "Back",
    "action.next": "Next",
    "action.submit": "Submit",
    "action.download": "Download",
    "action.upload": "Upload",
    "action.clear": "Clear",
    "action.confirm": "Confirm",
    "action.deny": "Deny",
    "action.refresh": "Refresh",
    "action.details": "Details",
    "action.showAll": "Show All",
    "action.showMore": "Show More",

    // Navigation
    "nav.dashboard": "Dashboard",
    "nav.commodities": "Commodities",
    "nav.balance": "Balance",
    "nav.transactions": "Transactions",
    "nav.orderbook": "Order Book",
    "nav.prices": "Prices",
    "nav.shipping": "Shipping",
    "nav.profile": "Profile",
    "nav.logout": "Logout",
    "nav.settings": "Settings",
    "nav.notifications": "Notifications",
    "nav.home": "Home",

    // Commodities
    "commodities.title": "Commodities",
    "commodities.subtitle": "Manage your agricultural commodities",
    "commodities.add": "Add Commodity",
    "commodities.name": "Name",
    "commodities.type": "Type",
    "commodities.quantity": "Quantity",
    "commodities.location": "Location",
    "commodities.grade": "Grade",
    "commodities.action": "Action",
    "commodities.search": "Search commodities...",
    "commodities.detail": "Commodity Details",
    "commodities.qrcode": "QR Code",
    "commodities.unit": "Unit",
    "commodities.created": "Created Date",
    "commodities.upload.image": "Upload commodity image",
    "commodities.upload.grade": "Upload grading file",
    "commodities.list": "Commodity List",
    "commodities.notfound": "No commodities found",
    "commodities.history": "Transaction History",
    "commodities.export": "Export Data",
    "commodities.import": "Import Data",
    "commodities.filter": "Filter Commodities",
    "commodities.sort": "Sort By",
    "commodities.harvest": "Harvest Date",
    "commodities.origin": "Origin",
    "commodities.category": "Category",
    "commodities.price": "Price",
    "commodities.certifications": "Certifications",
    "commodities.description": "Description",

    // Transactions
    "transactions.title": "Transactions",
    "transactions.subtitle": "Manage your commodity transactions",
    "transactions.id": "Transaction ID",
    "transactions.type": "Type",
    "transactions.commodity": "Commodity",
    "transactions.quantity": "Quantity",
    "transactions.price": "Price",
    "transactions.status": "Status",
    "transactions.buyer": "Buyer",
    "transactions.seller": "Seller",
    "transactions.date": "Date",
    "transactions.action": "Action",
    "transactions.search": "Search transactions...",
    "transactions.detail": "Transaction Details",
    "transactions.all": "All",
    "transactions.pending": "Pending",
    "transactions.confirmed": "Confirmed",
    "transactions.paid": "Paid",
    "transactions.shipped": "Shipped",
    "transactions.completed": "Completed",
    "transactions.canceled": "Canceled",
    "transactions.total": "Total Price",
    "transactions.terms": "Terms & Conditions",
    "transactions.notfound": "No transactions found",
    "transactions.filters": "Transaction Filters",
    "transactions.payment": "Payment Method",
    "transactions.timeline": "Transaction Timeline",
    "transactions.documents": "Documents",
    "transactions.notes": "Notes",
    "transactions.invoice": "Invoice",

    // Order Book
    "orderbook.title": "Order Book",
    "orderbook.subtitle": "View and accept commodity requests from buyers",
    "orderbook.id": "Order ID",
    "orderbook.buyer": "Buyer",
    "orderbook.commodity": "Commodity",
    "orderbook.quantity": "Quantity",
    "orderbook.grade": "Required Grade",
    "orderbook.delivery": "Delivery Date",
    "orderbook.expiry": "Expiry Date",
    "orderbook.status": "Status",
    "orderbook.action": "Action",
    "orderbook.search": "Search order book...",
    "orderbook.detail": "Order Book Details",
    "orderbook.list": "Order Book List",
    "orderbook.all": "All",
    "orderbook.open": "Open",
    "orderbook.accepted": "Accepted",
    "orderbook.completed": "Completed",
    "orderbook.expired": "Expired",
    "orderbook.terms": "Terms & Conditions",
    "orderbook.notfound": "No order book entries found",
    "orderbook.filter": "Filter Orders",
    "orderbook.sort": "Sort By",
    "orderbook.create": "Create Order",
    "orderbook.price": "Asking Price",
    "orderbook.total": "Total Value",
    "orderbook.offers": "Offers",
    "orderbook.respond": "Respond to Order",

    // Shipping
    "shipping.title": "Shipping",
    "shipping.subtitle": "Track and manage your shipments",
    "shipping.id": "Shipment ID",
    "shipping.origin": "Origin",
    "shipping.destination": "Destination",
    "shipping.status": "Status",
    "shipping.carrier": "Carrier",
    "shipping.tracking": "Tracking Number",
    "shipping.departureDate": "Departure Date",
    "shipping.arrivalDate": "Estimated Arrival",
    "shipping.commodity": "Commodity",
    "shipping.weight": "Weight",
    "shipping.cost": "Shipping Cost",
    "shipping.documents": "Documents",
    "shipping.notfound": "No shipments found",
    "shipping.create": "Create Shipment",
    "shipping.detail": "Shipment Details",
    "shipping.updateStatus": "Update Status",
    "shipping.trackShipment": "Track Shipment",
    "shipping.vehicle": "Vehicle Type",
    "shipping.driverInfo": "Driver Information",
    "shipping.contact": "Contact",
    "shipping.instructions": "Special Instructions",
    "shipping.route": "Route Information",
    "shipping.stops": "Stops",
    "shipping.history": "Status History",

    // Prices
    "prices.title": "Market Prices",
    "prices.subtitle": "View current commodity prices",
    "prices.commodity": "Commodity",
    "prices.category": "Category",
    "prices.currentPrice": "Current Price",
    "prices.change": "24h Change",
    "prices.volume": "24h Volume",
    "prices.high": "24h High",
    "prices.low": "24h Low",
    "prices.chart": "Price Chart",
    "prices.history": "Price History",
    "prices.forecast": "Price Forecast",
    "prices.market": "Market",
    "prices.date": "Last Updated",
    "prices.source": "Data Source",
    "prices.filter": "Filter Prices",
    "prices.compare": "Compare",
    "prices.watchlist": "Add to Watchlist",
    "prices.trends": "Market Trends",
    "prices.notifications": "Price Alerts",

    // Status labels
    "status.open": "Open",
    "status.accepted": "Accepted",
    "status.completed": "Completed",
    "status.expired": "Expired",
    "status.canceled": "Canceled",
    "status.pending": "Pending",
    "status.confirmed": "Confirmed",
    "status.paid": "Paid",
    "status.shipped": "Shipped",
    "status.received": "Received",
    "status.processing": "Processing",
    "status.notshipped": "Not Shipped",
    "status.shipping": "Shipping",
    "status.delivered": "Delivered",
    "status.inTransit": "In Transit",
    "status.outForDelivery": "Out for Delivery",
    "status.failed": "Failed",
    "status.delayed": "Delayed",
    "status.returned": "Returned",
    "status.approved": "Approved",
    "status.rejected": "Rejected",
    "status.draft": "Draft",
    "status.onHold": "On Hold",

    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.welcome": "Welcome to TaniTrack",
    "dashboard.summary": "Summary",
    "dashboard.recentTransactions": "Recent Transactions",
    "dashboard.pendingOrders": "Pending Orders",
    "dashboard.upcomingShipments": "Upcoming Shipments",
    "dashboard.marketInsights": "Market Insights",
    "dashboard.commodityStatus": "Commodity Status",
    "dashboard.analytics": "Analytics",
    "dashboard.quickActions": "Quick Actions",
    "dashboard.alerts": "Alerts",
    "dashboard.recommendations": "Recommendations",

    // Profile/Account
    "profile.title": "Profile",
    "profile.personalInfo": "Personal Information",
    "profile.company": "Company Information",
    "profile.security": "Security",
    "profile.preferences": "Preferences",
    "profile.notifications": "Notifications",
    "profile.paymentMethods": "Payment Methods",
    "profile.accountHistory": "Account History",
    "profile.documents": "Documents",
    "profile.settings": "Account Settings",
    "profile.help": "Help & Support",
    "profile.logout": "Logout",
    "profile.editProfile": "Edit Profile",
    "profile.changePassword": "Change Password",
    "profile.language": "Language",
    "profile.theme": "Theme",
    "profile.verifications": "Verifications",

    // Balance/Finance
    "balance.title": "Balance",
    "balance.available": "Available Balance",
    "balance.pending": "Pending",
    "balance.totalValue": "Total Value",
    "balance.transactions": "Transaction History",
    "balance.withdraw": "Withdraw",
    "balance.deposit": "Deposit",
    "balance.transfer": "Transfer",
    "balance.statement": "Statement",
    "balance.paymentMethods": "Payment Methods",
    "balance.settings": "Payment Settings",
    "balance.currency": "Currency",
    "balance.exchange": "Exchange Rate",
    
    // Time and dates
    "time.today": "Today",
    "time.yesterday": "Yesterday",
    "time.tomorrow": "Tomorrow",
    "time.thisWeek": "This Week",
    "time.lastWeek": "Last Week",
    "time.thisMonth": "This Month",
    "time.lastMonth": "Last Month",
    "time.thisYear": "This Year",
    "time.lastYear": "Last Year",
    "time.custom": "Custom Range",
    
    // Charts and Analytics
    "charts.dailyPrices": "Daily Prices",
    "charts.monthlyVolume": "Monthly Volume",
    "charts.commodityDistribution": "Commodity Distribution",
    "charts.transactionTrends": "Transaction Trends",
    "charts.marketComparison": "Market Comparison",
    "charts.supplyDemand": "Supply & Demand",
    "charts.seasonalTrends": "Seasonal Trends",
    "charts.priceForecasts": "Price Forecasts",
    "charts.exportImport": "Export/Import Ratio",
    "charts.incomeExpenses": "Income & Expenses",
    
    // Errors and notifications
    "error.generic": "An error occurred",
    "error.notFound": "Not found",
    "error.unauthorized": "Unauthorized access",
    "error.forbidden": "Access forbidden",
    "error.validation": "Validation error",
    "error.network": "Network error",
    "error.serverError": "Server error",
    "error.timeout": "Request timeout",
    "error.unavailable": "Service unavailable",
    "success.saved": "Successfully saved",
    "success.created": "Successfully created",
    "success.updated": "Successfully updated",
    "success.deleted": "Successfully deleted",
    "info.processing": "Processing your request",
    "info.noData": "No data available",
    "warning.unsaved": "You have unsaved changes",
  },
  id: {
    // General
    "app.name": "TaniTrack",
    "app.tagline": "Manajemen Rantai Pasok Pertanian",
    "action.search": "Cari",
    "action.filter": "Filter",
    "action.view": "Lihat",
    "action.edit": "Edit",
    "action.delete": "Hapus",
    "action.save": "Simpan",
    "action.cancel": "Batal",
    "action.close": "Tutup",
    "action.add": "Tambah",
    "action.back": "Kembali",
    "action.next": "Selanjutnya",
    "action.submit": "Kirim",
    "action.download": "Unduh",
    "action.upload": "Unggah",
    "action.clear": "Bersihkan",
    "action.confirm": "Konfirmasi",
    "action.deny": "Tolak",
    "action.refresh": "Segarkan",
    "action.details": "Detail",
    "action.showAll": "Tampilkan Semua",
    "action.showMore": "Tampilkan Lebih",

    // Navigation
    "nav.dashboard": "Dasbor",
    "nav.commodities": "Komoditas",
    "nav.balance": "Saldo",
    "nav.transactions": "Transaksi",
    "nav.orderbook": "Order Book",
    "nav.prices": "Harga",
    "nav.shipping": "Pengiriman",
    "nav.profile": "Profil",
    "nav.logout": "Keluar",
    "nav.settings": "Pengaturan",
    "nav.notifications": "Notifikasi",
    "nav.home": "Beranda",

    // Commodities
    "commodities.title": "Komoditas",
    "commodities.subtitle": "Kelola komoditas pertanian Anda",
    "commodities.add": "Tambah Komoditas",
    "commodities.name": "Nama",
    "commodities.type": "Jenis",
    "commodities.quantity": "Jumlah",
    "commodities.location": "Lokasi",
    "commodities.grade": "Grade",
    "commodities.action": "Aksi",
    "commodities.search": "Cari komoditas...",
    "commodities.detail": "Detail Komoditas",
    "commodities.qrcode": "QR Code",
    "commodities.unit": "Satuan",
    "commodities.created": "Tanggal Dibuat",
    "commodities.upload.image": "Unggah foto komoditas",
    "commodities.upload.grade": "Unggah file grading",
    "commodities.list": "Daftar Komoditas",
    "commodities.notfound": "Tidak ada komoditas yang ditemukan",
    "commodities.history": "Riwayat Transaksi",
    "commodities.export": "Ekspor Data",
    "commodities.import": "Impor Data",
    "commodities.filter": "Filter Komoditas",
    "commodities.sort": "Urutkan Berdasarkan",
    "commodities.harvest": "Tanggal Panen",
    "commodities.origin": "Asal",
    "commodities.category": "Kategori",
    "commodities.price": "Harga",
    "commodities.certifications": "Sertifikasi",
    "commodities.description": "Deskripsi",

    // Transactions
    "transactions.title": "Transaksi",
    "transactions.subtitle": "Kelola transaksi komoditas Anda",
    "transactions.id": "ID Transaksi",
    "transactions.type": "Tipe",
    "transactions.commodity": "Komoditas",
    "transactions.quantity": "Jumlah",
    "transactions.price": "Harga",
    "transactions.status": "Status",
    "transactions.buyer": "Pembeli",
    "transactions.seller": "Penjual",
    "transactions.date": "Tanggal",
    "transactions.action": "Aksi",
    "transactions.search": "Cari transaksi...",
    "transactions.detail": "Detail Transaksi",
    "transactions.all": "Semua",
    "transactions.pending": "Menunggu",
    "transactions.confirmed": "Dikonfirmasi",
    "transactions.paid": "Dibayar",
    "transactions.shipped": "Dikirim",
    "transactions.completed": "Selesai",
    "transactions.canceled": "Dibatalkan",
    "transactions.total": "Total Harga",
    "transactions.terms": "Syarat & Ketentuan",
    "transactions.notfound": "Tidak ada transaksi yang ditemukan",
    "transactions.filters": "Filter Transaksi",
    "transactions.payment": "Metode Pembayaran",
    "transactions.timeline": "Timeline Transaksi",
    "transactions.documents": "Dokumen",
    "transactions.notes": "Catatan",
    "transactions.invoice": "Faktur",

    // Order Book
    "orderbook.title": "Order Book",
    "orderbook.subtitle": "Lihat dan terima permintaan komoditas dari pembeli",
    "orderbook.id": "ID Order",
    "orderbook.buyer": "Pembeli",
    "orderbook.commodity": "Komoditas",
    "orderbook.quantity": "Jumlah",
    "orderbook.grade": "Grade yang Diminta",
    "orderbook.delivery": "Tanggal Pengiriman",
    "orderbook.expiry": "Tanggal Kedaluwarsa",
    "orderbook.status": "Status",
    "orderbook.action": "Aksi",
    "orderbook.search": "Cari order book...",
    "orderbook.detail": "Detail Order Book",
    "orderbook.list": "Daftar Order Book",
    "orderbook.all": "Semua",
    "orderbook.open": "Terbuka",
    "orderbook.accepted": "Diterima",
    "orderbook.completed": "Selesai",
    "orderbook.expired": "Kedaluwarsa",
    "orderbook.terms": "Syarat & Ketentuan",
    "orderbook.notfound": "Tidak ada order book yang ditemukan",
    "orderbook.filter": "Filter Order",
    "orderbook.sort": "Urutkan Berdasarkan",
    "orderbook.create": "Buat Order",
    "orderbook.price": "Harga Permintaan",
    "orderbook.total": "Total Nilai",
    "orderbook.offers": "Penawaran",
    "orderbook.respond": "Tanggapi Order",

    // Shipping
    "shipping.title": "Pengiriman",
    "shipping.subtitle": "Lacak dan kelola pengiriman Anda",
    "shipping.id": "ID Pengiriman",
    "shipping.origin": "Asal",
    "shipping.destination": "Tujuan",
    "shipping.status": "Status",
    "shipping.carrier": "Kurir",
    "shipping.tracking": "Nomor Pelacakan",
    "shipping.departureDate": "Tanggal Keberangkatan",
    "shipping.arrivalDate": "Perkiraan Kedatangan",
    "shipping.commodity": "Komoditas",
    "shipping.weight": "Berat",
    "shipping.cost": "Biaya Pengiriman",
    "shipping.documents": "Dokumen",
    "shipping.notfound": "Tidak ada pengiriman yang ditemukan",
    "shipping.create": "Buat Pengiriman",
    "shipping.detail": "Detail Pengiriman",
    "shipping.updateStatus": "Perbarui Status",
    "shipping.trackShipment": "Lacak Pengiriman",
    "shipping.vehicle": "Jenis Kendaraan",
    "shipping.driverInfo": "Informasi Pengemudi",
    "shipping.contact": "Kontak",
    "shipping.instructions": "Instruksi Khusus",
    "shipping.route": "Informasi Rute",
    "shipping.stops": "Tempat Pemberhentian",
    "shipping.history": "Riwayat Status",

    // Prices
    "prices.title": "Harga Pasar",
    "prices.subtitle": "Lihat harga komoditas saat ini",
    "prices.commodity": "Komoditas",
    "prices.category": "Kategori",
    "prices.currentPrice": "Harga Saat Ini",
    "prices.change": "Perubahan 24 Jam",
    "prices.volume": "Volume 24 Jam",
    "prices.high": "Tertinggi 24 Jam",
    "prices.low": "Terendah 24 Jam",
    "prices.chart": "Grafik Harga",
    "prices.history": "Riwayat Harga",
    "prices.forecast": "Perkiraan Harga",
    "prices.market": "Pasar",
    "prices.date": "Terakhir Diperbarui",
    "prices.source": "Sumber Data",
    "prices.filter": "Filter Harga",
    "prices.compare": "Bandingkan",
    "prices.watchlist": "Tambah ke Watchlist",
    "prices.trends": "Tren Pasar",
    "prices.notifications": "Notifikasi Harga",

    // Status labels
    "status.open": "Terbuka",
    "status.accepted": "Diterima",
    "status.completed": "Selesai",
    "status.expired": "Kedaluwarsa",
    "status.canceled": "Dibatalkan",
    "status.pending": "Menunggu",
    "status.confirmed": "Dikonfirmasi",
    "status.paid": "Dibayar",
    "status.shipped": "Dikirim",
    "status.received": "Diterima",
    "status.processing": "Diproses",
    "status.notshipped": "Belum Dikirim",
    "status.shipping": "Sedang Dikirim",
    "status.delivered": "Terkirim",
    "status.inTransit": "Dalam Perjalanan",
    "status.outForDelivery": "Siap Antar",
    "status.failed": "Gagal",
    "status.delayed": "Tertunda",
    "status.returned": "Dikembalikan",
    "status.approved": "Disetujui",
    "status.rejected": "Ditolak",
    "status.draft": "Draf",
    "status.onHold": "Ditahan",

    // Dashboard
    "dashboard.title": "Dasbor",
    "dashboard.welcome": "Selamat Datang di TaniTrack",
    "dashboard.summary": "Ringkasan",
    "dashboard.recentTransactions": "Transaksi Terbaru",
    "dashboard.pendingOrders": "Pesanan Tertunda",
    "dashboard.upcomingShipments": "Pengiriman Mendatang",
    "dashboard.marketInsights": "Wawasan Pasar",
    "dashboard.commodityStatus": "Status Komoditas",
    "dashboard.analytics": "Analitik",
    "dashboard.quickActions": "Aksi Cepat",
    "dashboard.alerts": "Peringatan",
    "dashboard.recommendations": "Rekomendasi",

    // Profile/Account
    "profile.title": "Profil",
    "profile.personalInfo": "Informasi Pribadi",
    "profile.company": "Informasi Perusahaan",
    "profile.security": "Keamanan",
    "profile.preferences": "Preferensi",
    "profile.notifications": "Notifikasi",
    "profile.paymentMethods": "Metode Pembayaran",
    "profile.accountHistory": "Riwayat Akun",
    "profile.documents": "Dokumen",
    "profile.settings": "Pengaturan Akun",
    "profile.help": "Bantuan & Dukungan",
    "profile.logout": "Keluar",
    "profile.editProfile": "Edit Profil",
    "profile.changePassword": "Ubah Kata Sandi",
    "profile.language": "Bahasa",
    "profile.theme": "Tema",
    "profile.verifications": "Verifikasi",

    // Balance/Finance
    "balance.title": "Saldo",
    "balance.available": "Saldo Tersedia",
    "balance.pending": "Tertunda",
    "balance.totalValue": "Total Nilai",
    "balance.transactions": "Riwayat Transaksi",
    "balance.withdraw": "Tarik",
    "balance.deposit": "Setor",
    "balance.transfer": "Transfer",
    "balance.statement": "Laporan",
    "balance.paymentMethods": "Metode Pembayaran",
    "balance.settings": "Pengaturan Pembayaran",
    "balance.currency": "Mata Uang",
    "balance.exchange": "Nilai Tukar",
    
    // Time and dates
    "time.today": "Hari Ini",
    "time.yesterday": "Kemarin",
    "time.tomorrow": "Besok",
    "time.thisWeek": "Minggu Ini",
    "time.lastWeek": "Minggu Lalu",
    "time.thisMonth": "Bulan Ini",
    "time.lastMonth": "Bulan Lalu",
    "time.thisYear": "Tahun Ini",
    "time.lastYear": "Tahun Lalu",
    "time.custom": "Rentang Kustom",
    
    // Charts and Analytics
    "charts.dailyPrices": "Harga Harian",
    "charts.monthlyVolume": "Volume Bulanan",
    "charts.commodityDistribution": "Distribusi Komoditas",
    "charts.transactionTrends": "Tren Transaksi",
    "charts.marketComparison": "Perbandingan Pasar",
    "charts.supplyDemand": "Penawaran & Permintaan",
    "charts.seasonalTrends": "Tren Musiman",
    "charts.priceForecasts": "Perkiraan Harga",
    "charts.exportImport": "Rasio Ekspor/Impor",
    "charts.incomeExpenses": "Pendapatan & Pengeluaran",
    
    // Errors and notifications
    "error.generic": "Terjadi kesalahan",
    "error.notFound": "Tidak ditemukan",
    "error.unauthorized": "Akses tidak sah",
    "error.forbidden": "Akses dilarang",
    "error.validation": "Kesalahan validasi",
    "error.network": "Kesalahan jaringan",
    "error.serverError": "Kesalahan server",
    "error.timeout": "Waktu permintaan habis",
    "error.unavailable": "Layanan tidak tersedia",
    "success.saved": "Berhasil disimpan",
    "success.created": "Berhasil dibuat",
    "success.updated": "Berhasil diperbarui",
    "success.deleted": "Berhasil dihapus",
    "info.processing": "Memproses permintaan Anda",
    "info.noData": "Tidak ada data tersedia",
    "warning.unsaved": "Anda memiliki perubahan yang belum disimpan",
  }
};

interface LanguageContextType {
  language: Language;
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  addTranslations: (lang: Language, newTranslations: Record<string, any>) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');
  const [translationsData, setTranslationsData] = useState<TranslationsType>(translations);

  // Load saved language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('app-language');
    if (savedLanguage && (savedLanguage === 'id' || savedLanguage === 'en')) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  // Save language preference to localStorage when changed
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  // Function to add new translations - updated to handle nested objects
  const addTranslations = (lang: Language, newTranslations: Record<string, any>) => {
    setTranslationsData(prev => ({
      ...prev,
      [lang]: {
        ...prev[lang],
        ...newTranslations
      }
    }));
  };

  // Modified to handle nested keys
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translationsData[language];
    
    for (const k of keys) {
      if (result === undefined) return key;
      result = result[k];
    }
    
    return typeof result === 'string' ? result : key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      currentLanguage: language, 
      setLanguage, 
      t,
      addTranslations 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
