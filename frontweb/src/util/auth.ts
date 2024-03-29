import { Role } from 'types/role';
import { getTokenData } from './token';

export const isAuthenticated = (): boolean => {
  const tokenData = getTokenData();
  return tokenData && tokenData.exp * 1000 > Date.now() ? true : false; //comparar em milisegundos, que é o padrão do JS
};

export const hasAnyRoles = (roles: Role[]): boolean => {
  if (roles.length === 0) {
    return true;
  }
  const tokenData = getTokenData();

  if (tokenData !== undefined) {
    for (var i = 0; i < roles.length; i++) {
      if (tokenData.authorities.includes(roles[i])) {
        return true;
      }
    }
    //return roles.some(role => tokenData.authorities.includes(role)) outra forma de fazer a verificação
  }
  return false;
};
