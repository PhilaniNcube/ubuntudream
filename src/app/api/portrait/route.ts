import replicate from "@/lib/replicate"
import { NextResponse } from "next/server"

export const config = {
  runtime: 'edge',
}


export async function POST(request: Request ) {

  const { scene, subject, race,  } = await request.json()
  const model = "cjwbw/portraitplus:629a9fe82c7979c1dab323aedac2c03adaae2e1aecf6be278a51fde0245e20a4"
  const input = {
    prompt:`portrait+ style photograph of a ${race} ${subject} in a ${scene} `,
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
