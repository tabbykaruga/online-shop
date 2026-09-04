import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';


function SearchBox() {
    const navigate = useNavigate()
    const location = useLocation();
    const [keyWord, setKeyWord] = useState("")

    const handleSearchHandler = (e) => {
        e.preventDefault()

        if (keyWord) {
            navigate(`/?keyword=${keyWord}`)
        } else {
            navigate(location.pathname)
        }
    }

    return (
        <Form onSubmit={handleSearchHandler} className="d-flex align-items-center">
            <Form.Control
                type="text"
                name='q'
                value={keyWord}
                onChange={(e) => setKeyWord(e.target.value)}
                className="me-3">
            </Form.Control>
            <Button
                type="submit"
                variant="outline-success"
                className="p-2">
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox
