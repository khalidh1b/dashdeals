import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Settings, ShoppingBag, XCircle, Star, Moon, Sun, LogOut, LogIn } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/providers/auth-provider";
import { Link } from "react-router-dom";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import useToggleTheme from "@/shared/hooks/useToggleTheme";
import { Image } from '@/components/common/image/image';

const ProfileMenu = () => {
    const { user, logOut } = useContext(AuthContext);
    const { handleThemeChange, theme } = useToggleTheme();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logOut()
        .then(() => {
            //console.log(result);
        })
        .catch(() => {
            //console.log(error);
        })
    };
    
    return (
        <>
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
                <button
                    type="button"
                    className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-border bg-card transition-all hover:border-primary hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`${user?.displayName || "User"} menu - Click to open profile options`}
                >
                <Image
                    alt={user?.displayName || "profile"}
                    className="rounded-full"
                    width={40}
                    height={40}
                    src={
                    user?.photoURL ||
                    "https://res.cloudinary.com/dksiicemx/image/upload/v1729426352/default-profile_iwgfsb.avif" ||
                    "/placeholder.svg"
                    }
                />
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-64 rounded-xl border border-border bg-gray-300 p-0 shadow-lg">

                <div className="border-b border-border px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="relative h-12 w-12 flex-shrink-0">
                    <Image
                        alt={user?.displayName || "profile"}
                        className="rounded-full"
                        width={48}
                        height={48}
                        src={
                        user?.photoURL ||
                        "https://res.cloudinary.com/dksiicemx/image/upload/v1729426352/default-profile_iwgfsb.avif" ||
                        "/placeholder.svg"
                        }
                    />
                    </div>
                    <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold dark:text-white text-foreground">{user?.displayName || "Guest User"}</p>
                    <p className="text-xs text-muted-foreground">{user ? "Account" : "Not logged in"}</p>
                    </div>
                </div>
                </div>

                <DropdownMenuGroup className="py-2">
                <DropdownMenuItem asChild>
                    <Link
                        to="/settings"
                        className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted focus:bg-muted"
                    >
                    <Settings className="h-4 w-4 text-muted-foreground" />
                    <span className="text-white">Settings</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                    to="/myorders"
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted focus:bg-muted"
                    >
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-white">My Orders</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                    to="/my-cancellations"
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted focus:bg-muted"
                    >
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-white">Cancellations</span>
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                    <Link
                    to="/my-reviews"
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm transition-colors hover:bg-muted focus:bg-muted"
                    >
                    <Star className="h-4 w-4 text-muted-foreground" />
                    <span className="text-white">My Reviews</span>
                    </Link>
                </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="my-2 bg-border" />

                <DropdownMenuItem
                onClick={handleThemeChange}
                className="flex cursor-pointer items-center justify-between px-4 py-2.5 transition-colors hover:bg-muted focus:bg-muted"
                >
                <div className="flex text-white items-center gap-3">
                    {theme ? (
                    <Moon className="h-4 w-4 text-muted-foreground" />
                    ) : (
                    <Sun className="h-4 w-4 text-muted-foreground" />
                    )}
                    <Label htmlFor="theme-toggle" className="cursor-pointer text-sm">
                    {theme ? "Dark Mode" : "Light Mode"}
                    </Label>
                </div>
                <Switch id="theme-toggle" checked={theme} />
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2 bg-border" />

                {user ? (
                <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-destructive transition-colors hover:bg-destructive/10 focus:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4" />
                    <span>Log Out</span>
                </DropdownMenuItem>
                ) : (
                <DropdownMenuItem asChild>
                    <Link
                    to="/login"
                    className="flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm text-primary transition-colors hover:bg-muted focus:bg-muted"
                    >
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                    </Link>
                </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};

export default ProfileMenu;