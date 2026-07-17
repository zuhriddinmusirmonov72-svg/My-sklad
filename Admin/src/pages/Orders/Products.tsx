import PageMeta from "../../components/common/PageMeta";
import ProductsSection from "./ProductsSection";
import { useOrders } from "./OrdersContext";

export default function Products() {
  const { products, addProduct, updateProduct, deleteProduct, refreshData, isLoadingData } = useOrders();

  return (
    <>
      <PageMeta title="Mahsulotlar" description="Mahsulotlar boshqaruvi" />
      <ProductsSection
        products={products}
        onAdd={addProduct}
        onUpdate={updateProduct}
        onDelete={deleteProduct}
        onRefresh={refreshData}
        isLoading={isLoadingData}
      />
    </>
  );
}
