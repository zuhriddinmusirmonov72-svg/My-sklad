import { useState, useEffect } from 'react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilter: (selectedItems: {product: any, qty: number}[]) => void;
  allProducts: any[];
}

export default function FilterModal({ isOpen, onClose, onApplyFilter, allProducts }: FilterModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedQuantities, setSelectedQuantities] = useState<Record<number, number>>({});

  // Kategoriyalarni olish
  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueCategories = Array.from(new Set(allProducts.map(p => p.category || 'Другое').filter(Boolean)));
      setCategories(['Все', ...uniqueCategories]);
    }
  }, [allProducts]);

  // Mahsulotlarni filterlash
  useEffect(() => {
    let filtered = allProducts;

    // Kategoriya bo'yicha
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(p => (p.category || 'Другое') === selectedCategory);
    }

    // Qidiruv bo'yicha
    if (searchQuery.trim()) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, allProducts]);

  const handleQuantityChange = (productId: number, qtyStr: string) => {
    const qty = parseInt(qtyStr) || 0;
    setSelectedQuantities(prev => {
      const next = { ...prev };
      if (qty > 0) {
        next[productId] = qty;
      } else {
        delete next[productId];
      }
      return next;
    });
  };

  const toggleProduct = (productId: number) => {
    // Optionally remove if already selected, or add with qty 1
    setSelectedQuantities(prev => {
      const next = { ...prev };
      if (next[productId]) {
        delete next[productId];
      } else {
        next[productId] = 1;
      }
      return next;
    });
  };

  const handleApply = () => {
    const selected = allProducts
      .filter(p => selectedQuantities[p.id])
      .map(p => ({ product: p, qty: selectedQuantities[p.id] }));
    onApplyFilter(selected);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[95%] max-w-6xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Выбор товара</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex gap-4 mb-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
              Создать
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Фильтр"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <input
              type="text"
              placeholder="Наименование, код или артикул"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
            <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Categories Sidebar */}
          <div className="flex gap-6">
            <div className="w-64 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Товары и услуги</h3>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Products Table */}
            <div className="flex-1 overflow-auto max-h-[400px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-900 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input type="checkbox" className="rounded" />
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Наименование</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">Количество</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">Остаток</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">Резерв</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">Ожидание</th>
                    <th className="px-4 py-3 text-right font-medium text-gray-700 dark:text-gray-300">Доступно</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Код</th>
                    <th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">Артикул</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                        Mahsulot topilmadi
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product) => (
                      <tr
                        key={product.id}
                        className={`hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${
                          selectedQuantities[product.id] ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                        onClick={() => toggleProduct(product.id)}
                      >
                        <td className="px-4 py-3">
                          <input
                            type="checkbox"
                            checked={!!selectedQuantities[product.id]}
                            onChange={() => toggleProduct(product.id)}
                            className="rounded"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {product.image ? (
                              <img src={product.image} alt={product.name} className="w-10 h-10 rounded object-cover" />
                            ) : (
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center text-lg">
                                📦
                              </div>
                            )}
                            <span className="font-medium text-gray-900 dark:text-white">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={selectedQuantities[product.id] || ''}
                            onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                            placeholder="0"
                            className="w-20 px-2 py-1 text-center border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 dark:text-white focus:outline-none focus:border-blue-500"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{product.stock || 0}</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">0</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">0</td>
                        <td className="px-4 py-3 text-right text-gray-700 dark:text-gray-300">{product.stock || 0}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{product.id}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">-</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Выбрано: {Object.keys(selectedQuantities).length} товаров
          </span>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Отменить
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Выбрать
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
