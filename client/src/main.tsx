import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout.tsx'
import ErrorPage from './pages/ErrorPage.tsx'
import Home from './pages/Home.tsx'
import PostDetail from './pages/PostDetail.tsx'
import Register from './pages/Register.tsx'
import Login from './pages/Login.tsx'
import UserProfile from './pages/UserProfile.tsx'
import Authors from './pages/Authors.tsx'
import EditPost from './pages/EditPost.tsx'
import CreatePost from './pages/CreatePost.tsx'
import AuthorPosts from './pages/AuthorPosts.tsx'
import Dashboard from './pages/Dashboard.tsx'
import Logout from './pages/Logout.tsx'
import CategoryPost from './pages/CategoryPost.tsx'
import { UserContextProvider } from './context/userContext.tsx'
import { Provider } from 'react-redux'
import store from './store/store.ts'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
   children: [
    {index: true, element: <Home />},
    {path: 'posts/:id', element: <PostDetail />},
    {path: 'register', element: <Register />},
    {path: 'login', element: <Login />},
    {path: 'profile', element: <UserProfile />},
    {path: 'authors', element: <Authors />},
    {path: 'create', element: <CreatePost />},
    {path: 'posts/categories/:category', element: <CategoryPost />},
    {path: 'posts/users/:id', element: <AuthorPosts />},
    {path: 'myposts', element: <Dashboard />},
    {path: 'posts/:id/edit', element: <EditPost />},
    {path: 'logout', element: <Logout />},
   ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserContextProvider>
  </React.StrictMode>,
)
