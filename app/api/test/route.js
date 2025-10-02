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

    if (!file) return NextResponse.json({ error: "No file sent" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const form = new FormData();
    form.append("image", buffer, { filename: file.name, contentType: file.type });

    const resFlask = await fetch("http://localhost:5000/predict", {
      method: "POST",
      body: form,
      headers: form.getHeaders(), // สำคัญ!
    });

    const data = await resFlask.json();
    console.log(data);
    return NextResponse.json({ status: "success", predictions: data });

  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
