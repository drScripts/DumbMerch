import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { CategoryTableItem } from "../../components";

const mockCategory = [
  {
    id: 1,
    name: "Mouse",
  },
  {
    id: 2,
    name: "Keyboard",
  },
  {
    id: 3,
    name: "Bag",
  },
  {
    id: 4,
    name: "Stationary",
  },
  {
    id: 5,
    name: "Doll",
  },
  {
    id: 6,
    name: "Pillow",
  },
];

const Index = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setCategories(mockCategory);
  }, []);
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
        {categories.map((val, i) => (
          <CategoryTableItem
            id={val.id}
            name={val.name}
            no={i + 1}
            key={val.id}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default Index;
