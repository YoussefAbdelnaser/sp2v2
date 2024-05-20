/* eslint-disable prettier/prettier */
import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    topOffer?: boolean;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <Link href={`/products/${product._id}`}>
        <img src={`/images/${product._id}.jpg`} alt={product.name} />
        <h2>{product.name}</h2>
        <p className="price">${product.price}</p>
        {product.discount && (
          <p className="discount">{product.discount}% off</p>
        )}
      </Link>
    </div>
  );
};

export default ProductCard;
