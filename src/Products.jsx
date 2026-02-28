import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* 👉 Fetch products */
  useEffect(() => {
    fetch("http://localhost:3001/get-products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  /* 👉 Create Product */
  const handleCreate = () => {
    alert("Create Product clicked");
    // later → open modal or redirect to Shopify admin
  };

  /* 👉 Edit Product */
  const handleEdit = (id) => {
    alert("Edit Product ID: " + id);
    // later → open edit page
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="product-page">
      <div className="header">
        <h1>Shop Products</h1>
        <button className="create-btn" onClick={handleCreate}>
          + Create New Product
        </button>
      </div>

      <div className="product-grid">
        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img
              src={
                p.image?.src ||
                "https://via.placeholder.com/250x200?text=No+Image"
              }
              alt={p.title}
            />

            <h3>{p.title}</h3>

            <p className="price">
              ₹ {p.variants?.[0]?.price || "0.00"}
            </p>

            <button
              className="edit-btn"
              onClick={() => handleEdit(p.id)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}