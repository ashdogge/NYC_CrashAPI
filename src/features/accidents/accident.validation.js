export const validateAccidentDate = (req, res, next) => {
  const { date } = req.query;

  if (
    typeof date !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    !Number.isFinite(Date.parse(`${date}T00:00:00Z`)) ||
    new Date(`${date}T00:00:00Z`).toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      error: "Invalid: YYYY-MM-DD date is required",
    });
  }

  next();
};
