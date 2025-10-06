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

    const resFastAPI = await fetch("http://13.210.100.22:5000/predict", {
      method: "POST",
      body: form,
      headers: form.getHeaders(),
    });

    const data = await resFastAPI.json();

   // bestPrediction ถ้า stage = "leaf"
const bestPrediction = data.stage === "leaf" ? data.leaf_label : null;
console.log("🔥 Best Prediction Class:", bestPrediction);

    return NextResponse.json({ 
      status: "success",
      stage: data.stage,
      bestPrediction,
      predictions: data
    });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
