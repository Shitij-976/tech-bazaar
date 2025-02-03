import { Link } from 'react-router-dom';
import { LuSendHorizonal } from "react-icons/lu";
import { FaFacebookF } from "react-icons/fa";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
const Footer = () => {
    return (
        <div className='bg-black text-white'>
            <div className='grid grid-cols-4'>
                <div className='flex flex-col gap-1 m-1 p-1'>
                    <span className='font-bold text-lg'>Tech Bazaar</span>
                    <span>Subscribe Now</span>
                    <span>Get 10% off on your first order!</span>
                    <div className='flex outline rounded w-52'>
                        <input className="bg-black outline-none p-1" type="email" placeholder="Enter your email" />
                        <a href="mailto:techbazaar2025@gmail.com"><LuSendHorizonal className='mt-2'/></a>
                    </div>
                    
                    <div className='flex mt-1'>
                        <div className='hover:bg-red-500 rounded-full'><Link to="https://www.facebook.com/share/77wPKKHPbhiJtyMi/?mibextid=qi2Omg"><FaFacebookF className="m-1 p-1" size={30}/></Link></div>
                        <div className='hover:bg-red-500 rounded-full'><Link to="https://x.com/TechBazaar2025?t=WkQZy0CHM7ImWD2YAU7Daw&s=08"><CiTwitter className="m-1 p-1" size={30}/></Link></div>
                        <div className='hover:bg-red-500 rounded-full'><Link to="https://www.instagram.com/techbazaar2025?igsh=cGc3aGRmMzRyc25t"><FaInstagram className="m-1 p-1" size={30}/></Link></div>
                        <div className='hover:bg-red-500 rounded-full'><Link to="https://youtube.com/@techbazaar2025?si=6YhKNWAoVp62zLZ_"><CiYoutube className="m-1 p-1" size={30}/></Link></div>
                    </div>

                </div>
                <div className='flex flex-col gap-1 m-1 p-1'>
                    <span className='font-bold text-lg'>Support</span>
                    <span>Address:Remote</span>
                    <span>techbazaar2025@gmail.com</span>
                    <span>+91 9999999999</span>
                </div>
                <div className='flex flex-col gap-1 m-1 p-1'>
                    <span className='font-bold text-lg'>Account</span>
                    <span><Link to="/account">My Account</Link></span>
                    <span><Link to="/login">Login</Link> / <Link to="/sign_up">Register</Link></span>
                    <span><Link to={'/products'}>Shop</Link></span>
                </div>
                <div className='flex flex-col gap-1 m-1 p-1'>
                    <span className='font-bold text-lg'>Quick Link</span>
                    <span><Link to="/privacy">Privacy Policy</Link></span>
                    <span><Link to="/refund">Refund Policy</Link></span>
                    <span><Link to="/shipping">Shipping Policy</Link></span>
                    <span><Link to="/term">Terms Of Use</Link></span>
                    <span><Link to="/faq">FAQ</Link></span>
                </div>
                <div></div>
            </div>
            <div className='flex justify-center'>
                © 2024 Company, Inc. All rights reserved.
            </div>
        </div>
    )
}

export default Footer