import { AxiosRequestConfig } from 'axios';
import Pagination from 'components/Pagination';
import ProductCard from 'components/ProductCard';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Product } from 'types/product';
import { SpringPage } from 'types/vendor/spring';
import { requestBackend } from 'util/requests';
import CardLoader from './CardLoader';

import './styles.css';

type urlParams = {
  productId: string;
};

const Catalog = () => {
  const {productId} = useParams<urlParams>();
  const [page, setPage] = useState<SpringPage<Product>>();
  const [isLoading, setIsLoading] = useState(false);

  const getProducts = (pageNumber: number) => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: '/products',
      params: {
        page: pageNumber,
        size: 12,
      },
    };

    setIsLoading(true);
    requestBackend(params)
      .then((response) => {
        setPage(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProducts(0);
  }, []);

  return (
    <div className="container my-4 catalog-container">
      <div className="row catalog-title-container">
        <h1>Catálogo de produtos</h1>
      </div>
      <div className="row">
        {isLoading ? (
          <CardLoader />
        ) : (
          page?.content.map((product) => {
            return (
              <div className="col-sm-6 col-lg-4 col-xl-3" key={product.id}>
                <Link to={`/products/${productId}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            );
          })
        )}
      </div>
      <div className="row">
        <Pagination
          pageCount={page ? page.totalPages : 0}
          range={3}
          onChange={getProducts}
        />
      </div>
    </div>
  );
};

export default Catalog;
