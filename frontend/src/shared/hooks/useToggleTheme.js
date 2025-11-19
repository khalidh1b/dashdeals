import { useEffect, useState } from 'react';

const useToggleTheme = () => {
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem("dashdeals-theme");
        return savedTheme === "dark" || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    const handleThemeChange = () => {
        const newTheme = !theme;
        setTheme(newTheme);
        localStorage.setItem("dashdeals-theme", newTheme ? "dark" : "light");
    };
    
    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme);
    }, [theme]);
    
    return { handleThemeChange, theme };
};

export default useToggleTheme;