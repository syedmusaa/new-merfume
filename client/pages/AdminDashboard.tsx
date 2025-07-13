// // // src/pages/admin/AdminDashboard.tsx
// // import { useEffect, useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { 
// //   Table, 
// //   TableBody, 
// //   TableCaption, 
// //   TableCell, 
// //   TableHead, 
// //   TableHeader, 
// //   TableRow 
// // } from "@/components/ui/table";
// // import { Download, Trash2, Eye } from "lucide-react";
// // import { useNavigate } from "react-router-dom";

// // interface OrderItem {
// //   id: string;
// //   name: string;
// //   brand: string;
// //   price: number;
// //   quantity: number;
// //   image: string;
// // }

// // interface Order {
// //   id: string;
// //   date: string;
// //   items: OrderItem[];
// //   total: number;
// //   paymentId: string;
// // }

// // export default function AdminDashboard() {
// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Check authentication
// //     const isAuthenticated = localStorage.getItem("adminAuth");
// //     if (!isAuthenticated) {
// //       navigate("/admin/login");
// //       return;
// //     }

// //     fetchOrdersFromLocalStorage();
// //   }, [navigate]);

// //   const fetchOrdersFromLocalStorage = () => {
// //     try {
// //       const allOrders: Order[] = [];
      
// //       // Loop through all localStorage items
// //       for (let i = 0; i < localStorage.length; i++) {
// //         const key = localStorage.key(i);
        
// //         // Check if key matches our order pattern
// //         if (key && (key.startsWith("order_") || key === "currentOrder")) {
// //           const orderData = localStorage.getItem(key);
// //           if (orderData) {
// //             const order = JSON.parse(orderData);
// //             allOrders.push(order);
// //           }
// //         }
// //       }
      
// //       setOrders(allOrders);
// //     } catch (error) {
// //       console.error("Error loading orders:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const deleteOrder = (orderId: string) => {
// //     if (window.confirm("क्या आप वाकई इस ऑर्डर को डिलीट करना चाहते हैं?")) {
// //       localStorage.removeItem(`order_${orderId}`);
// //       setOrders(orders.filter(order => order.id !== orderId));
// //     }
// //   };

// //   const exportToExcel = () => {
// //     // CSV content generation
// //     const headers = ["Order ID", "Date", "Payment ID", "Total", "Items Count"];
// //     const csvRows = orders.map(order => [
// //       order.id,
// //       new Date(order.date).toLocaleString(),
// //       order.paymentId || "N/A",
// //       `$${order.total.toFixed(2)}`,
// //       order.items.reduce((sum, item) => sum + item.quantity, 0)
// //     ]);

// //     const csvContent = [
// //       headers.join(","),
// //       ...csvRows.map(row => row.join(","))
// //     ].join("\n");

