const slugify = require("slugify");

module.exports.convertSlug = (slug, title) => {
    if (!slug || !slug.trim()) {
        slug = slugify(title, { lower: true, strict: true, locale: "vi" })
        console.log(slug)
        return slug;
    }
}