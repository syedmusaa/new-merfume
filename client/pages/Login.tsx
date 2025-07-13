// src/pages/admin/Login.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple authentication - replace with proper auth in production
    if (username === "admin" && password === "merfume@123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin");
    } else {
      setError("गलत यूजरनेम या पासवर्ड");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-md border border-border">
        <div className="text-center">
          <h1 className="text-3xl font-bold">एडमिन लॉगिन</h1>
          <p className="text-muted-foreground mt-2">Merfume ऑर्डर मैनेजमेंट सिस्टम</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground mb-1">
              यूजरनेम
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              पासवर्ड
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-background"
            />
          </div>
          
          <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-luxury-black">
            लॉगिन करें
          </Button>
        </form>
      </div>
    </div>
  );
}