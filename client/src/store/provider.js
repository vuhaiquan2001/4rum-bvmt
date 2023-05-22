import Context from './context';
import { useReducer } from 'react';
import reducer, { initstate } from './reducer';

function Provider({ children }) {
    const [state, dispatch] = useReducer(reducer, initstate);
    return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>;
}

export default Provider;
