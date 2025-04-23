// utils/catchAsync.js
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => {
      console.error(err); // Log the error to the console
      next(err); // Pass the error to the global error handler
    });
  };
};

module.exports = catchAsync;
