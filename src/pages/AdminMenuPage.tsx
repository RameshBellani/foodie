import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DeleteMenuItem from './DeleteMenuItem';

export default function AdminMenuPage() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch('https://foodie-backend-hdas.onrender.com/api/menu');
        const data = await response.json();
        setMenuItems(data);
      } catch (error) {
        setError('Failed to fetch menu items');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Admin Menu Management</h1>
      
      {error && <div className="text-red-500">{error}</div>}

      <Link
        to="/admin/menu/create"
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-6 inline-block"
      >
        Create New Item
      </Link>

      {/* New button to navigate to Admin Orders Page */}
      <Link
        to="/admin/orders"
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-6 inline-block ml-4"
      >
        Manage Orders
      </Link>

      {menuItems.length === 0 ? (
        <p>No menu items available.</p>
      ) : (
        <div>
          {menuItems.map((item) => (
            <div key={item._id} className="border-b mb-4 pb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl">{item.name}</h2>
                <div>
                  <Link
                    to={`/admin/menu/${item._id}/edit`}
                    className="text-blue-500 mr-4"
                  >
                    Edit
                  </Link>
                  <DeleteMenuItem id={item._id} />
                </div>
              </div>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
