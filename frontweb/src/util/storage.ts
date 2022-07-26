const tokenKey = 'authData';

type LoginResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  userFirstName: string;
  userId: number;
};

export const saveAuthData = (obj: LoginResponse) => {
  localStorage.setItem(tokenKey, JSON.stringify(obj));
};

export const getAuthData = () => {
  const str = localStorage.getItem(tokenKey) ?? '{}'; //local storage só trabalaha com strings, o ?? é o operador de coalescencia nulo e passa uma string com um objeto vazio dentro
  return JSON.parse(str) as LoginResponse; //casting para ser type save e compativel com o esperado
};

export const removeAuthData = () => {
  localStorage.removeItem(tokenKey);
};
