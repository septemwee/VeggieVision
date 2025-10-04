import FormData from "form-data";
import fs from "fs";
import fetch from "node-fetch"; // สำหรับ Node.js
import { NextResponse } from "next/server";

export const config = { api: { bodyParser: false } };

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    console.log(file);

    if (!file)
      return NextResponse.json({ error: "No file sent" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const form = new FormData();
    form.append("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    const resFlask = await fetch(" http://13.210.100.22:5000/predict", {
      method: "POST",
      body: form,
      headers: form.getHeaders(), // สำคัญ!
    });

    const data = await resFlask.json();
    console.log("data:",data);
    // หา object ที่ confidence สูงที่สุด
    let bestPrediction = null;
    if (Array.isArray(data) && data.length > 0) {
      bestPrediction = data.reduce((max, item) =>
        item.confidence > max.confidence ? item : max
      );
    }
    console.log("bestPrediction:",bestPrediction);
    return NextResponse.json({
      status: "success",
      bestPrediction, // ส่ง class + confidence สูงสุดกลับไป
      predictions: data, // ถ้าอยากเก็บผลลัพธ์ทั้งหมดด้วย
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
