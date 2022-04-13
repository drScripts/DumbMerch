import React, { useState, useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { CartTableItem } from "../../components";
import CurrencyFormat from "react-currency-format";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "react-query";
import { API } from "../../services";
import { toast } from "react-toastify";
import { UserContext } from "../../Context/UserContext";

const CartTable = () => {
  const [total, setTotal] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [userState, dispatch] = useContext(UserContext);

  const countTotal = (carts) => {
    let totalNow = 0;
    carts?.forEach((val, i) => {
      totalNow += val.product.price * val.qty;
    });
    setTotal(totalNow);
  };

  const { data: carts, refetch } = useQuery(
    "cartChace",
    async () => {
      const { data } = await API.get("carts");
      return data.data.carts;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
      onSuccess: (data) => {
        dispatch({
          type: "UPDATE_CART_COUNT",
          payload: {
            carts: data,
          },
        });
        countTotal(data);
      },
    }
  );

  const onChange = () => {
    refetch();
  };

  const { mutate: updateCarts } = useMutation(
    async (args) => {
      const { id, type } = args;

      const body = JSON.stringify({ quantity: 1, event: type.toLowerCase() });

      return await API.patch(`cart/${id}`, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
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
    <Table responsive striped hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th className="w-25">Photo</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Subtotal</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {carts?.length <= 0 ? (
          <tr>
            <td className="text-center" colSpan={7}>
              No Data
            </td>
          </tr>
        ) : (
          carts?.map((val, i) => (
            <CartTableItem
              no={i + 1}
              id={val.id}
              product={val.product}
              qty={val.qty}
              key={val.id}
              onQtyChange={updateCarts}
              onChange={onChange}
            />
          ))
        )}
      </tbody>
      <tfoot>
        <tr>
          <th>Total</th>
          <th colSpan={3}></th>
          <th colSpan={2} className="text-end">
            <CurrencyFormat
              value={total}
              prefix={"Rp. "}
              thousandSeparator={true}
              displayType={"text"}
            />
          </th>
          <th>
            {carts?.length <= 0 ? (
              <Button
                disabled={carts?.length <= 0}
                variant="success"
                className="text-light"
              >
                Checkout
              </Button>
            ) : (
              <Link to="/checkout">
                <Button variant="success" className="text-light">
                  Checkout
                </Button>
              </Link>
            )}
          </th>
        </tr>
      </tfoot>
    </Table>
  );
};

export default CartTable;
