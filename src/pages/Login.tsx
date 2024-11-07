import React, { useState,useEffect } from 'react';
import { checkEmail } from '../server/app'; 
import { emailValidation } from '../validation/userValidation';
import { useNavigate } from 'react-router-dom';
import {gapi} from  'gapi-script'
import GoogleLoginButton from '../components/GoogleLoginButton';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const start = () => {
          gapi.client.init({
            clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            scope: 'email',
          }).then(() => {
            console.log("GAPI client initialized.");
          }).catch((error: any) => {
            console.error("Error initializing GAPI client:", error);
          });
        };
        gapi.load('client:auth2', start);
      }, []);
      

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null); 
    
        if (!emailValidation.pattern.value.test(email)) {
            setError(emailValidation.pattern.message);
            setLoading(false);
            return;
        }
    
        try {
            const result = await checkEmail({ email });
            console.log('Response from server:', result);
    
            if (result.exists) {
                console.log('Email exists, navigating to OTP page.');
                localStorage.setItem('email', email); // Store email for OTP page
                navigate('/login/otp');
            } else {
                setError('Email not found.');
            }
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setError('Email not found.');
            } else {
                console.error('Error checking email:', error);
                setError('Failed to check email. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center p-4" style={{ backgroundImage: `url('../../assets/bg.png')` }}>
            <div className="bg-opacity-70 bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg">
                <div className="flex justify-center mb-8">
                    <img 
                        src="../../assets/logo-MTF.png" 
                        alt="logo mtf" 
                        className="h-28 md:h-36 lg:h-48 transition-transform duration-300 hover:scale-105 drop-shadow-lg"
                    />
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="email" className="block text-white text-lg font-semibold mb-3">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
                    </div>
                   
                    <div className="flex flex-col space-y-4">
                        <button
                            type="submit"
                            className="bg-teal-500 text-white w-full px-4 py-3 rounded-lg hover:bg-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Send Verification Code'}
                        </button>
                    </div>
                </form>

                <div className="mt-8 flex items-center justify-center">
                    <span className="w-1/4 border-b border-gray-400"></span>
                    <span className="text-gray-300 mx-3">or</span>
                    <span className="w-1/4 border-b border-gray-400"></span>
                </div>

                <GoogleLoginButton/>
            </div>
        </div>
    );
};

export default Login;