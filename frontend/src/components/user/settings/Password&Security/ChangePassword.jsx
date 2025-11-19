import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import usePasswordChange from "@/features/auth/hooks/usePasswordChange";
import PropTypes from 'prop-types';

const ChangePassword = () => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { 
      handleSubmit, 
      changingPass, 
      setConfirmPassword, 
      setNewPassword, 
      confirmPassword, 
      newPassword, 
      setCurrentPassword, 
      currentPassword 
    } = usePasswordChange();

    return (
        <>
        <Toaster/>
        <Card>
        <Header/>
        <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <PasswordInput
            id="current-password"
            label="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            showPassword={showCurrentPassword}
            toggleShowPassword={() => setShowCurrentPassword(!showCurrentPassword)}
          />
          <PasswordInput
            id="new-password"
            label="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            showPassword={showNewPassword}
            toggleShowPassword={() => setShowNewPassword(!showNewPassword)}
          />
          <PasswordInput
            id="confirm-password"
            label="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            toggleShowPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          />
          {confirmPassword && newPassword !== confirmPassword && (
            <p className="text-sm text-destructive mt-1">Passwords do not match</p>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={changingPass}>
            {changingPass ? "Updating..." : "Update Password"}
          </Button>
        </CardFooter>
      </form>
        </Card>
        </>
    );
};

export default ChangePassword;

const PasswordInput = ({ 
    id, 
    label, 
    value, 
    onChange, 
    showPassword, 
    toggleShowPassword 
}) => {
    return (
        <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <div className="relative">
        <Input
            id={id}
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            required
        />
        <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full px-3"
            onClick={toggleShowPassword}
        >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
        </div>
    </div>
    )
};

const Header = () => {
    return (
        <CardHeader>
            <CardTitle>Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure.</CardDescription>
        </CardHeader>
    )
};

PasswordInput.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string, 
    value: PropTypes.string, 
    onChange: PropTypes.func, 
    showPassword: PropTypes.bool, 
    toggleShowPassword: PropTypes.func 
};