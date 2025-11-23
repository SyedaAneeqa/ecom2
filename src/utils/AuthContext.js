// 'use client';
// import { createContext, useContext, useState, useEffect } from 'react';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) setUser(JSON.parse(storedUser));
//   }, []);

//   const login = (userData) => {
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData); // ✅ update state so Navbar reacts
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     setUser(null); // ✅ update state so Navbar reacts
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Login function
  const login = (userData, tokenData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', tokenData);
    setUser(userData);
    setToken(tokenData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


// 'use client';

// import { createContext, useContext, useState, useEffect } from "react";
// import { useRouter } from "next/router"; 

// // Create the Auth Context
// const AuthContext = createContext();

// // Custom hook
// export const useAuth = () => useContext(AuthContext);

// // Provider
// export const AuthProvider = ({ children }) => {
//   const router = useRouter();

//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [authToken, setAuthToken] = useState(null);
//   const [userEmail, setUserEmail] = useState(null);
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isAuthReady, setIsAuthReady] = useState(false);

//   // ---------------------------
//   // 🔹 Load auth from localStorage on refresh
//   // ---------------------------
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const user = localStorage.getItem("user"); // FIX: now reading saved API user object

//     if (token && user) {
//       const parsedUser = JSON.parse(user);

//       setAuthToken(token);
//       setUserEmail(parsedUser.email);
//       setIsAdmin(parsedUser.isAdmin);
//       setIsLoggedIn(true);
//     }

//     setIsAuthReady(true);
//   }, []);

//   // ---------------------------
//   // 🔹 Route Protection for Admin Panel
//   // ---------------------------
//   useEffect(() => {
//     if (!isAuthReady) return;

//     const pathname = window.location.pathname;
//     const isAdminPage = pathname.startsWith("/admin");

//     if (isAdminPage && !isAdmin) {
//       router.push("/");
//     }
//   }, [isAuthReady, isAdmin]);

//   // ---------------------------
//   // 🔹 Login Function
//   // login(token, userObject)
//   // ---------------------------
//   const login = (token, user) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("user", JSON.stringify(user));

//     setAuthToken(token);
//     setUserEmail(user.email);
//     setIsAdmin(user.isAdmin);
//     setIsLoggedIn(true);
//   };

//   // ---------------------------
//   // 🔹 Logout Function
//   // ---------------------------
//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     setAuthToken(null);
//     setUserEmail(null);
//     setIsAdmin(false);
//     setIsLoggedIn(false);

//     router.push("/login");
//   };

//   const value = {
//     isLoggedIn,
//     authToken,
//     userEmail,
//     isAdmin,
//     login,
//     logout,
//   };

//   if (!isAuthReady) return <div>Loading...</div>;

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
