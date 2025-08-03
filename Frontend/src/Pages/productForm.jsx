
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/products/${id}`);
      setForm({ ...res.data, image: null });

      if (res.data.image) {
        setPreviewImage(`http://localhost:3000/${res.data.image}`);
      }
    } catch {
      toast.error("Failed to load product");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      const file = files[0];
      setPreviewImage(URL.createObjectURL(file));
      setForm((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (let key in form) {
      if (form[key]) formData.append(key, form[key]);
    }

    try {
      if (id) {
        await axios.put(`http://localhost:3000/api/products/${id}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product updated");
      } else {
        await axios.post("http://localhost:3000/api/products", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Product created");
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Save failed");
    }
  };

  return (
    <div className="container my-5 ">
      <div className="card mb-4">
        <div className="card-header">
          <h2>{id ? "Edit Product" : "Add Product"}</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="form-control"
                rows="3"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Category</label>
              <input
                type="text"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Image 
              </label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control"
                accept="image/*"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-thumbnail mt-2"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>

            <button className="btn btn-primary">
              {id ? "Update" : "Create"} Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
