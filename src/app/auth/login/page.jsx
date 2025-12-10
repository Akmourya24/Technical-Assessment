// "use client";
// import React, { useState } from 'react';
// import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Sparkles, Shield, Zap } from 'lucide-react';
// import { Alert } from '@mui/material';

// // Zustand store
// const createStore = (set) => ({
//   user: null,
//   isAuthenticated: false,
//   login: (userData) => set({ user: userData, isAuthenticated: true }),
//   logout: () => set({ user: null, isAuthenticated: false }),
//   signup: (userData) => set({ user: userData, isAuthenticated: true })
// });

// // Simple Zustand implementation
// const useStore = (() => {
//   let state = {
//     user: null,
//     isAuthenticated: false
//   };
//   const listeners = new Set();

//   const setState = (partial) => {
//     state = { ...state, ...partial };
//     listeners.forEach(listener => listener(state));
//   };

//   const store = createStore(setState);

//   return (selector = (s) => s) => {
//     const [, forceUpdate] = useState({});
    
//     React.useEffect(() => {
//       const listener = () => forceUpdate({});
//       listeners.add(listener);
//       return () => listeners.delete(listener);
//     }, []);

//     return selector(store);
//   };
// })();

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [alert, setAlert] = useState({ type: null, message: '' });
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});

//   const { login, signup } = useStore();

//   const validateForm = () => {
//     const newErrors = {};

//     if (!isLogin && !formData.name.trim()) {
//       newErrors.name = 'Name is required';
      
//     }


//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }

//     if (!isLogin && formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (validateForm()) {
//       if (isLogin) {
//         setIsLoading(true);
//         setAlert({ type: null, message: '' });
//         try {
//           const response = await fetch('https://dummyjson.com/auth/login', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//               username: formData.email,
//               password: formData.password,
//             }),
//           });

//           if (!response.ok) {
//             throw new Error('Invalid credentials');
//           }

//           const data = await response.json();
//           login({
//             email: formData.email,
//             name: data.firstName || formData.email.split('@')[0],
//             id: data.id,
//             token: data.accessToken,
//           });
//           setAlert({ type: 'success', message: 'Login successful!' });
//           setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//           setTimeout(() => setAlert({ type: null, message: '' }), 2000);
//         } catch (error) {
//           setAlert({ type: 'error', message: error.message || 'Login failed. Please try again.' });
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         signup({ email: formData.email, name: formData.name });
//         setAlert({ type: 'success', message: 'Sign up successful!' });
//         setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//         setTimeout(() => setAlert({ type: null, message: '' }), 2000);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     if (errors[e.target.name]) {
//       setErrors({ ...errors, [e.target.name]: '' });
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setFormData({ name: '', email: '', password: '', confirmPassword: '' });
//     setErrors({});
//     setAlert({ type: null, message: '' });
//   };

//   const features = [
//     {
//       icon: <Sparkles className="w-6 h-6" />,
//       title: "Modern Interface",
//       description: "Experience a sleek and intuitive design built for productivity"
//     },
//     {
//       icon: <Shield className="w-6 h-6" />,
//       title: "Secure & Private",
//       description: "Your data is encrypted and protected with enterprise-grade security"
//     },
//     {
//       icon: <Zap className="w-6 h-6" />,
//       title: "Lightning Fast",
//       description: "Optimized performance for seamless user experience"
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 md:p-8">
//       <div className="w-full max-w-6xl flex rounded-3xl overflow-hidden shadow-2xl" style={{maxHeight: 'calc(100vh - 4rem)'}}>
//         {/* Left Side - Information */}
//         <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-12 flex-col justify-center relative overflow-hidden">
//           {/* Animated Background Elements */}
//           <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
//           <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          
//           <div className="relative z-10">
//             {/* Logo/Brand */}
//             <div className="flex items-center space-x-3 mb-12">
//               <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
//                 <Sparkles className="w-7 h-7 text-purple-600" />
//               </div>
//               <span className="text-3xl font-bold text-white">BrandName</span>
//             </div>

//             {/* Main Heading */}
//             <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
//               Welcome to the<br />Future of Digital<br />Experience
//             </h1>
            
//             <p className="text-xl text-purple-100 leading-relaxed">
//               Join thousands of users who trust us with their digital journey.
//             </p>
//           </div>
//         </div>

//       {/* Right Side - Auth Form */}
//       <div className="w-full lg:w-1/2 flex items-center justify-center overflow-hidden px-4">
//         <div className="w-full p-8 flex flex-col h-full">
//           {/* Mobile Logo */}
//           <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
//             <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center">
//               <Sparkles className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-2xl font-bold text-white">BrandName</span>
//           </div>

//           <div className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 flex flex-col h-full">
//             {/* Header  */}
//             <div className="p-4 text-center border-b border-gray-700 shrink-0">
//               <h2 className="text-3xl font-bold text-white mb-2">
//                 {isLogin ? 'Welcome Back' : 'Create Account'}
//               </h2>
//               <p className="text-gray-400 text-sm">
//                 {isLogin ? 'Sign in to continue to your account' : 'Sign up to get started with us'}
//               </p>
//             </div>

