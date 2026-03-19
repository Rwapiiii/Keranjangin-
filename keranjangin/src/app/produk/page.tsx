"use client";

import { useState } from "react";
import Link from "next/link";

// 1. DATA DUMMY PRODUK
const produkData = [
  {
    id: 1,
    statusTab: "Live",
    gambar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDOp_VpJXO8whGIMLgTUfsjFVNk9E_CBB4TXTwh0hqG6m1rPy2M1PqxAP-EXfkNPRy_h9qeuExV0zwG3yeBbW61rRy0ksTGecP-MHA8Db9_M2W7KMrUumiWmKnzgMgAw9kPKpEpp-xRomovHg8JVL6FPMouQaCsGRSTgeYL8f7V7vcg7OWF2ynsj39u0_ZCqXDSXkHfjERh1BuslvuSuxdWnuFmdRIafyayRrkPu-RzdXLyteNiItBC2i_UXCdjfeZksGzwOae3v0oX",
    nama: "Smartphone Pro Max 256GB - Phantom Black",
    sku: "SP-BLK-256",
    harga: "Rp 12.500.000",
    stok: 45,
    terjual: 892,
    trend: "up",
  },
  {
    id: 2,
    statusTab: "Live",
    gambar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8amJv7FzTxy9xR58bdPOKPwDw7-C3GpFT4hUtxbEg76jLXDbv6l7p52bWYctKmwWX0G3IzgmKVjqflYm-gVtiO_SOzqvTHIXHEBUV22ayRGjMgqRBMN8nRnzPw5hKLJJFrkmpz6c14y9Lf2qqKU5uGD25JIYpr_WZa97Zdme_7LDecjNODCV87cY97Sk_CCFyeQCZO_-mczUIv7KAfRCJFP3CSbeMejVEFOk3WgQZ1QUtCt6Ug1e3M_bhfzHX7qWBlGpis08lB4u2",
    nama: "Wireless ANC Headphones X-5000",
    sku: "WH-X5-SLV",
    harga: "Rp 2.199.000",
    stok: 12,
    terjual: 145,
    trend: "flat",
  },
  {
    id: 3,
    statusTab: "Perlu Tindakan",
    gambar: "http://googleusercontent.com/profile/picture/5",
    nama: "Mechanical Keyboard K6 Wireless RGB",
    sku: "MK-K6-RGB",
    harga: "Rp 1.450.000",
    stok: 0,
    terjual: 320,
    trend: "up",
  },
  {
    id: 4,
    statusTab: "Belum Ditampilkan",
    gambar: "http://googleusercontent.com/profile/picture/6",
    nama: "Smartwatch Active Pro v2",
    sku: "SW-ACT2-NAVY",
    harga: "Rp 850.000",
    stok: 156,
    terjual: 45,
    trend: "down",
  }
];

const DAFTAR_TAB_PRODUK = ["Semua", "Live", "Perlu Tindakan", "Belum Ditampilkan"];

