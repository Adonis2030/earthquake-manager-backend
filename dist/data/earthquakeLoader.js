"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadEarthquakeData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const loadEarthquakeData = () => {
    return new Promise((resolve, reject) => {
        const results = [];
        const csvFilePath = path_1.default.join(__dirname, '../data/earthquake.csv');
        fs_1.default.createReadStream(csvFilePath)
            .pipe((0, csv_parser_1.default)())
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
exports.loadEarthquakeData = loadEarthquakeData;
