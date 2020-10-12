import Cookies from 'js-cookie';
import { COOKIE_TOKEN_OBJECT_NAME, COOKIE_TOKEN_EXPIRATION } from './../constants/cookies.constants';

const getCookie = name => Cookies.get(name);

const setCookie = (name, payload, options) => Cookies.set(name, payload, options);

const removeCookie = name => Cookies.remove(name);

const getCookieTokenObject = () => getCookie(COOKIE_TOKEN_OBJECT_NAME);

const setCookieTokenObject = headers => setCookie(
  COOKIE_TOKEN_OBJECT_NAME,
  JSON.stringify(headers),
  { expires: COOKIE_TOKEN_EXPIRATION }
);

const removeCookieTokenObject = () => removeCookie(COOKIE_TOKEN_OBJECT_NAME);


export {
  getCookie,
  removeCookie,
  getCookieTokenObject,
  setCookieTokenObject,
  removeCookieTokenObject
}