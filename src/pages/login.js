
// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       const data = res.data;

//       // ✅ store both token and user in localStorage
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // ✅ redirect based on isAdmin
//       if (data.user.isAdmin) router.push("/admin");
//       else router.push("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//       console.error(err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow-md rounded">
//         <h2 className="text-2xl mb-4">Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full mb-3 p-2 border"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-3 p-2 border"
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


// 'use client';

// import { useState } from "react";
// import { useRouter } from "next/router";    // pages router
// import axios from "axios";
// import { useAuth } from "@/utils/AuthContext";   // ✅ import context

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth();   // ✅ get login function from context

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       const data = res.data;

//       // ✅ update global AuthContext state
//       login(data.user, data.token);

//       // (optional) save to localStorage for persistence
//       localStorage.setItem("token", data.token);
//       localStorage.setItem("user", JSON.stringify(data.user));

//       // redirect
//       if (data.user.isAdmin) router.push("/admin");
//       else router.push("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed!");
//       console.error(err);
//     }

//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow-lg rounded w-80">
//         <h2 className="text-2xl mb-4 font-semibold text-center">Login</h2>

//         <input
//           type="email"
//           required
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full mb-3 p-2 border rounded"
//         />

//         <input
//           type="password"
//           required
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-3 p-2 border rounded"
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
//           disabled={loading}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// }
// 'use client';

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/utils/AuthContext";
// import { useState } from "react";

// export default function LoginPage() {
//   const router = useRouter();
//   const { login } = useAuth(); // ✅ get login function from context
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         login(data.user); // ✅ update context
//         localStorage.setItem("token", data.token); // optional, for auth API calls
//         router.push("/"); // go to home
//       } else {
//         alert(data.message);
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
//       <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
//       <button type="submit">Login</button>
//     </form>
//   );
// }

'use client';

import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/AuthContext";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth(); // ✅ get login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("/api/auth/login", { // make sure endpoint matches your API
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Pass both user and token to AuthContext
        login(data.user, data.token);

        setMessage("✅ Login successful! Redirecting...");
        setTimeout(() => router.push("/"), 1000); // redirect to home
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-3 border rounded"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}


// 'use client';
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@/utils/AuthContext"; // 👈 IMPORT YOUR AUTH CONTEXT HOOK

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State for displaying error messages
  
//   const router = useRouter();
//   const { login } = useAuth(); // 👈 GET THE LOGIN FUNCTION FROM CONTEXT

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       const data = res.data;

//       // ⭐ THE FIX: Update Context State Immediately
//       // This is the crucial step. It tells your app (including the homepage/layout)
//       // that the user is now logged in, forcing a necessary re-render.
//       login(data.user, data.token);

//       // Redirect based on isAdmin
//       if (data.user.isAdmin) router.push("/admin");
//       else router.push("/");
      
//       // Forces Next.js App Router to re-fetch layout data, ensuring consistency
//       router.refresh(); 

//     } catch (err) {
//       // ❌ Replaced alert() with state-driven error message
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//       console.error("Login Error:", err);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-lg w-full max-w-sm">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Account Login</h2>
        
//         {/* Display Error Message instead of alert() */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
//             <p className="font-medium">Error:</p>
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//           required
//         />
//         <button 
//           type="submit" 
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
//         >
//           Secure Login
//         </button>
//       </form>
//     </div>
//   );
// }

// 'use client';
// import { useState, useEffect } from "react"; // 👈 Import useEffect
// import { useRouter } from "next/navigation";
// import axios from "axios";
// import { useAuth } from "@/utils/AuthContext"; 

// export default function LoginPage() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState(""); // State for displaying error messages
  
//   const router = useRouter();
//   // Destructure login, user, and loading from the context
//   const { login, user, loading } = useAuth(); 

//   // ⭐ CORE FIX: Redirection if the user is already logged in
//   useEffect(() => {
//     // We only proceed if authentication context data has finished loading (loading is false)
//     // AND if a user object exists (user is not null).
//     if (user && !loading) {
//       // Redirect based on isAdmin
//       if (user.isAdmin) router.push("/admin");
//       else router.push("/");
      
//       // Forces Next.js App Router to re-fetch layout data, ensuring consistency
//       router.refresh();
//     }
//   }, [user, loading, router]); // Depend on user, loading, and router to trigger on state change

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     try {
//       const res = await axios.post("/api/auth/login", { email, password });
//       const data = res.data;

//       // Update Context State Immediately
//       login(data.user, data.token);

//       // Redirect immediately after successful login (This handles the post-submission redirection)
//       if (data.user.isAdmin) router.push("/admin");
//       else router.push("/");
      
//       router.refresh(); 

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed. Please check your credentials.");
//       console.error("Login Error:", err);
//     }
//   };
  
//   // Show a loading indicator while we check the user session to prevent flashing the form
//   if (loading) {
//     return (
//         <div className="min-h-screen flex justify-center items-center">
//             <p className="text-xl font-semibold text-blue-600">Checking user session...</p>
//         </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center">
//       <form onSubmit={handleSubmit} className="p-6 bg-white shadow-xl rounded-lg w-full max-w-sm">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Account Login</h2>
        
//         {/* Display Error Message instead of alert() */}
//         {error && (
//           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4" role="alert">
//             <p className="font-medium">Error:</p>
//             <p className="text-sm">{error}</p>
//           </div>
//         )}

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="block w-full mb-6 p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
//           required
//         />
//         <button 
//           type="submit" 
//           className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 shadow-md"
//         >
//           Secure Login
//         </button>
//       </form>
//     </div>
//   );
// }