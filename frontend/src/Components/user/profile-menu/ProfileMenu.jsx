import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger 
} from "@/Components/ui/dropdown-menu";
import { useContext } from "react";
import { AuthContext } from "@/providers/auth-provider";
import { Link } from "react-router-dom";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useToggleTheme from "@/hooks/ui/useToggleTheme";


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
                        <img 
                            alt={user?.displayName}
                            loading="lazy"
                            src={ user?.photoURL || 'https://res.cloudinary.com/dksiicemx/image/upload/v1729426352/default-profile_iwgfsb.avif'}
                        />
                        </div>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <Link to="/settings">
                        <DropdownMenuItem>
                                Settings
                            <DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <Link to="/myorders">
                        <DropdownMenuItem>
                                My Order
                            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link>My Cancellations</Link>
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
                        <Link>
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
                    {user ? 'Log out' : <Link to="/login">Please Login!</Link>}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};

export default ProfileMenu;