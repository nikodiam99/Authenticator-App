//best practice to keep functions in controller folder to keep index and user route clean
export const test = (req, res) => {
    res.json({
        message: 'API is working',
    });
}