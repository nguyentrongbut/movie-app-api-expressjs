module.exports = (query, fields = []) => {
    const find = {};
    fields.forEach(field => {
        if (query[field]) {
            find[field] = { $regex: query[field], $options: 'i' };
        }
    });
    return find;
};

