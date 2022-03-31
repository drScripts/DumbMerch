import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
const Index = ({
  no = "#",
  fileName,
  fileLink,
  name,
  description,
  price,
  stock,
  id,
}) => {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleDelete = () => {
    setShow(false);
    console.log(id);
  };

  return (
    <tr className={`border-botom-light-grey`}>
      <td>{no}</td>
      <td>
        <p
          className="text-light text-decoration-underline mb-0 cursor-pointer"
          onClick={() => setShowImage(true)}
        >
          {fileName}
        </p>
      </td>
      <td>{name}</td>
      <td>{description}</td>
      <td>
        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"Rp. "}
        />
      </td>
      <td>{stock}</td>
      <td>
        <Link to={`/admin/product/${2}`}>
          <Button variant="success" className={`button-table`}>
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          onClick={handleShow}
          className={`button-table ms-md-3`}
        >
          Delete
        </Button>

        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Delete Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to elete this data?</Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleDelete}>
              Yes
            </Button>
            <Button variant="danger" onClick={handleClose}>
              No
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          size="lg"
          show={showImage}
          onHide={() => setShowImage(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              {fileName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img src={fileLink} alt={name} height={450} className="w-100" />
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  );
};

export default Index;
