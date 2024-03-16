"use strict";

module.exports = async (req, res, next) => {
  // Filtering & Searching & Sorting & Pagination
  // Filtering
  // URL?filter[key1]=value1&filter[key2]=value2
  const filter = req.query.filter || {};

  // Searching
  // URL?search[key1]=value1&search[key2]=value2
  // https://www.mongodb.com/docs/manual/reference/operator/query/regex/
  const search = req.query.search || {};

  // { title: 'test', content: 'test' } -> { title: { $regex: 'test' }, content: { $regex: 'test' } }
  for (let key in search) {
    search[key] = { $regex: search[key], $options: "i" }; // i => insentive, kücük-büyük harf duyarsiz
  }

  // Sorting
  // URL?sort[key1]=asc&sort[key2]=desc
  // asc: A-Z - desc: Z-A
  const sort = req.query.sort || {};

  // Pagination
  let limit =
    Number(req.query.limit) > 0
      ? Number(req.query.page)
      : Number(process.env.PAGE_SIZE || 20);

  const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;

  // Skip
  const skip =
    Number(req.query.skip) > 0 ? Number(req.query.skip) : (page - 1) * limit;

  res.getModalList = async (Model, populate = null) => {
    return await Model.find({ ...filter, ...search })
      .sort({
        ...sort,
      })
      .skip(skip)
      .limit(limit)
      .populate(populate);
  };

  // Details:
  res.getModelListDetails = async (Model) => {
    const data = await Model.find({ ...filter, ...search });

    let details = {
      filter,
      search,
      sort,
      skip,
      limit,
      page,
      pages: {
        previous: page > 0 ? page : false,
        current: page + 1,
        next: page + 2,
        total: Math.ceil(data.length / limit),
      },
      totalRecords: data.length,
    };
    details.pages.next =
      details.pages.next > details.pages.total ? false : details.pages.next;
    if (details.totalRecords <= limit) details.pages = false;
    return details;
  };

  next();
};
