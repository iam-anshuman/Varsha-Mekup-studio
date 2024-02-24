import { createContext, useContext, useReducer } from 'react';

export const CertificateContext = createContext();

export const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CERTIFICATE':
      return {
        ...state,
        certificates: state.certificates.filter(
          certificate => certificate._id !== action.payload,
        ),
      };
    case 'FETCH_CERTIFICATES':
      return {
        ...state,
        certificates: action.payload,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        index: state.index + 1,
      };
    case 'PREV_PAGE':
      return {
        ...state,
        index: state.index - 1,
      };
    case 'FIRST_PAGE':
      return {
        ...state,
        index: 0,
      };
    default:
      return {
        certificates: [],
        index: 0,
      };
  }
};

export const CertificateContextProvider = ({ children }) => {
  const [certificateState, certificateDispatch] = useReducer(reducer, {
    certificates: [],
    index: 0,
  });

  return (
    <CertificateContext.Provider
      value={{ ...certificateState, certificateDispatch }}
    >
      {children}
    </CertificateContext.Provider>
  );
};

export const useCertificateContext = () => {
  const context = useContext(CertificateContext);
  if (!context) {
    throw Error(
      'UseCertificateContext must be inside the CertificateContextProvider',
    );
  }
  return context;
};
