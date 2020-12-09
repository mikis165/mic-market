import React, { useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/userActions';
import { Link } from 'react-router-dom';



export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userTopSellersList = useSelector((state) => state.userTopSellersList);
  const {
    loading: loadingSellers,
    error: errorSellers,
    users: sellers,
  } = userTopSellersList;

  //console.log(`userTopSellersList ${JSON.stringify(userTopSellersList)}`);
  //console.log(`users ${JSON.stringify(userTopSellersList['users'])}`);

  useEffect(() => {
    dispatch(listProducts({}));
    dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo || 'data:image/png;base64,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'} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>

            ))}
          </Carousel>
        </>

        
      )}
      <h2>Featured Products</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
          <div className="row center">
            {products.map((product) => (
              <Product key={product._id} product={product}></Product>
            ))}
          </div>
        </>
      )}
    </div>
  );
}