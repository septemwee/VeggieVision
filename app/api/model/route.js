import FormData from "form-data";
import fetch from "node-fetch";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");
    if (!file) return NextResponse.json({ error: "No file sent" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const form = new FormData();
    form.append("image", buffer, { filename: file.name, contentType: file.type });

    // Next.js fetch ไป FastAPI container port 5000
    const resFastAPI = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const data = await resFastAPI.json();

    // ถ้า leaf ไม่ใช่ leaf → bestPrediction = null
    const bestPrediction = (data.leaf?.class === "leaf") ? data.type : null;

    return NextResponse.json({ 
      status: "success",
      leaf: data.leaf,
      bestPrediction,
      predictions: data
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
