import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import TrashIcon from "../../assets/trash-icon.png";
import PropType from "../../propTypes/CartTableItem";

const CartTableItem = (props) => {
  const { no, id, product, qty, onQtyChange } = props;

  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(qty);
  const [showImage, setShowImage] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleQty = (type) => {
    if (type === "DECREMENT") {
      if (quantity > 1) {
        setQuantity(quantity - 1);
        onQtyChange(id, quantity - 1);
      }
    } else {
      setQuantity(quantity + 1);
      onQtyChange(id, quantity + 1);
    }
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
          {product.fileName}
        </p>
      </td>
      <td>{product.name}</td>
      <td>
        <CurrencyFormat
          value={product.price}
          thousandSeparator={true}
          prefix={"Rp. "}
          displayType="text"
        />
      </td>
      <td>
        <Button
          className="text-light me-3"
          variant={"danger"}
          onClick={() => handleQty("DECREMENT")}
        >
          -
        </Button>
        {quantity}
        <Button
          className="text-light ms-3"
          variant={"success"}
          onClick={() => handleQty("INCREMENT")}
        >
          +
        </Button>
      </td>
      <td>
        <CurrencyFormat
          value={product.price * quantity}
          thousandSeparator={true}
          prefix={"Rp. "}
          displayType="text"
        />
      </td>
      <td>
        <Button variant="danger" onClick={handleShow}>
          <img src={TrashIcon} alt="delete" width={24} height={24} />
        </Button>

        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <Modal.Header closeButton>
            <Modal.Title>Delete Data</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this item?</Modal.Body>
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
              {product.fileName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={product.fileLink}
              alt={product.name}
              height={450}
              className="w-100"
            />
          </Modal.Body>
        </Modal>
      </td>
    </tr>
  );
};

CartTableItem.propTypes = PropType;

export default CartTableItem;
