import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from '@/hooks/useAxiosSecure.js';
import useAuth from '@/hooks/useAuth.js';

const usePasswordChange = () => {
    const [changingPass, setChangingPass] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        const currentPass = currentPassword;
        const newPass = newPassword;
        const confirmNewPass = confirmPassword;
        
        const formData = new FormData();
        formData.append('currentPass',currentPass)
        formData.append('newPass',newPass)
        formData.append('confirmNewPass',confirmNewPass)

        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);

        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't matched");
            return;
        }

        try {
            setChangingPass(true);
            const response = await axiosSecure.patch(`/users/updatepass/${user?.email}`, formDataObject);
            
            if(response.data.modifiedCount > 0) {
                toast.success('password updated successfull!');
            } else if(!response.data.success) {
                toast.error('current password was incorrect');
            }

        } catch (error) {
            console.log(error);
        } finally {
            setChangingPass(false);
        }
    };
    
    return { handleSubmit, changingPass, setNewPassword, setConfirmPassword, newPassword, confirmPassword, setCurrentPassword, currentPassword };
};

export default usePasswordChange;