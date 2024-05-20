  /* eslint-disable prettier/prettier */
  import ProductCard from './ProductCard';

  interface ProductListProps {
    products: {
      _id: string;
      name: string;
      price: number;
      originalPrice?: number;
      discount?: number;
      topOffer?: boolean;
    }[];
  }

  const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    );
  };

  export default ProductList;
