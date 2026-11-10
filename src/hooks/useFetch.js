import { useReducer, useEffect } from 'react';

const initialState = {
  loading: true,
  error: null,
  data: null,
};

function fetchReducer(state, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { loading: false, error: null, data: action.payload };
    case 'FETCH_FAILURE':
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
}

export function useFetch(fetchFn, deps = []) {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    const controller = new AbortController();

    dispatch({ type: 'FETCH_INIT' });

    fetchFn(controller.signal)
      .then((data) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      })
      .catch((err) => {
        dispatch({ type: 'FETCH_FAILURE', payload: err.message });
      });

    return () => {
      controller.abort();
    };
  }, deps);

  return state;
}