import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { getOrderLists } from "../../../actions/orderActions";
import { format } from "date-fns";

function OrderListScreen() {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    } else {
      dispacth(getOrderLists());
    }
  }, [dispacth, navigate, userInfo]);

  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant={"danger"}>{error}</Message>}
      <h1>ORDERS</h1>
      <Table
        striped
        bordered
        hover
        responsive
        className="table-sm text-center align-middle"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>USER</th>
            <th>DATE</th>
            <th>PAID</th>
            <th>DELIVERED</th>
            <th>TOTAL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.user?.name}</td>
              <td>{order.paymentMethod}</td>
              <td>
                {order.isPaid ? (
                  format(new Date(order.paidAt), "d/MM/yy ")
                ) : (
                  <i className="fas fa-close" style={{ color: "red" }}></i>
                )}
              </td>
              <td>
                {order.isDelivered ? (
                  format(new Date(order.deliveredAt), "d/MM/yy ")
                ) : (
                  <i className="fas fa-close" style={{ color: "red" }}></i>
                )}
              </td>
              <td>KSH {Number(order.totalPrice).toLocaleString("en-Ke")}</td>
              <td>
                <LinkContainer to={`/orders/${order._id}`}>
                  <Button variant="primary" className="btn-sm">
                    Details
                  </Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default OrderListScreen;
