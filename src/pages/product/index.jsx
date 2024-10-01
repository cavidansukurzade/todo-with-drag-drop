import { useParams } from "react-router";

const Product = () => {
  const params = useParams();
  return <h1 className="container">{params.productId}</h1>;
};

export default Product;
