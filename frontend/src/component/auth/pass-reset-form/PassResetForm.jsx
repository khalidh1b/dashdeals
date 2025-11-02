import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import PropTypes from 'prop-types';
import useForgetPass from "@/features/auth/hooks/useForgetPass";
import { useState } from "react";

const PassResetForm = () => {
    const [resetEmail, setResetEmail] = useState('');
    const { handleForgetPass } = useForgetPass();
    
    return (
        <>
            <Dialog>
                    <DialogTrigger asChild>
                        <p className="mb-8 pt-1 text-red-700 text-[14px] cursor-pointer hover:text-red-800 transition-colors">forget password</p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                            Enter email address for resetting your password. A password reset email will be sent to your email address.
                        </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">
                                Email
                            </Label>
                            <Input 
                                id="reset-email" 
                                className="col-span-3"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                            />
                        </div>
                        </div>
                        <DialogFooter>
                        <Button 
                            type="submit" 
                            onClick={() => handleForgetPass(resetEmail)}
                        >
                            Reset
                        </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
        </>
    );
};

PassResetForm.propTypes = {
    handleForgetPass: PropTypes.func.isRequired
};

export default PassResetForm;
