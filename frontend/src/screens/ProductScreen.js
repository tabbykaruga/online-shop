import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

function ProductScreen() {
    const { id } = useParams()
    const [product, setProduct] = useState([])

    useEffect(() => {
        async function getProductById() {
            const { data } = await axios.get(`/api/products/${id}`)
            setProduct(data)
        }
        getProductById()
    }, [id])

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                        </ListGroup.Item>

                        <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                            Price : KSh {Number(product.price).toLocaleString('en-KE')}
                        </ListGroup.Item>

                        <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                            Description : ${product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card style={{ overflow: 'hidden', border: '1px solid #dee2e6' }}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>KSh {Number(product.price).toLocaleString('en-KE')}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }}>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item style={{ borderTop: '1px solid #dee2e6' }} >
                                <Button className='w-100' type='button' disabled={product.countInStock === 0}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen
