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


// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from "@/components/ui/table";
// import { Download } from "lucide-react";

// export default function AdminDashboard() {
//   const [orders, setOrders] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchOrdersFromBackend = () => {
//   fetch("https://tds-solutions-backend.onrender.com/api/retrieve-orders", {
//     method: "GET", // ✅ Specify GET method
//     headers: {
//       "Accept": "application/json",         // ✅ Expecting JSON
//       "Content-Type": "application/json",   // ✅ Sending as JSON (even if no body, it's safe)
//     },
//   })
//     .then((res) => {
//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }
//       return res.json();
//     })
//     .then((data) => {
//       console.log("✅ Orders fetched successfully", data);
//       setOrders(data);
//     })
//     .catch((err) => {
//       console.error("❌ Fetch error:", err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };

//   useEffect(() => {
//     fetchOrdersFromBackend();
//     const interval = setInterval(fetchOrdersFromBackend, 10000); // refresh every 10s
//     return () => clearInterval(interval);
//   }, []);

//   const exportToCSV = () => {
//     const headers = [
//       "Order ID",
//       "Date",
//       "Payment ID",
//       "Total",
//       "Item Count",
//       "Item Details"
//     ];

//     const csv = [
//       headers.join(","),
//       ...orders.map((order) => {
//         const items = order.items
//           ?.map(
//             (item: any) =>
//               `${item.name} (${item.brand}) - ₹${item.price} x${item.quantity}`
//           )
//           .join(" | ");
//         return [
//           order.id,
//           new Date(order.date).toLocaleString(),
//           order.paymentId,
//           order.total,
//           order.items?.length || 0,
//           `"${items}"`
//         ].join(",");
//       })
//     ].join("\n");

//     const blob = new Blob([csv], { type: "text/csv" });
//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = "orders.csv";
//     link.click();
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className="p-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">🧾 Admin Orders</h1>
//         <Button onClick={exportToCSV}>
//           <Download className="h-4 w-4 mr-2" /> Export
//         </Button>
//       </div>

//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Order ID</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead>Payment ID</TableHead>
//               <TableHead>Total</TableHead>
//               <TableHead>Items</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {orders.map((order) => (
//               <TableRow key={order.id}>
//                 <TableCell>{order.id}</TableCell>
//                 <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
//                 <TableCell>{order.paymentId}</TableCell>
//                 <TableCell>₹{order.total}</TableCell>
//                 <TableCell>
//                   {order.items?.map((item: any) => (
//                     <div key={item.id} className="mb-2">
//                       <div className="font-semibold">{item.name}</div>
//                       <div className="text-sm text-gray-500">
//                         Brand: {item.brand}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         ₹{item.price} x {item.quantity}
//                       </div>
//                     </div>
//                   ))}
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Download } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchOrdersFromBackend = () => {
    fetch("https://tds-solutions-backend.onrender.com/api/retrieve-orders", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log("✅ Orders fetched successfully", data);
        if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          console.error("Invalid response format: orders is not an array");
          setOrders([]);
        }
      })
      .catch((err) => {
        console.error("❌ Fetch error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrdersFromBackend();
    const interval = setInterval(fetchOrdersFromBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Date",
      "Payment ID",
      "Total",
      "Customer Name",
      "Customer Phone",
      "Item Count",
      "Item Details",
    ];

    const csv = [
      headers.join(","),
      ...orders.map((order) => {
        const items = order.items
          ?.map(
            (item: any) =>
              `${item.name} (${item.brand}) - ₹${item.price} x${item.quantity}`
          )
          .join(" | ");
        return [
          order.orderId,
          new Date(order.orderDate).toLocaleString(),
          order.paymentId,
          order.totalAmount,
          order.customerDetails?.name || "",
          order.customerDetails?.phone || "",
          order.items?.length || 0,
          `"${items}"`,
        ].join(",");
      }),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `orders_${new Date().toISOString()}.csv`;
    link.click();
  };

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  if (loading) return <div className="p-8">Loading orders...</div>;

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">🧾 Admin Orders</h1>
        <Button onClick={exportToCSV}>
          <Download className="h-4 w-4 mr-2" /> Export CSV
        </Button>
      </div>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Items</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.orderId}
                  onClick={() => openOrderDetails(order)}
                  className="cursor-pointer hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell>
                    {new Date(order.orderDate).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {order.customerDetails?.name || "N/A"}
                    <div className="text-sm text-gray-500">
                      {order.customerDetails?.phone || ""}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>{order.items?.length} item(s)</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
              </DialogHeader>

              {selectedOrder && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold">Order Information</h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <p><span className="text-muted-foreground">Order ID:</span> {selectedOrder.orderId}</p>
                        <p><span className="text-muted-foreground">Date:</span> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                        <p><span className="text-muted-foreground">Payment ID:</span> {selectedOrder.paymentId}</p>
                        <p><span className="text-muted-foreground">Status:</span> {selectedOrder.status || "Confirmed"}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold">Customer Details</h3>
                      <div className="space-y-1 mt-2 text-sm">
                        <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customerDetails?.name || "N/A"}</p>
                        <p><span className="text-muted-foreground">Email:</span> {selectedOrder.customerDetails?.email || "N/A"}</p>
                        <p><span className="text-muted-foreground">Phone:</span> {selectedOrder.customerDetails?.phone || "N/A"}</p>
                        <p><span className="text-muted-foreground">Address:</span> {selectedOrder.customerDetails?.address || "N/A"}</p>
                        <p><span className="text-muted-foreground">Pincode:</span> {selectedOrder.customerDetails?.pincode || "N/A"}</p>
                        <p><span className="text-muted-foreground">City:</span> {selectedOrder.customerDetails?.city || "N/A"}</p>
                        <p><span className="text-muted-foreground">State:</span> {selectedOrder.customerDetails?.state || "N/A"}</p>
                        <p><span className="text-muted-foreground">Country:</span> {selectedOrder.customerDetails?.country || "N/A"}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Items ({selectedOrder.items?.length || 0})</h3>
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Product</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Qty</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedOrder.items?.map((item: any) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                <div className="flex items-center gap-3">
                                  {item.image && (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-10 h-10 object-cover rounded"
                                    />
                                  )}
                                  {item.name}
                                </div>
                              </TableCell>
                              <TableCell>{item.brand}</TableCell>
                              <TableCell>₹{item.price.toFixed(2)}</TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell className="text-right">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <div className="w-64 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal:</span>
                        <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping:</span>
                        <span>FREE</span>
                      </div>
                      <div className="flex justify-between font-bold border-t pt-2">
                        <span>Total:</span>
                        <span>₹{selectedOrder.totalAmount.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
}