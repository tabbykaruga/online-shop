import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import Message from "../../../components/Message";
import Loader from "../../../components/Loader";
import { listProducts, deleteProduct } from "../../../actions/productActions";

function ProductsListScreen() {
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.deleteProduct);
  const {
    loading: deletingProduct,
    error: errorDeleting,
    success: successDelete,
  } = productDelete;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate("/login");
    } else {
      dispacth(listProducts());
    }
  }, [dispacth, navigate, userInfo, successDelete]);

  const deleteProductHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispacth(deleteProduct(id));
    }
  };

  const addProductHandler = (product) => {
    navigate("/admin/product/create");
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Message variant={"danger"}>{error}</Message>}

      <Row className="align-items-center">
        <Col>
          <h1>PRODUCTS</h1>
        </Col>
        <Col className="text-end">
          <Button className="my-3" onClick={addProductHandler}>
            <i className="fas fa-plus"></i> add a product
          </Button>
        </Col>
      </Row>

      {deletingProduct && <Loader />}
      {errorDeleting && <Message variant={"danger"}>{errorDeleting}</Message>}
      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>CATEGORY</th>
            <th>BRAND</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>KSH {Number(product.price).toLocaleString("en-KE")}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="primary" className="btn-sm">
                    <i className="fas fa-edit"></i>
                  </Button>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="btn-sm"
                  onClick={() => deleteProductHandler(product._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductsListScreen;
