import { Link } from "react-router";
import PageMeta from "../../components/common/PageMeta";
import Badge from "../../components/ui/badge/Badge";
import { useOrders } from "./OrdersContext";
import { OrderStatus } from "./types";

const statusColor: Record<OrderStatus, "success" | "warning" | "primary" | "error"> = {
  "Jo'natilgan": "success", "Jo'natilmagan": "warning", "Bekor qilindi": "error",
};

export default function CustomerOrders() {
  const { orders, refreshData, isLoadingData } = useOrders();

  return (
    <>
      <PageMeta title="Mijoz buyurtmalari" description="Barcha buyurtmalar tarixi" />
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Mijoz buyurtmalari</h2>
          <button
            onClick={refreshData}
            disabled={isLoadingData}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            title="Ma'lumotlarni yangilash"
          >
            <svg className={`w-4 h-4 ${isLoadingData ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            {isLoadingData ? 'Yuklanmoqda...' : 'Yangilash'}
          </button>
        </div>
        <div className="p-5">
          {orders.length === 0 ? (
            <div className="text-center py-10 text-gray-500">Hozircha buyurtmalar yo'q.</div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800/40 border-b border-gray-200 dark:border-gray-800">
                  <tr>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Vaqt/Sana</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Mijoz</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Sklad</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Summa</th>
                    <th className="px-4 py-3 font-medium text-gray-500 dark:text-gray-400">Holati</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {orders.map(o => {
                    const total = o.lines.reduce((s, l) => s + l.qty * l.price * (1 - l.discount / 100), 0);
                    const dateObj = new Date(o.date);
                    const formattedDate = `${dateObj.toLocaleDateString("uz-UZ")} ${dateObj.toLocaleTimeString("uz-UZ", { hour: '2-digit', minute: '2-digit' })}`;
                    
                    return (
                      <tr key={o.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                        <td className="px-4 py-3 text-gray-500">{formattedDate}</td>
                        <td className="px-4 py-3 font-medium text-blue-600 hover:underline">
                          <Link to={`/orders/view/${o.id}`}>{o.customer}</Link>
                        </td>
                        <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{o.warehouse}</td>
                        <td className="px-4 py-3 font-medium text-gray-800 dark:text-white">{Math.round(total).toLocaleString()} {o.currency}</td>
                        <td className="px-4 py-3">
                          <Badge size="sm" color={statusColor[o.status] || "primary"}>{o.status}</Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
