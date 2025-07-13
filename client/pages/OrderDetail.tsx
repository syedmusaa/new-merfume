// src/pages/admin/OrderDetail.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  paymentId: string;
}

export default function OrderDetail() {
  const { orderId } = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    const fetchOrder = () => {
      try {
        const orderData = localStorage.getItem(`order_${orderId}`) || 
                         localStorage.getItem("currentOrder");
        
        if (orderData) {
          const parsedOrder: Order = JSON.parse(orderData);
          setOrder(parsedOrder);
        } else {
          navigate("/admin");
        }
      } catch (error) {
        console.error("Error loading order:", error);
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">ऑर्डर नहीं मिला</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          वापस जाएं
        </Button>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-foreground">ऑर्डर विवरण</h1>
            <p className="text-muted-foreground">ऑर्डर ID: {order.id}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="font-semibold mb-2">ऑर्डर की जानकारी</h2>
              <p>तारीख: {new Date(order.date).toLocaleString("hi-IN")}</p>
              <p>भुगतान ID: {order.paymentId || "N/A"}</p>
            </div>
            <div>
              <h2 className="font-semibold mb-2">कुल राशि</h2>
              <p className="text-2xl font-bold text-gold">₹{order.total.toFixed(2)}</p>
            </div>
          </div>

          <div>
            <h2 className="font-semibold mb-4">आइटम्स</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-start border-b pb-4">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                  </div>
                  <div className="text-right">
                    <p>₹{item.price.toFixed(2)}</p>
                    <p className="text-sm text-muted-foreground">मात्रा: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}