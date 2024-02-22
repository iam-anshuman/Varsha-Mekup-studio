import { createContext, useEffect, useReducer } from "react";

export const CertificateContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "DELETE_CERTIFICATE":
            return {
                ...state,
                certificates: state.certificates.filter((certificate) => certificate._id !== action.payload),
            };
        case "FETCH_CERTIFICATES":
            return {
                ...state,
                certificates: action.payload,
            };
        case "NEXT_PAGE":
            return {
                ...state,
                index: state.index + 1,
            };
        case "PREV_PAGE":
            return {
                ...state,
                index: state.index - 1,
            };
    }
}

export const CertificateProvider = ({children}) => {

    const [certificateState, certificateDispatch] = useReducer(reducer, {
        certificates: [],
        index: 0
    });
    

    return (
        <CertificateContext.Provider value={{certificateState,certificateDispatch}}>
            {children}
        </CertificateContext.Provider>
    )
}