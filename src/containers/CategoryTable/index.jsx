import { Table } from "react-bootstrap";
import { CategoryTableItem } from "../../components";
import { API } from "../../services";
import { toast } from "react-toastify";
import { useQuery } from "react-query";

const CategoryTable = () => {
  const { data: categories, refetch } = useQuery(
    "categoriesChace",
    async () => {
      const { data } = await API.get("/categories");
      return data.data.categories;
    },
    {
      onError: (err) => {
        toast.error(err?.response?.data?.message);
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
          <th>Category Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((val, i) => (
          <CategoryTableItem
            id={val.id}
            name={val.name}
            no={i + 1}
            key={val.id}
            onChange={onChange}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default CategoryTable;
