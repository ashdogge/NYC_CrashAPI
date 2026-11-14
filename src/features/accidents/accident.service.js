const API_URL = `https://data.cityofnewyork.us/api/v3/views/h9gi-nx95/query.json`;

export const getAccidentsByDate = async (date) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-App-Token": process.env.APP_KEY,
    },
    body: JSON.stringify({
      query: `
        SELECT *
        WHERE crash_date = '${date}'
        LIMIT 1000
      `,
    }),
  });

  if (!response.ok) {
    throw new Error(`NYC API returned ${response.status}`);
  }

  return response.json();
};
