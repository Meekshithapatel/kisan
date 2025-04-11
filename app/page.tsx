"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSelector } from "@/components/language-selector"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/components/language-context"

export default function WelcomePage() {
  const router = useRouter()
  const { toast } = useToast()
  const { translate } = useLanguage()
  const [audioPlayed, setAudioPlayed] = useState(false)

  useEffect(() => {
    // Play welcome audio when component mounts
    if (!audioPlayed) {
      playWelcomeAudio()
      setAudioPlayed(true)
    }
  }, [audioPlayed])

  const playWelcomeAudio = () => {
    // In a real app, this would use the Web Speech API or a pre-recorded audio file
    // based on the selected language
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      const msg = new SpeechSynthesisUtterance(translate("welcome"))
      window.speechSynthesis.speak(msg)
    }
  }

  const handleGetStarted = () => {
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardContent className="p-6">
          <div className="flex justify-center mb-6">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="Hey Kisan Logo"
              width={80}
              height={80}
              className="rounded-full bg-green-600 p-2"
            />
          </div>

          <h1 className="text-3xl font-bold text-center text-green-800 mb-2">Hey Kisan.in</h1>
          <p className="text-center text-gray-600 mb-6">Your Smart Farming Assistant</p>

          <div className="mb-6">
            <LanguageSelector />
          </div>

          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg" onClick={handleGetStarted}>
            {translate("getStarted")}
          </Button>

          <div className="mt-4 text-center text-sm text-gray-500">
            Smart farming solutions for better yields and sustainable agriculture
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
