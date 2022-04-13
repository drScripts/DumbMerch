import { Table } from "react-bootstrap";
import { ProductTableItem } from "../../components";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const ProductTable = () => {
  const { data: products, refetch } = useQuery(
    "productChace",
    async () => {
      const { data } = await API.get("/products/all");

      return data.data.products;
    },
    {
      onError: (err) => {
        const message = err?.response?.data?.message || err.message;
        toast.error(message);
      },
    }
  );

  const onChange = () => {
    refetch();
  };

  return (
    <Table responsive striped hover variant="dark" className="mt-3">
      <thead>
        <tr>
          <th>No</th>
          <th>Photo</th>
          <th>Product Name</th>
          <th>Product Desc</th>
          <th>Price</th>
          <th>Qty</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {products?.map((val, i) => (
          <ProductTableItem
            description={val.description}
            fileLink={val.image_url}
            fileName={val.image_name}
            name={val.name}
            price={val.price}
            id={val.id}
            no={i + 1}
            stock={val.stock}
            key={val.id}
            onChange={onChange}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
