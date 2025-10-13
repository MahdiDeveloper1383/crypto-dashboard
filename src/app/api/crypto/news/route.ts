'use server'
import path from "path";
import fs from "fs";
import csvParser from "csv-parser";
import { INews } from "@/Interfaces/crypto/news";

export async function GET(): Promise<Response> {
    const result: INews[] = [];

    const filePath = path.join(
        process.cwd(), '/public/assets/data/crypto-news/data.csv'
    );

    await new Promise<void>((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => result.push(row))
            .on("end", () => resolve())
            .on("error", reject);
    });

    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}
