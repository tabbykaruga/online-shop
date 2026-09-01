import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { createProduct } from "../../../actions/productActions";
import FormContainer from "../../../components/FormContainer";
import Loader from "../../../components/Loader";
import Message from "../../../components/Message";
import { PRODUCT_CREATE_RESET } from "../../../constants/productConst";

function CreateProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const addProduct = useSelector((state) => state.addProduct);
  const {
    error: errorCreating,
    loading: creatingProduct,
    success: successCreate,
    product: createdProduct,
  } = addProduct;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/admin/productList/`);
    }
  }, [dispatch, navigate, successCreate, createdProduct]);

  const uploadFileHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const createProductHandler = (e) => {
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

    dispatch(createProduct(formData));
  };

  return (
    <div>
      <Link to="/admin/productList/">Go Back</Link>
      <FormContainer>
        <h1>Create Product</h1>
        {errorCreating && <Message variant="danger">{errorCreating}</Message>}

        <Form onSubmit={createProductHandler}>
          <Form.Group controlId="name" className="py-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="price" className="py-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="image" className="py-3">
            <Form.Label>Image</Form.Label>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="preview"
                  style={{ maxWidth: "150px" }}
                />
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
            />
          </Form.Group>

          <Form.Group controlId="countInStock" className="py-3">
            <Form.Label>Count In Stock</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter count in stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category" className="py-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="description" className="py-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          {creatingProduct && <Loader />}
          <Row className="py-3">
            <Col className="text-center">
              <Button type="submit" variant="primary">
                Create Product
              </Button>
            </Col>
          </Row>
        </Form>
      </FormContainer>
    </div>
  );
}

export default CreateProductScreen;
