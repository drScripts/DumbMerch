import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Navbar } from "../../containers";
import { ProductCard } from "../../components";

const mockProductList = [
  {
    id: 1,
    productName: "Mouse",
    productPrice: 500000,
    productStock: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:
      "- Wireless Mouse\n- Konektivitas wireless 2.4 GHz\n- Jarak wireless hingga 10 m\n- Plug and Play\n- Baterai tahan hingga 12 bulan\nMouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.",
  },
  {
    id: 2,
    productName: "Keyboard",
    productPrice: 700000,
    productStock: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:
      "- Wireless Mouse\n- Konektivitas wireless 2.4 GHz\n- Jarak wireless hingga 10 m\n- Plug and Play\n- Baterai tahan hingga 12 bulan\nMouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.",
  },
  {
    id: 3,
    productName: "Keyboard",
    productPrice: 700000,
    productStock: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:
      "- Wireless Mouse\n- Konektivitas wireless 2.4 GHz\n- Jarak wireless hingga 10 m\n- Plug and Play\n- Baterai tahan hingga 12 bulan\nMouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.",
  },
  {
    id: 4,
    productName: "Keyboard",
    productPrice: 700000,
    productStock: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:
      "- Wireless Mouse\n- Konektivitas wireless 2.4 GHz\n- Jarak wireless hingga 10 m\n- Plug and Play\n- Baterai tahan hingga 12 bulan\nMouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.",
  },
  {
    id: 5,
    productName: "Keyboard",
    productPrice: 700000,
    productStock: 600,
    imageUrl:
      "https://images.unsplash.com/photo-1560762484-813fc97650a0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    description:
      "- Wireless Mouse\n- Konektivitas wireless 2.4 GHz\n- Jarak wireless hingga 10 m\n- Plug and Play\n- Baterai tahan hingga 12 bulan\nMouse Wireless Alytech AL - Y5D, hadir dengan desain 3 tombol mouse yang ringan dan mudah dibawa. Mouse ini menggunakan frekuensi radio 2.4GHz (bekerja hingga jarak 10m) dan fitur sensor canggih optik pelacakan dengan penerima USB yang kecil. Mouse ini didukung oleh 1x baterai AA (hingga 12 bulan hidup baterai). mendukung sistem operasi Windows 7,8, 10 keatas, Mac OS X 10.8 atau yang lebih baru dan sistem operasi Chrome OS.",
  },
];

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(mockProductList);
  }, []);

  return (
    <section className="dark-body pb-3">
      <Navbar />
      <Container className="mt-5">
        <h2 className="text-orange mb-3">Product</h2>
        <Row>
          {products.map((product, i) => (
            <Col md={3} className="mb-3" key={product.id}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
