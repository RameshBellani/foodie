// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Clock, Package, Truck, CheckCircle } from "lucide-react";
// import { formatPrice } from "../lib/utils";

// interface OrderItem {
//   menuItem: string; // menu_id
//   name: string;
//   quantity: number;
// }

// interface Order {
//   _id: string;
//   items: OrderItem[];
//   total: number;
//   status: string;
//   paymentMethod: string;
//   address: {
//     street: string;
//     city: string;
//     state: string;
//     zipCode: string;
//   };
//   createdAt: string; 
// }

// const STATUS_STEPS: { [key: string]: number } = {
//   pending: 0,
//   confirmed: 1,
//   preparing: 2,
//   ready: 3,
//   delivering: 4,
//   delivered: 5,
//   cancelled: -1,
// };

// const StatusIcon = ({ status }: { status: string }) => {
//   switch (status) {
//     case "preparing":
//       return <Package className="w-5 h-5" />;
//     case "delivering":
//       return <Truck className="w-5 h-5" />;
//     case "delivered":
//       return <CheckCircle className="w-5 h-5" />;
//     default:
//       return <Clock className="w-5 h-5" />;
//   }
// };

// export default function Orders() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Fetch orders from the API
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch("http://localhost:5000/api/orders", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch orders");
//         }
//         const data: Order[] = await response.json();
//         setOrders(data);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   if (loading) {
//     return <div className="text-center py-12">Loading orders...</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-8">My Orders</h1>

//       {orders.length > 0 ? (
//         <div className="space-y-6">
//           {orders.map((order) => (
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
//                   <StatusIcon status={order.status} />
//                   <span className="capitalize">{order.status}</span>
//                 </div>
//               </div>

//               {/* Progress Bar */}
//               <div className="relative mb-8">
//                 <div className="h-2 bg-gray-200 rounded-full">
//                   <div
//                     className="h-full bg-orange-600 rounded-full transition-all duration-500"
//                     style={{
//                       width: `${(STATUS_STEPS[order.status] / 5) * 100}%`,
//                     }}
//                   />
//                 </div>
//                 <div className="flex justify-between mt-2">
//                   <span className="text-xs">Order Placed</span>
//                   <span className="text-xs">Preparing</span>
//                   <span className="text-xs">On the Way</span>
//                   <span className="text-xs">Delivered</span>
//                 </div>
//               </div>

//               {/* Order Items */}
//               <div className="space-y-3 mb-4">
//                 {order.items.map((item) => (
//                   <div
//                     key={item.menuItem}
//                     className="flex justify-between items-center"
//                   >
//                     <div className="flex items-center gap-4">
//                       <img
//                         src={`https://example.com/images/${item.menuItem}.jpg`} 
//                         alt={`Item ${item.menuItem}`}
//                         className="w-16 h-16 object-cover rounded-md"
//                       />
//                       <div>
//                         <h3 className="font-medium">Item {item.name}</h3>{" "}
//                         {/* Adjust this to fetch item name if possible */}
//                         <p className="text-sm text-gray-600">
//                           Quantity: {item.quantity}
//                         </p>
//                       </div>
//                     </div>
//                     <span className="font-medium">
//                       {formatPrice(item.quantity * 299.99)}{" "}
//                       {/* Adjust price accordingly */}
//                     </span>
//                   </div>
//                 ))}
//               </div>

//               <div className="border-t pt-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-medium">Delivery Address:</span>
//                   <span className="text-gray-600">
//                     {order.address?.street}, {order.address?.city},{" "}
//                     {order.address?.state} {order.address?.zipCode}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mb-4">
//                   <span className="font-medium">Payment Method:</span>
//                   <span className="capitalize text-gray-600">
//                     {order.paymentMethod}
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center text-lg font-semibold">
//                   <span>Total:</span>
//                   <span>{formatPrice(order.total)}</span>
//                 </div>
//               </div>

//               {order.status === "delivered" && (
//                 <div className="mt-6">
//                   <Link
//                     to={`/menu`}
//                     className="text-orange-600 hover:text-orange-700 font-medium"
//                   >
//                     Reorder
//                   </Link>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-12">
//           <p className="text-gray-600 mb-4">No orders yet</p>
//           <Link
//             to="/menu"
//             className="text-orange-600 hover:text-orange-700 font-medium"
//           >
//             Browse Menu
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Clock, Package, Truck, CheckCircle } from "lucide-react";
import { formatPrice } from "../lib/utils";

interface OrderItem {
  menuItem: string; // menu_id
  name: string; // Name of the item (this should be fetched if not present)
  quantity: number;
}
// interface OrderItem {
//   menuItem: {
//     id: string;
//     name: string;
//     image: string;
//   };
//   quantity: number;
// }


interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  paymentMethod: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  createdAt: string;
}

const STATUS_STEPS: { [key: string]: number } = {
  pending: 0,
  confirmed: 1,
  preparing: 2,
  ready: 3,
  delivering: 4,
  delivered: 5,
  cancelled: -1,
};

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "preparing":
      return <Package className="w-5 h-5" />;
    case "delivering":
      return <Truck className="w-5 h-5" />;
    case "delivered":
      return <CheckCircle className="w-5 h-5" />;
    default:
      return <Clock className="w-5 h-5" />;
  }
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [menuItems, setMenuItems] = useState<Map<string, string>>(new Map()); // Store menuItem ID -> name mapping

  // Fetch orders from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://foodie-backend-hdas.onrender.com/api/orders", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data: Order[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMenuItemNames = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://foodie-backend-hdas.onrender.com/api/menu", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch menu items");
        }
        const menuData = await response.json();
        const itemMap = new Map<string, string>();
        menuData.forEach((item: any) => {
          itemMap.set(item._id, item.name); // Assuming response contains _id and name
        });
        setMenuItems(itemMap);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchOrders();
    fetchMenuItemNames();
  }, []);

  // if (loading) {
  //   return <div className="text-center py-12">Loading orders...</div>;
  // }

  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
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
                      width: `${(STATUS_STEPS[order.status] / 5) * 100}%`,
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
                    key={item.menuItem}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://example.com/images/${item.menuItem}.jpg`} // Assuming images are named with the menuItem ID
                        alt={`Item ${item.menuItem}`}
                        className="w-16 h-16 object-cover rounded-md"
                      />
{/*                       <img
  src={item.menuItem.image}  // Directly use the image URL from backend
  alt={item.menuItem.name}
  className="w-16 h-16 object-cover rounded-md"
/> */}

                      <div>
                        <h3 className="font-medium">
                          {menuItems.get(item.menuItem) || "Item Name"}
                        </h3>{" "}
                        {/* Fetch item name from menuItems map */}
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium">
                      {formatPrice(item.quantity * 299.99)}{" "}
                      {/* Adjust price accordingly */}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Delivery Address:</span>
                  <span className="text-gray-600">
                    {order.address?.street}, {order.address?.city},{" "}
                    {order.address?.state} {order.address?.zipCode}
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

              {order.status === "delivered" && (
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
