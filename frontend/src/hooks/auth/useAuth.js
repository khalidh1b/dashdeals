import { useContext } from "react";
import { AuthContext } from "@/providers/auth-provider";

const useAuth = () => {
    const auth = useContext(AuthContext);
    return auth;
};

export default useAuth;