import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Message from "./Message";

function MpesaButton({ orderId, amount, onSuccess }) {
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("idle"); // idle | requesting | pending | error
  const [error, setError] = useState(null);

  const handlePay = async () => {
    setStatus("requesting");
    setError(null);
    try {
      const { data } = await axios.post(`/api/orders/${orderId}/pay-mpesa/`, {
        phone,
        amount,
      });
      setStatus("pending");
      // You'll likely need to poll or use a webhook-driven status check here
      // e.g. poll /api/orders/{orderId}/mpesa-status/ every few seconds
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Label>M-Pesa Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="2547XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </Form.Group>

      <Button
        variant="success"
        onClick={handlePay}
        disabled={status === "requesting" || status === "pending" || !phone}
      >
        {status === "pending" ? "Check your phone..." : "Pay with M-Pesa"}
      </Button>

      {status === "error" && <Message variant="danger">{error}</Message>}
      {status === "pending" && (
        <Message variant="info">
          Enter your M-Pesa PIN on your phone to complete payment.
        </Message>
      )}
    </div>
  );
}

export default MpesaButton;
