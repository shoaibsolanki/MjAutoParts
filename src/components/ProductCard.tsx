import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:scale-105">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="text-gray-600 text-sm mt-1">{product?.category}</p>
          <p className="text-blue-600 font-bold mt-2">₹{product.price}</p>
          {/* <p className="text-sm text-gray-500 mt-1">
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p> */}
        </div>
      </div>
    </Link>
  );
}