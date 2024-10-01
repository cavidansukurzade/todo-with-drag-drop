import { Link, Outlet } from "react-router-dom";

const Products = () => {
  const products = [1, 2, 3];
  return (
    <div className="container">
      {products.map((item) => (
        <div key={item}>
          <Link to={`/products/${item}`}> Product {item}</Link>
        </div>
      ))}
      <Outlet />
    </div>
  );
};

export default Products;
