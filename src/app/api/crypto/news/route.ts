'use server'
import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import { INews } from "@/app/_Interfaces/crypto/news";

export async function GET() {
    const result: INews[] = [];

    const filePath = path.join(
        process.cwd(),'/public/assets/data/crypto-news/data.csv');

    return new Promise((res, rej) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => result.push(row))
            .on("end", () => {
                res(
                    new Response(JSON.stringify(result), {
                        headers: { "Content-Type": "application/json" },
                    })
                );
            })
            .on("error", rej);
    });
}
