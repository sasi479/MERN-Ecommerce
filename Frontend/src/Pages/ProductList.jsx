import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const baseUrl = import.meta.env.VITE_BASE_URL;

function ProductList() {
  const [products, setProducts] = useState([]);
  const { user, token } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  useEffect(() => {
    if (!user || user.role !== "admin") {
      toast.error("Access denied");
      navigate("/");
    } else {
      fetchProducts();
    }
  }, []);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/products`);
      setProducts(res.data);
    } catch {
      toast.error("Failed to fetch products");
    }
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this product?")) return;
    try {
      await axios.delete(`${baseUrl}/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Product deleted");
      fetchProducts();
    } catch {
      toast.error("Delete failed");
    }
  };
  return (
    <div className="container my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product Management</h2>
        <Link to="/admin/products/new" className="btn btn-success">
          + Add Product
        </Link>
      </div>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod._id}>
              <td>
                <img
                  src={`${baseUrl}/${prod.image}`}
                  alt="product"
                  width="60"
                />
              </td>
              <td>{prod.title}</td>
              <td>&#8377;{prod.price}</td>
              <td>{prod.stock}</td>
              <td>{prod.category}</td>
              <td>
                <Link
                  to={`/product/${prod._id}`}
                  className="btn btn-sm btn-info me-2"
                >
                  View
                </Link>
                <Link
                  to={`/admin/products/edit/${prod._id}`}
                  className="btn btn-sm btn-warning me-2"
                >
                  Edit
                </Link>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(prod._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default ProductList;
