import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { getUserDetails, updateUser } from '../../../actions/userActions'
import FormContainer from '../../../components/FormContainer'
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { USER_UPDATE_RESET } from '../../../constants/userConst'


function EditUserScreen() {

  const navigate = useNavigate()
  const dispacth = useDispatch()
  const { id } = useParams();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const userDetails = useSelector(state => state.userDetails)
  const { error, loading, user } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { error: errorUpdating, loading: loadingUpdate, success: updateSuccess } = userUpdate

  useEffect(() => {
    if (updateSuccess) {
      dispacth({ type: USER_UPDATE_RESET })
      navigate("/admin/users")
    } else if (!user.name || user._id !== Number(id)) {
      dispacth(getUserDetails(id))
    } else {
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  }, [dispacth, user, id, updateSuccess, navigate])

  const updateUserHandler = (e) => {
    e.preventDefault()
    dispacth(updateUser({ _id: user._id, name, email, isAdmin }))
  }

  return (
    <div>
      <Link to="/admin/users/">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader></Loader>}

        <Form onSubmit={updateUserHandler}>
          <Form.Group controlId='name' className='py-3'>
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='py-3'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin' className='py-3'>
            <Form.Check
              type='checkbox'
              label='Is Admin'
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            ></Form.Check>
          </Form.Group>

          {errorUpdating && <Message variant='danger'>{error}</Message>}
          {loadingUpdate && <Loader></Loader>}
          <Row className='py-3'>
            <Col className='text-center'>
              <Button type='submit' variant='primary'>Update User</Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>

  )
}

export default EditUserScreen
