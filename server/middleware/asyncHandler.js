const asyncHandler = (fn) => (req, res, next) => {
  // Return a Promise after calling the function

  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
