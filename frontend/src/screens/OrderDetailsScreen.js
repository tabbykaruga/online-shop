import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Col, ListGroup, Row, Image, Card } from "react-bootstrap";
import Message from "../components/Message";
import { getOrderDetails } from "../actions/orderActions";
import Loader from "../components/Loader";

function OrderDetailsScreen({ match }) {
  const dispacth = useDispatch();

  const { orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const itemPrice =
    !loading && !error
      ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      : 0;

  useEffect(() => {
    if (order?._id !== Number(orderId)) {
      dispacth(getOrderDetails(orderId));
    }
  }, [dispacth, order, orderId]);

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
      <div>
        <h1>Order : {orderId}</h1>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush" style={{ border: "1px solid #dee2e6" }}>
              <ListGroup.Item>
                <h2>Delivery</h2>
                <p>
                  <strong>Name : </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email : </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},
                  {"  "}
                  {order.shippingAddress.postalCode},{"  "}
                  {order.shippingAddress.country}
                </p>
                <p>
                  {order.isDelivered ? (
                    <Message variant={"success"}>
                      Delivered On {order.deliveredAt}
                    </Message>
                  ) : (
                    <Message variant={"warning"}>Not yet Delivered</Message>
                  )}
                </p>
              </ListGroup.Item>

              <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                <h2>Payment Method</h2>
                <p>
                  <strong>Payment Method: </strong>
                  {order.paymentMethod}
                </p>
                <p>
                  {order.isPaid ? (
                    <Message variant={"success"}>
                      Paid On {order.paidAt}
                    </Message>
                  ) : (
                    <Message variant={"warning"}>Not yet Paid</Message>
                  )}
                </p>
              </ListGroup.Item>

              <ListGroup.Item style={{ borderTop: "1px solid #dee2e6" }}>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message variant="info"> Your order is Empty</Message>
                ) : (
                  <ListGroup variant="flush">
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={item._id}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} X{" "}
                            {Number(item.price).toLocaleString("en-KE")} = KSh{" "}
                            {Number(item.qty * item.price).toLocaleString(
                              "en-KE",
                            )}
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
              <ListGroup
                variant="flush"
                style={{ border: "1px solid #dee2e6" }}
              >
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item style={{ borderBottom: "1px solid #dee2e6" }}>
                  <Row>
                    <Col>Item :</Col>
                    <Col>KSH {Number(itemPrice).toLocaleString("EN")}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item style={{ borderBottom: "1px solid #dee2e6" }}>
                  <Row>
                    <Col>Shipping :</Col>
                    <Col>
                      KSH {Number(order.shippingPrice).toLocaleString("EN")}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total :</Col>
                    <Col>
                      KSH {Number(order.totalPrice).toLocaleString("EN")}
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  {error && <Message variant="danger">{error}</Message>}
                </ListGroup.Item>

                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    );
  };

  return renderContent();
}

export default OrderDetailsScreen;
