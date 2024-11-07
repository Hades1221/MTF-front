import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOtp, sendOtp } from '../server/app'; // Adjust the path based on your setup

const Otp: React.FC = () => {
    const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
    const [error, setError] = useState<string | null>(null);
    const [resendAvailable, setResendAvailable] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(30);
    const [isShaking, setIsShaking] = useState<boolean>(false);
    const [isInputDisabled, setIsInputDisabled] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const firstEmptyIndex = otp.findIndex((digit) => digit === '');
        const focusIndex = firstEmptyIndex !== -1 ? firstEmptyIndex : otp.length - 1;

        if (inputRefs.current[focusIndex]) {
            inputRefs.current[focusIndex]?.focus();
        }

        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(intervalId);
                    setResendAvailable(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, [otp]);

    const handleOtpChange = (value: string, index: number) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);
            setError(null); // Reset error when the user types a valid input
            setIsInputDisabled(false); // Re-enable input if it was disabled

            if (value && index < 5) {
                const nextInput = inputRefs.current[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace') {
            if (otp[index] === '') {
                if (index > 0) {
                    const prevInput = inputRefs.current[index - 1];
                    if (prevInput) {
                        prevInput.focus();
                        const newOtp = [...otp];
                        newOtp[index - 1] = '';
                        setOtp(newOtp);
                    }
                }
            } else {
                const newOtp = [...otp];
                newOtp[index] = '';
                setOtp(newOtp);
            }
            setError(null); // Reset error when the user deletes a value
        } else if (e.key === 'Enter') {
            if (otp.every((digit) => digit !== '')) {
                handleOtpSubmit(e);
            }
        }
    };

    const handleOtpSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const otpCode = otp.join(''); // Combine the OTP array into a string

        try {
            const result = await verifyOtp({ email: localStorage.getItem('email')!, otpCode });
            console.log('OTP verified successfully:', result);

            if (result.token) {
                // Store the token and navigate to the users page
                localStorage.setItem('token', result.token);
                navigate('/users');
            }
        } catch (error: any) {
            console.error('Error verifying OTP:', error);
            setError('Invalid or expired OTP.');
            setIsShaking(true); // Trigger shaking animation
            setIsInputDisabled(true); // Disable input fields to hide the cursor

            // Stop shaking animation after 500ms
            setTimeout(() => {
                setIsShaking(false);
                setIsInputDisabled(false); // Re-enable input after the shaking stops

                // Clear the error after shaking animation
                setError(null);

                // Focus on the last input after clearing error
                const focusIndex = otp.length - 1;
                if (inputRefs.current[focusIndex]) {
                    inputRefs.current[focusIndex]?.focus();
                }
            }, 500);
        }
    };

    const handleResendOtp = async () => {
        setResendAvailable(false);
        setTimer(30);
        setError(null);

        const email = localStorage.getItem('email'); // Retrieve the email from localStorage
        if (email) {
            await sendOtp({ email });
            console.log('OTP resent successfully');
        } else {
            setError('Email not found. Please re-enter your email.');
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

                <form onSubmit={handleOtpSubmit}>
                    <div className={`mb-3 flex justify-center space-x-2 ${isShaking ? 'animate-shake' : ''}`}>
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                ref={(el) => inputRefs.current[index] = el}
                                type="text"
                                maxLength={1}
                                className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg bg-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 ${error ? 'border-red-500' : 'border-gray-600'}`}
                                value={digit}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                disabled={isInputDisabled} // Disable the input fields when there is an error
                            />
                        ))}
                    </div>

                    {error && (
                        <p className="text-center text-red-500 text-lg mt-2 animate-shake">
                            {error}
                        </p>
                    )}

                    <div className="flex flex-col space-y-4 mt-6">
                        <button
                            type="submit"
                            className="bg-teal-600 text-white w-full px-4 py-3 rounded-lg hover:bg-teal-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                        >
                            Verify OTP
                        </button>

                        <button
                            type="button"
                            className={`w-full px-4 py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl ${resendAvailable ? 'bg-gray-600 hover:bg-gray-700 text-white' : 'bg-gray-500 text-gray-300 cursor-not-allowed'
                                }`}
                            disabled={!resendAvailable}
                            onClick={handleResendOtp}
                        >
                            {resendAvailable ? 'Didn’t receive OTP? Resend' : `Please wait ${timer} seconds to resend`}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Otp;
