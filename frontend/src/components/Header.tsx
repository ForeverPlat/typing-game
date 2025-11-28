import { useNavigate } from 'react-router-dom'
import '../styles/header.css'
import { isLoggedIn } from '../../utils/isLoggedIn'
import { useEffect, useState } from 'react';
import LogoutButton from './LogoutButton';
import LeaderboardButton from './LeaderboardButton';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const check = async () => {
            const res = await isLoggedIn();
            setLoggedIn(res);
        };
        check();
  }, []);

    const handleLogoClick = () => {
        navigate('/');
    }

    // will need to have some sort of global isLoggedin state or something?
    // idk if thats possible tho
    const handleProfileClick = () => {
        // if not logged in
        if (!loggedIn) {
            navigate('/auth');
            return
        }
        navigate('/profile')
    }

  return (
    <header className="header">

                {/* <!-- left side of header --> */}
                
                <div className="logo" onClick={handleLogoClick}>

                    {/* <!-- curly brackets --> */}
                    {/* <svg className="logo-image" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier"> 
                            <path fill="currentColor" d="M2.1 3.1c0.2 1.3 0.4 1.6 0.4 2.9 0 0.8-1.5 1.5-1.5 1.5v1c0 0 1.5 0.7 1.5 1.5 0 1.3-0.2 1.6-0.4 2.9-0.3 2.1 0.8 3.1 1.8 3.1s2.1 0 2.1 0v-2c0 0-1.8 0.2-1.8-1 0-0.9 0.2-0.9 0.4-2.9 0.1-0.9-0.5-1.6-1.1-2.1 0.6-0.5 1.2-1.1 1.1-2-0.3-2-0.4-2-0.4-2.9 0-1.2 1.8-1.1 1.8-1.1v-2c0 0-1 0-2.1 0s-2.1 1-1.8 3.1z"></path> 
                            <path fill="currentColor" d="M13.9 3.1c-0.2 1.3-0.4 1.6-0.4 2.9 0 0.8 1.5 1.5 1.5 1.5v1c0 0-1.5 0.7-1.5 1.5 0 1.3 0.2 1.6 0.4 2.9 0.3 2.1-0.8 3.1-1.8 3.1s-2.1 0-2.1 0v-2c0 0 1.8 0.2 1.8-1 0-0.9-0.2-0.9-0.4-2.9-0.1-0.9 0.5-1.6 1.1-2.1-0.6-0.5-1.2-1.1-1.1-2 0.2-2 0.4-2 0.4-2.9 0-1.2-1.8-1.1-1.8-1.1v-2c0 0 1 0 2.1 0s2.1 1 1.8 3.1z"></path> 
                        </g>
                    </svg> */}

                    <svg className="logo-image" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M7 7L6 7C4.89543 7 4 7.89543 4 9L4 10.4721C4 10.7956 3.81722 11.0914 3.52786 11.2361V11.2361C2.89835 11.5508 2.89835 12.4492 3.52786 12.7639V12.7639C3.81722 12.9086 4 13.2044 4 13.5279L4 15C4 16.1046 4.89543 17 6 17L7 17" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M17 7L18 7C19.1046 7 20 7.89543 20 9L20 10.4721C20 10.7956 20.1828 11.0914 20.4721 11.2361V11.2361C21.1017 11.5508 21.1017 12.4492 20.4721 12.7639V12.7639C20.1828 12.9086 20 13.2044 20 13.5279L20 15C20 16.1046 19.1046 17 18 17L17 17" stroke="#323232" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                        </g>
                    </svg>

                    <div className="logo-text">
                        println
                    </div>
                </div>
        

                {/* <!-- right side of header --> */}
                <div className="header-icons">

                    {loggedIn && <LogoutButton />}
                    <LeaderboardButton />

                    <svg className="profile-button" id="profile-button" onClick={handleProfileClick} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                        <g id="SVGRepo_iconCarrier">
                            <path d="M12 11.796C14.7189 11.796 16.9231 9.60308 16.9231 6.89801C16.9231 4.19294 14.7189 2.00005 12 2.00005C9.28106 2.00005 7.07692 4.19294 7.07692 6.89801C7.07692 9.60308 9.28106 11.796 12 11.796Z" fill="currentColor"></path> 
                            <path d="M14.5641 13.8369H9.4359C6.46154 13.8369 4 16.2859 4 19.245C4 19.9593 4.30769 20.5716 4.92308 20.8777C5.84615 21.3879 7.89744 22.0001 12 22.0001C16.1026 22.0001 18.1538 21.3879 19.0769 20.8777C19.5897 20.5716 20 19.9593 20 19.245C20 16.1838 17.5385 13.8369 14.5641 13.8369Z" fill="currentColor"></path>
                        </g>
                    </svg>
                </div>

            </header>
  )
}

export default Header