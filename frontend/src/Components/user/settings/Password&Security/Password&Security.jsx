import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import ChangePassword from "./ChangePassword";
import TwoFactorAuth from "./TwoFactorAuth";
import LogActivity from "./LogActivity";
import SecurityQuestions from "./SecurityQuestions";

const PasswordSecurity = () => {
    return (
        <div className="container mx-auto py-10 md:pl-14">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Secure your account</h1>
                <p className="text-muted-foreground mt-2">Manage your account security preferences and settings.</p>
            </div>

            <Tabs defaultValue="password" className="w-full pointer-events-none">
                <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="password">Password</TabsTrigger>
                <TabsTrigger value="2fa">Two-Factor Auth</TabsTrigger>
                <TabsTrigger value="activity">Login Activity</TabsTrigger>
                <TabsTrigger value="questions">Security Questions</TabsTrigger>
                </TabsList>
                <TabsContent value="password" className="mt-6 pointer-events-none">
                    <ChangePassword/>
                </TabsContent>
                <TabsContent value="2fa" className="mt-6 pointer-events-none">
                    <TwoFactorAuth/>
                </TabsContent>
                <TabsContent value="activity" className="mt-6 pointer-events-none">
                    <LogActivity/>
                </TabsContent>
                <TabsContent value="questions" className="mt-6 pointer-events-none">
                    <SecurityQuestions/>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PasswordSecurity;