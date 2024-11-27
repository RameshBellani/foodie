// import React from 'react';
// //import { useNavigate } from 'react-router-dom';
// import { Star } from 'lucide-react';
// import { MenuItem } from '../types';
// import { useCartStore } from '../store/cart-store';
// import { formatPrice } from '../lib/utils';
// import { toast } from 'react-hot-toast';

// const MENU_ITEMS: MenuItem[] = [
//   {
//     id: '1',
//     name: 'Classic Cheeseburger',
//     description: 'Juicy beef patty with melted cheese, lettuce, tomato, and special sauce',
//     price: 249.99,
//     image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80',
//     category: 'Burgers',
//     available: true,
//     rating: 4.5,
//     reviews: []
//   },
//   {
//     id: '2',
//     name: 'Margherita Pizza',
//     description: 'Fresh mozzarella, tomatoes, and basil on a crispy crust',
//     price: 149.99,
//     image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80',
//     category: 'Pizza',
//     available: true,
//     rating: 4.7,
//     reviews: []
//   },
//   {
//     id: '3',
//     name: 'Caesar Salad',
//     description: 'Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing',
//     price: 99.99,
//     image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&q=80',
//     category: 'Salads',
//     available: true,
//     rating: 4.3,
//     reviews: []
//   },
//   // Add more menu items as needed
// ];

// const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Salads', 'Drinks', 'Desserts'];

// export default function Menu() {
//   const [selectedCategory, setSelectedCategory] = React.useState('All');
//   const [searchQuery, setSearchQuery] = React.useState('');
//   const addItem = useCartStore((state) => state.addItem);
//  // const navigate = useNavigate();

//   const filteredItems = MENU_ITEMS.filter((item) => {
//     const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
//     return matchesCategory && matchesSearch;
//   });

//   const handleAddToCart = (item: MenuItem) => {
//     addItem(item);
//     toast.success(`${item.name} added to cart!`);
//   };

//   return (
//     <div className="space-y-8">
//       {/* Search and Filter */}
//       <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
//         <input
//           type="text"
//           placeholder="Search menu..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//           className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
//         />
        
//         <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
//           {CATEGORIES.map((category) => (
//             <button
//               key={category}
//               onClick={() => setSelectedCategory(category)}
//               className={`px-4 py-2 rounded-full whitespace-nowrap ${
//                 selectedCategory === category
//                   ? 'bg-orange-600 text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Menu Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredItems.map((item) => (
//           <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
//             <img
//               src={item.image}
//               alt={item.name}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <div className="flex justify-between items-start mb-2">
//                 <h3 className="text-xl font-semibold">{item.name}</h3>
//                 <div className="flex items-center">
//                   <Star className="w-4 h-4 text-yellow-400 fill-current" />
//                   <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
//                 </div>
//               </div>
//               <p className="text-gray-600 text-sm mb-4">{item.description}</p>
//               <div className="flex justify-between items-center">
//                 <span className="text-lg font-bold text-orange-600">
//                   {formatPrice(item.price)}
//                 </span>
//                 <button
//                   onClick={() => handleAddToCart(item)}
//                   className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredItems.length === 0 && (
//         <div className="text-center py-12">
//           <p className="text-gray-600">No items found matching your criteria.</p>
//         </div>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { MenuItem } from '../types';
import { useCartStore } from '../store/cart-store';
import { formatPrice } from '../lib/utils';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const CATEGORIES = ['All', 'Burgers', 'Pizza', 'Salads', 'Drinks', 'Desserts'];

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);  // state to hold fetched menu items
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    // Fetch data from Spoonacular API
    const fetchMenuItems = async () => {
      try {
        // Use your Spoonacular API key here
        const response = await axios.get(
          'https://api.spoonacular.com/recipes/random?number=6&apiKey=9a2260ae112b416d9a54e0459cde95fc'
        );

        const fetchedItems = response.data.recipes.map((recipe: any) => ({
          id: recipe.id.toString(),
          name: recipe.title,
          description: recipe.summary.length > 200 ? `${recipe.summary.substring(0, 120)}...` : recipe.summary,
          price: Math.floor(Math.random() * 500) + 100, // Just a random price for the example
          image: recipe.image,
          category: 'All', // You can add logic for categories based on the recipe
          available: true,
          rating: (recipe.spoonacularScore / 10).toFixed(1), // Rating with 1 decimal place
          reviews: [],
        }));

        setMenuItems(fetchedItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
        toast.error('Failed to load menu items.');
      }
    };

    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: MenuItem) => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <div className="space-y-8">
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search menu..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? 'bg-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-orange-600">
                  {formatPrice(item.price)}
                </span>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
