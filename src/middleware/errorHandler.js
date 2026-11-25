export const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.name === "TimeoutError") {
    return res.status(504).json({
      error: "The external data service timed out",
    });
  }

  if (err.status === 502) {
    return res.status(502).json({
      error: "Unable to retrieve accident data",
    });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({
      error: "Invalid JSON",
    });
  }

  return res.status(500).json({
    error: "Internal server error",
  });
};
