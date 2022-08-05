import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import './styles.css';

const ProductFilter = () => {
  return (
    <div className="base-card product-filter-container">
      <form className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            type="text"
            placeholder="Nome do produto"
            className="form-control"
          />
          <SearchIcon />
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <select name="" id="">
              <option>Livros</option>
            </select>
          </div>
          <button className="btn btn-outline-secondary">Pesquisar</button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;