// //     // Download CSV file
// //     const blob = new Blob([csvContent], { type: "text/csv" });
// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");
// //     link.href = url;
// //     link.download = `merfume-orders-${new Date().toISOString().split('T')[0]}.csv`;
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   const viewOrderDetails = (orderId: string) => {
// //     navigate(`/admin/orders/${orderId}`);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center">
// //         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen bg-background p-4 md:p-8">
// //       <div className="max-w-7xl mx-auto">
// //         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
// //           <h1 className="text-2xl md:text-3xl font-bold text-foreground">
// //             ऑर्डर मैनेजमेंट
// //           </h1>
// //           <div className="flex gap-2">
// //             <Button 
// //               onClick={fetchOrdersFromLocalStorage}
// //               variant="outline"
// //               className="bg-accent hover:bg-accent/80"
// //             >
// //               Refresh Data
// //             </Button>
// //             <Button 
// //               onClick={exportToExcel} 
// //               className="bg-gold hover:bg-gold-dark text-luxury-black"
// //             >
// //               <Download className="h-4 w-4 mr-2" />
// //               एक्सपोर्ट करें
// //             </Button>
// //           </div>
// //         </div>

// //         {orders.length === 0 ? (
// //           <div className="text-center py-16 border rounded-lg">
// //             <p className="text-lg text-muted-foreground">कोई ऑर्डर नहीं मिला</p>
// //           </div>
// //         ) : (
// //           <div className="border rounded-lg overflow-hidden shadow-sm">
// //             <Table>
// //               <TableHeader className="bg-accent">
// //                 <TableRow>
// //                   <TableHead className="w-[100px]">ऑर्डर ID</TableHead>
// //                   <TableHead>तारीख</TableHead>
// //                   <TableHead>भुगतान ID</TableHead>
// //                   <TableHead>कुल राशि</TableHead>
// //                   <TableHead>आइटम्स</TableHead>
// //                   <TableHead className="text-right">एक्शन</TableHead>
// //                 </TableRow>
// //               </TableHeader>
// //               <TableBody>
// //                 {orders.map((order) => (
// //                   <TableRow key={order.id}>
// //                     <TableCell className="font-medium">{order.id}</TableCell>
// //                     <TableCell>
// //                       {new Date(order.date).toLocaleDateString("hi-IN")}
// //                     </TableCell>
// //                     <TableCell>
// //                       {order.paymentId || "N/A"}
// //                     </TableCell>
// //                     <TableCell>₹{order.total.toFixed(2)}</TableCell>
// //                     <TableCell>
// //                       {order.items.reduce((sum, item) => sum + item.quantity, 0)} आइटम्स
// //                     </TableCell>
// //                     <TableCell className="text-right">
// //                       <div className="flex justify-end gap-2">
// //                         <Button
// //                           variant="ghost"
// //                           size="icon"
// //                           onClick={() => viewOrderDetails(order.id)}
// //                           className="text-blue-500 hover:text-blue-700"
// //                         >
// //                           <Eye className="h-4 w-4" />
// //                         </Button>
// //                         <Button
// //                           variant="ghost"
// //                           size="icon"
// //                           onClick={() => deleteOrder(order.id)}
// //                           className="text-red-500 hover:text-red-700"
// //                         >
// //                           <Trash2 className="h-4 w-4" />
// //                         </Button>
// //                       </div>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Download, Trash2, Eye } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface OrderItem {
//   id: string;
//   name: string;
//   brand: string;
//   price: number;
//   quantity: number;
//   image: string;
// }

// interface Order {
//   id: string;
//   date: string;
//   items: OrderItem[];
//   total: number;
//   paymentId: string;
// }

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // ✅ Fetch orders from backend
//   const fetchOrdersFromBackend = async () => {
//     try {
//       const response = await fetch("http://localhost:8081/api/orders"); // Adjust port if needed
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders");
//       }

//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error loading orders:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ On mount
//   useEffect(() => {
//     const isAuthenticated = localStorage.getItem("adminAuth");
//     if (!isAuthenticated) {
//       navigate("/admin/login");
//       return;
//     }

//     fetchOrdersFromBackend();
//   }, [navigate]);

//   const deleteOrder = async (orderId: string) => {
//     const confirm = window.confirm("क्या आप वाकई इस ऑर्डर को डिलीट करना चाहते हैं?");
//     if (!confirm) return;

//     try {
//       await fetch(`http://localhost:8081/api/orders/${orderId}`, {
//         method: "DELETE",
//       });
//       setOrders(orders.filter((order) => order.id !== orderId));
//     } catch (err) {
//       console.error("Delete failed:", err);
//     }
//   };

//   const exportToExcel = () => {
//     const headers = ["Order ID", "Date", "Payment ID", "Total", "Items Count"];
//     const csvRows = orders.map((order) => [
//       order.id,
//       new Date(order.date).toLocaleString(),
//       order.paymentId || "N/A",
//       `₹${order.total.toFixed(2)}`,
//       order.items.reduce((sum, item) => sum + item.quantity, 0),
//     ]);

//     const csvContent = [
//       headers.join(","),
//       ...csvRows.map((row) => row.join(",")),
//     ].join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = `merfume-orders-${new Date().toISOString().split("T")[0]}.csv`;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const viewOrderDetails = (orderId: string) => {
//     navigate(`/admin/orders/${orderId}`);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-background p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h1 className="text-2xl md:text-3xl font-bold text-foreground">ऑर्डर मैनेजमेंट</h1>
//           <div className="flex gap-2">
//             <Button
//               onClick={fetchOrdersFromBackend}
//               variant="outline"
//               className="bg-accent hover:bg-accent/80"
//             >
//               Refresh Data
//             </Button>
//             <Button
//               onClick={exportToExcel}
//               className="bg-gold hover:bg-gold-dark text-luxury-black"
//             >
//               <Download className="h-4 w-4 mr-2" />
//               एक्सपोर्ट करें
//             </Button>
//           </div>
//         </div>

//         {orders.length === 0 ? (
//           <div className="text-center py-16 border rounded-lg">
//             <p className="text-lg text-muted-foreground">कोई ऑर्डर नहीं मिला</p>
//           </div>
//         ) : (
//           <div className="border rounded-lg overflow-hidden shadow-sm">
//             <Table>
//               <TableHeader className="bg-accent">
//                 <TableRow>
//                   <TableHead className="w-[100px]">ऑर्डर ID</TableHead>
//                   <TableHead>तारीख</TableHead>
//                   <TableHead>भुगतान ID</TableHead>
//                   <TableHead>कुल राशि</TableHead>
//                   <TableHead>आइटम्स</TableHead>
//                   <TableHead className="text-right">एक्शन</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders.map((order) => (
//                   <TableRow key={order.id}>
//                     <TableCell className="font-medium">{order.id}</TableCell>
//                     <TableCell>{new Date(order.date).toLocaleDateString("hi-IN")}</TableCell>
//                     <TableCell>{order.paymentId || "N/A"}</TableCell>
//                     <TableCell>₹{order.total.toFixed(2)}</TableCell>
//                     <TableCell>
//                       {order.items.reduce((sum, item) => sum + item.quantity, 0)} आइटम्स
//                     </TableCell>
//                     <TableCell className="text-right">
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => viewOrderDetails(order.id)}
//                           className="text-blue-500 hover:text-blue-700"
//                         >
//                           <Eye className="h-4 w-4" />
//                         </Button>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           onClick={() => deleteOrder(order.id)}
//                           className="text-red-500 hover:text-red-700"
//                         >
//                           <Trash2 className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchOrdersFromBackend = () => {
    fetch("http://localhost:8081/api/retrieve-orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fetch error:", err))
      .finally(() => setLoading(false));
  };
  

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth");
    if (!isAuthenticated) {
      navigate("/admin/login");
      return;
    }

    fetchOrdersFromBackend();
    const interval = setInterval(fetchOrdersFromBackend, 10000); // Refresh every 10s

    return () => clearInterval(interval);
  }, [navigate]);

  const exportToCSV = () => {
    const headers = ["Order ID", "Date", "Payment ID", "Total", "Items"];
    const csv = [
      headers.join(","),
      ...orders.map((o) =>
        [
          o.id,
          new Date(o.date).toLocaleString(),
          o.paymentId,
          o.total,
          o.items?.length || 0,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "orders.csv";
    link.click();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Orders</h1>
        <Button onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" /> Export
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Payment ID</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Items</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
              <TableCell>{order.paymentId}</TableCell>
              <TableCell>₹{order.total}</TableCell>
              <TableCell>{order.items?.length || 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
