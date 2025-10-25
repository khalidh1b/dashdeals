import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import { Link } from "react-router-dom";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useToggleTheme from "@/shared/hooks/useToggleTheme";
import { Image } from '@/components/common/image/image';

const ProfileMenu = () => {
    const { user, logOut } = useContext(AuthContext);
    const { handleThemeChange } = useToggleTheme();

    const handleLogout = () => {
        logOut()
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error);
        })
    };
    console.log(user);
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full bg-red-200">
                        <Image 
                            alt={user?.displayName}
                            className="rounded-full"
                            src={ user?.photoURL || 'https://res.cloudinary.com/dksiicemx/image/upload/v1729426352/default-profile_iwgfsb.avif'}
                        />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black text-white">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <Link to="/settings">
                        <DropdownMenuItem>
                                Settings
                        </DropdownMenuItem>
                    </Link>
                    <Link to="/myorders">
                        <DropdownMenuItem>
                                My Order
                        </DropdownMenuItem>
                        <Link to="/my-cancellations">
                            <DropdownMenuItem>
                                My Cancellations
                            </DropdownMenuItem>
                        </Link>
                        <Link to="/my-reviews">
                            <DropdownMenuItem>
                                My Reviews
                            </DropdownMenuItem>
                        </Link>
                    </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuItem checked={true} onClick={handleThemeChange}>
                    <div className="flex items-center space-x-2">
                        <Label htmlFor="airplane-mode">Theme</Label>
                        <Switch id="airplane-mode" />
                    </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                    {user ? 'Log out' : <Link to="/login">Please Login!</Link>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ProfileMenu;