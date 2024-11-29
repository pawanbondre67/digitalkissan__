// AuthForm.tsx
import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../Firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AuthForm: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  // const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const { email, password } = formData;
    const isValid =  email && password;
    setIsFormValid(Boolean(isValid));
    toast({
      title: "try login with google",
    })
  }, [formData,toast]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Switch between login and sign-up mode
  const onSwitchMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    if (isFormValid) {
        // Process form submission (e.g., make API request)
        console.log('Form Submitted', formData);
      } else {
        console.log('Form is invalid');
      }
    // Implement authentication logic here (login/signup with email & password)
    // Example: Firebase email/password authentication
    // setIsLoading(false);
  };

  // Handle Google sign-in
  const onGoogleSignIn = async () => {
    try {
       const result= await signInWithPopup(auth, googleProvider);
        
       const user = result.user;
  
      // Extract access token
    // const idToken = await user.getIdToken(); // Ensure to await this as it returns a promise
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', 'idToken');
  
    navigate('/');  
    window.location.reload();
      
    } catch (error) {
      alert(`Error: ${(error as Error)?.message}`);
    }
  }

 

  return (
    <section className="flex justify-center py-16">
      <div className="flex items-center justify-center w-[400px] px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-8">
        <div className="xl:mx-auto xl:w-full shadow-md p-4 xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            {isLoginMode ? 'Login Here' : 'Sign Up Here'}
          </h2>
          {/* {isLoading && <p>Loading...</p>} */}
          <p className="mt-2 text-center text-sm text-gray-600">
            {isLoginMode ? "Don't have an account?" : 'Already have an account?'}
            <button
              className="ml-1 bg-slate-200 rounded-md"
              onClick={onSwitchMode}
            >
              {isLoginMode ? 'Create a free account' : 'Login Here'}
            </button>
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8"
            method="POST"
            action="#"
          >
            <div className="space-y-5">
              <div>
                <label className="text-base font-medium text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-base font-medium text-gray-900">
                    Password
                  </label>
                  <a
                    className="text-sm font-semibold text-black hover:underline"
                    title="Forgot password?"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>
              <div>
                <button
                  className={`inline-flex w-full items-center justify-center rounded-md px-3.5 py-2.5 font-semibold leading-7 text-white ${
                    !isFormValid ? 'bg-gray-400' : 'bg-black hover:bg-black/80'
                  }`}
                  type="submit"
                  
                  disabled={isFormValid}
                >
                  Get started
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              type="button"
              onClick={onGoogleSignIn}
            >
              <span className="mr-2 inline-block">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-rose-500"
                >
                  <path
                    d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"
                  ></path>
                </svg>
              </span>
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
