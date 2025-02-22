import './App.css';
import React from 'react';
import { Route,createBrowserRouter, RouterProvider,createRoutesFromElements } from 'react-router-dom';
import Main from './Main/Main';
import FirstPage from './Main/FirstPage';
import Login from './index/Login';
import Registration from './index/Registration';
import Books from './index/Books';
import Profile from './index/Profile';
import Faq from './index/FirstPage/Faq';
import Call from './index/FirstPage/Call';
import NotFound from './index/NotFound';
import Logout from './index/Logout';
import Edit from './index/Edit';
import Profileedit from './index/Profileedit';
import Korzina from './index/Korzina';
import Users from './index/Users';





// const router = createBrowserRouter(

  // createRoutesFromElements(
  //   <Route path="/" element={<Main/>} >
  //     <Route path="FirstPage" element={<FirstPage />} loader={firstPageLoader}>
  //          <Route path="Faq" element={<Faq />}/>
  //          <Route path="Call" element={<Call />} />
  //       </Route>
  //     <Route path="Profile" element={<Profile />}/>
  //     <Route path="BooksAdd" element={<Books />} />
  //     <Route path="Login"  element={<Login />} />
  //     <Route path="Registration" element={<Registration />} />
  //     <Route path="Logout" element={<Logout />} />
  
      
  //     <Route path="*" element={<NotFound/>}/>
  //   </Route>
  // )
// );

function App() {
  const routes = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/Registration",
      element: <Registration />,
    },
    {
      element: <Main />,
      children: [
        {
          path: "/Profile",
          element: <Profile />,
        },
        {
          path: "/Logout",
          element: <Logout />,
        },
        {
          path: "/Korzina",
          element: <Korzina />,
        },
        {
          path: "/BooksAdd",
          element: <Books />,
        },
        {
          path: "/Users",
          element: <Users />,
        },
        {
          path: "books/edit/:id",
          element: <Edit/>
        },
        {
          path: "profile/edit/:id",
          element: <Profileedit/>
        },
        {
          path : "*",
          element : <NotFound/>
        },
      
        {
          path: "/FirstPage",
          element: <FirstPage />,
          // loader: {firstPageLoader}  
          children : [
            {
              path: "/FirstPage/Call",
              element: <Call />,
            },
            {
              path: "/FirstPage/Faq",
              element: <Faq />,
            },

          ]
        
        },
      ],
    },
  ]);
    return <RouterProvider router={routes} />;
}

export default App;