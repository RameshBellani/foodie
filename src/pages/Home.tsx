import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, Truck } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-6">
              Delicious Food Delivered to Your Doorstep
            </h1>
            <p className="text-xl mb-8">
              Experience the finest cuisine from top-rated restaurants in your area.
              Order now and satisfy your cravings!
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Explore Menu
              <ArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why Choose Foodie?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Star className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Quality Food</h3>
            <p className="text-gray-600">
              We partner with the best restaurants to ensure you get the highest
              quality meals.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-gray-600">
              Our efficient delivery system ensures your food arrives hot and fresh.
            </p>
          </div>
          <div className="text-center p-6 bg-white rounded-lg shadow-md">
            <Truck className="w-12 h-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Tracking</h3>
            <p className="text-gray-600">
              Track your order in real-time from the restaurant to your doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Dishes
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Classic Burger',
              image:
                'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
              price: 499.99,
            },
            {
              name: 'Margherita Pizza',
              image:
                'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80',
              price: 349.99,
            },
            {
              name: 'Caesar Salad',
              image:
                'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80',
              price: 129.99,
            },
          ].map((dish, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <div className="flex justify-between items-center">
                  <span className="text-orange-600 font-bold">
                  ₹{dish.price.toFixed(2)}
                  </span>
                  <Link
                    to="/menu"
                    className="text-orange-600 hover:text-orange-700 font-semibold"
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}