/* eslint-disable */
// @ts-nocheck
import { useForm, Controller } from 'react-hook-form'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons'
import { Input, Spin } from 'antd'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from 'react-query'
import { failureModal, successModal } from '../../components/modals'
import './index.css'
import loginValidationSchema from './validation/login.schema'
import instance from 'service/axiosPublic'
import { useEffect } from 'react'

function Login() {
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        if (localStorage.getItem('session')) {
            navigate('/')
        }
    }, [localStorage.getItem('session')])

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginValidationSchema),
    })

    const onSubmit = (value) => {
        mutate(value, {
            onSuccess: (res) => {
                if (res.status === 200) {
                    const user = res.data
                    localStorage.setItem('session', JSON.stringify(user.session))
                    navigate('/', {
                        state,
                    })
                } else failureModal('Login failed', res.message)
            },
            onError: (error) => {
                if (error.response && error.response.status === 401)
                    failureModal('Login failed', 'Wrong email or password')
                else failureModal('Login failed', error.response && error.response.data)
            },
        })
    }
    useEffect(() => {
        // gogoole is global var
        google.accounts.id.initialize({
            client_id: process.env.REACT_APP_CLIENT_ID,
            callback: handleCallbackResponse,
        })
        google.accounts.id.renderButton(document.getElementById('GoogleSignInDiv'), {
            theme: 'outline',
            size: 'large',
        })
    }, [])
    function handleCallbackResponse(response) {
        googleMutate.mutate(
            { token: response.credential },
            {
                onSuccess: (res) => {
                    if (res.status === 200) {
                        const user = res.data
                        localStorage.setItem('session', JSON.stringify(user.session))
                        successModal('Login successfully', `Welcome ${user.fullName}`)
                        navigate('/')
                    } else failureModal('Login failed', res.message)
                },
                onError: (error) => {
                    if (error.response && error.response.status === 401)
                        failureModal('Login failed', 'Wrong email or password')
                    else failureModal('Login failed', error.response && error.response.data)
                },
            },
        )
    }
    const { mutate, isLoading } = useMutation((loginFormData) => {
        return instance.post('/auth/login', loginFormData)
    })
    const googleMutate = useMutation((credential) => {
        return instance.post('/auth/login-by-google', credential)
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="formWrapper">
            <p className="title">Welcome To Real-Time Learning System</p>
            <div className="inputWrapper">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            className="input"
                            placeholder="Enter your email"
                            size="large"
                            suffix={<MailOutlined />}
                        />
                    )}
                />
                <span className="message">{errors?.email?.message}</span>
            </div>
            <div className="inputWrapper">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input.Password
                            className="input"
                            {...field}
                            placeholder="Enter password"
                            size="large"
                            // eslint-disable-next-line no-use-before-define
                            iconRender={(visible) =>
                                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                            }
                        />
                    )}
                />
                <span className="message">{errors?.password?.message}</span>
            </div>
            <br />
            <Link to="/forgot-password" state={state}>
                Forgot your password?
            </Link>
            <br />
            <div className="btnWrapper">
                <Spin spinning={isLoading}>
                    <button type="submit" className="button">
                        Login
                    </button>
                </Spin>
                {/* eslint-disable-next-line no-use-before-define */}
                <Link to="/register" state={state} type="submit" className="button">
                    Register
                </Link>
            </div>
            <br />
            <div>or login with </div>
            <br />
            <div id="GoogleSignInDiv"></div>
        </form>
    )
}
export default Login
