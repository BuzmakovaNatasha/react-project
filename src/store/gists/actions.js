import {
  GET_GISTS_START,
  GET_GISTS_SUCCESS,
  GET_GISTS_ERROR,
  GET_GISTS_BY_NAME_START,
  GET_GISTS_BY_NAME_SUCCESS,
  GET_GISTS_BY_NAME_ERROR,
} from "./types";

export const getGistsStart = () => {
  return { type: GET_GISTS_START };
};

export const getGistsSuccess = (gists) => {
  return { type: GET_GISTS_SUCCESS, payload: gists };
};

export const getGistsError = (error) => {
  return { type: GET_GISTS_ERROR, payload: error };
};

export const getGistsByNameStart = () => {
  return { type: GET_GISTS_BY_NAME_START };
};

export const getGistsByNameSuccess = (gists) => {
  return { type: GET_GISTS_BY_NAME_SUCCESS, payload: gists };
};

export const getGistsByNameError = (error) => {
  return { type: GET_GISTS_BY_NAME_ERROR, payload: error };
};
