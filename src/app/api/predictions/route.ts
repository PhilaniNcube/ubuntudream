import replicate from "@/lib/replicate"
import { NextResponse } from "next/server"

export async function POST(request: Request ) {

  const { prompt } = await request.json()
  const model = "stability-ai/stable-diffusion:65a15f6e3c538ee4adf5142411455308926714f7d3f5c940d9f7bc519e0e5c1a"
  const input = {prompt: prompt}

  const output = await replicate.run(model, {input})

  return NextResponse.json({output: output})


  // const prediction = await replicate.predictions.create({
  //   version: "65a15f6e3c538ee4adf5142411455308926714f7d3f5c940d9f7bc519e0e5c1a",
  //   input: {
  //     prompt: prompt,
  //   },
  // })

}
