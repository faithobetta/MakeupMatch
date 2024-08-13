
import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import MakeupMatch from "./components/pages/MakeupMatch";
// import Login from "./components/Validations/Login"
import Login from "./components/Validations/Login";
import Search from "./components/pages/Search";
import SignUpClient from "./components/Validations/SignUpCLient";
import SignUpArtist from "./components/Validations/SignUpArtist";
//import ArtistDashboard from "./components/pages/ArtistDashboard"
import MakeupArtistsProfile from "./components/pages/MakeupArtistsProfile";
import Booking from "./components/pages/Booking";
//import PaymentPage from "./components/pages/PaymentPage";
import About from "./components/Footer-pages/About"
import Privacy from "./components/Footer-pages/Privacy"
import Footer from "./components/Footer-pages/Footer";
import ArtistDashboard from './components/pages/ArtistDashboard';
import Artist from './components/pages/Artist';




function App() {
  const Layout = () => {
    return (
      <div className="app">
          <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <MakeupMatch/>,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/search",
          element: <Search />,
        },
        {
          path: "/signUpClient",
          element: <SignUpClient/>,
        },
        {
          path: "/signUpArtist",
          element: <SignUpArtist/>,
        },
        {
          path: "/artist",
          element: <Artist/>,
        },
        {
          path: "/artist-dashboard/:id",
          element: <ArtistDashboard/>,
        },
        {
          path: "/makeupArtistsProfile/:id",
          element: <MakeupArtistsProfile/>,
        },
        {
          path: "/booking",
          element: <Booking/>,
        },
        // {
        //   path: "/payment",
        //   element: <PaymentPage/>,
        // },
        {
          path: "/about",
          element: <About/>,
        },
        {
          path: "privacy",
          element: <Privacy/>,
        },
 
      ],
    },
  
  ]);

  return <RouterProvider router={router} />;
}



export default App
