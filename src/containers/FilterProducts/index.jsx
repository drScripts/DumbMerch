import React, { useState, useEffect } from "react";
import {
  Button,
  Col,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import { API } from "../../services";
import { toast } from "react-toastify";

const FilterProducts = ({ onChange, onSearch }) => {
  const [categories, setCategories] = useState([]);

  const onChangeHandler = (e) => {
    if (e.target.value) {
      onChange({ [e.target.name]: e.target.value });
    } else {
      onChange({ [e.target.name]: "null" });
    }
  };

  const onSearchKey = (e) => {
    if (e.code === "Enter") {
      onSearch();
    }
  };

  const getCategories = async () => {
    const { data, message, status } = await API.get("/categories").catch(
      (err) => {
        const responses = err.response;
        return {
          message: responses.data.message,
          status: responses.status,
        };
      }
    );

    if (status === 200) {
      setCategories(data.data.categories);
    } else {
      toast.error(message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Row>
      <Col sm={11} xs={10}>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Search Product"
            aria-label="Search Product"
            aria-describedby="basic-addon2"
            className="bg-semi-dark-grey outline-none text-light brr-none"
            name="q"
            onChange={onChangeHandler}
            onKeyDown={onSearchKey}
          />
          <InputGroup.Text
            id="basic-addon2"
            className="bg-semi-dark-grey text-light pe-3"
            onClick={onSearch}
          >
            <i className="bi bi-search"></i>
          </InputGroup.Text>
        </InputGroup>
      </Col>
      <Col sm={1} xs={2}>
        <Dropdown>
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            <i className="bi bi-sliders text-light"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu className="medium-width" variant="dark">
            <Dropdown.Header>Filters Product</Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.ItemText>
              <Row>
                <Col>
                  <Form.Group className="mb-3 " controlId="startPrice">
                    <Form.Label>Start Price</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Start Price"
                      className="bg-semi-dark-grey text-light"
                      name="start"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="endPrice">
                    <Form.Label>End Price</Form.Label>
                    <Form.Control
                      type="number"
                      className="bg-semi-dark-grey text-light"
                      placeholder="End Price"
                      name="end"
                      onChange={onChangeHandler}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Dropdown.ItemText>
            <Dropdown.ItemText>
              <Form.Group className="mb-3" controlId="endPrice">
                <Form.Label>End Price</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="bg-semi-dark-grey text-light"
                  name="category"
                  onChange={onChangeHandler}
                >
                  <option value="">Select Categories</option>
                  {categories.map((category, index) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Dropdown.ItemText>
            <Dropdown.Divider />
            <Dropdown.ItemText className="text-end">
              <Button variant="success" onClick={onSearch}>
                Apply Filter
              </Button>
            </Dropdown.ItemText>
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default FilterProducts;
