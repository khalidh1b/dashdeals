import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";
import { Label } from '@/Components/ui/label';
import { Switch } from '@/Components/ui/switch';

const ProfileMenu = () => {
    const {user, logOut} = useContext(AuthContext);
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("dashdeals-theme") === "dark";
    });

    const handleThemeChange = () => {
        setTheme(!theme);
        localStorage.setItem("dashdeals-theme", !theme ? "dark" : "light");
    }
    
    const handleLogout = () => {
        logOut()
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    };

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);
    return (
        <>
            { user && <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                            <img alt="Tailwind CSS Navbar component" src={ user.photoURL || 'https://res.cloudinary.com/dksiicemx/image/upload/v1729426352/default-profile_iwgfsb.avif'}/>
                            </div>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link to="/account/manageMyAccount">
                                Manage My Account
                            </Link>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to="/myorders">
                                My Order
                            </Link>
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link to="/myCancellations">My Cancellations</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                                <DropdownMenuItem>Email</DropdownMenuItem>
                                <DropdownMenuItem>Message</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>More...</DropdownMenuItem>
                            </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                        <DropdownMenuItem>
                            <Link to="/myReviews">
                                My Reviews
                            </Link>
                            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem checked={true} onClick={handleThemeChange}>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="airplane-mode">Theme</Label>
                            <Switch id="airplane-mode" />
                        </div>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout}>
                        Log out
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    </DropdownMenu>}
        </>
    );
};

export default ProfileMenu;