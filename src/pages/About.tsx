
import { Award, Clock, Users, Utensils } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About Foodie</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're passionate about delivering the finest culinary experiences right to your doorstep, 
          connecting food lovers with the best local restaurants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <img
            src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&q=80"
            alt="Restaurant kitchen"
            className="rounded-lg shadow-lg w-full h-[400px] object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2020, Foodie began with a simple mission: to make quality food accessible 
            to everyone. What started as a small delivery service has grown into a platform 
            connecting thousands of customers with their favorite restaurants.
          </p>
          <p className="text-gray-600">
            We work closely with top-rated restaurants to ensure that every meal delivered 
            meets our high standards of quality and freshness. Our dedicated delivery partners 
            make sure your food arrives hot and fresh, just as it should be.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Utensils className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">500+</h3>
          <p className="text-gray-600">Restaurant Partners</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Users className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">100K+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">30 mins</h3>
          <p className="text-gray-600">Average Delivery Time</p>
        </div>
        <div className="text-center p-6 bg-white rounded-lg shadow-md">
          <Award className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">4.8/5</h3>
          <p className="text-gray-600">Customer Rating</p>
        </div>
      </div>

      <div className="bg-orange-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">Join Our Food Journey</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Whether you're a food lover, restaurant owner, or potential partner, 
          we'd love to have you as part of our growing community.
        </p>
        <button className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors">
          Partner With Us
        </button>
      </div>
    </div>
  );
}