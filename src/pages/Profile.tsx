import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useAuthStore } from "../store/auth-store";
import { toast } from "react-hot-toast";
import { User, LogOut, MapPin, Clock } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("No token found, please log in again");
          navigate("/login");
          return;
        }

        const response = await fetch(
          "https://foodie-backend-hdas.onrender.com/api/users/profile",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const result = await response.json();

        if (response.ok) {
          setUser(result.user);
        } else {
          toast.error(result.message || "Failed to fetch profile");
        }
      } catch (error) {
        toast.error("An error occurred while fetching your profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [setUser, navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Signed out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Failed to sign out");
    }
  };

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
  if (loading) {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}


  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-orange-100 p-3 rounded-full">
            <User className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Addresses */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold">Delivery Addresses</h3>
            </div>
            {user?.addresses && user.addresses.length > 0 ? (
              <div className="space-y-3">
                {user.addresses.map((address, index) => (
                  <div
                    key={
                      address.id ||
                      `${address.street}-${address.zipCode}-${index}`
                    } // Unique key fallback
                    className="bg-white p-3 rounded-md shadow-sm"
                  >
                    <p className="font-medium">{address.street}</p>
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    {address.isDefault && (
                      <span className="text-xs text-orange-600 font-medium">
                        Default Address
                      </span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No addresses saved yet</p>
            )}
            <button
              onClick={() => navigate("/address/new")}
              className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors"
            >
              Add New Address
            </button>
          </div>

          {/* Order History */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold">Recent Orders</h3>
            </div>
              <button
                onClick={() => navigate('/orders')}
                className="mt-4 w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors"
              >
                View Orders
              </button>
          </div>
          </div>

        <button
          onClick={handleSignOut}
          className="mt-8 flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </div>
  );
}
