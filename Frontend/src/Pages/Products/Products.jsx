import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../../Store/productSlice";
import ProductCard from "../../Components/ProductCard/ProductCard";
import "./Products.css";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const { items: products, status, error } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const dispatch = useDispatch();

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          (!categoryFilter || product.category === categoryFilter) &&
          (product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name-asc") return a.title.localeCompare(b.title);
        if (sortBy === "name-desc") return b.title.localeCompare(a.title);
        return 0;
      });
  }, [products, categoryFilter, searchTerm, sortBy]);

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  if (status === "loading") {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container py-5 text-center text-danger">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container pb-4">
      <div className="row py-3 justify-content-center">
        <div className="col-md-4">
          <input
            type="search"
            className="form-control shadow-sm"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select shadow-sm"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="">Sort by...</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>
      <div className="row g-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className="col-sm-6 col-md-4 col-lg-3">
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No products match your search or filters.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
