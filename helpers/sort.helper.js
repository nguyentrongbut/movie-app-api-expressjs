module.exports = (query) => {
    if (query.sortBy && query.order) {
        const sortOrder = query.order === 'asc' ? 1 : -1;
        return { [query.sortBy]: sortOrder };
    }
    return { createdAt: -1 };
};

