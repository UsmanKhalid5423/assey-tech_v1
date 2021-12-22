/*******************************************************/
//Database Functions.
/*******************************************************/
/**
 * Function: It is used create a new resource or update a resource.
 */
 const save = async model => {
    return await model.save();
  };
  
  /**
   * Function: It is used multiple resources.
   */
  const fetch = async (model, query, attributes, pagination) => {
    if (attributes) {
      if (pagination)
        return await model.find(query).select(attributes).limit(Number(pagination.perPage)).skip(Number(pagination.perPage) * (Number(pagination.page))).sort({[pagination.sortBy]: pagination.sortOrder});
      else
        return await model.find(query).select(attributes);
    }
    else {
      if (pagination)
        return await model.find(query).limit(Number(pagination.perPage)).skip(Number(pagination.perPage) * (Number(pagination.page))).sort({[pagination.sortBy]: pagination.sortOrder});
      else
        return await model.find(query);
    }
  
  };
  
  /**
   * Function: It is used find a resource w.r.t any condition.
   */
  const findBy = async (model, query, attributes) => {
    console.log(model);
    if (attributes)
      return await model.findOne(query).select(attributes);
    else
      return await model.findOne(query);
  };
  
  /**
   * Function: It is used find an resource by id.
   */
  const findById = async (model, id,attributes) => {
    if (attributes)
    return await model.findById(id).select(attributes);
    else
    return await model.findById(id);
  };
  
  /**
   * Function: It is used count all resources.
   */
  const count = async (model, query) => {
    return await model.countDocuments(query);
  };
  
  /**
   * Function: It is used update an resource.
   */
  const update = async (model, filter, query, arrayFilters) => {
    if (typeof arrayFilters != "undefined")
      return await model.updateOne(filter, query, arrayFilters);
    else
      return await model.updateOne(filter, query);
  
  }
  /*******************************************************/
  // Exporting Controllers.
  /*******************************************************/
  module.exports = {
    save,
    fetch,
    findById,
    findBy,
    count,
    update
  };
  