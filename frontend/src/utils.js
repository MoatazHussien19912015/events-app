export const isEmpty = (obj) => {
    if(obj == null) return true;
    return Object.entries(obj).length == 0;
};