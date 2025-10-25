import { Link, Outlet, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const Settings = () => {
    const location = useLocation().pathname;

    const links = [
        { to: '/settings/profile', label: 'Profile' },
        { to: '/settings/password&security', label: 'Password & Security' },
        { to: '/settings/appearance', label: 'Appearance' },
        { to: '/settings/notifications', label: 'Notifications' },
        { to: '/settings/display', label: 'Display' }
    ];

    return (
        <>        
        <div className='border-2 rounded-md md:px-9 px-3 py-10'>
            <h2 className='text-[#FAFAFA] text-2xl work-sans font-semibold'>Settings</h2>
            <p className='text-[#A1A1AA] text-base pb-5 font-normal'>Manage your account settings and set e-mail preferences.</p>
            <hr className='border-t mb-4 border-[#27272A]'/>
            <div className='md:flex items-start'>
                <nav className='grid gap-2 mb-10 md:mb-0 work-sans w-3/12'>
                    {
                        links.map((link) => (
                            <Link key={link.label} to={link.to} className={clsx('py-2 pl-4 rounded-md font-medium', location === link.to && 'bg-[#27272A]')}>{link.label}</Link>
                        ))
                    }
                </nav>
                <Outlet/>
            </div>
        </div>        
        </>
    );
};

export default Settings;