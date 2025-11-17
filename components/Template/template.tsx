"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import GridOverlay from "./TemplateGrid";

const templates = [
    {
        name: "Dashboard Pro",
        description: "Modern analytics dashboard with charts and team management",
        preview: "/1.png",
    },
    {
        name: "E-commerce Admin",
        description: "Complete store management with orders, products and customers",
        preview: "/2.png",
    },
    {
        name: "SaaS Analytics",
        description: "Beautiful metrics, subscriptions and revenue tracking",
        preview: "/3.png",
    },
    {
        name: "Marketing OS",
        description: "Campaigns, leads, and performance in one place",
        preview: "/4.png",
    },
];

export default function TemplatesPage() {
    const [activeTemplate, setActiveTemplate] = useState(0);
    const currentTemplate = templates[activeTemplate];

    return (
        <div className="relative min-h-screen bg-background overflow-hidden">

            <GridOverlay />
            <div className="relative z-10 mx-auto max-w-420 px-6 py-30">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                        Choose Your Template
                    </h1>
                    <p className="mt-6 text-xl text-zinc-400 max-w-3xl mx-auto">
                        Fully responsive, animated, and production-ready dashboard templates. Just click and copy.
                    </p>
                </motion.div>


                {/* Template Selector Buttons */}
                <div className="flex justify-center mb-20">
                    <div className="inline-flex items-center gap-2 p-1 bg-zinc-300/50 backdrop-blur-md border rounded-xl">
                        {templates.map((template, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveTemplate(i)}
                                className={cn(
                                    "px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-w-[140px]",
                                    activeTemplate === i
                                        ? "bg-white text-black shadow-lg"
                                        : "text-zinc-600 hover:cursor-pointer hover:bg-white/5"
                                )}
                            >
                                {template.name}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    key={activeTemplate}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative overflow-hidden">
                        <div className="relative p-4">
                            <div className="relative aspect-video overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={currentTemplate.preview}
                                        alt={`Preview of ${currentTemplate.name}`}
                                        fill
                                        className="object-cover object-top transition-opacity duration-500"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
}