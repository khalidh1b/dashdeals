import { createBrowserRouter } from "react-router-dom";
import Root from '../pages/Root/Root';
import HomePage from '../pages/HomePage/HomePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element: <HomePage></HomePage>
            }
        ]
    }
])

export default router;