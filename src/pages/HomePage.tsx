import CategoryList from '../components/CategoryList';
import ProductCard from '../components/ProductCard';
import ProductSlider from '../components/ProductSlider';
import { Search } from 'lucide-react';
import { useProduct } from '../Context/ProductContext';
import { useEffect, useState } from 'react';

export default function HomePage() {
  // const featuredProducts = products.slice(0, 3);
  const { products ,fetchData} = useProduct();
  const popularProducts = [...products].sort(() => Math.random() - 0.5); // Simulating popular products
 console.log(products)
const [searchTerm, setSearchTerm] = useState('');

const handleSearch = (event: React.FormEvent) => {
  setSearchTerm((event.target as HTMLInputElement).value);
};

const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchTerm.toLowerCase())
);

useEffect(() => {
  fetchData()
}, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h5 className="text-4xl font-bold text-gray-900 mb-4 text-wrap">
          German Special,Volkswagen
        </h5>
        <h5 className="text-2xl font-bold text-gray-900 mb-4 text-wrap">
        Skoda,Audi,Mercedes,BMW
        </h5>
        <p className="text-xl text-gray-600 mb-8">
          All Parts Available
          Find the perfect parts for your car with expert support
        </p>
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            onChange={handleSearch}
            placeholder="Search parts by name"
            className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-4 top-3.5 text-gray-400 h-5 w-5" />
        </div>
      </div>

      {/* Popular Products Slider */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Products</h2>
        <ProductSlider products={popularProducts} />
      </section>

      {/* Categories */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Categories</h2>
        <CategoryList />
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
       { products.length > 0
        ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div> : Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex-[0_0_300px] min-w-0 animate-pulse bg-gray-300 rounded-lg h-[400px]"></div>
          ))}
      </section>
    </div>
  );
}