import { DARK, LIGTH } from './Type';

export const darkAction = (val) => {
    return {
        type: DARK,
        value: val
    }
};

export const ligthAction = (val) => {
    return {
        type: LIGTH,
        value: val
    }
};