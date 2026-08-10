import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

export default function LoginScreen() {
    const navigate = useNavigate()
    const dispacth = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [searchParams] = useSearchParams()

    const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, loading, userInfo } = userLogin

    useEffect(() => {
        //if already logged in
        if (userInfo) {
            navigate(`/${redirect}`)
        }
    }, [navigate, userInfo, redirect])

    const loginHandler = (e) => {
        e.preventDefault()
        dispacth(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}

            <Form onSubmit={loginHandler}>
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
                        required
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Row className='py-3'>
                    <Col className='text-center'>
                        <Button type='submit' variant='primary'>Login</Button>
                    </Col>
                </Row>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer?
                    <Link to={redirect ? `/register?redirect${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}
