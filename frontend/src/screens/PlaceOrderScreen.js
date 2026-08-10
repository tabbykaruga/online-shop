import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { Button, Col, ListGroup, Row, Image, Card } from 'react-bootstrap'
import CheckOutSteps from '../components/CheckOutSteps'
import Message from '../components/Message'

function PlaceOrderScreen() {
    const cart = useSelector(state => state.cart)

    const itemPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    const shippingPrice = itemPrice > 100000 ? 0 : 200
    const totalPrice = Number(itemPrice) + Number(shippingPrice)


    const placeOrder = (e) => {
        e.preventDefault()
    }

    return (
        <div>
            <CheckOutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush' style={{ border: '1px solid #dee2e6' }} >
                        <ListGroup.Item >
                            <h2>Delivery</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},  {cart.shippingAddress.city},
                                {'  '}
                                {cart.shippingAddress.postalCode},
                                {'  '}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ border: '1px solid #dee2e6' }}>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Payment Method: </strong>
                                {cart.paymentMethod}

                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message variant='info'> Your Cart is Empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X  {Number(item.price).toLocaleString('en-KE')} =  KSh {Number(item.qty * item.price).toLocaleString('en-KE')}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>

                                )}

                        </ListGroup.Item>

                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush' style={{ border: '1px solid #dee2e6' }}>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
                                <Row>
                                    <Col>Item :</Col>
                                    <Col>KSH {Number(itemPrice).toLocaleString('EN')}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
                                <Row>
                                    <Col>Shipping :</Col>
                                    <Col>KSH {Number(shippingPrice).toLocaleString('EN')}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item style={{ borderBottom: '1px solid #dee2e6' }}>
                                <Row>
                                    <Col>Total :</Col>
                                    <Col>KSH {Number(totalPrice).toLocaleString('EN')}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <Button type='button' className='btn-block' disabled={cart.cartItems === 0} onClick={placeOrder}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen
