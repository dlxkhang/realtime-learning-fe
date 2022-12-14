/* eslint-disable */
import { QueryClient, QueryClientProvider } from 'react-query'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import './index.css'
import CreateGroup from './pages/create-group'
import Login from './pages/login'
import Register from './pages/register'
import Home from './pages/home'
import ErrorPage from './pages/error-page'
import Profile from './pages/profile'
import MyGroup from './pages/my-group'
import GroupDetail from './pages/group-detail'
import Activation from 'pages/account-activation'
import NavBar from './components/navBar'
import Presentation from 'pages/presentation'
import PresentationDetail from 'pages/presentation-detail'
import { SocketContext, socketService } from './service'
// import AnswerForm from './pages/answer-form'
import InvitationType from './enums/invitation.enum'
import Present from 'pages/present'
import ForgotPassword from 'pages/forgot-password'
const router = createBrowserRouter([
    {
        path: '/404',
        element: <ErrorPage />,
    },
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        path: '/forgot-password',
        element: <ForgotPassword />,
    },
    {
        path: '/verify-email/:emailToken',
        element: <Activation />,
        errorElement: <ErrorPage />,
    },
    // {
    //     path: '/answer-form/:presentationCode/:groupId',
    //     element: <AnswerForm />,
    //     loader: ({ params }) => {
    //         return {
    //             presentationCode: params.presentationCode,
    //             groupId: params.groupId,
    //         }
    //     },
    //     errorElement: <ErrorPage />,
    // },
    {
        path: '/present/:presentationCode',
        element: <Present />,
        loader: ({ params }) => {
            return {
                presentationCode: params.presentationCode,
            }
        },
    },
    {
        path: '/present/:presentationCode/:groupId',
        element: <Present />,
        loader: ({ params }) => {
            return {
                presentationCode: params.presentationCode,
                groupId: params.groupId,
            }
        },
    },
    {
        element: (
            <>
                <NavBar />
                <Outlet />
            </>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                id: 'invitation',
                path: '/invitation/:invitationId',
                element: <Home />,
                loader: ({ params }) => {
                    return {
                        invitationType: InvitationType.GROUP_INVITATION,
                        invitationId: params.invitationId,
                    }
                },
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/my-group',
                element: <MyGroup />,
            },
            {
                path: '/create-group',
                element: <CreateGroup />,
            },
            {
                path: '/group/:groupId',
                element: <GroupDetail />,
            },
            {
                path: '/presentation/:id',
                element: <PresentationDetail />,
            },
            {
                path: '/presentation',
                element: <Presentation />,
            },
            {
                id: 'presentation-invitation',
                path: '/invitation/presentation/:invitationId',
                element: <Home />,
                loader: ({ params }) => {
                    return {
                        invitationType: InvitationType.PRESENTATION_INVITATION,
                        invitationId: params.invitationId,
                    }
                },
            },
        ],
    },
])
const queryClient = new QueryClient()

function App() {
    return (
        <SocketContext.Provider value={socketService}>
            <QueryClientProvider client={queryClient} contextSharing>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </SocketContext.Provider>
    )
}

export default App
