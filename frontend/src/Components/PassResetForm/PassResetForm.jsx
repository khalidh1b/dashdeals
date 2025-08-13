import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";
import PropTypes from 'prop-types';

const PassResetForm = ({ handleForgetPass }) => {
    return (
        <>
            <Dialog>
                    <DialogTrigger asChild>
                        <p className="mb-8 pt-1 text-[#DB4444] text-[14px] cursor-pointer">forget password</p>
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
                            <Input id="reset-email" className="col-span-3"/>
                        </div>
                        </div>
                        <DialogFooter>
                        <Button 
                            type="submit" 
                            onClick={() => handleForgetPass()}
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