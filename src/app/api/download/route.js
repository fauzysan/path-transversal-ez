import fs from "fs";
import path from "path";

export const GET = (req) => {
  try {
    const { searchParams } = new URL(req.url);
    const file = searchParams.get("file"); 

    console.log("Requested file:", file);

    if (!file || typeof file !== "string") {
      return new Response("Invalid file parameter.", { status: 400 });
    }

    const basePath = path.resolve("./public/files/publik"); 
    const targetPath = path.resolve(basePath, file);

    // if (!targetPath.startsWith(basePath)) {
    //   return new Response("Access denied! Invalid file path.", { status: 403 });
    // }

    const fileContent = fs.readFileSync(targetPath, "utf8");
    return new Response(fileContent, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (err) {
    console.error("Error:", err);
    return new Response("File not found or server error.", { status: 500 });
  }
};
