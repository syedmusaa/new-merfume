// import Navigation from "@/components/Navigation";

// export default function Cart() {
//   return (
//     <div className="min-h-screen bg-background">
//       <Navigation />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="text-center">
//           <h1 className="text-4xl font-bold text-foreground mb-8">
//             Shopping Cart
//           </h1>
//           <div className="max-w-2xl mx-auto">
//             <p className="text-lg text-muted-foreground mb-6">
//               Your cart is currently empty. Browse our exquisite collection of
//               perfumes to find your perfect scent.
//             </p>
//             <div className="h-64 bg-accent rounded-lg flex items-center justify-center">
//               <p className="text-muted-foreground">
//                 Cart functionality coming soon
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="bg-luxury-black text-cream py-16">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//             <div className="col-span-1 md:col-span-2">
//               <img
//                 src="https://cdn.builder.io/api/v1/assets/df01e345c2d146ff8c27b0570e833c11/merfume-logo-74e35c?format=webp&width=800"
//                 alt="Merfume"
//                 className="h-20 w-auto mb-4 brightness-110"
//               />
//               <p className="text-cream/80 max-w-md leading-relaxed">
//                 Continue shopping our luxury fragrance collection to find your
//                 perfect scent and create lasting memories.
//               </p>
//             </div>
//             <div>
//               <h3 className="text-gold font-semibold mb-4">Shop</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="/store"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     All Perfumes
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/store?category=fresh"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Fresh
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/store?category=luxury"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Luxury
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/store?category=floral"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Floral
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-gold font-semibold mb-4">Support</h3>
//               <ul className="space-y-2">
//                 <li>
//                   <a
//                     href="#"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Help Center
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Shipping Info
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="#"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Returns
//                   </a>
//                 </li>
//                 <li>
//                   <a
//                     href="/contact"
//                     className="text-cream/80 hover:text-gold transition-colors"
//                   >
//                     Contact Us
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-cream/20 mt-12 pt-8 text-center">
//             <p className="text-cream/60">
//               © 2024 Merfume. All rights reserved. Crafted with luxury in mind.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


import { useCart } from "@/components/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalItems,
    totalPrice,
    checkout
  } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-foreground mb-8 text-center">
          Shopping Cart
        </h1>
        
        {cart.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is currently empty. Browse our exquisite collection of
              perfumes to find your perfect scent.
            </p>
            <div className="h-64 bg-accent rounded-lg flex items-center justify-center mb-6">
              <Link to="/store">
                <Button className="bg-gold hover:bg-gold-dark text-luxury-black">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="border-border/50">
                    <CardContent className="p-4 flex items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded mr-4"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.brand}</p>
                        <p className="text-gold font-bold">${item.price}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold">
                      <span>Total</span>
                      <span className="text-gold">${totalPrice.toFixed(2)}</span>
                    </div>
                    <Button
                      className="w-full bg-gold hover:bg-gold-dark text-luxury-black mt-6"
                      onClick={checkout}
                    >
                      Checkout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Keeping your original footer structure */}
      <footer className="bg-luxury-black text-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <img
                src="https://cdn.builder.io/api/v1/assets/df01e345c2d146ff8c27b0570e833c11/merfume-logo-74e35c?format=webp&width=800"
                alt="Merfume"
                className="h-20 w-auto mb-4 brightness-110"
              />
              <p className="text-cream/80 max-w-md leading-relaxed">
                Continue shopping our luxury fragrance collection to find your
                perfect scent and create lasting memories.
              </p>
            </div>
            <div>
              <h3 className="text-gold font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/store"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    All Perfumes
                  </a>
                </li>
                <li>
                  <a
                    href="/store?category=fresh"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Fresh
                  </a>
                </li>
                <li>
                  <a
                    href="/store?category=luxury"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Luxury
                  </a>
                </li>
                <li>
                  <a
                    href="/store?category=floral"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Floral
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-cream/80 hover:text-gold transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-cream/20 mt-12 pt-8 text-center">
            <p className="text-cream/60">
              © 2024 Merfume. All rights reserved. Crafted with luxury in mind.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}