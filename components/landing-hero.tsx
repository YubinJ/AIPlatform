"use client";
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import { Button } from "@/components/ui/button";

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return (
            <div className="text-white font-bold py-36 text-center space-y-5">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                    
                    <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                        <TypewriterComponent
                            options={{
                                strings:[
                                    "会話",
                                    "画像生成",
                                    "音楽生成",
                                    "動画生成",
                                    "コード生成",
                                ],
                                autoStart: true,
                                loop: true
                            }}
                        />
                    </div>
                    <h1>に最適な AI ツール</h1>
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    あなたのコンテンツ作りにAIが協力！
                </div>
                <div>
                    <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                        <Button variant="premium" className="md:text-lg p-4 md:p-6 rounded-full">
                            無料で生成
                        </Button>
                    </Link>
                </div>
            </div>

    )
}