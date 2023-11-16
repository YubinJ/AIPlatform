import * as z from "zod";

export const formSchema = z.object({
    prompt: z.string().min(1, {message: "イメージプロンプトを入力ください"}),
    amount: z.string().min(1),
    resolution: z.string().min(1),
});

export const amountOptions = [
    {
        value:"1",
        label:"1枚",
    },
    {
        value:"2",
        label:"2枚",
    },
    {
        value:"3",
        label:"3枚",
    },
    {
        value:"4",
        label:"4枚",
    },
    {
        value:"5",
        label:"5枚",
    },
];

export const resolutionOptions = [
    {
        value: "256x256",
        label: "256x256",
    },
    {
        value: "512x512",
        label: "512x512",
    },
    {
        value: "1024x1024",
        label: "1024x1024",
    },
]