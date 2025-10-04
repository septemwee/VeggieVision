import FormData from "form-data";
import fetch from "node-fetch";
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // บอกให้ Next ใช้ Node runtime (จำเป็นเมื่อใช้ FormData)

export async function POST(req) {
  try {
    // อ่านข้อมูลไฟล์จาก request
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file sent" }, { status: 400 });
    }

    // แปลงเป็น Buffer เพื่อส่งต่อให้ Flask
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // สร้าง form-data ใหม่เพื่อส่งให้ Flask
    const form = new FormData();
    form.append("image", buffer, {
      filename: file.name,
      contentType: file.type,
    });

    // ส่งต่อไปยัง Flask Server
    const resFlask = await fetch("http://13.210.100.22:5000/predict", {
      method: "POST",
      body: form,
      headers: form.getHeaders(), // สำคัญมาก
    });

    // แปลงผลลัพธ์จาก Flask
    const data = await resFlask.json();

    // หา prediction ที่มี confidence สูงสุด
    let bestPrediction = null;
    if (Array.isArray(data) && data.length > 0) {
      bestPrediction = data.reduce((max, item) =>
        item.confidence > max.confidence ? item : max
      );
    }

    return NextResponse.json({
      status: "success",
      bestPrediction,
      predictions: data,
    });
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
