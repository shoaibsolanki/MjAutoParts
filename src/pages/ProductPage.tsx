import { useParams } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { useProduct } from '../Context/ProductContext';

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products } = useProduct();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-12">Product not found</div>;
  }

  // const handleAddToCart = () => {
  //   const cart = JSON.parse(localStorage.getItem('cart') || '[]');
  //   const existingItem = cart.find((item: any) => item.productId === product.id);
    
  //   if (existingItem) {
  //     existingItem.quantity += 1;
  //   } else {
  //     cart.push({ productId: product.id, quantity: 1 });
  //   }
    
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   alert('Product added to cart!');
  // };

  const handleWhatsAppInquiry = () => {
    const message = `Hi! I'm interested in ${product.name}.\n\n` +
      `Price: $${product.price}\n` +
      `Description: ${product.description}\n\n` +
      `Product Image: ${product.img}\n\n` +
      `Can you provide more information?`;

    const whatsappUrl = `https://wa.me/7062903523?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img
            src={product.img}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-2xl text-blue-600 font-bold mb-4">
          ₹{product.price}
          </p>
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-gray-600">{product.Description}</p>
          </div>
          
          {/* <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Compatibility</h2>
            <ul className="list-disc list-inside text-gray-600">
              {product.compatibility.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div> */}
          
          <div className="space-y-4">
            {/* <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button> */}
            
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
            >
              <MessageCircle className="h-5 w-5" />
              Inquire via WhatsApp
            </button>
            {/* <button
              onClick={() => {
                const updatedProducts = products.filter(p => p.id !== product.id);
                // Assuming you have a method to update the products in the context
                // updateProducts(updatedProducts);
                alert('Product deleted!',updatedProducts);
              }}
              className="w-full bg-red-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-red-600"
            >
              Delete Product
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}