// import { useEffect, useState } from "react";


// interface Order {
//   _id: string;
//   status: string;
//   total: number;
//   createdAt: string;
//   items: { name: string; quantity: number }[];
// }

// const STATUS_OPTIONS = ["pending", "confirmed", "preparing", "ready", "delivering", "delivered", "cancelled"];

// const AdminOrdersPage = () => {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token"); // Admin token
//         const response = await fetch("http://localhost:5000/api/orders", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         const data = await response.json();
//         setOrders(data);
//       } catch (error) {
//         setError("Error fetching orders");
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const updateOrderStatus = async (orderId: string, status: string) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         alert("Order status updated successfully!");
//         setOrders((prevOrders) =>
//           prevOrders.map((order) =>
//             order._id === orderId ? { ...order, status } : order
//           )
//         );
//       } else {
//         alert(`Failed to update status: ${data.message || "Unknown error"}`);
//       }
//     } catch (error) {
//       console.error("Error updating order status:", error);
//     }
//   };

//   if (loading) {
//     return <div className="text-center py-12">Loading orders...</div>;
//   }

//   if (error) {
//     return <div className="text-center py-12">{error}</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">Admin - Manage Orders</h1>

//       <div className="space-y-6">
//         {orders.length > 0 ? (
//           orders.map((order) => (
//             <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
//               <div className="flex justify-between items-start mb-4">
//                 <div>
//                   <h2 className="text-lg font-semibold">Order #{order._id}</h2>
//                   <p className="text-sm text-gray-600">
//                     {new Date(order.createdAt).toLocaleDateString()} at{" "}
//                     {new Date(order.createdAt).toLocaleTimeString()}
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="capitalize">{order.status}</span>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="space-y-3 mb-4">
//                 {order.items.map((item, index) => (
//                   <div key={index} className="flex justify-between items-center">
//                     <div className="flex items-center gap-4">
//                       <div>
//                         <h3 className="font-medium">{item.name}</h3>
//                         <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Update Status Section */}
//               <div className="flex justify-between items-center mt-4">
//                 <span className="font-medium">Update Status:</span>
//                 <select
//                   value={order.status}
//                   onChange={(e) => updateOrderStatus(order._id, e.target.value)}
//                   className="bg-white border border-gray-300 rounded-md p-2"
//                 >
//                   {STATUS_OPTIONS.map((status) => (
//                     <option key={status} value={status}>
//                       {status.charAt(0).toUpperCase() + status.slice(1)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="text-center py-12">
//             <p className="text-gray-600 mb-4">No orders yet</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminOrdersPage;



import { useEffect, useState } from "react";

interface Order {
  _id: string;
  status: string;
  total: number;
  createdAt: string;
  items: { name: string; quantity: number }[];
}

const STATUS_OPTIONS = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "delivering",
  "delivered",
  "cancelled",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all orders when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token"); // Admin token
        if (!token) {
          setError("No token found. Please log in.");
          setLoading(false);
          return;
        }
  
        const response = await fetch("http://localhost:5000/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        console.log("Response status:", response.status); // Log response status
  
        if (!response.ok) {
          throw new Error(`Failed to fetch orders, status: ${response.status}`);
        }
  
        const data = await response.json();
        //console.log("Fetched orders:", data); // Log fetched orders
  
        if (data.length === 0) {
          setError("No orders found.");
        } else {
          setOrders(data);
        }
      } catch (error: any) {
        setError(`Error fetching orders: ${error.message}`);
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, []);
  

  // Update the status of an order
  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not authorized. Please log in.");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Order status updated successfully!");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, status } : order
          )
        );
      } else {
        alert(`Failed to update status: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Loading and error handling
  if (loading) {
    return <div className="text-center py-12">Loading orders...</div>;
  }

  if (error) {
    return <div className="text-center py-12">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Admin - Manage Orders</h1>

      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">Order #{order._id}</h2>
                  <p className="text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()} at{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="capitalize">{order.status}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Update Status Section */}
              <div className="flex justify-between items-center mt-4">
                <span className="font-medium">Update Status:</span>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                  className="bg-white border border-gray-300 rounded-md p-2"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No orders yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrdersPage;
