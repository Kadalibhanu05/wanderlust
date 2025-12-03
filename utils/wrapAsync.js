// function wrapAsync(fn) { or we can directly write

module.exports = (fn) => {
//   return function (req, res, next) {
    return  (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};