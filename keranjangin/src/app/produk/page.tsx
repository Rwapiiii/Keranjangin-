"use client";

import { useState } from "react";
import Link from "next/link";

// 1. DATA DUMMY PRODUK (Diperbanyak untuk simulasi pagination)
const produkData = Array.from({ length: 32 }).map((_, i) => ({
  id: i + 1,
  statusTab: i % 5 === 0 ? "Perlu Tindakan" : i % 7 === 0 ? "Belum Ditampilkan" : "Live",
  gambar: `http://googleusercontent.com/profile/picture/${(i % 5) + 2}`,
  nama: `Produk Dummy ${i + 1} - Varian ${i % 3 === 0 ? 'Pro' : 'Basic'}`,
  sku: `SKU-${1000 + i}`,
  harga: `Rp ${(Math.floor(Math.random() * 50) + 1) * 50}.000`,
  stok: i % 5 === 0 ? 0 : Math.floor(Math.random() * 100) + 1,
  terjual: Math.floor(Math.random() * 1000),
  trend: i % 3 === 0 ? "down" : i % 2 === 0 ? "flat" : "up",
}));

const DAFTAR_TAB_PRODUK = ["Semua", "Live", "Perlu Tindakan", "Belum Ditampilkan"];
const ITEMS_PER_PAGE = 12; // Batas item per halaman

