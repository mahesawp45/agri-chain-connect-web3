
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'id' | 'en';

// Define translation object structure
type TranslationsType = {
  [key in Language]: {
    [key: string]: string;
  };
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
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('id');

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
