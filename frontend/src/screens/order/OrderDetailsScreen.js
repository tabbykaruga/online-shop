import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Col, ListGroup, Row, Image, Card } from "react-bootstrap";
import Message from "../../components/Message";
import { getOrderDetails, payForOrder } from "../../actions/orderActions";
import Loader from "../../components/Loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import MpesaButton from "../../components/MpesaButton";
import { ORDER_PAYMENT_RESET } from "../../constants/orderConst";
import { getUsdToKesRate, kshToUsd } from "../../utils/currency";
import { format } from "date-fns";

const PAYPAL_CLIENT_ID =
  "BAAYc4GCs7eY70AvDMR8m-vcXyD8PzNoot-tvGD9LJ22qdkCSu3jWg1K9JZmRQTG4xOgxcNtil9CBjWrWk";

function OrderDetailsScreen({ match }) {
  const dispatch = useDispatch();

  const { orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;

  const payOrder = useSelector((state) => state.payOrder);
  const { loading: loadingPay, success: successPay } = payOrder;

  const itemPrice =
    !loading && !error
      ? order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      : 0;
  const [usdRate, setUsdRate] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    getUsdToKesRate().then(setUsdRate);
    dispatch({ type: ORDER_PAYMENT_RESET });
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId, successPay]);

  const successPaymentHandler = (paymentResults) => {
    dispatch(payForOrder(orderId, paymentResults));
  };
  const renderPaymentOptions = () => {
    if (order.paymentMethod === "M-Pesa") {
      return (
        <MpesaButton
          orderId={orderId}
          amount={order.totalPrice}
          onSuccess={successPaymentHandler}
        />
      );
    }

    if (!usdRate) {
      return <Loader />;
    }

    return (
      <PayPalScriptProvider
        options={{
          "client-id": PAYPAL_CLIENT_ID,
          currency: "USD",
        }}
      >
        <p className="text-muted small">
          ≈ ${kshToUsd(order.totalPrice, usdRate)} USD (charged in USD)
        </p>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: kshToUsd(order.totalPrice, usdRate),
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              successPaymentHandler(details);
            });
          }}
        />
      </PayPalScriptProvider>
    );
  };

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;
    if (!order.orderItems || order.orderItems.length === 0) {
      return <Message variant="danger">No order found.</Message>;
    }

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

                {order.isDelivered ? (
                  <Message variant={"success"}>
                    Delivered On {order.deliveredAt}
                  </Message>
                ) : (
                  <Message variant={"warning"}>Not yet Delivered</Message>
                )}
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
                      Paid on{" "}
                      {format(
                        new Date(order.paidAt),
                        "do MMMM yyyy 'at' h:mm a",
                      )}
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

                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {renderPaymentOptions()}
                  </ListGroup.Item>
                )}
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
