import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Message from "../components/Message"
import Loader from "../components/Loader"
import { topRatedProducts } from '../actions/productActions'

function ProductCarousel() {
    const dispatch = useDispatch()
    const ratedTopProducts = useSelector(state => state.topRatedProducts)
    const { error, loading, products } = ratedTopProducts

    useEffect(() => {
        dispatch(topRatedProducts())
    }, [dispatch])


    return (
        <div>
            {loading && <Loader></Loader>}
            {error && <Message variant="danger">{error}</Message>}
            <Carousel pause="hover" className='bg-dark'>
                {products.map((product) => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (Ksh {Number(product.price).toLocaleString("en-KE")})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}

            </Carousel>
        </div>
    )
}

export default ProductCarousel
