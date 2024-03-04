export const softDeleteMiddleware = (schema) => {
  // Add a field to track deleted status
  schema.add({
    deleted: {
      type: Boolean,
      default: false,
    },
  });
  // Add a method to set the deleted status of a document

  schema.methods.softDelete = function () {
    this.deleted = true;
    return this.save();
  };

  // Add a static method to find only non-deleted documents
  schema.statics.findNotDeleted = function (conditions = {}) {
    return this.find({ ...conditions, deleted: false });
  };
  // Add a static method to find all documents including deleted ones
  schema.statics.findWithDeleted = function (conditions = {}) {
    return this.find(conditions);
  };
};
