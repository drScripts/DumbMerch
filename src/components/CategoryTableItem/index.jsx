import { useState } from "react";
import PropType from "../../propTypes/CategoryTableItem";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { API } from "../../services";
import { useMutation } from "react-query";

const CategoryTableItem = (props) => {
  const { no, name, id, onChange } = props;

  const [show, setShow] = useState(false);

  const { mutate: handleDelete } = useMutation(
    async () => {
      setShow(false);

      return await API.delete(`/category/${id}`);
    },
    {
      onSuccess: () => {
        onChange();
      },
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };
  return (
    <tr className={`border-botom-light-grey`}>
      <td>{no}</td>
      <td>{name}</td>
      <td>
        <Link to={`/admin/category/${id}`}>
          <Button variant="success" className={`button-table`}>
            Edit
          </Button>
        </Link>
        <Button
          variant="danger"
          className={`button-table ms-md-3`}
          onClick={handleShow}
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
        <Modal.Body>Are you sure want to delete this data?</Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleDelete}>
            Yes
          </Button>
          <Button variant="danger" onClick={handleClose}>
            No
          </Button>
        </Modal.Footer>
      </Modal>
    </tr>
  );
};
CategoryTableItem.propTypes = PropType;

export default CategoryTableItem;
