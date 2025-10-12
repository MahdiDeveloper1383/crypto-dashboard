import path from "path";
import fs from "fs";
import csvParser from "csv-parser";

export default async function GET() {
    const result: any = [];

    const filePath = path.join(
        process.cwd(),
        "public",
        "assets",
        "data",
        "crypto-news",
        "data.csv"
    );

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
