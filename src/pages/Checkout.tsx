// import { useNavigate } from 'react-router-dom';
// import { useForm } from 'react-hook-form';
// import { MapPin, CreditCard, ChevronRight } from 'lucide-react';
// import { useCartStore } from '../store/cart-store';
// import { useAuthStore } from '../store/auth-store';
// import { formatPrice } from '../lib/utils';
// import { toast } from 'react-hot-toast';
// import { PaymentMethod } from '../types';

// interface CheckoutForm {
//   addressId: string;
//   paymentMethod: PaymentMethod;
//   notes: string;
// }

// export default function Checkout() {
//   const navigate = useNavigate();
//   const { items, total, clearCart } = useCartStore();
//   const { user } = useAuthStore();
//   const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

//   const TAX_RATE = 0.1; // 10% tax
//   const DELIVERY_FEE = 5.99;
//   const subtotal = total;
//   const tax = subtotal * TAX_RATE;
//   const finalTotal = subtotal + tax + DELIVERY_FEE;

//   const onSubmit = (data: CheckoutForm) => {
//     // Here you would typically send the order to your backend
//     console.log('Order data:', {
//       items,
//       ...data,
//       subtotal,
//       tax,
//       deliveryFee: DELIVERY_FEE,
//       total: finalTotal
//     });

//     clearCart();
//     toast.success('Order placed successfully!');
//     navigate('/orders');
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-[60vh] flex flex-col items-center justify-center">
//         <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
//         <button
//           onClick={() => navigate('/menu')}
//           className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors"
//         >
//           Browse Menu
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           {/* Delivery Address */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <MapPin className="w-5 h-5 text-orange-600" />
//               <h2 className="text-lg font-semibold">Delivery Address</h2>
//             </div>
            
//             {user?.addresses && user.addresses.length > 0 ? (
//               <div className="space-y-4">
//                 {user.addresses.map((address) => (
//                   <label
//                     key={address.id}
//                     className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:border-orange-500"
//                   >
//                     <input
//                       type="radio"
//                       value={address.id}
//                       {...register('addressId', { required: 'Please select an address' })}
//                       className="mt-1 text-orange-600 focus:ring-orange-500"
//                     />
//                     <div>
//                       <p className="font-medium">{address.street}</p>
//                       <p className="text-sm text-gray-600">
//                         {address.city}, {address.state} {address.zipCode}
//                       </p>
//                       {address.isDefault && (
//                         <span className="text-xs text-orange-600 font-medium">Default Address</span>
//                       )}
//                     </div>
//                   </label>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-4">
//                 <p className="text-gray-600 mb-4">No addresses saved</p>
//                 <button
//                   onClick={() => navigate('/address/new')}
//                   className="text-orange-600 hover:text-orange-700 font-medium"
//                 >
//                   + Add New Address
//                 </button>
//               </div>
//             )}
//             {errors.addressId && (
//               <p className="mt-2 text-sm text-red-600">{errors.addressId.message}</p>
//             )}
//           </div>

//           {/* Payment Method */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <div className="flex items-center gap-3 mb-4">
//               <CreditCard className="w-5 h-5 text-orange-600" />
//               <h2 className="text-lg font-semibold">Payment Method</h2>
//             </div>

//             <div className="space-y-3">
//               {['card', 'upi', 'wallet', 'cash'].map((method) => (
//                 <label
//                   key={method}
//                   className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-orange-500"
//                 >
//                   <input
//                     type="radio"
//                     value={method}
//                     {...register('paymentMethod', { required: 'Please select a payment method' })}
//                     className="text-orange-600 focus:ring-orange-500"
//                   />
//                   <span className="capitalize">{method}</span>
//                 </label>
//               ))}
//             </div>
//             {errors.paymentMethod && (
//               <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>
//             )}
//           </div>

//           {/* Additional Notes */}
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
//             <textarea
//               {...register('notes')}
//               rows={3}
//               placeholder="Any special instructions for your order?"
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
//             />
//           </div>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-lg shadow-md p-6 h-fit">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
//           <div className="space-y-4 mb-6">
//             {items.map((item) => (
//               <div key={item.menuItem.id} className="flex justify-between">
//                 <div className="flex gap-2">
//                   <span>{item.quantity}x</span>
//                   <span>{item.menuItem.name}</span>
//                 </div>
//                 <span>{formatPrice(item.menuItem.price * item.quantity)}</span>
//               </div>
//             ))}
//           </div>

//           <div className="border-t pt-4 space-y-2">
//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span>
//               <span>{formatPrice(subtotal)}</span>
//             </div>
//             <div className="flex justify-between text-gray-600">
//               <span>Tax</span>
//               <span>{formatPrice(tax)}</span>
//             </div>
//             <div className="flex justify-between text-gray-600">
//               <span>Delivery Fee</span>
//               <span>{formatPrice(DELIVERY_FEE)}</span>
//             </div>
//             <div className="flex justify-between font-semibold text-lg pt-2 border-t">
//               <span>Total</span>
//               <span>{formatPrice(finalTotal)}</span>
//             </div>
//           </div>

//           <button
//             onClick={handleSubmit(onSubmit)}
//             className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
//           >
//             Place Order
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }




