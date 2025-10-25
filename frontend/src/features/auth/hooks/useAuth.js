import { useContext } from "react";
import { AuthContext } from "@/app/providers/auth-provider";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;