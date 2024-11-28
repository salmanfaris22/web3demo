export const getFirstLetter = (str: string) => {
    if (typeof str === 'string' && str.length > 0) {
        return str.charAt(0);
    }
    return '';
};