import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCart, removeFromCart } from '../actions/cartActions'

function CartScreen({ location }) {
    const { productId } = useParams()
    const [searchParams] = useSearchParams()
    const navigation = useNavigate()
    const qty = searchParams.get('qty') ? Number(searchParams.get('qty')) : 1

    const dispacth = useDispatch()
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    useEffect(() => {
        if (productId) {
            dispacth(addToCart(productId, qty))
        }

    }, [dispacth, productId, qty])

    const removeFromCartHandler = (productId) => {
        dispacth(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        navigation('/login?redirect=shipping')
    }

    return (
        <Row>
            {/* CART LIST */}
            <Col md={8}>
                <h1>Shopping Cart Items</h1>
                {cartItems.length === 0 ? (
                    <Message variant='info'>
                        Your cart is empty.
                        <Link to='/'>Continue Shopping</Link>
                    </Message>
                ) : (
                    <ListGroup variant='flush' style={{ border: '1px solid #dee2e6' }}>
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product} style={{ borderBottom: '1px solid #dee2e6' }}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />
                                    </Col>
                                    <Col md={4}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>
                                        KSh {Number(item.price).toLocaleString('en-KE')}
                                    </Col>

                                    <Col md={2}>
                                        <Form.Select as='select'
                                            value={item.qty}
                                            onChange={(e) => dispacth(addToCart(item.product, Number(e.target.value)))}>
                                            {
                                                [...Array(item.countInStock).keys()].map((x) => (
                                                    <option value={x + 1} value={x + 1}>
                                                        {
                                                            x + 1
                                                        }
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                    <Col md={1}>
                                        <Button type='button'
                                            variant='light'
                                            onClick={() => removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                        )}
                    </ListGroup>
                )}
            </Col>

            {/* SUBTOTAL */}
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush' style={{ border: '1px solid #dee2e6' }}>
                        <ListGroup.Item >
                            <h2>SubTotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                            KSH {Number(cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed()).toLocaleString('en-KE')}
                        </ListGroup.Item>
                        <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                            <Button type='button'
                                className='btn-block'
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                Proceed to CheckOut
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

    )
}

export default CartScreen