import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { MapPin, CreditCard, ChevronRight } from 'lucide-react';
import { useCartStore } from '../store/cart-store';
import { useAuthStore } from '../store/auth-store';
import { formatPrice } from '../lib/utils';
import { toast } from 'react-hot-toast';
import { PaymentMethod } from '../types';

interface CheckoutForm {
  addressId: string;
  paymentMethod: PaymentMethod;
  notes: string;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { items, total, clearCart } = useCartStore();
  const { user, isLoading } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutForm>();

  const TAX_RATE = 0.1; // 10% tax
  const DELIVERY_FEE = 5.99;
  const subtotal = total;
  const tax = subtotal * TAX_RATE;
  const finalTotal = subtotal + tax + DELIVERY_FEE;

  // Redirect to login if user is not logged in
  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (!user) {
    toast.error('You must be logged in to place an order');
    navigate('/login');
    return null;
  }

  const onSubmit = async (data: CheckoutForm) => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('You must be logged in to place an order');
      return;
    }

    const orderData = {
      items: items.map(item => ({
        menuItem: item.menuItem.id,
        quantity: item.quantity
      })),
      total: finalTotal,
      address: {
        id: data.addressId
      },
      paymentMethod: data.paymentMethod,
      notes: data.notes
    };

    try {
      const response = await fetch('https://foodie-backend-hdas.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });
    
      const result = await response.json();
      
      if (response.ok) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        throw new Error(result.message || 'Failed to place order');
      }
    } catch (error) {
      if (error instanceof Error) {  // Type guard
        toast.error(error.message || 'An error occurred while placing your order');
      } else {
        toast.error('An unknown error occurred');
      }
    }
    
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          {/* Delivery Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold">Delivery Address</h2>
            </div>
            
            {user?.addresses && user.addresses.length > 0 ? (
              <div className="space-y-4">
                {user.addresses.map((address) => (
                  <label
                    key={address.id}
                    className="flex items-start gap-3 p-3 border rounded-md cursor-pointer hover:border-orange-500"
                  >
                    <input
                      type="radio"
                      value={address.id}
                      {...register('addressId', { required: 'Please select an address' })}
                      className="mt-1 text-orange-600 focus:ring-orange-500"
                    />
                    <div>
                      <p className="font-medium">{address.street}</p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.state} {address.zipCode}
                      </p>
                      {address.isDefault && (
                        <span className="text-xs text-orange-600 font-medium">Default Address</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">No addresses saved</p>
                <button
                  onClick={() => navigate('/address/new')}
                  className="text-orange-600 hover:text-orange-700 font-medium"
                >
                  + Add New Address
                </button>
              </div>
            )}
            {errors.addressId && (
              <p className="mt-2 text-sm text-red-600">{errors.addressId.message}</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-5 h-5 text-orange-600" />
              <h2 className="text-lg font-semibold">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {['card', 'upi', 'wallet', 'cash'].map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-3 p-3 border rounded-md cursor-pointer hover:border-orange-500"
                >
                  <input
                    type="radio"
                    value={method}
                    {...register('paymentMethod', { required: 'Please select a payment method' })}
                    className="text-orange-600 focus:ring-orange-500"
                  />
                  <span className="capitalize">{method}</span>
                </label>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="mt-2 text-sm text-red-600">{errors.paymentMethod.message}</p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Additional Notes</h2>
            <textarea
              {...register('notes')}
              rows={3}
              placeholder="Any special instructions for your order?"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {items.map((item) => (
              <div key={item.menuItem.id} className="flex justify-between">
                <div className="flex gap-2">
                  <span>{item.quantity}x</span>
                  <span>{item.menuItem.name}</span>
                </div>
                <span>{formatPrice(item.menuItem.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Delivery Fee</span>
              <span>{formatPrice(DELIVERY_FEE)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg pt-2 border-t">
              <span>Total</span>
              <span>{formatPrice(finalTotal)}</span>
            </div>
          </div>

          <button
            onClick={handleSubmit(onSubmit)}
            className="w-full mt-6 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
          >
            Place Order
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
