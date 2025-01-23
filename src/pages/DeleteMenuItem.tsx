import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DeleteMenuItem({ id }: { id: string }) {
  const navigate = useNavigate();
  const [error, setError] = React.useState('');

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://foodie-backend-hdas.onrender.com/api/menu/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete menu item');
      }

      navigate('/admin/menu');
    } catch (error) {
      setError('Failed to delete menu item');
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
      <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-2 rounded-md">
        Delete Item
      </button>
    </div>
  );
}
