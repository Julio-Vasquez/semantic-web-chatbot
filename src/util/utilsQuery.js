/**
 * 
 * @param  string 
 * @returns new string no space
 */
export const PrepareQuery = string => string.replace(/ /g,'+');

export const Encode = string => encodeURI(string);

export const Decode = string => decodeURI(string);
