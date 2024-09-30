import fs from "fs";
import path from "path";
import csv from "csv-parser";

interface Earthquake {
  id: string;
  location: string;
  magnitude: number;
  date: string;
}


export const loadEarthquakeData = (): Promise<Earthquake[]> => {
  return new Promise((resolve, reject) => {
    const results: Earthquake[] = [];
    const csvFilePath = path.join(__dirname, '../data/earthquake.csv');

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          id: data.EventID,
          location: `${data.Latitude}, ${data.Longitude}`,
          magnitude: parseFloat(data.Magnitude),
          date: data.DateTime,
        });
      })
      .on("end", () => resolve(results))
      .on("error", (err) => reject(err));
  });
};