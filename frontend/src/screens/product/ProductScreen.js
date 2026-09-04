import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { listProductDetails, createProductReview } from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from '../../constants/productConst';
import { format } from "date-fns";

function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.createProductReview);
  const { error: errorCreatingProductReview,
    loading: creatingProductReview,
    success: ProductReviewCreated } = productReview;


  useEffect(() => {
    // Runs every time we navigate to a (possibly different) product
    dispacth({ type: PRODUCT_CREATE_REVIEW_RESET });
    dispacth(listProductDetails(id));
  }, [dispacth, id]);

  useEffect(() => {
    // Runs only when a review is successfully submitted
    if (ProductReviewCreated) {
      setRating(0);
      setComment("");
      dispacth(listProductDetails(id));
    }
  }, [ProductReviewCreated]);
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleCreateProductReviewHandler = (e) => {
    e.preventDefault();
    dispacth(createProductReview(id, { rating, comment }))
  }

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
      <div>
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush" style={{ border: "1px solid #dee2e6" }}>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>

              <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>

              <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                Price : KSh {Number(product.price).toLocaleString("en-KE")}
              </ListGroup.Item>

              <ListGroup.Item>
                Description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card style={{ overflow: "hidden", border: "1px solid #dee2e6" }}>
              <ListGroup>
                <ListGroup.Item>
                  <Row >
                    <Col>Price:</Col>
                    <Col>
                      <strong>
                        KSh {Number(product.price).toLocaleString("en-KE")}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {/* dropdown at cart */}
                {product.countInStock > 0 && (
                  <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                    <Row>
                      <Col>Quantity</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Select
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...new Array(product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ),
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                  <Button
                    className="w-100"
                    type="button"
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    variant="primary"
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row style={{ paddingTop: "20px" }}>
          <Col md={6}>
            <h4>Reviews</h4>
            {product.reviews.length === 0 && <Message variant="info">No Reviews Yet</Message>}
            <ListGroup variant="flush" >
              {product.reviews.map((review) => (
                <ListGroup.Item key={review._id} style={{ borderBottom: "1px solid #dee2e6", paddingBottom: "20px" }}>
                  <strong>{review.name}</strong>
                  <p>{review.comment}</p>
                  <p>{format(
                    new Date(review.createdAt),
                    "do MMMM yyyy 'at' h:mm a",
                  )}</p>
                  <Rating value={review.rating} color="#f8e825" />
                </ListGroup.Item>
              ))}
              <ListGroup.Item >
                <h4>Write a review</h4>
                {creatingProductReview && <Loader />}
                {errorCreatingProductReview && <Message variant="danger">{errorCreatingProductReview}</Message>}
                {userInfo
                  ? <Form onSubmit={handleCreateProductReviewHandler}>
                    <Form.Group controlId="rating">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        required
                        onChange={(e) => setRating(e.target.value)}>
                        <option value="">Select</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excelent</option>
                      </Form.Control>
                      <Form.Group controlId="comment" style={{ paddingTop: "15px", paddingBottom: "15px" }}>
                        <Form.Label>Review</Form.Label>
                        <Form.Control
                          as="textarea"
                          required
                          rows={5}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}>
                        </Form.Control>
                      </Form.Group>
                      <Button
                        disabled={creatingProductReview}
                        type="submit"
                        variant="primary"
                      >Submit</Button>
                      {ProductReviewCreated && <Message variant="success">Review Created Successfully</Message>}
                    </Form.Group>
                  </Form>
                  : <Message variant="info">Please <Link to="/login">Login</Link> to add a review</Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {renderContent()}
    </div>
  );
}

export default ProductScreen;
