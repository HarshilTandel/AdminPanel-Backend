const validate = (schema) => async (req, res, next) => {
  try {
    const parsedBody = await schema.parseAsync(req.body);
    req.body = parsedBody;
    next();
  } catch (err) {
    const status = 422;
    const message = "Fill the input properly";
    let extraDetails = [];

    if (err.issues) {
      extraDetails = err.issues.map((issue) => issue.message);
    } else {
      extraDetails = [err.message];
    }

    const error = {
      status,
      message,
      extraDetails,
    };

    console.error("Validation Error:", error);

    res.status(status).json(error);
  }
};

module.exports = validate;