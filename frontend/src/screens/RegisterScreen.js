import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function RegisterScreen() {

  const navigate = useNavigate()
  const dispacth = useDispatch()
  const [searchParams] = useSearchParams()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('')

  const redirect = searchParams.get('redirect') ? searchParams.get('redirect') : '/'

  const userRegister = useSelector(state => state.userRegister)
  const { error, loading, userInfo } = userRegister

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])


  const registrationHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setConfirmPasswordMsg("Passwords do not match!")
    } else {
      dispacth(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader></Loader>}

      <Form onSubmit={registrationHandler}>
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
            required
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confrimPassword' className='py-3'>
          <Form.Label> Confirm Password</Form.Label>
          <Form.Control
            required
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {confirmPasswordMsg && <Message variant={'danger'}> {confirmPasswordMsg}</Message>}
        <Row className='py-3'>
          <Col className='text-center'>
            <Button type='submit' variant='primary'>Register</Button>
          </Col>
        </Row>
      </Form>
      <Row className='py-3'>
        <Col>
          Nont a new Customer?
          <Link to={redirect ?
            `/login?redirect${redirect}` :
            '/login'}
          >Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
