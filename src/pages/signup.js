// // pages/signup.js
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function SignupPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage('✅ Signup successful! Redirecting to login...');
//         setTimeout(() => router.push('/login'), 1500);
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       setMessage('⚠️ Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 mb-3 border rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-3 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
//         >
//           Create Account
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
//         )}

//         <p className="mt-4 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }
// pages/signup.js
// 'use client';
// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '@/utils/AuthContext'; // ✅ Import AuthContext

// export default function SignupPage() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();
//   const { login } = useAuth(); // ✅ Get login function from context

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     setMessage('');

//     try {
//       const res = await fetch('/api/auth/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         // ✅ Automatically log in user after signup
//         // Make sure your signup API returns a token; if not, you can call login API next
//         // Here, we assume token is returned
//         if (data.token) {
//           login(data.user, data.token);
//         }

//         setMessage('✅ Signup successful! Redirecting to home...');
//         setTimeout(() => router.push('/'), 1500);
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (error) {
//       setMessage('⚠️ Something went wrong. Please try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleSignup}
//         className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
//       >
//         <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

//         <input
//           type="text"
//           placeholder="Full Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="w-full p-3 mb-3 border rounded"
//           required
//         />

//         <input
//           type="email"
//           placeholder="Email Address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-3 mb-3 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 mb-4 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
//         >
//           Create Account
//         </button>

//         {message && (
//           <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
//         )}

//         <p className="mt-4 text-center text-sm text-gray-500">
//           Already have an account?{' '}
//           <a href="/login" className="text-blue-600 hover:underline">
//             Login here
//           </a>
//         </p>
//       </form>
//     </div>
//   );
// }
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/AuthContext';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ Automatically log in the user after signup
        if (data.token && data.user) {
          login(data.user, data.token); // update AuthContext + localStorage
        }

        setMessage('✅ Signup successful! Redirecting to home...');
        setTimeout(() => router.push('/'), 1500);
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage('⚠️ Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSignup}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-3 border rounded"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
        >
          Create Account
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}

        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
}
