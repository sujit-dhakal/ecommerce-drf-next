import axios from "axios";
import ProductList from "@/components/products/ProductList";

const fetchData = async () => {
  const response = await axios.get("http://127.0.0.1:8000/products/");
  const products = response.data;
  return products;
};
const page = async () => {
  const products = await fetchData();
  return (
    <div>
      <ProductList products={products} />
    </div>
  );
};

export default page;
