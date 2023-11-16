import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
//import { Configuration, OpenAIApi } from "openai";
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_AI_KEY,
});

//const openai = new OpenAIApi(configuration);
const instructionMessage: ChatCompletionMessageParam = {
    role: "system",
    content: "あなたはコード生成プログラムです。説明文はコードコメントを使用して返事してください。"
}

export async function POST(
    req: Request
) {
    try{
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        console.log("route called");

        if(!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if(!openai.apiKey)
        return new NextResponse("OpenAI API Key not configured", { status: 500 });

        if(!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        // const response = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages
        // })
        const chatCompletion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [instructionMessage, ...messages],
          });
        console.log(chatCompletion.choices[0].message);
        return NextResponse.json(chatCompletion.choices[0].message);
        //return NextResponse.json(response.data.choices[0].message);

    }
    catch(error) {
        console.log("route error");
        console.log("[CODE_ERROR]", error);
        return new NextResponse("Internal error", {status: 500});
    }
}