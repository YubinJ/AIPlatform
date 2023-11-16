import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_AI_KEY,
});

//const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { prompt, amount=1, resolution="512x512" } = body;

        console.log("route called");

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!openai.apiKey)
        return new NextResponse("OpenAI API Key not configured", { status: 500 });

        if(!prompt) {
            return new NextResponse("Prompt are required", { status: 400 });
        }

        if(!amount) {
            return new NextResponse("Amount are required", { status: 400 });
        }

        if(!resolution) {
            return new NextResponse("Resolution are required", { status: 400 });
        }

        // const response = await openai.createImage({
        //     prompt,
        //     n: parseInt(amount, 10),
        //     size: resolution,
        // });

        const response = await openai.images.generate({
            prompt,
            n: parseInt(amount, 10),
            size: resolution,
        });

        console.log(response.data);
        return NextResponse.json(response.data);
        // console.log(chatCompletion.choices[0].message);
        //return NextResponse.json(chatCompletion.choices[0].message);
        //return NextResponse.json(response.data.choices[0].message);

    }
    catch(error) {
        console.log("route error");
        console.log("[IMAGE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}