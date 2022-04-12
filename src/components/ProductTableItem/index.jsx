import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { useMutation } from "react-query";
import { API } from "../../services";
import { toast } from "react-toastify";
const Index = ({
  no = "#",
  fileName,
  fileLink,
  name,
  description,
  price,
  stock,
  id,
  onChange,
}) => {
  const [show, setShow] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const { mutate: handleDelete } = useMutation(
    async () => {
      setShow(false);

      return await API.delete(`/product/${id}`);
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
          className="ellipsis max-line-3 text-light text-decoration-underline mb-0 cursor-pointer"
          onClick={() => setShowImage(true)}
        >
          {fileName}
        </p>
      </td>
      <td>
        <p className="ellipsis max-line-4">{name}</p>
      </td>
      <td>
        <p className="ellipsis max-line-4 text-justify">{description}</p>
      </td>
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
        <Link to={`/admin/product/${id}`}>
          <Button variant="success" className={`button-table`}>
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          onClick={handleShow}
          className={`button-table mt-md-3`}
        >
          Delete
        </Button>
      </td>
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
    </tr>
  );
};

export default Index;
