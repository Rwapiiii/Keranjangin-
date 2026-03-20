"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

// 1. DATA DUMMY
const produkDatabase = [
    { id: 1, nama: "Smartphone Pro Max 256GB - Phantom Black", sku: "SP-BLK-256", harga: 12500000, stok: 45, kategori: "Elektronik", deskripsi: "Smartphone flagship terbaru dengan kamera 108MP." },
    { id: 2, nama: "Wireless ANC Headphones X-5000", sku: "WH-X5-SLV", harga: 2199000, stok: 12, kategori: "Elektronik", deskripsi: "Headphone dengan fitur Noise Cancellation terbaik." },
    { id: 3, nama: "Mechanical Keyboard K6 Wireless RGB", sku: "MK-K6-RGB", harga: 1450000, stok: 0, kategori: "Elektronik", deskripsi: "Keyboard mechanical compact dengan switch hotswap." },
    { id: 4, nama: "Smartwatch Active Pro v2", sku: "SW-ACT2-NAVY", harga: 850000, stok: 156, kategori: "Elektronik", deskripsi: "Jam tangan pintar untuk memantau kesehatan Anda." }
];

export default function EditProdukPage() {
    const params = useParams();
    const router = useRouter();
    const [produk, setProduk] = useState(null);

    useEffect(() => {
        if (params?.id) {
            const produkDitemukan = produkDatabase.find(p => p.id === parseInt(params.id));
            if (produkDitemukan) {
                setProduk(produkDitemukan);
            } else {
                alert("Ups! Produk tidak ditemukan.");
                router.push("/produk");
            }
        }
    }, [params, router]);

    if (!produk) {
        return <div className="min-h-screen bg-[#1e1b4b] flex items-center justify-center text-white font-bold">Memuat Data...</div>;
    }

    return (
        <div className="flex h-screen w-full font-display text-slate-900 overflow-hidden bg-[#1e1b4b]">

            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 fixed h-full flex flex-col z-50">
                <div className="p-6 flex items-center gap-3">
                    <div className="size-10 flex items-center justify-center rounded-xl overflow-hidden shrink-0">
                        <img src="/image/logo.png" alt="Keranjangin Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg leading-tight text-slate-900">Seller Center</h1>
                        <p className="text-[10px] uppercase tracking-wider text-primary font-bold">Powered by Keranjangin</p>
                    </div>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/">
                        <span className="material-symbols-outlined">home</span>
                        <span>Home</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/pesanan">
                        <span className="material-symbols-outlined">shopping_bag</span>
                        <span>Pesanan</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary font-semibold" href="/produk">
                        <span className="material-symbols-outlined">package_2</span>
                        <span>Produk</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/marketing">
                        <span className="material-symbols-outlined">campaign</span>
                        <span>Marketing</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/analytics">
                        <span className="material-symbols-outlined">analytics</span>
                        <span>Analytics</span>
                    </Link>
                    <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/keuangan">
                        <span className="material-symbols-outlined">account_balance_wallet</span>
                        <span>Keuangan</span>
                    </Link>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                        <Link className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 hover:text-primary hover:bg-slate-50 transition-colors" href="/pengaturan">
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

                {/* Header */}
                <header className="h-20 shrink-0 flex items-center justify-between px-8 z-40 bg-transparent border-b border-white/10">
                    <div className="flex items-center gap-4">
                        <Link href="/produk" className="p-2.5 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all flex items-center justify-center">
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                        </Link>
                        <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                            Edit Produk <span className="text-white/60 text-base font-normal">(ID: {produk.id})</span>
                        </h2>
                    </div>
                    <div className="flex items-center gap-6">
                        <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-primary rounded-xl text-sm font-bold shadow-lg hover:bg-slate-50 active:scale-95 transition-all cursor-pointer">
                            <span className="material-symbols-outlined text-lg">save</span> Simpan Perubahan
                        </button>
                    </div>
                </header>

                {/* Form Content (Scrollable) */}
                <main className="flex-1 overflow-y-auto p-8 pb-12 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-white/20 hover:[&::-webkit-scrollbar-thumb]:bg-white/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">

                    {/* Form Utama */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8 relative overflow-hidden group">
                        <h3 className="font-bold text-xl text-slate-800 mb-2 relative z-10">Informasi Dasar</h3>
                        <p className="text-sm text-slate-400 mb-8 relative z-10">Isi data produk Anda dengan lengkap. Pastikan Nama Produk dan SKU sudah sesuai.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                            {/* Field Nama Produk */}
                            <div className="flex flex-col gap-2 group">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">Nama Produk <span className="text-red-500">*</span></label>
                                <input
                                    type="text"
                                    defaultValue={produk.nama}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all placeholder:text-slate-300"
                                />
                            </div>

                            {/* Field SKU */}
                            <div className="flex flex-col gap-2 group">
                                <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">SKU <span className="text-slate-400 font-normal text-xs ml-1">(Terkunci)</span></label>
                                <input
                                    type="text"
                                    defaultValue={produk.sku}
                                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 text-sm outline-none cursor-not-allowed"
                                    disabled
                                />
                            </div>

                            {/* Field Kategori */}
                            <div className="flex flex-col gap-2 md:col-span-2 group">
                                <label className="text-sm font-semibold text-slate-700">Kategori Produk <span className="text-red-500">*</span></label>
                                <select defaultValue={produk.kategori} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none appearance-none cursor-pointer transition-all">
                                    <option value="Elektronik">Elektronik</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Kesehatan">Kesehatan</option>
                                </select>
                            </div>

                            {/* Field Deskripsi */}
                            <div className="flex flex-col gap-2 md:col-span-2 group">
                                <label className="text-sm font-semibold text-slate-700">Deskripsi Produk <span className="text-red-500">*</span></label>
                                <textarea
                                    defaultValue={produk.deskripsi}
                                    rows={5}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all resize-none"
                                ></textarea>
                            </div>
                        </div>
                    </section>

                    {/* Bagian Harga & Stok */}
                    <section className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 mb-8">
                        <div className="mb-8">
                            <h3 className="font-bold text-xl text-slate-800">Harga & Inventaris</h3>
                            <p className="text-sm text-slate-400 mt-1">Atur harga jual dan jumlah stok yang tersedia di gudang.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Harga Jual (Rp) <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">Rp</span>
                                    <input
                                        type="number"
                                        defaultValue={produk.harga}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700">Jumlah Stok <span className="text-red-500">*</span></label>
                                <input
                                    type="number"
                                    defaultValue={produk.stok}
                                    className={`w-full px-4 py-3 bg-slate-50 border ${produk.stok === 0 ? 'border-red-300 focus:ring-red-100' : 'border-slate-200 focus:ring-primary/20'} rounded-lg text-slate-800 text-sm focus:border-primary focus:bg-white outline-none transition-all`}
                                />
                            </div>
                        </div>
                    </section>

                </main>
            </div>
        </div>
    );
}