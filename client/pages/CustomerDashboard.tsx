import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, PackageSearch, UserCircle } from "lucide-react";

export default function CustomerDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("customerOrders") || "[]");
    setOrders(storedOrders);
  }, []);

  const openOrderDetails = (order: any) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const totalSpent = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const itemsPurchased = orders.reduce((acc, order) => acc + order.items?.length || 0, 0);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 space-y-4 border-r">
        <div className="text-xl font-bold mb-4">🛒 My Dashboard</div>
        <div className="space-y-2">
          <button className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === 'overview' ? 'bg-gray-200 font-semibold' : ''}`} onClick={() => setActiveTab("overview")}> <Home size={18} /> Overview</button>
          <button className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === 'orders' ? 'bg-gray-200 font-semibold' : ''}`} onClick={() => setActiveTab("orders")}> <PackageSearch size={18} /> My Orders</button>
          <button className={`flex items-center gap-2 w-full p-2 rounded ${activeTab === 'tracking' ? 'bg-gray-200 font-semibold' : ''}`} onClick={() => setActiveTab("tracking")}> <UserCircle size={18} /> Track Orders</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Welcome Back! 👋</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-muted-foreground text-sm">Total Orders</div>
                <div className="text-xl font-bold">{orders.length}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-muted-foreground text-sm">Items Purchased</div>
                <div className="text-xl font-bold">{itemsPurchased}</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow border">
                <div className="text-muted-foreground text-sm">Total Spent</div>
                <div className="text-xl font-bold">₹{totalSpent.toFixed(2)}</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Orders</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.orderId} className="cursor-pointer hover:bg-gray-50" onClick={() => openOrderDetails(order)}>
                    <TableCell>{order.orderId}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleString()}</TableCell>
                    <TableCell>₹{order.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>{order.items?.length}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeTab === "tracking" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Track Orders</h2>
            {orders.map((order) => (
              <div key={order.orderId} className="mb-4 p-4 bg-white rounded-xl shadow border">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">Order ID: {order.orderId}</p>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.orderDate).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm">Status: <span className="font-medium">{order.status || "Confirmed"}</span></p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold">Order Info</h3>
                  <div className="text-sm space-y-1 mt-1">
                    <p><span className="text-muted-foreground">ID:</span> {selectedOrder.orderId}</p>
                    <p><span className="text-muted-foreground">Date:</span> {new Date(selectedOrder.orderDate).toLocaleString()}</p>
                    <p><span className="text-muted-foreground">Payment:</span> {selectedOrder.paymentId}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">Shipping</h3>
                  <div className="text-sm space-y-1 mt-1">
                    <p><span className="text-muted-foreground">Name:</span> {selectedOrder.customerDetails?.name}</p>
                    <p><span className="text-muted-foreground">Phone:</span> {selectedOrder.customerDetails?.phone}</p>
                    <p><span className="text-muted-foreground">Address:</span> {selectedOrder.customerDetails?.address}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Items</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedOrder.items?.map((item: any) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}