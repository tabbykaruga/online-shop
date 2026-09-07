import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Row, Col, Image, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "../../components/Rating";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  listProductDetails,
  createProductReview,
} from "../../actions/productActions";
import { PRODUCT_CREATE_REVIEW_RESET } from "../../constants/productConst";
import { format } from "date-fns";


function ProductScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productReview = useSelector((state) => state.createProductReview);
  const {
    error: errorCreatingProductReview,
    loading: creatingProductReview,
    success: ProductReviewCreated,
  } = productReview;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    dispatch(listProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ProductReviewCreated) {
      setRating(0);
      setComment("");
      dispatch(listProductDetails(id));
    }
  }, [ProductReviewCreated, dispatch, id]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  const handleCreateProductReviewHandler = (e) => {
    e.preventDefault();
    dispatch(createProductReview(id, { rating, comment }));
  };

  // Build a 5->1 star breakdown from the actual review data
  const getRatingBreakdown = (reviews) => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      if (counts[r.rating] !== undefined) counts[r.rating] += 1;
    });
    const total = reviews.length || 1;
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: counts[star],
      pct: Math.round((counts[star] / total) * 100),
    }));
  };

  const initials = (name = "") =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    const breakdown = getRatingBreakdown(product.reviews);

    return (
      <div className="pd">
        {/* ---- Top: gallery + info + sticky buy box ---- */}
        <Row className="pd-top">
          <Col lg={6}>
            <div className="pd-gallery">
              <Image src={product.image} alt={product.name} fluid />
            </div>
          </Col>

          <Col lg={3}>
            <div className="pd-info">
              <p className="pd-brand">{product.brand}</p>
              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-rating-row">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} review${product.numReviews === 1 ? "" : "s"
                    }`}
                  color={"#E8A33D"}
                />
              </div>

              <p className="pd-desc">{product.description}</p>
            </div>
          </Col>

          <Col lg={3}>
            <div className="pd-buybox">
              <div className="pd-buybox-price">
                KSh {Number(product.price).toLocaleString("en-KE")}
              </div>

              <div className="pd-buybox-row">
                <span>Status</span>
                <span
                  className={
                    product.countInStock > 0 ? "pd-instock" : "pd-outstock"
                  }
                >
                  {product.countInStock > 0 ? "In stock" : "Out of stock"}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="pd-buybox-row">
                  <span>Quantity</span>
                  <Form.Select
                    className="pd-qty-select"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...new Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                </div>
              )}

              <Button
                className="pd-cta"
                type="button"
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
              >
                Add to cart
              </Button>
            </div>
          </Col>
        </Row>

        {/* ---- Reviews ---- */}
        <Row className="pd-reviews-section">
          <Col lg={9}>
            <h2 className="pd-section-title">Reviews</h2>

            {product.reviews.length === 0 ? (
              <Message variant="info">
                No reviews yet — be the first to write one.
              </Message>
            ) : (
              <>
                <div className="pd-rating-summary">
                  <div className="pd-rating-summary-score">
                    <span className="pd-rating-number">
                      {Number(product.rating).toFixed(1)}
                    </span>
                    <Rating value={product.rating} color="#E8A33D" />
                    <span className="pd-rating-count">
                      {product.numReviews} review
                      {product.numReviews === 1 ? "" : "s"}
                    </span>
                  </div>

                  <div className="pd-rating-bars">
                    {breakdown.map(({ star, count, pct }) => (
                      <div className="pd-rating-bar-row" key={star}>
                        <span className="pd-rating-bar-label">{star}</span>
                        <div className="pd-rating-bar-track">
                          <div
                            className="pd-rating-bar-fill"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="pd-rating-bar-count">{count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ul className="pd-review-list">
                  {product.reviews.map((review) => (
                    <li className="pd-review" key={review._id}>
                      <div className="pd-review-avatar">
                        {initials(review.name)}
                      </div>
                      <div className="pd-review-body">
                        <div className="pd-review-head">
                          <strong>{review.name}</strong>
                          <span className="pd-review-date">
                            {format(
                              new Date(review.createdAt),
                              "d MMMM yyyy",
                            )}
                          </span>
                        </div>
                        <Rating value={review.rating} color="#E8A33D" />
                        <p className="pd-review-comment">{review.comment}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {/* ---- Write a review ---- */}
            <div className="pd-write-review">
              <h3 className="pd-section-title">Write a review</h3>
              {creatingProductReview && <Loader />}
              {errorCreatingProductReview && (
                <Message variant="danger">
                  {errorCreatingProductReview}
                </Message>
              )}
              {ProductReviewCreated && (
                <Message variant="success">Review added</Message>
              )}

              {userInfo ? (
                <Form onSubmit={handleCreateProductReviewHandler}>
                  <Form.Group controlId="rating" className="pd-form-group">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      required
                      onChange={(e) => setRating(e.target.value)}
                    >
                      <option value="">Select a rating</option>
                      <option value="1">1 — Poor</option>
                      <option value="2">2 — Fair</option>
                      <option value="3">3 — Good</option>
                      <option value="4">4 — Very good</option>
                      <option value="5">5 — Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment" className="pd-form-group">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                      as="textarea"
                      required
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    className="pd-cta pd-cta-inline"
                    disabled={creatingProductReview}
                    type="submit"
                  >
                    Submit review
                  </Button>
                </Form>
              ) : (
                <Message variant="info">
                  <Link to="/login">Log in</Link> to write a review
                </Message>
              )}
            </div>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div className="pd-page">
      <Link to="/" className="pd-back">
        ← Back to products
      </Link>
      {renderContent()}
    </div>
  );
}

export default ProductScreen;
