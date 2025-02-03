import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ChevronRight } from 'lucide-react';
import { useProduct } from '../Context/ProductContext';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const decodedCategory = category ? decodeURIComponent(category) : '';
  const { products } = useProduct();
  console.log()
  // Filter products by category
  const categoryProducts = products.filter(
    product => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-blue-600">Home</a>
        <ChevronRight className="h-4 w-4" />
        <span className="font-medium text-gray-900">{decodedCategory}</span>
      </div>

      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {decodedCategory} Parts
        </h1>
        <p className="text-gray-600">
          Browse our selection of quality {decodedCategory.toLowerCase()} parts for your vehicle
        </p>
      </div>

      {categoryProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600">No products found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}