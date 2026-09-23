import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded h-100 d-flex flex-column" style={{ overflow: "hidden" }}>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          style={{ height: "200px", objectFit: "cover" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column flex-grow-1">
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3" className="mt-auto">
          KSh {Number(product.price).toLocaleString("en-KE")}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;