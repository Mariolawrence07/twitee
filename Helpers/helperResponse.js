const helperResponse = {
  serverError(res, message) {
    return res.status(500).json({
      success: false,
      message: message || "Internal server error",
    });
  },

  clientError(res, error, status = 400) {
    return res.status(status).json({
      success: false,
      error,
    });
  },

  requestSuccessful(res, payload, status = 200) {
    return res.status(status).json({ data: payload });
  },

  checkExpressErrors(err, req, res, next) {
    res.status(500).json({
      message: "Something failed",
      success: false,
    });
    next();
  },

  sequelizeValidationError(res, error) {
    if (error.errors[0].type === "notNull Violation") {
      res.status(400).json({
        success: false,
        message: `The "${error.errors[0].path}" field is required`,
      });
    }
  },
};

export default helperResponse;
