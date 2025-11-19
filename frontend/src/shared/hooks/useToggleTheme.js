import { useEffect, useState } from 'react';

const useToggleTheme = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("dashdeals-theme") === "dark";
    });

    const handleThemeChange = () => {
        setTheme(!theme);
        localStorage.setItem("dashdeals-theme", !theme ? "dark" : "light");
    };
    
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);
    
    return { handleThemeChange, theme };
};

export default useToggleTheme;