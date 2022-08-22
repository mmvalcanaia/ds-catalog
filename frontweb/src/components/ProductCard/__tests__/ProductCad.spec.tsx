import { render, screen } from "@testing-library/react"
import ProductCard from "..";
import { Product } from "types/product";

test('should render ProductCard', () =>{
    const product : Product =  {
        "id": 3,
        "name": "Macbook Pro TestCase",
        "price": 1250.0,
        "imgUrl": "https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/3-big.jpg"
    } as Product;

    render(<ProductCard product={product} />);
    
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByAltText(product.name)).toBeInTheDocument();
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('1.250,00')).toBeInTheDocument();
})