//             {/* Form */}
//             <div className="px-8 py-2 space-y-5 overflow-y-auto flex-1">
//               {alert.type && (
//                 <Alert severity={alert.type} onClose={() => setAlert({ type: null, message: '' })}>
//                   {alert.message}
//                 </Alert>
//               )}
//               {!isLogin && (
//                 <div>
//                   <label className="block text-gray-300 text-sm font-medium mb-2">
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type="text"
//                       name="name"
//                       value={formData.name}
//                       onChange={handleChange}
//                       className="w-full bg-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 transition"
//                       placeholder="John Doe"
//                     />
//                   </div>
//                   {errors.name && (
//                     <p className="text-red-400 text-sm mt-1">{errors.name}</p>
//                   )}
//                 </div>
//               )}

//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                  UserName
//                 </label>
//                 <div className="relative">
//                   <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full bg-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 transition"
//                     placeholder="you@example.com"
//                   />
//                 </div>
//                 {errors.username && (
//                   <p className="text-red-400 text-sm mt-1">{errors.username}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-gray-300 text-sm font-medium mb-2">
//                   Password
//                 </label>
//                 <div className="relative">
//                   <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="w-full bg-gray-700 text-white rounded-lg pl-11 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 transition"
//                     placeholder="••••••••"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
//                   >
//                     {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//                   </button>
//                 </div>
//                 {errors.password && (
//                   <p className="text-red-400 text-sm mt-1">{errors.password}</p>
//                 )}
//               </div>

//               {!isLogin && (
//                 <div>
//                   <label className="block text-gray-300 text-sm font-medium mb-2">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                     <input
//                       type={showPassword ? 'text' : 'password'}
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className="w-full bg-gray-700 text-white rounded-lg pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 transition"
//                       placeholder="••••••••"
//                     />
//                   </div>
//                   {errors.confirmPassword && (
//                     <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
//                   )}
//                 </div>
//               )}

//               {isLogin && (
//                 <div className="flex items-center justify-between text-sm">
//                   <label className="flex items-center text-gray-300 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-purple-600 focus:ring-purple-500 focus:ring-2 mr-2"
//                     />
//                     Remember me
//                   </label>
//                   <a href="#" className="text-purple-400 hover:text-purple-300 transition">
//                     Forgot password?
//                   </a>
//                 </div>
//               )}

//               <button
//                 onClick={handleSubmit}
//                 disabled={isLoading}
//                 className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg py-3 font-semibold hover:from-purple-700 hover:to-blue-700 transition transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
//               >
//                 <span>{isLoading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}</span>
//                 {!isLoading && <ArrowRight className="w-5 h-5" />}
//               </button>

//               <div className="relative my-6">
//                 <div className="absolute inset-0 flex items-center">
//                   <div className="w-full border-t border-gray-600"></div>
//                 </div>
//                 <div className="relative flex justify-center text-sm">
//                   <span className="px-4 bg-gray-800 text-gray-400">Or continue with</span>
//                 </div>
//               </div>

//               <div className="text-center pt-4">
//                 <p className="text-gray-400 text-sm">
//                   {isLogin ? "Don't have an account? " : "Already have an account? "}
//                   <button
//                     onClick={toggleMode}
//                     className="text-purple-400 hover:text-purple-300 font-semibold transition"
//                   >
//                     {isLogin ? 'Sign Up' : 'Sign In'}
//                   </button>
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Privacy Notice */}
//           <p className="text-center text-gray-500 text-xs mt-6">
//             By continuing, you agree to our Terms of Service and Privacy Policy
//           </p>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// };

// export default AuthPage;


// pages/auth/login.jsx
const data = new FormData(e.currentTarget)
const username = data.get('username')
const password = data.get('password')


setLoading(true)
setError(null)


// Use next-auth signIn with credentials provider
const res = await signIn('credentials', {
redirect: false,
username,
password
})


if (res.error) {
setError(res.error)
setLoading(false)
return
}


// get session to retrieve token
const sessionRes = await fetch('/api/auth/session')
const session = await sessionRes.json()


if (session?.accessToken) {
// store in Zustand
setAuth(session.accessToken, session.user)
setLoading(false)
// redirect to dashboard or users
router.push('/users')
} else {
setError('Login failed')
setLoading(false)
}



return (
<Grid container component="main" sx={{ height: '80vh' }} justifyContent="center" alignItems="center">
<Grid item xs={11} sm={8} md={5} component={Paper} elevation={6} square>
<Box sx={{ my: 4, mx: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
<LockOutlinedIcon />
</Avatar>
<Typography component="h1" variant="h5">Sign in</Typography>
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
<TextField margin="normal" required fullWidth id="username" label="Username" name="username" autoFocus />
<TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" />


{error && (
<Typography color="error" variant="body2">{error}</Typography>
)}


<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
{loading ? <CircularProgress size={20} /> : 'Sign In'}
</Button>


<Grid container>
<Grid item>
<a href="/auth/signup">Don't have an account? Sign Up</a>
</Grid>
</Grid>
</Box>
<Box sx={{ mt: 2 }}>
<Typography variant="caption">Demo credentials: <br/> username: <strong>kminchelle</strong> password: <strong>0lelplR</strong></Typography>
</Box>
</Box>
</Grid>
</Grid>
)
