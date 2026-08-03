import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDeatils, updateUserProfile } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConst'

function ProfileScreen() {
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const [searchParams] = useSearchParams()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('')


    const userDetails = useSelector(state => state.userDetails)
    const { error, loading, user } = userDetails

    //to ensure user is logged in
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    //update user info and return success
    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success } = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            navigate('/login')
        } else {
            //success-> reget the new info after update is successfull
            if (!user || !user.name || success) {
                dispacth({ type: USER_UPDATE_PROFILE_RESET })

                dispacth(getUserDeatils('profile'))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispacth, navigate, userInfo, user, success])


    const getProfileHandler = (e) => {
        e.preventDefault()

        if (password != confirmPassword) {
            setConfirmPasswordMsg("Passwords do not match!")
        } else {
            setConfirmPasswordMsg('')
            dispacth(updateUserProfile({
                'id': user._id,
                'name': name,
                'email': email,
                'password': password
            }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader></Loader>}

                <Form onSubmit={getProfileHandler}>
                    <Form.Group controlId='name' className='py-3'>
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            required
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email' className='py-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            required
                            type='email'
                            placeholder='Enter email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password' className='py-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Enter password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confrimPassword' className='py-3'>
                        <Form.Label> Confirm Password</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
                    {confirmPasswordMsg && <Message variant={'danger'}> {confirmPasswordMsg}</Message>}
                    <Row className='py-3'>
                        <Col className='text-center'>
                            <Button type='submit' variant='primary'>Update Profile</Button>
                        </Col>
                    </Row>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
