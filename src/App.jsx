import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import AdminDashboard from "./pages/adminPages/adminDashboard.jsx";
import HomePage from "./pages/homePage/homePage.jsx";
import NewPage from "./pages/newPage/newPage.jsx";
import LoginPage from "./pages/login&Register/loginPage.jsx";
import RegisterPage from "./pages/login&Register/registerPage.jsx";
import ForgetPassword from "./pages/login&Register/forgetPassword.jsx";
import GenrePage from "./pages/genrePage/genrePage.jsx";
import ManageComic from "./pages/adminPages/manageComic/manageComic.jsx";
import ManageGenre from "./pages/adminPages/manageGenre/manageGenre.jsx";
import VisitorsPage from "./pages/adminPages/visitorsPage.jsx";
import SingleComic from "./pages/singleProduct/singleComic.jsx";
import SearchPage from "./pages/searchPage/searchPage.jsx";
import EditGenre from "./pages/adminPages/manageGenre/editGenre.jsx";
import EditComic from "./pages/adminPages/manageComic/editComic.jsx";


const queryClient = new QueryClient();

function App() {
  return (
      <>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={createBrowserRouter([
              {path: "/", element: <HomePage/>},
              {path: "/NewPage", element: <NewPage/>},
              {path: "/GenrePage", element: <GenrePage/>},
              {path: "/SearchPage", element: <SearchPage/>},
              {path: "/SingleComic/:itemId", element: <SingleComic/>},
              {path: "/LoginPage", element: <LoginPage/>},
              {path: "/RegisterPage", element: <RegisterPage/>},
              {path: "/ForgetPassword", element: <ForgetPassword/>},
              {path: "/AdminDashboard", element: <AdminDashboard/>},
              {path: "/ManageGenre", element: <ManageGenre/>},
              {path: "/EditGenre/:pk_id", element: <EditGenre/>},
              {path: "/ManageComic", element: <ManageComic/>},
              {path: "/EditComic/:pk_id", element: <EditComic/>},
              {path: "/VisitorsPage", element: <VisitorsPage/>},
          ])} />
        </QueryClientProvider>
      </>
  )
}

export default App
