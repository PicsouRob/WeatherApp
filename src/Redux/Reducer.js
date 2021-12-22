import { DARK, LIGTH } from './Type';

const initialState = { theme: false, themeValue: {} };

function Reducer(state = initialState, action) {
    switch (action.type) {

    case LIGTH:
        return { 
            theme: false,
            themeValue: action.value 
        }
    case DARK:
        return { 
            theme: true, 
            themeValue: action.value 
        }
    default:
        return state
    }
};

export default Reducer;