import { ReactComponent as SearchIcon } from 'assets/images/search-icon.svg';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';
import { Category } from 'types/category';
import { requestBackend } from 'util/requests';
import './styles.css';

type ProductFilterData = {
  name: string;
  category: Category;
};

const ProductFilter = () => {
  const [selectCategories, setSelectCategories] = useState<Category[]>([]);
  
  const {
    register,
    handleSubmit,
    control,
  } = useForm<ProductFilterData>();

  const onsubmit = (formData: ProductFilterData) => {
    console.log('Enviou', formData);
  };

  useEffect(() => {
    requestBackend({ url: '/categories' }).then((response) => {
      setSelectCategories(response.data.content);
    });
  }, []);


  return (
    <div className="base-card product-filter-container">
      <form onSubmit={handleSubmit(onsubmit)} className="product-filter-form">
        <div className="product-filter-name-container">
          <input
            {...register('name')}
            type="text"
            name="name"
            placeholder="Nome do produto"
            className="form-control"
          />
          <button className='product-filter-button-search-icon'>
            <SearchIcon />
          </button>
        </div>
        <div className="product-filter-bottom-container">
          <div className="product-filter-category-container">
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  isClearable
                  classNamePrefix='product-filter-select'
                  placeholder="Categoria"
                  options={selectCategories}
                  getOptionLabel={(category: Category) => category.name}
                  getOptionValue={(category: Category) => String(category.id)}
                />
              )}
            />
          </div>
          <button className="btn btn-outline-secondary btn-product-filter-clear">LIMPAR<span className='btn-product-filter-show'> FILTRO</span></button>
        </div>
      </form>
    </div>
  );
};

export default ProductFilter;