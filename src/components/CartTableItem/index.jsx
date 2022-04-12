import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import TrashIcon from "../../assets/trash-icon.png";
import PropType from "../../propTypes/CartTableItem";
import { useMutation } from "react-query";
import { API } from "../../services";
import { toast } from "react-toastify";

const CartTableItem = (props) => {
  const { no, id, product, qty, onQtyChange, onChange } = props;
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleQty = (type) => {
    onQtyChange({ id, type });
  };

  const { mutate: handleDelete } = useMutation(
    async () => {
      setShow(false);

      return await API.delete(`cart/${id}`);
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: () => {
        onChange();
      },
    }
  );

  return (
    <tr className={`border-botom-light-grey`}>
      <td>{no}</td>
      <td>
        <p
          className="text-light text-decoration-underline mb-0 cursor-pointer"
          onClick={() => setShowImage(true)}
        >
          {product.image_name}
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
        <div className="d-flex align-items-center">
          <Button
            className="text-light me-3"
            variant={"danger"}
            onClick={() => handleQty("DECREMENT")}
            disabled={qty <= 1}
          >
            -
          </Button>
          {qty}
          <Button
            className="text-light ms-3"
            variant={"success"}
            onClick={() => handleQty("INCREMENT")}
            disabled={qty >= product.stock}
          >
            +
          </Button>
        </div>
      </td>
      <td>
        <CurrencyFormat
          value={product.price * qty}
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
              {product.image_name}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={product.image_url}
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
