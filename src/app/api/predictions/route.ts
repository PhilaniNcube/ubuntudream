import replicate from "@/lib/replicate"
import { NextResponse } from "next/server"

export async function POST(request: Request ) {

  const { prompt } = await request.json()
  const model = "stability-ai/stable-diffusion:9936c2001faa2194a261c01381f90e65261879985476014a0a37a334593a05eb"
  const input = {
    prompt:`mdjrny-v4 style, volumetric lighting, octane render, 4 k resolution, ${prompt}`,

    }

  const output = await replicate.run(model, {input})

  return NextResponse.json({output: output})


  // const prediction = await replicate.predictions.create({
  //   version: "65a15f6e3c538ee4adf5142411455308926714f7d3f5c940d9f7bc519e0e5c1a",
  //   input: {
  //     prompt: prompt,
  //   },
  // })

}
