import { useEffect, useState } from "react";
import DashboardService from "../../services/dashboard.service";
import StatCard from "../../components/dashboard/StatCard";

type DashboardData = Awaited<
    ReturnType<typeof DashboardService.getDashboard>
>["data"];

function DashboardPage(){
    const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);
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
            <h1 className="text-xl">
            Loading...
            </h1>
        );
    }
    if (!dashboard) {
        return (
            <h1>Data tidak ditemukan</h1>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">
                Dashboard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            <StatCard
                title="Products"
                value={dashboard.summary.totalProducts}
            />

            <StatCard
                title="Category"
                value={dashboard.summary.totalCategories}
            />

            <StatCard
                title="Users"
                value={dashboard.summary.totalUsers}
            />

            <StatCard
                title="Total Stock"
                value={dashboard.summary.totalStock}
            />

            <StatCard
                title="Transaction"
                value={dashboard.summary.totalTransactions}
            />

            <StatCard
                title="Stock In"
                value={dashboard.summary.stockInToday}
            />

            <StatCard
                title="Stock Out"
                value={dashboard.summary.stockOutToday}
            />

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-bold mb-5">
                Latest Product
              </h2>
              <div className="space-y-4">
                {dashboard.latestProducts.length === 0 ? (
                  <p className="text-gray-500">
                    Belum ada produk.
                  </p>
                ) : (

                  dashboard.latestProducts.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 border-b pb-4"
                    >
                      <img
                        src={`http://localhost:3000/uploads/${product.image}`}
                        alt={product.name}
                        className="w-16 h-16 rounded-lg object-cover border"
                      />

                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Stock : {product.stock}
                        </p>

                        <p className="text-xs text-gray-400">
                          {new Date(product.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                  ))
                )}
              </div>
            </div>

          <div className="bg-white rounded-xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">
              Low Stock
            </h2>

            {dashboard.lowStockProducts.length === 0 ? (
              <p className="text-gray-500">
                Tidak ada produk dengan stok menipis.
              </p>
            ) : (
              dashboard.lowStockProducts.map((product: any) => (
                <div key={product.id}>
                  {product.name}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
}

export default DashboardPage