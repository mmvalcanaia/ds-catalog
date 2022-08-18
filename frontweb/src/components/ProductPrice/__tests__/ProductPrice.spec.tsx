import { render, screen } from "@testing-library/react";
import ProductPrice from "..";
import '@testing-library/jest-dom';

test('should render ProductPrice', () => {
    const price = 100.5;

    render(<ProductPrice price={price} />);
    
    expect(screen.getByText('R$')).toBeInTheDocument();
    expect(screen.getByText('100,50')).toBeInTheDocument();

})