export default function ProdukPage() {
  const [activeTab, setActiveTab] = useState("Semua");

  const dataYangDitampilkan = produkData.filter((produk) => {
    if (activeTab === "Semua") return true;
    return produk.statusTab === activeTab;
  });

  const getTabCount = (tabName) => {
    if (tabName === "Semua") return ` (${produkData.length})`;
    const count = produkData.filter(produk => produk.statusTab === tabName).length;
    return ` (${count})`;
  };

  return (
    <div className="flex min-h-screen bg-[#1e1b4b] font-display text-slate-100">

      {/* Sidebar */}
      <aside className="w-64 dark:bg-slate-900 border-r border-primary/10 fixed h-full flex flex-col z-50 border-r border-slate-200" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 flex items-center justify-center rounded-xl overflow-hidden shrink-0">
            <img src="/image/logo.png" alt="Keranjangin Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-900 dark:text-slate-100">Seller Center</h1>
            <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Powered by Keranjangin</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="/">
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="/pesanan">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span>Pesanan</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" href="/produk">
            <span className="material-symbols-outlined">package_2</span>
            <span>Produk</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="/marketing">
            <span className="material-symbols-outlined">campaign</span>
            <span>Marketing</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="/analytics">
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="/keuangan">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span>Keuangan</span>
          </Link>
          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
            <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors hover:text-primary" href="#">
              <span className="material-symbols-outlined">settings</span>
              <span>Pengaturan</span>
            </Link>
          </div>
        </nav>
        <div className="p-4">
          <div className="rounded-xl bg-primary p-4 text-white">
            <p className="text-xs font-medium opacity-80 mb-2">Pusat Edukasi</p>
            <p className="text-sm font-bold mb-3">Tingkatkan omset toko kamu!</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all cursor-pointer">Pelajari Sekarang</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0 gradient-bg h-screen">

        {/* Header */}
        <header className="h-20 shrink-0 flex items-center justify-between px-8 z-40 bg-[#9288f8] shadow-md">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-black text-white tracking-tight">Manajemen Produk</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="pl-12 pr-4 py-2 border-none rounded-full text-sm focus:ring-2 focus:ring-white/20 bg-white shadow-md focus:outline-none w-64 text-slate-800" placeholder="Search (Ctrl + K)" type="text" />
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative text-white cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 size-4 bg-red-500 border-2 border-[#9288f8] rounded-full text-[10px] flex items-center justify-center font-bold text-white">25</span>
              </button>
              <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white cursor-pointer">
                <span className="material-symbols-outlined">mail</span>
              </button>
              <div className="h-8 w-px bg-white/20 mx-2"></div>
              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block text-white">
                  <p className="text-sm font-bold leading-none">Indo Tech Store</p>
                  <p className="text-[10px] opacity-80 mt-1">Official Partner</p>
                </div>
                <div
                  className="size-11 rounded-full bg-cover bg-center border-2 border-white/50 shadow-md cursor-pointer"
                  data-alt="Profile picture of seller center manager"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCC1zmp7YYt6oMDsTdv1bNgxpofyoEuLVBqeQp-WLWWxuCGBXro5gXoPacDjyc8StdsGIVlwRoEr5t7Xak65p2AslTeE34eGi8903dOn73Rf-mO7PLaCLN8Z-2vUEE_8c6-eYnPJ_jIjcMdn94sglqgz27H0DkIuLuI7bU-B_8ViI4gAP6iWS2_kVYpMgc96DNl77_JqmMc0sOcmKeKAmcyDz-iNwONuFY0d435TR9QNZyX-SXPbAHql7w_jiLXRpRy3UBmfLpnq7iW')" }}
                ></div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto p-8 pb-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">

          {/* Dynamic Tabs */}
          <div className="flex border-b border-slate-200 mb-6 overflow-x-auto gap-2">
            {DAFTAR_TAB_PRODUK.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 whitespace-nowrap cursor-pointer transition-colors ${activeTab === tab
                    ? "font-bold text-white border-b-2 border-primary"
                    : "font-medium text-slate-400 hover:text-white"
                  }`}
              >
                {tab}{getTabCount(tab)}
              </button>
            ))}
          </div>

          {/* Filter Card (Dikembalikan!) */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm p-6 mb-6 border border-slate-200/60 dark:border-slate-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Nama Produk / SKU</label>
                <div className="relative">
                  <input className="w-full pl-4 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none text-slate-800 dark:text-slate-100" placeholder="Masukkan nama atau SKU" type="text" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Kategori</label>
                <div className="relative">
                  <select className="w-full pl-4 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none text-slate-800 dark:text-slate-100 cursor-pointer">
                    <option>Pilih Kategori</option>
                    <option>Elektronik</option>
                    <option>Fashion</option>
                    <option>Kesehatan</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>
              <div className="flex items-end gap-3">
                <button className="flex-1 bg-primary text-white py-2.5 rounded-lg text-sm font-bold shadow-sm hover:bg-primary/90 transition-all cursor-pointer">Cari</button>
                <button className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-lg text-sm font-bold hover:bg-slate-200 transition-all cursor-pointer">Atur Ulang</button>
              </div>
            </div>
          </div>

          {/* Actions Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="text-sm text-indigo-200">
              <span className="font-bold text-white text-lg">{dataYangDitampilkan.length}</span> Produk Ditemukan
            </div>
            <Link href="/produk/tambah" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer">
              <span className="material-symbols-outlined text-lg">add</span>
              Tambah Produk Baru
            </Link>
          </div>

          {/* Product Table Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm overflow-hidden border border-slate-200/60 dark:border-slate-800 pb-16 md:pb-0">
            <div className="overflow-x-auto overflow-y-visible min-h-[300px]">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Info Produk</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stok</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performa</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">

                  {dataYangDitampilkan.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">inventory_2</span>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Tidak ada produk ditemukan di tab ini.</p>
                      </td>
                    </tr>
                  ) : (
                    dataYangDitampilkan.map((produk) => (
                      <tr key={produk.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 dark:text-white line-clamp-1">{produk.nama}</p>
                              <p className="text-xs text-slate-400 mt-0.5">SKU: {produk.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-primary dark:text-indigo-400">{produk.harga}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className={`text-sm font-bold ${produk.stok === 0 ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'}`}>
                            {produk.stok === 0 ? 'Habis' : produk.stok}
                          </p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {produk.trend === 'up' && <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>}
                            {produk.trend === 'down' && <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>}
                            {produk.trend === 'flat' && <span className="material-symbols-outlined text-slate-400 text-sm">trending_flat</span>}
                            <span className="text-sm text-slate-600 dark:text-slate-400">{produk.terjual} Terjual</span>
                          </div>
                        </td>

                        {/* AKSI BUTTONS DENGAN DROPDOWN */}
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 relative z-0 hover:z-50">

                            {/* Tombol Edit (Link ke halaman edit dinamis) */}
                            <Link href={`/produk/edit/${produk.id}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer block" title="Ubah Produk">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </Link>

                            {/* Tombol Hapus */}
                            <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Hapus Produk">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>

                            {/* Tombol "Lainnya" Dropdown */}
                            <div className="relative group overflow-visible">
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer" title="Lainnya">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                              </button>

                              {/* Menu Dropdown yang muncul saat "Lainnya" di-hover */}
                              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                                <div className="py-2 flex flex-col">
                                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary flex items-center gap-3 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">visibility</span> Lihat Produk
                                  </button>
                                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:text-primary flex items-center gap-3 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">content_copy</span> Duplikat
                                  </button>
                                  <div className="h-px bg-slate-100 my-1 w-full"></div>
                                  <button className="w-full text-left px-4 py-2.5 text-sm font-medium text-amber-600 hover:bg-amber-50 flex items-center gap-3 transition-colors cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">archive</span> Arsipkan
                                  </button>
                                </div>
                              </div>
                            </div>

                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {dataYangDitampilkan.length > 0 && (
              <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between border-t border-slate-200 dark:border-slate-800 mt-auto">
                <p className="text-xs text-slate-500">Menampilkan 1-{dataYangDitampilkan.length} dari {produkData.length} produk</p>
                <div className="flex gap-2">
                  <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 disabled:opacity-50 flex items-center justify-center cursor-pointer" disabled>
                    <span className="material-symbols-outlined text-sm dark:text-slate-400">chevron_left</span>
                  </button>
                  <button className="px-3 py-1 bg-primary text-white rounded-lg text-xs font-bold cursor-pointer">1</button>
                  <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-white dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer">
                    <span className="material-symbols-outlined text-sm dark:text-slate-400">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}