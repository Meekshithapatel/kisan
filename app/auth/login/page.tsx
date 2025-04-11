"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Eye, EyeOff, Lock, Phone, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { LanguageSelector } from "@/components/language-selector"
import { useLanguage } from "@/components/language-context"

export default function AuthPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { translate } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)

  // Login form state
  const [loginForm, setLoginForm] = useState({
    phone: "",
    password: "",
  })

  // Register form state
  const [registerForm, setRegisterForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  // Forgot password state
  const [forgotPhone, setForgotPhone] = useState("")
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to authenticate
    toast({
      title: "Login Successful",
      description: "Welcome back to Hey Kisan!",
    })
    router.push("/dashboard")
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      })
      return
    }
    // In a real app, this would call an API to register
    toast({
      title: "Registration Successful",
      description: "Your account has been created!",
    })
    router.push("/dashboard")
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to send OTP
    setOtpSent(true)
    toast({
      title: "OTP Sent",
      description: `A verification code has been sent to ${forgotPhone}`,
    })
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would call an API to verify OTP
    toast({
      title: "OTP Verified",
      description: "You can now reset your password",
    })
    router.push("/auth/reset-password")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:flex flex-col items-center justify-center p-8">
          <div className="relative w-64 h-64 mb-6">
            <Image
              src="/placeholder.svg?height=256&width=256"
              alt="Hey Kisan Logo"
              width={256}
              height={256}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-green-800 mb-4 text-center">Hey Kisan</h1>
          <p className="text-lg text-center text-gray-600 mb-6">
            Your complete farming companion for better yields and sustainable agriculture
          </p>
          <div className="grid grid-cols-3 gap-4 w-full max-w-md">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-center font-medium">Smart Farming</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-center font-medium">Crop Analysis</p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-sm text-center font-medium">Market Access</p>
            </div>
          </div>
        </div>

        <Card className="w-full max-w-md mx-auto shadow-lg border-none bg-white/90 backdrop-blur-sm">
          <div className="absolute top-4 right-4">
            <LanguageSelector />
          </div>

          <Tabs defaultValue="login">
            <CardHeader>
              <div className="md:hidden flex justify-center mb-6">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    alt="Hey Kisan Logo"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </div>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{translate("login")}</TabsTrigger>
                <TabsTrigger value="register">{translate("register")}</TabsTrigger>
              </TabsList>
              <CardDescription className="pt-4 text-center">{translate("accessAccount")}</CardDescription>
            </CardHeader>

            <CardContent>
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{translate("phoneNumber")}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder={translate("enterPhone")}
                        className="pl-10"
                        value={loginForm.phone}
                        onChange={(e) => setLoginForm({ ...loginForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">{translate("password")}</Label>
                      <button
                        type="button"
                        className="text-xs text-green-600 hover:underline"
                        onClick={() => {
                          setOtpSent(false)
                          toast({
                            title: translate("forgotPassword"),
                            description: translate("enterPhoneForOTP"),
                          })
                        }}
                      >
                        {translate("forgotPassword")}?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={translate("enterPassword")}
                        className="pl-10"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    {translate("login")}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{translate("fullName")}</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="name"
                        placeholder={translate("enterName")}
                        className="pl-10"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-phone">{translate("phoneNumber")}</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="reg-phone"
                        type="tel"
                        placeholder={translate("enterPhone")}
                        className="pl-10"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({ ...registerForm, phone: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reg-password">{translate("password")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={translate("createPassword")}
                        className="pl-10"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">{translate("confirmPassword")}</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        placeholder={translate("confirmYourPassword")}
                        className="pl-10"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        required
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                    {translate("register")}
                  </Button>
                </form>
              </TabsContent>
            </CardContent>
          </Tabs>

          <CardFooter className="flex justify-center border-t p-4">
            <div className="text-center text-sm text-gray-500">
              {!otpSent ? (
                <div className="space-y-4">
                  <h3 className="font-medium">{translate("forgotPassword")}?</h3>
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-phone">{translate("phoneNumber")}</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <Input
                          id="forgot-phone"
                          type="tel"
                          placeholder={translate("enterPhone")}
                          className="pl-10"
                          value={forgotPhone}
                          onChange={(e) => setForgotPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      {translate("sendOTP")}
                    </Button>
                  </form>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">{translate("verifyOTP")}</h3>
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="otp">{translate("enterOTP")}</Label>
                      <Input
                        id="otp"
                        placeholder={translate("enterOTPSent")}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" variant="outline" className="w-full">
                      {translate("verifyOTP")}
                    </Button>
                  </form>
                </div>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
