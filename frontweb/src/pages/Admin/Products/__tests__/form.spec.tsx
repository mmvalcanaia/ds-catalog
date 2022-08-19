import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router, useParams } from 'react-router-dom';
import selectEvent from 'react-select-event';
import { ToastContainer } from 'react-toastify';
import history from 'util/history';
import Form from '../Form';
import { productResponse, server } from './fixtures';
import '@testing-library/jest-dom';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('Product form create tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: 'create',
    });
  });

  test('Should show toast and redirect when form submited correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />
      </Router>
    );
    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    await selectEvent.select(categoriesInput, ['Eletronicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computador de última geração');

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso!');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');
  });

  test('Should show five error messages when submiting empty form', async () => {
    render(
      <Router history={history}>
        <Form />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });
  });

  test('Should clear validation messages when filling in form', async () => {
    render(
      <Router history={history}>
        <Form />
      </Router>
    );

    const submitButton = screen.getByRole('button', { name: /salvar/i });
    userEvent.click(submitButton);

    await waitFor(() => {
      const messages = screen.getAllByText('Campo obrigatório');
      expect(messages).toHaveLength(5);
    });

    const nameInput = screen.getByTestId('name');
    const priceInput = screen.getByTestId('price');
    const imgUrlInput = screen.getByTestId('imgUrl');
    const descriptionInput = screen.getByTestId('description');
    const categoriesInput = screen.getByLabelText('Categorias');

    selectEvent.select(categoriesInput, ['Eletronicos', 'Computadores']);
    userEvent.type(nameInput, 'Computador');
    userEvent.type(priceInput, '5000.12');
    userEvent.type(
      imgUrlInput,
      'https://raw.githubusercontent.com/devsuperior/dscatalog-resources/master/backend/img/4-big.jpg'
    );
    userEvent.type(descriptionInput, 'Computador de última geração');

    await waitFor(() => {
      const messages = screen.queryAllByText('Campo obrigatório');
      expect(messages).toHaveLength(0);
    });
  });
});

describe('Product form update tests', () => {
  beforeEach(() => {
    (useParams as jest.Mock).mockReturnValue({
      productId: '1',
    });
  });

  test('Should show toast and redirect when form submited correctly', async () => {
    render(
      <Router history={history}>
        <ToastContainer />
        <Form />
      </Router>
    );

    await waitFor(() => {
      const nameInput = screen.getByTestId('name');
      const priceInput = screen.getByTestId('price');
      const imgUrlInput = screen.getByTestId('imgUrl');
      const descriptionInput = screen.getByTestId('description');
      const formElement = screen.getByTestId('form');

      expect(nameInput).toHaveValue(productResponse.name);
      expect(priceInput).toHaveValue(String(productResponse.price));
      expect(imgUrlInput).toHaveValue(productResponse.imgUrl);
      expect(descriptionInput).toHaveValue(productResponse.description);

      const categoriesIds = productResponse.categories.map(element => String(element.id));
      expect(formElement).toHaveFormValues({categories: categoriesIds});
    });

    const submitButton = screen.getByRole('button', { name: /salvar/i });

    userEvent.click(submitButton);

    await waitFor(() => {
      const toastElement = screen.getByText('Produto cadastrado com sucesso!');
      expect(toastElement).toBeInTheDocument();
    });

    expect(history.location.pathname).toEqual('/admin/products');

  });
});
