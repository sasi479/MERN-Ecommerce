import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../Store/cartSlice";
import { toggleWishlist } from "../../Store/wishlistSlice";

const ProductCard=({ product }) =>{
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <div className="card h-100">
        <Link to={`/product/${product.id}`} state={product}>
          <img
            src={product.image}
            className="card-img-top p-3"
            alt={product.title}
            style={{ height: "200px", objectFit: "contain" }}
          />
        </Link>
      <div className="card-body d-flex flex-column">
        <Link to={`/product/${product.id}`} state={product}>
          <h5 className="reset-a card-title text-truncate">{product.title}</h5>
        </Link>
        <p className="card-text text-truncate">{product.description}</p>
        <p className="fs-5 fw-bold mb-0 text-center mb-1">${product.price}</p>
        <div className="product-rating text-center mb-3">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="d-flex gap-2">
          <button
            className="cart-btn btn w-100  text-white"
            onClick={() => dispatch(addToCart(product))}
          >
            <i className="fa fa-shopping-cart"></i>
            <span className="mx-2">Add To Cart</span>
          </button>
          <button
            className={`btn ${
              isWishlisted ? "btn-danger" : "btn-outline-danger"
            } `}
            onClick={() => dispatch(toggleWishlist(product))}
          >
            <i
              className={` fa-heart ${
                isWishlisted ? "fa-solid" : "fa-regular"
              }`}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
