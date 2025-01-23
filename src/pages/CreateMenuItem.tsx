import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export default function CreateMenuItem() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [available, setAvailable] = useState(true);
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== 'admin') {
      return navigate('/login');
    }

    const data = {
      name,
      description,
      price: parseFloat(price),
      image,
      category,
      available,
      rating: parseFloat(rating.toString()),
    };

    try {
      const response = await fetch('https://foodie-backend-hdas.onrender.com/api/menu', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create menu item');
      }

      navigate('/admin/menu');
    } catch (error) {
      setError('Failed to create menu item. Please try again later.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Create New Menu Item</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="image" className="block font-medium">Image URL</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="category" className="block font-medium">Category</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="available" className="block font-medium">Available</label>
          <input
            type="checkbox"
            id="available"
            checked={available}
            onChange={(e) => setAvailable(e.target.checked)}
          />
        </div>

        <div>
          <label htmlFor="rating" className="block font-medium">Rating</label>
          <input
            type="number"
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border-gray-300 rounded-md"
            required
            min="0"
            max="5"
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-md">Create Item</button>
        </div>
      </form>
    </div>
  );
}
