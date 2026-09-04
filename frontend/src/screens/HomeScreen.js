import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { useLocation } from 'react-router-dom';

function HomeScreen() {
  const dispatch = useDispatch();
  const location = useLocation();

  const productList = useSelector((state) => state.productList);
  //desctruture the payload which we get from state
  const { error, loading, products } = productList;
  const keyword = location.search

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  const renderContent = () => {
    if (loading) return <Loader />;
    if (error) return <Message variant="danger">{error}</Message>;

    return (
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>
    );
  };

  return (
    <div>
      <h1>Latest Products</h1>
      {renderContent()}
    </div>
  );
}

export default HomeScreen;
