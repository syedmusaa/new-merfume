import { useCart } from "@/components/CartContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface UserDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

export default function CheckoutDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { checkout } = useCart();

  const [form, setForm] = useState<UserDetails>({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    country: "India" // Default value
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Validate required fields
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert("Please fill all required fields (Name, Phone, Address, Pincode)");
      return;
    }

    // Validate phone number format
    if (!/^\d{10}$/.test(form.phone)) {
      alert("Please enter a valid 10-digit phone number");
      return;
    }

    // Validate pincode format (6 digits for India)
    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Please enter a valid 6-digit pincode");
      return;
    }

    checkout(form); // Pass user details to checkout
    onClose(); // Close the dialog
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Enter Order / Pickup Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input 
            name="name" 
            placeholder="Full Name*" 
            value={form.name} 
            onChange={handleChange} 
            required 
          />
          <Input 
            name="phone" 
            placeholder="Phone Number*" 
            value={form.phone} 
            onChange={handleChange} 
            type="tel"
            required
          />
          <Input 
            name="address" 
            placeholder="Full Address*" 
            value={form.address} 
            onChange={handleChange} 
            required
          />
          <Input 
            name="pincode" 
            placeholder="Pincode*" 
            value={form.pincode} 
            onChange={handleChange} 
            type="text"
            required
          />
          <Input 
            name="city" 
            placeholder="City" 
            value={form.city} 
            onChange={handleChange} 
          />
          <Input 
            name="state" 
            placeholder="State" 
            value={form.state} 
            onChange={handleChange} 
          />
          <Input 
            name="country" 
            placeholder="Country" 
            value={form.country} 
            onChange={handleChange} 
          />

          <Button className="w-full mt-4" onClick={handleSubmit}>
            Proceed to Pay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}