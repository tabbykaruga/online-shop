import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  listProductDetails,
  updateProduct,
} from "../../../actions/productActions";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { PRODUCT_UPDATE_RESET } from "../../../constants/productConst";

function EditProductScreen() {
  const navigate = useNavigate();
  const dispacth = useDispatch();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const editProduct = useSelector((state) => state.editProduct);
  const {
    error: errorEditing,
    loading: loadingEdit,
    success: successEditing,
  } = editProduct;

  useEffect(() => {
    if (successEditing) {
      dispacth({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productList/");
    } else if (!product.name || product._id !== Number(id)) {
      dispacth(listProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispacth, product, id, navigate, successEditing]);

  const updateProductHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("category", category);
    formData.append("countInStock", countInStock);
    formData.append("description", description);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    dispacth(updateProduct(id, formData));
  };

  const uploadFileHandler = (e) => {
    const file = e.target.files[0]; // only takes the first file even if multiple selected
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file)); // local preview
    }
  };

  return (
    <div>
      <Link to="/admin/productList/">Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader></Loader>}
        {errorEditing && <Message variant="danger">{errorEditing}</Message>}

        <Form onSubmit={updateProductHandler}>
          <Form.Group controlId="name" className="py-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price" className="py-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image" className="py-3">
            <Form.Label>Image</Form.Label>
            {image && (
              <div className="mb-2">
                <img src={image} alt="preview" style={{ maxWidth: "150px" }} />
              </div>
            )}
            <Form.Control
              type="file"
              accept="image/*"
              onChange={uploadFileHandler}
            />
          </Form.Group>

          <Form.Group controlId="brand" className="py-3">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="countInStock" className="py-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="category" className="py-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="py-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Row className="py-3">
            <Col className="text-center">
              <Button type="submit" variant="primary">
                Update Product
              </Button>
            </Col>
          </Row>
          {loadingEdit && <Loader></Loader>}
        </Form>
      </FormContainer>
    </div>
  );
}

export default EditProductScreen;
