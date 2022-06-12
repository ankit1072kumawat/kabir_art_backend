
 const HandleErrors =
  async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      console.error("Error Handler", error);
      // res.send(error);
      next(error);
    }
  };

export default HandleErrors;
