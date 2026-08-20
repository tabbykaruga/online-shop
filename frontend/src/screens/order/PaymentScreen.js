import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import FormContainer from '../../components/FormContainer'
import { savePaymentMethod } from '../../actions/cartActions'
import CheckOutSteps from '../../components/CheckOutSteps'


function PaymentScreen() {
    const dispacth = useDispatch()
    const navigate = useNavigate()

    const [paymentMethod, setPaymentMethod] = useState('M-Pesa')

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    useEffect(() => {
        if (!shippingAddress?.address) {
            navigate('/shipping')
        }
    }, [navigate, shippingAddress])

    const submitPaymentMethodHandler = (e) => {
        e.preventDefault()

        dispacth(savePaymentMethod(paymentMethod))

        navigate('/placeorder')
    }

    return (
        <FormContainer>
            <CheckOutSteps step1 step2 step3 />
            <Form onSubmit={submitPaymentMethodHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Row className='py-3'>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='M-pesa'
                                id='mpesa'
                                name='paymentMethod'
                                value='M-Pesa'
                                checked={paymentMethod === 'M-Pesa'}
                                onChange={(e) => setPaymentMethod(e.target.value)}>
                            </Form.Check>
                        </Col>
                        <Col>
                            <Form.Check
                                type='radio'
                                label='Credit Card'
                                id='credit'
                                name='paymentMethod'
                                value='Credit Card'
                                checked={paymentMethod === 'Credit Card'}
                                onChange={(e) => setPaymentMethod(e.target.value)}>
                            </Form.Check>
                        </Col>
                    </Row>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen
