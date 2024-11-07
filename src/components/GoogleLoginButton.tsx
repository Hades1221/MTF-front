import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { checkToken } from '../server/app';
import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from 'react';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string | null>(null);

    const login = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const token = tokenResponse.access_token;
            try {
                const data = await checkToken(token);
                if (data.email) {
                    setEmail(data.email); // שמירת המייל במצב
                    navigate('/users');
                }
            } catch (err) {
                console.error('Error during token verification:', err);
            }
        },
        onError: () => {
            console.log('Login Failed');
        },
    });

    useEffect(() => {
        if (email) {
            console.log("The user connected with the email: ", email);
        }
    }, [email]); 

    return (
        <div className="flex justify-center mt-6 w-full">
            <button
                onClick={() => login()}
                className="flex items-center justify-center w-full bg-white border border-gray-300 rounded-lg shadow hover:bg-gray-100 transition duration-300 p-2"
            >
                <div className="gsi-material-button-icon mr-3">
                    <FcGoogle className="text-2xl mr-2" />
                </div>
                <span className="text-gray-700">Sign in with Google</span>
            </button>
        </div>
    );
};

export default GoogleLoginButton;
