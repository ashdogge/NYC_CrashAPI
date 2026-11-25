const API_URL =
  "https://data.cityofnewyork.us/api/v3/views/h9gi-nx95/query.json";

const PAGE_SIZE = 100;
const REQUEST_TIMEOUT = 10000;

export const getAccidentsByDate = async (date) => {
  if (!process.env.APP_KEY) {
    throw new Error("NYC Open Data API token is not configured");
  }

  const accidents = [];
  let offset = 0;

  const signal = AbortSignal.timeout(REQUEST_TIMEOUT);

  while (true) {
    const response = await fetch(API_URL, {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "X-App-Token": process.env.APP_KEY,
      },
      body: JSON.stringify({
        query: `
          SELECT
            collision_id,
            crash_date,
            crash_time,
            on_street_name,
            vehicle_type_code1,
            vehicle_type_code2,
            number_of_persons_injured,
            number_of_persons_killed,
            latitude,
            longitude
          WHERE crash_date = '${date}'
          ORDER BY collision_id ASC
          LIMIT ${PAGE_SIZE}
          OFFSET ${offset}
        `,
      }),
    });

    if (!response.ok) {
      const error = new Error(`NYC API returned ${response.status}`);
      error.status = 502;
      throw error;
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      const error = new Error("Unexpected NYC API response format");
      error.status = 502;
      throw error;
    }

    accidents.push(...data);

    if (data.length < PAGE_SIZE) {
      break;
    }
    console.log(`Retrieved ${data.length} records at offset ${offset}`);
    offset += PAGE_SIZE;
  }

  return accidents;
};
