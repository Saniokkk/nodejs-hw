
export const notFoundHendler = (req, res) => {
    res.status(404).json({ message: 'Route not found' });
}