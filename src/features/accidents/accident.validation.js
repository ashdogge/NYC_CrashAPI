// accident.validation.js

export const validateAccidentDate = (req, res, next) => {
  const { date } = req.query;

  if (typeof date !== "string") {
    return res.status(400).json({
      error: "Date is required",
    });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({
      error: "Invalid date format",
    });
  }

  const parsedDate = new Date(`${date}T00:00:00Z`);

  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    return res.status(400).json({
      error: "Invalid calendar date",
    });
  }

  next();
};
