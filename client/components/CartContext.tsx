// // context/CartContext.tsx
// import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   brand: string;
// }

// interface Order {
//   id: string;
//   items: CartItem[];
//   total: number;
//   date: string;
//   paymentId: string;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
//   checkout: () => Promise<void>;
//   currentOrder: Order | null;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

//   // Load cart from localStorage on initial render
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
    
//     const savedOrder = localStorage.getItem('currentOrder');
//     if (savedOrder) {
//       setCurrentOrder(JSON.parse(savedOrder));
//     }
//   }, []);

//   // Save cart to localStorage whenever it changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   // Save order to localStorage whenever it changes
//   useEffect(() => {
//     if (currentOrder) {
//       localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
//     }
//   }, [currentOrder]);

//   const totalItems = useMemo(() => 
//     cart.reduce((total, item) => total + item.quantity, 0), 
//     [cart]
//   );

//   const totalPrice = useMemo(() =>
//     cart.reduce((total, item) => total + (item.price * item.quantity), 0),
//     [cart]
//   );

//   const addToCart = (item: CartItem) => {
//     setCart((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//   const checkout = async () => {
//     try {
//       const options = {
//         key: 'rzp_test_E6f3s8PsZ5lTdu',
//         amount: totalPrice * 100, // in paise
//         currency: 'INR',
//         name: 'Merfume',
//         description: 'Luxury Fragrances',
//         handler: function(response: any) {
//           // Create order record
//           const order: Order = {
//             id: `order_${Date.now()}`,
//             items: cart,
//             total: totalPrice,
//             date: new Date().toISOString(),
//             paymentId: response.razorpay_payment_id
//           };

//           setCurrentOrder(order);
//           clearCart();
//         },
//         prefill: {
//           name: 'Customer Name',
//           email: 'customer@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: '#D4AF37'
//         }
//       };

//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error('Checkout error:', error);
//       alert('Checkout failed. Please try again.');
//     }
//   };

//   const value = {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     totalItems,
//     totalPrice,
//     checkout,
//     currentOrder
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// import { createContext, useContext, useState, ReactNode, useMemo, useEffect } from "react";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image: string;
//   brand: string;
// }

// interface Order {
//   id: string;
//   items: CartItem[];
//   total: number;
//   date: string;
//   paymentId: string;
// }

// interface CartContextType {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
//   removeFromCart: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
//   checkout: () => Promise<void>;
//   currentOrder: Order | null;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error("useCart must be used within CartProvider");
//   return context;
// };

// export function CartProvider({ children }: { children: ReactNode }) {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [currentOrder, setCurrentOrder] = useState<Order | null>(null);

//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
    
//     const savedOrder = localStorage.getItem('currentOrder');
//     if (savedOrder) {
//       setCurrentOrder(JSON.parse(savedOrder));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);

//   useEffect(() => {
//     if (currentOrder) {
//       localStorage.setItem('currentOrder', JSON.stringify(currentOrder));
//     }
//   }, [currentOrder]);

//   const totalItems = useMemo(() => 
//     cart.reduce((total, item) => total + item.quantity, 0), 
//     [cart]
//   );

//   const totalPrice = useMemo(() =>
//     cart.reduce((total, item) => total + (item.price * item.quantity), 0),
//     [cart]
//   );

//   const addToCart = (item: CartItem) => {
//     setCart((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id: string) => {
//     setCart((prev) => prev.filter((item) => item.id !== id));
//   };

//   const updateQuantity = (id: string, quantity: number) => {
//     if (quantity <= 0) {
//       removeFromCart(id);
//       return;
//     }

//     setCart((prev) =>
//       prev.map((item) =>
//         item.id === id ? { ...item, quantity } : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem('cart');
//   };

//  // In your CartContext
// const checkout = async () => {
//   try {
//     const options = {
//       key: 'rzp_test_E6f3s8PsZ5lTdu',
//       amount: totalPrice * 100,
//       currency: 'INR',
//       name: 'Merfume',
//       description: 'Luxury Fragrances',
//       handler: function(response: any) {
//         const order: Order = {
//           id: `order_${Date.now()}`,
//           items: cart,
//           total: totalPrice,
//           date: new Date().toISOString(),
//           paymentId: response.razorpay_payment_id
//         };
//         setCurrentOrder(order);
//         clearCart();
//         // Redirect to success page after payment
//         window.location.href = '/success'; // or use navigate if you prefer
//       },
//       prefill: {
//         name: 'Customer Name',
//         email: 'customer@example.com',
//         contact: '+917489635061'
//       },
//       theme: {
//         color: '#D4AF37'
//       }
//     };

//     const rzp = new (window as any).Razorpay(options);
//     rzp.open();
//   } catch (error) {
//     console.error('Checkout error:', error);
//     alert('Checkout failed. Please try again.');
//   }
// };

//   const value = {
//     cart,
//     addToCart,
//     removeFromCart,
//     updateQuantity,
//     clearCart,
//     totalItems,
//     totalPrice,
//     checkout,
//     currentOrder
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// }

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  image: string;
}

interface UserDetails {
  name: string;
  phone: string;
  address: string;
  pincode: string;
  city: string;
  state: string;
  country: string;
}

interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  paymentId: string;
  userDetails: UserDetails;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
  checkout: (userDetails: UserDetails) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const generateOrderId = () => {
    return 'ORD-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const generatePaymentId = () => {
    return 'PAY-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5).toUpperCase();
  };

  const checkout = (userDetails: UserDetails) => {
    const order: Order = {
      id: generateOrderId(),
      date: new Date().toISOString(),
      items: [...cart],
      total: totalPrice,
      paymentId: generatePaymentId(),
      userDetails
    };

    // Save the current order to localStorage
    localStorage.setItem('currentOrder', JSON.stringify(order));
    
    // In a real app, you would redirect to payment gateway here
    // For demo, we'll just redirect to success page
    window.location.href = '/success';
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        totalPrice,
        checkout,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}