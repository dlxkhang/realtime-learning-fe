/* eslint-disable */
import { Form, Input, Radio, DatePicker, Tabs, Button } from 'antd'
import NavBar from 'components/navBar'
import { useEffect } from 'react'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import instance from 'service/axiosPrivate'
import { failureModal, successModal } from '../../components/modals'
import UploadAvatar from '../../components/upload-avatar'
import dayjs from '../../utils/dayjs.util'
import './index.css'

function Profile() {
    const navigate = useNavigate()
    const [form] = Form.useForm()

    useQuery(['profile'], async () => {
        const res = await instance.get('/user/profile')

        form.setFieldsValue({
            ...res.data,
            dateOfBirth: dayjs(res.data.dateOfBirth),
        })
        return res.data
    })

    useEffect(() => {
        if (!localStorage.getItem('session')) navigate('/login')
    }, [localStorage.getItem('session')])

    const { mutate } = useMutation((updateProfileData) => {
        return instance.post('/user/update-profile', updateProfileData)
    })

    const handleSubmit = (data: any) => {
        mutate(data, {
            onSuccess: (res) => {
                if (res?.status === 200) {
                    successModal('Update profile successfully')
                } else {
                    failureModal('Update profile failed', res.statusText)
                }
            },
            onError: (error: any) => {
                failureModal('Update profile failed', error.response && error.response.data)
            },
        })
    }

    return (
        <div>
            <NavBar />
            <Tabs
                centered
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Profile',
                        key: '1',
                        children: (
                            <Form
                                form={form}
                                onFinish={handleSubmit}
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 10 }}
                                layout="horizontal"
                                className="form-wrapper"
                            >
                                <Form.Item label="Avatar" name="avatar">
                                    <UploadAvatar formRef={form} />
                                </Form.Item>
                                <Form.Item label="Email" name="email">
                                    <Input placeholder="Ex: abc@gmail.com" disabled />
                                </Form.Item>
                                <Form.Item label="Full name" name="fullName">
                                    <Input placeholder="Ex: John Smith" />
                                </Form.Item>
                                <Form.Item
                                    label="Phone number"
                                    name="phoneNumber"
                                    rules={[{ len: 10, message: 'Phone number must include 10 numbers' }]}
                                >
                                    <Input placeholder="Ex: 0123456789" />
                                </Form.Item>
                                <Form.Item label="Gender" name="gender">
                                    <Radio.Group>
                                        <Radio value="male"> Male </Radio>
                                        <Radio value="female"> Female </Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item label="Date of birth" name="dateOfBirth">
                                    <DatePicker />
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 10, offset: 4 }}>
                                    <Button type="primary" htmlType="submit">
                                        Save Changes
                                    </Button>
                                </Form.Item>
                            </Form>
                        ),
                    },
                    {
                        label: 'Security',
                        key: '2',
                        children: (
                            <Form labelCol={{ span: 4 }} wrapperCol={{ span: 10 }} layout="horizontal" className="form-wrapper">
                                <Form.Item label="Current password">
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item label="New password">
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item label="Re-enter new password">
                                    <Input.Password />
                                </Form.Item>
                                <Form.Item wrapperCol={{ span: 10, offset: 4 }}>
                                    <Button type="primary" htmlType="submit">
                                        Change Password
                                    </Button>
                                </Form.Item>
                            </Form>
                        ),
                    },
                ]}
            />
        </div>
    )
}

export default Profile
