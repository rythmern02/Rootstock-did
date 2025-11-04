import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Cinzel, Inter } from "next/font/google"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" })
const _inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Rootstock Identity - The Identity Sanctum",
  description: "Decentralized Identity Dashboard",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_cinzel.variable} ${_inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
