import { Link } from 'react-router-dom';
import { Clock, Package, Truck, CheckCircle } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatPrice } from '../lib/utils';

// Mock data for demonstration
const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD123',
    userId: 'user1',
    items: [
      {
        menuItem: {
          id: '1',
          name: 'Classic Cheeseburger',
          description: 'Juicy beef patty with cheese',
          price: 249.99,
          image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
          category: 'Burgers',
          available: true,
          rating: 4.5,
          reviews: []
        },
        quantity: 2
      }
    ],
    status: 'preparing',
    total: 25.98,
    address: {
      id: 'addr1',
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      isDefault: true
    },
    paymentMethod: 'card',
    createdAt: new Date()
  }
];

const STATUS_STEPS: { [key in OrderStatus]: number } = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  ready: 3,
  delivering: 4,
  delivered: 5,
  cancelled: -1
};

const StatusIcon = ({ status }: { status: OrderStatus }) => {
  switch (status) {
    case 'preparing':
      return <Package className="w-5 h-5" />;
    case 'delivering':
      return <Truck className="w-5 h-5" />;
    case 'delivered':
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export default function Orders() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {MOCK_ORDERS.length > 0 ? (
        <div className="space-y-6">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order.id}</h2>
                  <p className="text-sm text-gray-600">
                    {order.createdAt.toLocaleDateString()} at{' '}
                    {order.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={order.status} />
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative mb-8">
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-orange-600 rounded-full transition-all duration-500"
                    style={{
                      width: `${(STATUS_STEPS[order.status] / 5) * 100}%`
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-xs">Order Placed</span>
                  <span className="text-xs">Preparing</span>
                  <span className="text-xs">On the Way</span>
                  <span className="text-xs">Delivered</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item) => (
                  <div
                    key={item.menuItem.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={item.menuItem.image}
                        alt={item.menuItem.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">{item.menuItem.name}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.menuItem.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Delivery Address:</span>
                  <span className="text-gray-600">
                    {order.address.street}, {order.address.city}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Payment Method:</span>
                  <span className="capitalize text-gray-600">
                    {order.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
              </div>

              {order.status === 'delivered' && (
                <div className="mt-6">
                  <Link
                    to={`/menu`}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    Reorder
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No orders yet</p>
          <Link
            to="/menu"
            className="text-orange-600 hover:text-orange-700 font-medium"
          >
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  );
}