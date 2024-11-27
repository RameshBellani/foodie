
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cart-store';
import { formatPrice } from '../lib/utils';

export default function Cart() {
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">Add some delicious items to your cart!</p>
        <button
          onClick={() => navigate('/menu')}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Your Cart</h2>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        {items.map((item) => (
          <div
            key={item.menuItem.id}
            className="flex items-center py-4 border-b last:border-b-0"
          >
            <img
              src={item.menuItem.image}
              alt={item.menuItem.name}
              className="w-24 h-24 object-cover rounded-md"
            />
            
            <div className="flex-grow ml-4">
              <h3 className="text-lg font-semibold">{item.menuItem.name}</h3>
              <p className="text-gray-600">{formatPrice(item.menuItem.price)}</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.menuItem.id, Math.max(0, item.quantity - 1))}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.menuItem.id, item.quantity + 1)}
                  className="p-1 rounded-md hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => removeItem(item.menuItem.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}

        <div className="mt-6 pt-6 border-t">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          
          <button
            onClick={() => navigate('/checkout')}
            className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}