import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getUserDeatils, updateUserProfile } from "../../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../../constants/userConst";
import { getUserOrderList } from "../../actions/orderActions";

function ProfileScreen() {
  const navigate = useNavigate();
  const dispacth = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  //to ensure user is logged in
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //update user info and return success
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const userOrderList = useSelector((state) => state.userOrderList);
  const { loading: loadingOrders, error: orderError, orders } = userOrderList;

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else if (!user?.name || success) {
      dispacth({ type: USER_UPDATE_PROFILE_RESET });
      dispacth(getUserDeatils("profile"));
      dispacth(getUserOrderList());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispacth, navigate, userInfo, user._id, success, user.name, user.email]);

  const getProfileHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordMsg("Passwords do not match!");
    } else {
      setConfirmPasswordMsg("");
      dispacth(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        }),
      );
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}

        <Form onSubmit={getProfileHandler}>
          <Form.Group controlId="name" className="py-3">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              required
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confrimPassword" className="py-3">
            <Form.Label> Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {confirmPasswordMsg && (
            <Message variant={"danger"}> {confirmPasswordMsg}</Message>
          )}
          <Row className="py-3">
            <Col className="text-center">
              <Button type="submit" variant="primary">
                Update Profile
              </Button>
            </Col>
          </Row>
          {success && (
            <Message variant={"primary"}>Password Changed Successfully</Message>
          )}
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
        {loadingOrders && <Loader />}
        {orderError && <Message variant={"danager"}>{orderError}</Message>}

        <Table striped responsive className="table-sm">
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>KSH {Number(order.totalPrice).toLocaleString("en-KE")}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button className="btn-sm">Details</Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
