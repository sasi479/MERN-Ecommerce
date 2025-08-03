import React, { useEffect, useState } from "react";
import {  useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom"; 

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders",{
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setOrders(response.data);
      } catch (error) {
        toast.error("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusBadge = (status) => {
    const variants = {
      pending: "warning",
      processing: "info",
      shipped: "primary",
      delivered: "success",
    };
    return <span className={`badge bg-${variants[status]}`}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="container my-5 text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4 text-center">My Orders</h2>
          {orders.length === 0 ? (
            <div className="text-center p-5 bg-light rounded">
              <i className="fas fa-shopping-bag fa-3x mb-3 text-muted"></i>
              <p className="lead">No orders found</p>
            </div>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div key={order._id} className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-white d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Order #{order._id.slice(-6)}</h5>
                      {getStatusBadge(order.status)}
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <small className="text-muted">Ordered on</small>
                        <p className="mb-0">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="mb-3">
                        <small className="text-muted">Items</small>
                        <div className="list-group list-group-flush">
                          {order.items.map((item, id) => (
                            <div
                              key={id}
                              className="list-group-item px-0 d-flex justify-content-between align-items-center"
                            >
                              <div className="d-flex align-items-center gap-3 w-75">
                              <Link to={`/product/${item.productId}`}>
                                  <img
                                    src={item.image}
                                    alt={item.title}
                                    className="rounded"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "contain",
                                    }}
                                  />
                                </Link>
                                <div>
                                  <Link
                                    to={`/product/${item.productId}`}
                                    className="text-decoration-none text-dark"
                                  >
                                    <p className="mb-0 text-truncate w-75">
                                      {item.title}
                                    </p>
                                  </Link>
                                  <small className="text-muted">
                                    Qty: {item.quantity}
                                  </small>
                                </div>
                              </div>
                              <div>
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between">
                          <h6 className="mb-0">Total Amount</h6>
                          <h6 className="mb-0">
                            ${order.totalAmount.toFixed(2)}
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Orders;
