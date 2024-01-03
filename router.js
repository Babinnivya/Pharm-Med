import { createBrowserRouter } from "react-router-dom";
import ListMedicines from "./components/blog/ListMedicine";
import App from "./App";
import CreateMedicine from "./components/blog/CreateMedicinet";
import EditMedicine from "./components/blog/EditMedicine";
import Register from "./components/auth/register";
import Login from "./components/auth/Login";
import ViewMedicine from "./components/blog/ViewMedicine";

const router = createBrowserRouter([
    { path: 'app', element: <App/> },
    { path: 'blog/posts', element: <ListMedicines/> },
    { path: 'blog/posts/create', element: <CreateMedicine/> },
    { path: 'blog/posts/:postId', element: <ViewMedicine/>},
    { path : '/blog/posts/:postId/edit', element: <EditMedicine/>},
    { path: '', element:<Register/>},
    { path: '/login', element:<Login/>},
    
]);

export default router;