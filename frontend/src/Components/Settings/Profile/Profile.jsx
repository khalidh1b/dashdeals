import { useEffect, useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/Components/ui/card";
import { User, Mail, Phone, MapPin, Loader2 } from "lucide-react";
import useAuth from '../../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [imgUploading, setImgUploading] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [savingChanges, setSavingChanges] = useState(false);
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            profilePic: userProfile.profilePic,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            email: user.email,
            phone: user?.phoneNumber || userProfile.phone,
            address: userProfile.address
        }
    });
    const { firstName, lastName, email, address, phone, profilePic } = userProfile;

    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const handleImageUpload = async (event) => {
        try {
            setImgUploading(true);
            const file = event.target.files?.[0]
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'user-profile-dashdeals');
            const response = await axiosPublic.post('https://api.cloudinary.com/v1_1/dksiicemx/image/upload', formData);
            await setValue('profilePic', response?.data?.secure_url);
            if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setProfileImage(reader.result)
            }
            reader.readAsDataURL(file)
            }
        } catch (error) {
            console.error('error in profile', error);
        } finally {
            setImgUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            setSavingChanges(true);
            const res = await axiosSecure.patch(`/users/update-user-profile/${user?.email || user.providerData[0]?.email}`, data)
            console.log(res);
            if(res.data.modifiedCount > 0) {
                toast.success('Profile Updated Successfully!', {
                    duration: 3000
                })
            }
        } catch (error) {
            console.error('error while updating profile',error);
        } finally {
            setSavingChanges(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosSecure.get(`/users/userprofile/${user?.email}`);
                setUserProfile(response.data);
                // console.log(response)
            } catch (error) {
                console.error('error while fetching user', error);
            }
        };
        fetchUser();
    }, [axiosSecure, user?.email]);

    return (
        <div className="container mx-auto">
        <Toaster/>
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
            <CardDescription>Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
            <div className="flex items-center space-x-4">
                <Avatar className="w-24 h-24">
                <AvatarImage src={profileImage || profilePic} alt="Profile picture" />
                <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                <h3 className="text-lg font-medium">Profile Picture</h3>
                <p className="text-sm text-muted-foreground">Update your profile picture</p>
                <div className="flex items-center relative">
                    <Input type="file" accept="image/*" onChange={handleImageUpload} className="mt-2" disabled={!isEditing || imgUploading} />
                    {imgUploading && <Loader2 className="animate-spin absolute right-2 bottom-2"/>}
                </div>
                </div>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                    <Input id="firstName" placeholder={firstName} {...register('firstName')} disabled={!isEditing} />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <div className="relative">
                    <Input id="lastName" placeholder={lastName} {...register('lastName')} disabled={!isEditing} />
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Input id="email" type="email" placeholder={email} {...register('email')} disabled={!isEditing} />
                    <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                    <Input id="phone" type="tel" placeholder={phone || 'null'} {...register('phone')} disabled={!isEditing} />
                    <Phone className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                </div>
                </div>

                <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                    <Textarea id="address" placeholder={address || "123 Main St, City, State, ZIP"} {...register('address')} disabled={!isEditing} />
                    <MapPin className="absolute right-3 top-3 text-gray-400" size={18} />
                </div>
                </div>
            </div>
            </CardContent>
            <CardFooter className="flex justify-between">
            {isEditing ? (
                <>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                </Button>
                <Button onClick={() => {
                    handleSubmit((data) => {
                        onSubmit(data);
                        setIsEditing(false);
                    })();
                    }}
                    disabled={savingChanges}
                    >
                        Save Changes
                        {savingChanges && <>Saving Changes <Loader2 className="animate-spin"/></>}
                </Button>
                </>
            ) : (
                <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
            )}
            </CardFooter>
        </Card>
    </div>
    );
};

export default Profile;