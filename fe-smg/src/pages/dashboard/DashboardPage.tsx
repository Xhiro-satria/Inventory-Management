import { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard.service";
import StatCard from "../../components/dashboard/StatCard";
import { AlertTriangle, TrendingUp, Layers, ArrowUpRight, ArrowDownRight, Package } from "lucide-react";

type DashboardData = Awaited<
    ReturnType<typeof DashboardService.getDashboard>
>["data"];

function DashboardPage(){
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await DashboardService.getDashboard();
                setDashboard(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center bg-[#fafafa]">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-zinc-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-y-yellow-500 rounded-full animate-spin"></div>
                </div>
                <p className="mt-4 text-xs tracking-widest text-zinc-400 uppercase font-mono">Mengenkripsi Data...</p>
            </div>
        );
    }

    if (!dashboard) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-zinc-950 text-white rounded-2xl p-6 border border-zinc-800 text-center">
                    <div className="w-12 h-12 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center mx-auto mb-4">
                        <AlertTriangle size={24} />
                    </div>
                    <h3 className="font-bold text-lg">System Error</h3>
                    <p className="text-xs text-zinc-400 mt-2">Gagal memuat basis data dari server utama.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#fafafa] p-1 sm:p-4 text-zinc-950 font-sans antialiased selection:bg-yellow-500 selection:text-zinc-950">
            
            <div className="relative overflow-hidden rounded-3xl bg-white-950 text-white p-8 md:p-10 shadow-xl mb-8 border border-zinc-800">                
                <div className="relative z-10 max-w-2xl space-y-2">
                    <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-yellow-500 border text-[10px] font-mono uppercase text-black-400 tracking-wider">
                        <Layers size={12} /> Live Monitor
                    </div>
                    <h1 className="text-3xl text-black md:text-4xl font-black tracking-tight uppercase">
                        Inventory Core <span className="text-yellow-400 font-light">Panel</span>
                    </h1>
                    <p className="text-xs md:text-sm text-black max-w-md font-light leading-relaxed">
                        Metrik operasional gudang terintegrasi. Total komoditas saat ini menyentuh angka <span className="text-black font-medium">{dashboard.summary.totalStock} unit</span>.
                    </p>
                </div>
            </div>

            <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    <span className="h-1 w-6 bg-yellow-500 rounded-full" />
                    <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">Summary Statistics</h2>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-1 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all duration-300 shadow-sm">
                        <StatCard title="Total Products" value={dashboard.summary.totalProducts} />
                    </div>
                    <div className="p-1 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all duration-300 shadow-sm">
                        <StatCard title="Categories" value={dashboard.summary.totalCategories} />
                    </div>
                    <div className="p-1 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all duration-300 shadow-sm">
                        <StatCard title="Active Users" value={dashboard.summary.totalUsers} />
                    </div>
                    <div className="p-1 bg-white border border-zinc-200 rounded-2xl hover:border-zinc-400 transition-all duration-300 shadow-sm">
                        <StatCard title="Global Stock" value={dashboard.summary.totalStock} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white-900 text-white rounded-2xl p-5 border border-zinc-800 flex items-center justify-between">
                        <div>
                            <p className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Total Transactions</p>
                            <p className="text-2xl font-bold mt-1 text-black">{dashboard.summary.totalTransactions}</p>
                        </div>
                        <div className="p-3 bg-zinc-800 rounded-xl text-zinc-400"><TrendingUp size={20} /></div>
                    </div>
                    <div className="bg-white border border-black-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Stock In Today</p>
                            <p className="text-2xl font-bold mt-1 text-zinc-900 flex items-baseline gap-1">
                                {dashboard.summary.stockInToday}
                                <span className="text-xs text-emerald-600 font-medium flex items-center"><ArrowUpRight size={12}/>in</span>
                            </p>
                        </div>
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><Package size={20} /></div>
                    </div>
                    <div className="bg-white border border-black-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
                        <div>
                            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">Stock Out Today</p>
                            <p className="text-2xl font-bold mt-1 text-zinc-900 flex items-baseline gap-1">
                                {dashboard.summary.stockOutToday}
                                <span className="text-xs text-rose-600 font-medium flex items-center"><ArrowDownRight size={12}/>out</span>
                            </p>
                        </div>
                        <div className="p-3 bg-rose-50 text-rose-600 rounded-xl"><Package size={20} /></div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-3xl border border-zinc-200 shadow-sm p-6 md:p-8">
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-100">
                        <h2 className="text-lg font-bold tracking-tight uppercase text-zinc-900">
                            Incoming Catalog <span className="text-zinc-400 font-normal">/ Latest</span>
                        </h2>
                        <span className="text-xs font-mono text-zinc-400">Terdaftar Instan</span>
                    </div>

                    <div className="divide-y divide-zinc-100">
                        {dashboard.latestProducts.length === 0 ? (
                            <p className="text-sm text-zinc-400 py-8 text-center font-light">
                                Log katalog kosong. Tidak ada produk baru terdeteksi.
                            </p>
                        ) : (
                            dashboard.latestProducts.map((product) => (
                                <div key={product.id} className="flex items-center gap-5 py-4 first:pt-0 last:pb-0 group">
                                    <div className="relative">
                                        <img
                                            src={`http://localhost:3000/uploads/${product.image}`}
                                            alt={product.name}
                                            className="w-14 h-14 rounded-2xl object-cover border border-zinc-200 bg-zinc-50 transition-transform group-hover:scale-105 duration-200"
                                        />
                                        <div className="absolute -top-1 -left-1 w-4 h-4 rounded-full bg-zinc-950 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">
                                            +
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm text-zinc-900 group-hover:text-yellow-600 transition-colors truncate">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-500 font-mono">
                                            <span>Stok Tersedia:</span>
                                            <span className="font-bold text-zinc-800 bg-zinc-100 px-1.5 py-0.5 rounded text-[11px]">
                                                {product.stock} pcs
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Date Logged</p>
                                        <p className="text-xs font-medium text-zinc-700 mt-0.5">
                                            {new Date(product.createdAt).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "2-digit"
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-zinc-950 text-white rounded-3xl border border-zinc-800 shadow-xl p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-6 pb-4 border-b border-zinc-800">
                            <h2 className="text-sm font-mono uppercase tracking-widest text-yellow-400 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-ping" />
                                Critical Stock
                            </h2>
                            <span className="text-[10px] font-mono text-zinc-500">Urgensi Restock</span>
                        </div>

                        <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                            {dashboard.lowStockProducts.length === 0 ? (
                                <div className="text-center py-12 bg-zinc-900/40 rounded-2xl border border-zinc-800 border-dashed">
                                    <p className="text-xs text-zinc-400 font-light">Seluruh kuantitas komoditas berada di ambang batas aman operasional.</p>
                                </div>
                            ) : (
                                dashboard.lowStockProducts.map((product: any) => (
                                    <div key={product.id} className="flex items-center justify-between p-3.5 bg-zinc-900 rounded-xl border border-zinc-800 hover:border-zinc-700 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-yellow-400/10 text-yellow-400 flex items-center justify-center">
                                                <AlertTriangle size={14} />
                                            </div>
                                            <div className="max-w-[120px] sm:max-w-[160px]">
                                                <h3 className="font-bold text-xs truncate text-zinc-200">{product.name}</h3>
                                                <p className="text-[10px] text-zinc-500 mt-0.5 font-mono">Limit Tercapai</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-mono font-bold text-zinc-950 bg-yellow-400 px-2.5 py-1 rounded-md">
                                                {product.stock} Pcs
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-900 text-center">
                    
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;