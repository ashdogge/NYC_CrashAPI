import { getAccidentsByDate } from "./accident.service.js";

export const getAccidents = async (req, res) => {
  const { date } = req.query;

  const accidents = await getAccidentsByDate(date);

  res.status(200).json(accidents);
};
