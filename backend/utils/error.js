export const errorHandler = (statusCode, message) => {
    //Error is js constructor to throw error for me
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
};