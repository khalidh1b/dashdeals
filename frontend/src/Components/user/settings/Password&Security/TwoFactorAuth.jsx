import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Switch } from "@/Components/ui/switch";
import { Label } from "@/Components/ui/label";
import { Input } from "@/Components/ui/input";
import { AlertCircleIcon, SmartphoneIcon, MailIcon, CheckIcon, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PropTypes from 'prop-types';
import useAxiosSecure from '@/hooks/access/useAxiosSecure';
import useAuth from "@/hooks/auth/useAuth";
import { app} from "@/firebase/firebase.config";
import { RecaptchaVerifier, getAuth, signInWithPhoneNumber } from "firebase/auth";
import { useQuery } from '@tanstack/react-query';

const auth = getAuth(app);

const TwoFactorAuth = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(false);
    const [setupStep, setSetupStep] = useState("method");
    const [selectedMethod, setSelectedMethod] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [qrCode, setQrCode] = useState("");
    const [otp, setOtp] = useState("");
    const [secret, setSecret] = useState("");
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const generateTotp = useCallback(async () => {
        const response = await axiosSecure.post(`/auth/generate-totp/${user?.email}`)
        console.log(response);
        setQrCode(response.data.qrCode);
        setSecret(response.data.secret);
    }, [axiosSecure, user?.email]);

    useEffect(() => {
        if(selectedMethod === 'app') {
            generateTotp();
        }
    }, [generateTotp, selectedMethod]);

    const handleToggle2FA = (checked) => {
        if (checked) {
          // Start setup process
          setSetupStep("method")
        } else {
          // Disable 2FA
          setIsLoading(true)
          setTimeout(() => {
            setIs2FAEnabled(false)
            setIsLoading(false)
            toast.error("Two-factor authentication disabled. Your account is now less secure. We recommend enabling 2FA for better security.",
            )
          }, 1000)
        }
    }
    
    const handleSelectMethod = (method) => {
        console.log('calling', method);
        setSelectedMethod(method)
        setSetupStep("setup")
    };
    
    const handleVerifyCode = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        const verifyTotp = async () => {
            const response = await axiosSecure.post('/auth/verify-totp', { token: otp, secret })
            console.log(response);
            if(response.data.valid) {
                setSetupStep('complete');
            }
        };
        verifyTotp();
        const save2FaStats = async () => {
            const status2Fa = { status2Fa: true };
            const save2FaStat = await axiosSecure.patch(`/auth/save2fa-status/${user?.email}`, status2Fa);
            console.log(save2FaStat);
        }
        save2FaStats();
    };
    
    const handleCancel = () => {
        setSetupStep("method")
        setVerificationCode("")
    };

    const {data: status2Fa } = useQuery({
        queryKey: ['status2Fa', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/auth/2fa-status/${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("access-token")}`,
                },
            });
            return res.data;
        },
        enabled: !!user?.email
    })
    useEffect(() => {
        if(status2Fa) {
            setSetupStep('complete')
        } else {
            setIs2FAEnabled(false);
        }
    }, [status2Fa])
    console.log(status2Fa);

    return (
        <>
        <Card>
        <Header 
            handleToggle2FA={handleToggle2FA}
            is2FAEnabled={is2FAEnabled}
            isLoading={isLoading}
            setupStep={setupStep}
        />
        <CardContent>
            {!is2FAEnabled && setupStep === "method" && (
            <div className="space-y-4">
                <SecurityMessage/>
                <Select2FA handleSelectMethod={handleSelectMethod}/>
            </div>
            )}

            {setupStep === "setup" && (
            <div className="space-y-6">
                {selectedMethod === "app" && (
                    <AuthenticatorApp
                        qrCode={qrCode}
                        handleCancel={handleCancel} 
                        setSetupStep={setSetupStep}
                    />
                )}

                {selectedMethod === "sms" && (
                    <SmsVerification 
                        handleCancel={handleCancel} 
                        setSetupStep={setSetupStep}
                    />
                )}
            </div>
            )}

            {setupStep === "verify" && (
                <TwoFaVerify 
                    handleCancel={handleCancel} 
                    handleVerifyCode={handleVerifyCode} 
                    isLoading={isLoading} 
                    selectedMethod={selectedMethod}
                    setOtp={setOtp}
                    otp={otp}
                />
            )}

            {setupStep === "complete" && (
                <Complete2FVerify selectedMethod={selectedMethod}/>
            )}
        </CardContent>
        </Card>
        </>
    )
};

export default TwoFactorAuth;


const Header = ({ is2FAEnabled, handleToggle2FA, isLoading, setupStep }) => {
    return (
        <CardHeader>
            <div className="flex items-center justify-between">
            <div>
                <CardTitle>Two-Factor Authentication (2FA)</CardTitle>
                <CardDescription className="mt-1">
                Add an extra layer of security to your account by requiring a verification code.
                </CardDescription>
            </div>
            <Switch
                checked={is2FAEnabled}
                onCheckedChange={handleToggle2FA}
                disabled={isLoading || (setupStep !== "method" && setupStep !== "complete")}
            />
            </div>
        </CardHeader>
    )
};

const SecurityMessage = () => {
    return (
        <div className="rounded-lg border p-3 bg-amber-50 border-amber-200 flex gap-3">
            <AlertCircleIcon className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
            <div>
                <h4 className="font-medium text-amber-800">Your account is not fully protected</h4>
                <p className="text-sm text-amber-700 mt-1">
                Two-factor authentication adds an additional layer of security to your account by requiring more than
                just a password to sign in.
                </p>
            </div>
        </div>
    )
};

const Select2FA = ({ handleSelectMethod }) => {
    return (
        <div className="grid gap-4 mt-6">
            <h3 className="font-medium text-lg">Select a 2FA method</h3>
            <div className="grid gap-4 sm:grid-cols-2">
            <Select2faCard
                icon={SmartphoneIcon}
                title="Authenticator App"
                description="Use an app like Google Authenticator or Authy to get verification codes."
                onSelect={() => handleSelectMethod("app")}
                disabled={false}
            />
            <Select2faCard
                icon={MailIcon}
                title="SMS Verification"
                description="Receive verification codes via text message on your phone."
                onSelect={() => handleSelectMethod("sms")}
                disabled={true}
            />
            </div>
        </div>
    )
};

const Select2faCard = ({ icon: Icon, title, description, onSelect, disabled }) => {
    return (
        <Card 
            className={`cursor-pointer disabled hover:border-primary ${disabled && 'pointer-events-none'} `} 
            onClick={onSelect}
        >
            <CardHeader className="pb-2">
                <Icon className="h-8 w-8 text-primary" />
                <CardTitle className="text-base mt-2">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    )
};

const AuthenticatorApp = ({ 
    setSetupStep, 
    handleCancel, 
    qrCode, 
    setOtp 
}) => {
    return (
        <div className="space-y-4">
            <h3 className="font-medium">Set up authenticator app</h3>
            <ol className="list-decimal ml-4 space-y-3">
            <li>Download and install an authenticator app like Google Authenticator or Authy.</li>
            <li>Open the app and scan the QR code below or enter the setup key manually.</li>
            <li>Enter the 6-digit verification code from the app to verify setup.</li>
            </ol>
            <div className="flex justify-center my-6">
            <div className="border p-4 inline-block mb-10">
                <img
                    src={qrCode}
                    alt="QR Code for authenticator app"
                    className="h-48 w-48"
                    loading="lazy"
                />
            </div>
            </div>
            <Button onClick={() => setSetupStep('verify')}>Continue</Button>
            <Button variant="ghost" onClick={handleCancel}>
                Cancel
            </Button>
        </div>
    )
};

const SmsVerification = ({ setSetupStep, handleCancel }) => {
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);
    // const auth = getAuth();
    const [loading, setLoading] = useState(false);

    const sendOtp = async () => {
        setLoading(true);
        console.log('auth,phone,recapcha', auth, phone);
        const appVerifier = new RecaptchaVerifier("recapcha-container", {
            size: "invisible",
            callback: () => {
                console.log("Recaptcha solved!");
            },
        }, auth);        
        console.log('recapcha', appVerifier);

        if(appVerifier || !appVerifier) return;
        
        const result = await signInWithPhoneNumber(auth, phone, appVerifier);
        setConfirmationResult(result);
        // setSetupStep("verify")
        setLoading(false);
    };
    
    return (
        <div className="space-y-4">
            <h3 className="font-medium">Set up SMS verification</h3>
            <p>We&apos;ll send verification codes to your phone when you sign in.</p>
            <div className="space-y-2">
            <Label htmlFor="phone-number">Phone number</Label>
            <Input 
                id="phone-number" 
                type="number" 
                placeholder="+1 (555) 123-4567"
                onChange={(e) => setPhone(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Standard message and data rates may apply.</p>
            </div>
            <Button onClick={() => sendOtp()}>
                {loading ? <Loader2 className="animate-spin"/> : 'Send verification code'}
            </Button>
            <Button variant="ghost" onClick={handleCancel}>
                Cancel
            </Button>
        </div>
    )
};

const TwoFaVerify = ({ 
    selectedMethod, 
    handleVerifyCode, 
    otp, 
    isLoading, 
    handleCancel, 
    setOtp 
}) => {
    return (
        <div className="space-y-4 disabled pointer-events-none">
            <h3 className="font-medium">Verify {selectedMethod === "app" ? "authenticator app" : "phone number"}</h3>
            <p>
            Enter the 6-digit verification code from your
            {selectedMethod === "app" ? " authenticator app" : " text message"}.
            </p>
            <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="verification-code">Verification code</Label>
                <Input
                    id="verification-code"
                    defaultValue={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="font-mono text-center text-lg"
                />
            </div>
            <div className="flex gap-2">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Verifying..." : "Verify"}
                </Button>
                <Button type="button" variant="ghost" onClick={handleCancel} disabled={isLoading}>
                    Cancel
                </Button>
            </div>
        </form>
    </div>
    )
};

const Complete2FVerify = ({ selectedMethod }) => {
    return (
        <div className="space-y-4">
                <div className="rounded-lg border p-3 bg-green-50 border-green-200 flex gap-3">
                <CheckIcon className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                <div>
                    <h4 className="font-medium text-green-800">Two-factor authentication is enabled</h4>
                    <p className="text-sm text-green-700 mt-1">
                    Your account is now more secure. You&apos;ll need to enter a verification code when you sign in.
                    </p>
                </div>
                </div>

                <div className="mt-6 space-y-4">
                <h3 className="font-medium">Recovery codes</h3>
                <p className="text-sm">
                    Save these recovery codes in a secure place. You can use them to sign in if you lose access to your
                    {selectedMethod === "app" ? " authenticator app" : " phone"}.
                </p>

                <div className="bg-muted p-3 rounded-md font-mono text-sm">
                    <div className="grid grid-cols-2 gap-2">
                    <div>ABCD-EFGH-IJKL</div>
                    <div>MNOP-QRST-UVWX</div>
                    <div>1234-5678-9012</div>
                    <div>3456-7890-1234</div>
                    <div>5678-9012-3456</div>
                    <div>7890-1234-5678</div>
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button variant="outline">Download</Button>
                    <Button variant="outline">Copy</Button>
                    <Button variant="outline">Print</Button>
                </div>

                <p className="text-sm text-muted-foreground">
                    Each code can only be used once. You can generate new recovery codes if you run out.
                </p>
                </div>
            </div>
    )
};