export default function ProdukPage() {
  const [activeTab, setActiveTab] = useState("Semua");
  const [currentPage, setCurrentPage] = useState(1);

  // Fungsi saat tab diubah (reset kembali ke halaman 1)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Filter Data berdasarkan Tab
  const filteredData = produkData.filter((produk) => {
    if (activeTab === "Semua") return true;
    return produk.statusTab === activeTab;
  });

  // Hitung jumlah halaman
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Potong data khusus untuk halaman yang sedang aktif
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const getTabCount = (tabName) => {
    if (tabName === "Semua") return ` (${produkData.length})`;
    const count = produkData.filter(produk => produk.statusTab === tabName).length;
    return ` (${count})`;
  };

  return (
    <div className="flex h-screen w-full font-display text-slate-100 bg-[#1e1b4b] overflow-hidden">

      {/* Sidebar (Locked) */}
      <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-50">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="size-10 flex items-center justify-center rounded-xl overflow-hidden shrink-0">
            <img src="/image/logo.png" alt="Keranjangin Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight text-slate-900">Seller Center</h1>
            <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Powered by Keranjangin</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-slate-100 [&::-webkit-scrollbar-thumb]:rounded-full">
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/">
            <span className="material-symbols-outlined">home</span>
            <span>Home</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/pesanan">
            <span className="material-symbols-outlined">shopping_bag</span>
            <span>Pesanan</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" href="/produk">
            <span className="material-symbols-outlined">package_2</span>
            <span>Produk</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/marketing">
            <span className="material-symbols-outlined">campaign</span>
            <span>Marketing</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/analytics">
            <span className="material-symbols-outlined">analytics</span>
            <span>Analytics</span>
          </Link>
          <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/keuangan">
            <span className="material-symbols-outlined">account_balance_wallet</span>
            <span>Keuangan</span>
          </Link>
          <div className="pt-4 mt-4 border-t border-slate-200">
            <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:bg-slate-50 transition-colors hover:text-primary" href="/pengaturan">
              <span className="material-symbols-outlined">settings</span>
              <span>Pengaturan</span>
            </Link>
          </div>
        </nav>
        <div className="p-4 shrink-0">
          <div className="rounded-xl bg-primary p-4 text-white">
            <p className="text-xs font-medium opacity-80 mb-2">Pusat Edukasi</p>
            <p className="text-sm font-bold mb-3">Tingkatkan omset toko kamu!</p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all cursor-pointer">Pelajari Sekarang</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col ml-64 min-w-0 gradient-bg h-screen" style={{ background: "linear-gradient(180deg, #9288f8 0%, #1a1a2e 400px, #15161d 100%)" }}>

        {/* Topbar / Header */}
        <header className="h-20 shrink-0 flex items-center justify-between px-8 z-40 bg-transparent">
          <div className="flex items-center flex-1 max-w-2xl">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="w-full pl-12 pr-4 py-3 border-none rounded-full text-sm focus:ring-2 focus:ring-white/20 bg-white shadow-md focus:outline-none" placeholder="Cari Nama Produk atau SKU (Ctrl + K)" type="text" />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors relative text-white cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-4 bg-red-500 border-2 border-[#9288f8] rounded-full text-[10px] flex items-center justify-center font-bold text-white">25</span>
            </button>
            <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white cursor-pointer">
              <span className="material-symbols-outlined">mail</span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-white/20">
              <div className="text-right hidden sm:block text-white">
                <p className="text-sm font-bold leading-none">Indo Tech Store</p>
                <p className="text-[10px] opacity-80 mt-1">Official Partner</p>
              </div>
              <div
                className="size-11 rounded-full bg-cover bg-center border-2 border-white/50 shadow-md cursor-pointer"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCC1zmp7YYt6oMDsTdv1bNgxpofyoEuLVBqeQp-WLWWxuCGBXro5gXoPacDjyc8StdsGIVlwRoEr5t7Xak65p2AslTeE34eGi8903dOn73Rf-mO7PLaCLN8Z-2vUEE_8c6-eYnPJ_jIjcMdn94sglqgz27H0DkIuLuI7bU-B_8ViI4gAP6iWS2_kVYpMgc96DNl77_JqmMc0sOcmKeKAmcyDz-iNwONuFY0d435TR9QNZyX-SXPbAHql7w_jiLXRpRy3UBmfLpnq7iW')" }}
              ></div>
            </div>
          </div>
        </header>

        {/* Content Wrapper */}
        <div className="flex-1 flex flex-col min-h-0 p-8 pb-12">

          {/* Bagian Atas (Judul, Tabs & Filter) - Terkunci Tidak Ikut Scroll */}
          <div className="shrink-0 mb-6">

            {/* Judul Halaman Dipindah Kesini */}
            <div className="mb-6">
              <h2 className="text-3xl font-black text-white tracking-tight">Manajemen Produk</h2>
              <p className="text-white/80 mt-1 text-sm">Kelola katalog produk, pantau stok, dan optimalkan performa penjualan Anda.</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/20 overflow-x-auto gap-2">
              {DAFTAR_TAB_PRODUK.map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`px-6 py-3 whitespace-nowrap cursor-pointer transition-colors ${activeTab === tab
                    ? "font-bold text-white border-b-2 border-primary"
                    : "font-medium text-slate-400 hover:text-white"
                    }`}
                >
                  {tab}{getTabCount(tab)}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-indigo-200">
                <span className="font-bold text-white text-lg">{filteredData.length}</span> Produk Ditemukan
              </div>
              <Link href="/produk/tambah" className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary/90 active:scale-95 transition-all cursor-pointer">
                <span className="material-symbols-outlined text-lg">add</span>
                Tambah Produk Baru
              </Link>
            </div>
          </div>

          {/* Wadah Utama Tabel - Memberikan tinggi tetap dan overflow */}
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 flex flex-col flex-1 min-h-0">

            {/* Bagian Scrollable Tabel Body */}
            <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-slate-300 [&::-webkit-scrollbar-track]:bg-transparent relative">
              <table className="w-full text-left table-auto">

                {/* STICKY HEADER - Mengunci thead agar tidak ter-scroll */}
                <thead className="bg-slate-50 border-b border-slate-200 sticky top-0 z-20 shadow-sm backdrop-blur-md">
                  <tr>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase flex items-center gap-2"><input type="checkbox" className="accent-primary" /> Info Produk</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Harga</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Stok</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Performa</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Aksi</th>
                  </tr>
                </thead>

                {/* SCROLLABLE BODY */}
                <tbody className="divide-y divide-slate-100">
                  {paginatedData.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                        Tidak ada produk yang ditemukan pada halaman ini.
                      </td>
                    </tr>
                  ) : (
                    paginatedData.map((produk) => (
                      <tr key={produk.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <input type="checkbox" className="accent-primary shrink-0" />
                            <div className="w-14 h-14 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 shrink-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-slate-900 line-clamp-1">{produk.nama}</p>
                              <p className="text-xs text-slate-400 mt-0.5">SKU: {produk.sku}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-primary whitespace-nowrap">{produk.harga}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700">
                          {produk.stok === 0 ? <span className="text-red-500">Habis</span> : produk.stok}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          <div className="flex items-center gap-2 whitespace-nowrap">
                            {produk.trend === 'up' && <span className="material-symbols-outlined text-green-500 text-sm">trending_up</span>}
                            {produk.trend === 'down' && <span className="material-symbols-outlined text-red-500 text-sm">trending_down</span>}
                            {produk.trend === 'flat' && <span className="material-symbols-outlined text-slate-400 text-sm">trending_flat</span>}
                            {produk.terjual} Terjual
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1 relative z-0 hover:z-50">
                            <Link href={`/produk/edit/${produk.id}`} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer block" title="Ubah Produk">
                              <span className="material-symbols-outlined text-[20px]">edit</span>
                            </Link>
                            <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer" title="Hapus Produk">
                              <span className="material-symbols-outlined text-[20px]">delete</span>
                            </button>

                            {/* Dropdown Menu Lainnya */}
                            <div className="relative group overflow-visible">
                              <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors cursor-pointer" title="Lainnya">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                              </button>
                              <div className="absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[100] overflow-hidden">
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
              {/* Spacer agar dropdown di baris paling bawah tidak terpotong oleh overflow container */}
              <div className="h-24"></div>
            </div>

            {/* Bagian Bawah Terkunci - Pagination Controls */}
            {filteredData.length > 0 && (
              <div className="shrink-0 px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-b-xl">
                <p className="text-xs font-semibold text-slate-500">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} produk
                </p>

                <div className="flex items-center gap-2">
                  {/* Tombol Previous */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-sm text-slate-600">chevron_left</span>
                  </button>

                  {/* Angka Halaman */}
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${currentPage === i + 1
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "text-slate-600 hover:bg-white border border-transparent hover:border-slate-200"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  {/* Tombol Next */}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-slate-200 rounded-lg hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent flex items-center justify-center cursor-pointer transition-all"
                  >
                    <span className="material-symbols-outlined text-sm text-slate-600">chevron_right</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}