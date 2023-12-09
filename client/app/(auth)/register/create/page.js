"use client";
import { useState, useEffect } from 'react';
import { BiCheck, BiChevronDown, BiLock } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";


const users = [
    {
      id: 1,
      name: 'HeRa',
      avatar: '/users.jpg',
    },
    {
      id: 2,
      name: 'HeRa Khan',
      avatar: '/user.jpg',
    },
];

export default function  Register() {
    const [refUsers, setRefUsers] = useState({});
    const [type, setType] = useState('');

    useEffect(() => {
        // Extracting the "ref" and "type" parameters from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const refParam = urlParams.get('ref');
        const typeParam = urlParams.get('type');

        // Finding the user whose ID matches the "ref" parameter
        const matchedUser = users.find(user => user.id === parseInt(refParam));

        // Setting the state with the matched user and type
        if (matchedUser) {
        setRefUsers(matchedUser);
        }

        // Setting the type state
        setType(typeParam);
    }, []);

    const [isChecked, setIsChecked] = useState(false);

    const [showPremium, setShowPremium] = useState(false);
    const [showStandard, setShowStandard] = useState(false);

    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    return (
        <>
            
            <div>
                {type === 'premium' ? (
                    <div className='md:hidden block'>
                        <div className='bg-green-500 text-white p-2 text-base flex items-center w-full'>
                            <BiLock className='mr-1' fontSize={30} />
                            Your data is encrypted. You register safely.
                        </div>
                        <div className='p-3 bg-[#fcebcc] relative'>
                            <h6 className="text-y font-semibold uppercase">PREMIUM</h6>
                            <del className="text-[#969696] text-md notranslate text-line-through">
                                EUR 279.00
                                <small className="text-muted font-normal">+VAT</small>
                            </del>
                            <span className="bg-rose-500 text-white">-20%</span>
                            <br/>
                            <span className="text-2xl font-semibold uppercase">
                                EUR 223.20
                                <small className="text-[#969696] font-normal">+VAT</small>
                            </span>
                            <button
                                    onClick={() => setShowPremium(!showPremium)}
                                className="absolute right-3 top-2"
                            >
                                <BiChevronDown className='fill-[#f29d00]' fontSize={30} />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='md:hidden block'>
                        <div className='bg-green-500 text-white p-2 text-base flex items-center w-full'>
                            <BiLock className='mr-1' fontSize={30} />
                            Your data is encrypted. You register safely.
                        </div>
                        <div className='p-3 bg-[#fcebcc] relative'>
                            <h6 className="text-y font-semibold uppercase">STANDARD</h6>
                            <del className="text-[#969696] text-md notranslate text-line-through">
                                EUR 199.00
                                <small className="text-muted font-normal">+VAT</small>
                            </del>
                            <span className="bg-rose-500 text-white">-20%</span>
                            <br/>
                            <span className="text-2xl font-semibold uppercase">
                                EUR 159.20
                                <small className="text-[#969696] font-normal">+VAT</small>
                            </span>
                            <small className="text-[#969696]">/ 1 year</small>
                            <button
                                onClick={() => setShowStandard(!showStandard)}
                                className="absolute right-3 top-2"
                            >
                                <BiChevronDown className='fill-[#f29d00]' fontSize={30} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {refUsers.name && (
                    <div>
                    <h3>User Name: {refUsers.name}</h3>
                    </div>
                )}
            </div>
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="flex flex-col md:flex-row my-8">
                    <div className="w-full md:w-2/3 bg-white mr-0 md:mr-6 p-6">
                        <div className="black mb-4 pb-4 border-b">
                            <h1 className="w-full md:w-72 text-lg font-semibold mb-3">
                                Basic information
                            </h1>
                            <p>
                                * All fields marked with an asterisk (*) are required
                            </p>
                        </div>
                        <div className="flex flex-col md:flex-row items-start justify-between">
                            <h1 className="w-full md:w-3/12 text-md font-semibold">
                                Basic information
                            </h1>
                            <div className="block space-y-3">
                                <div className="flex">
                                    <div className="w-full md:w-2/4 p-2 pt-0">
                                        <label className="w-full required mb-1">Name</label>
                                        <input
                                        className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        />
                                    </div>
                                    <div className="w-full md:w-2/4 p-2 pt-0">
                                        <label className="w-full required">Surname</label>
                                        <input
                                        className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full md:w-2/4 p-2">
                                        <label className="w-full required mb-1">Email address</label>
                                        <input
                                        className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        />
                                    </div>
                                    <div className="w-full md:w-2/4 p-2">
                                        <label className="w-full required">Password</label>
                                        <input
                                        className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="flex">
                                    <div className="w-full md:w-2/4 p-2">
                                        <label className="w-full">&nbsp;</label>
                                        <div className="relative w-full border outline-0">
                                            <select className="appearance-none outline-0 w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
                                                <option value="1">piece</option>
                                                <option value="2">truck</option>
                                                <option value="3">tonne</option>
                                                <option value="4">set</option>
                                                <option value="5">Refurbished</option>
                                                <option value="6">Used</option>
                                            </select>
                                            <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-2/4 p-2">
                                        <label className="w-full">Phone number</label>
                                        <input
                                        className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                        type="text"
                                        name="name"
                                        placeholder=""
                                        />
                                    </div>
                                </div>
                                <div className="w-full md:w-2/4 p-2">
                                    <label className="w-full required">Country</label>
                                    <div className="relative w-full border outline-0">
                                        <select className="appearance-none outline-0 w-full py-1 px-2 bg-white" name="whatever" id="frm-whatever">
                                            <option value="1">piece</option>
                                            <option value="2">truck</option>
                                            <option value="3">tonne</option>
                                            <option value="4">set</option>
                                            <option value="5">Refurbished</option>
                                            <option value="6">Used</option>
                                        </select>
                                        <div className="pointer-events-none absolute right-0 top-0 bottom-0 flex items-center px-2 text-gray-700 border-l">
                                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center p-2">
                                    <input
                                        className="border outline-0 h-5 w-5 mr-2"
                                        type="checkbox"
                                        name="name"
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                    />
                                    <label className='block'>I register as a company</label>
                                </div>
                                <div className="md:flex flex-col p-2">
                                    {isChecked && (
                                        <>
                                            <div className="flex">
                                                <div className="w-full md:w-2/4 p-2 pt-0">
                                                    <label className="w-full required mb-1">Company</label>
                                                    <input
                                                    className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                                    type="text"
                                                    name="name"
                                                    placeholder=""
                                                    />
                                                </div>
                                                <div className="w-full md:w-2/4 p-2 pt-0">
                                                    <label className="w-full required text-xs leading-2">EU Tax number or company registration number</label>
                                                    <input
                                                    className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                                    type="text"
                                                    name="name"
                                                    placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex">
                                                <div className="w-full md:w-2/4 p-2">
                                                    <label className="w-full required mb-1">Street, unit</label>
                                                    <input
                                                    className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                                    type="text"
                                                    name="name"
                                                    placeholder=""
                                                    />
                                                </div>
                                                <div className="w-full md:w-2/4 p-2">
                                                    <label className="w-full required">Postal code</label>
                                                    <input
                                                    className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                                    type="text"
                                                    name="name"
                                                    placeholder=""
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full md:w-2/4 p-2">
                                                <label className="w-full required mb-1">City</label>
                                                <input
                                                className="w-full p-1 border outline-0 dark:bg-gray-600 dark:text-white"
                                                type="text"
                                                name="name"
                                                placeholder=""
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="flex p-2">
                                    <label className="">NEGOTIABLE</label>
                                    <input
                                        className="border outline-0 border-slate-400 rounded h-5 w-5"
                                        type="checkbox"
                                        name="name"
                                        placeholder=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3">
                        {type === 'premium' ? (
                            <div className={`w-full md:block md:border-r ${showPremium ? 'block fixed inset-0 bg-white z-50 overflow-scroll' : 'hidden'}`}>
                                <div className='border bg-white p-4 space-y-1'>
                                    <button
                                        onClick={() => setShowPremium(!showPremium)}
                                        className='md:hidden block absolute right-4 top-4'
                                    >
                                        <svg  className='text-center inline text-black' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"></path></svg>
                                    </button>
                                    <h6 className="text-y font-semibold uppercase">PREMIUM</h6>
                                    <del className="text-[#969696] text-md notranslate text-line-through">
                                        EUR 279.00
                                        <small className="text-muted font-normal">+VAT</small>
                                    </del>
                                    <span className="bg-rose-500 text-white">-20%</span>
                                    <br/>
                                    <span className="text-2xl font-semibold uppercase">
                                        EUR 223.20
                                        <small className="text-[#969696] font-normal">+VAT</small>
                                    </span>
                                    <small className="text-[#969696]">/ 1 year</small>
                                    <p className="small text-[#969696]">
                                        These are net prices, which are subject to VAT rate in line with EU directive.
                                    </p>
                                    
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Unlimited number of inquiries to send.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Access to the wholesalers contact details.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Daily newsletter with the latest offers.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Offers from 150 countries, up to 90% off regular prices.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Possibility to publish purchase offers
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        An account to manage your settings, contacts and offers.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Access to the opinions about the wholesalers.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Access to the blacklist of wholesalers.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Listing unlimited number of offers- after a positive verification of your company
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Promoting your offers all across Europe.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Listing your company in Merkandi international catalogue.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Creation of a multilingual profile of your company
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Advanced statistics of your offers and your companys profile views.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Import/Export offers to CSV, XLS, XML files.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        The assistance of personal adviser.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className={`w-full md:block md:border-r ${showStandard ? 'block fixed inset-0 bg-white z-50 overflow-scroll' : 'hidden'}`}>
                                <div className='border bg-white p-4 space-y-1'>
                                    <button
                                        onClick={() => setShowStandard(!showStandard)}
                                        className='md:hidden block absolute right-4 top-4'
                                    >
                                        <svg  className='text-center inline text-black' stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg"><path d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z" fill="currentColor"></path></svg>
                                    </button>
                                    <h6 className="text-y font-semibold uppercase">STANDARD</h6>
                                    <del className="text-[#969696] text-md notranslate text-line-through">
                                        EUR 199.00
                                        <small className="text-muted font-normal">+VAT</small>
                                    </del>
                                    <span className="bg-rose-500 text-white">-20%</span>
                                    <br/>
                                    <span className="text-2xl font-semibold uppercase">
                                        EUR 159.20
                                        <small className="text-[#969696] font-normal">+VAT</small>
                                    </span>
                                    <small className="text-[#969696]">/ 1 year</small>
                                    <p className="small text-[#969696]">
                                        These are net prices, which are subject to VAT rate in line with EU directive.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Unlimited number of inquiries to send.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Access to the wholesalers contact details.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Daily newsletter with the latest offers.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Offers from 150 countries, up to 90% off regular prices.
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        Possibility to publish purchase offers
                                    </p>
                                    <p className='inline-flex'>
                                        <BiCheck className='fill-green-500' fontSize={30} />
                                        An account to manage your settings, contacts and offers.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Access to the opinions about the wholesalers.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Access to the blacklist of wholesalers.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Listing unlimited number of offers- after a positive verification of your company
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Promoting your offers all across Europe.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Listing your company in Merkandi international catalogue.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Creation of a multilingual profile of your company
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Advanced statistics of your offers and your companys profile views.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        Import/Export offers to CSV, XLS, XML files.
                                    </p>
                                    <p className='inline-flex'>
                                        <AiOutlineClose className='fill-rose-500 mr-1' fontSize={20} />
                                        The assistance of personal adviser.
                                    </p>                                
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}