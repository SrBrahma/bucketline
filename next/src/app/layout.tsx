import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
import "@mantine/core/styles.css"
import {
  AppShell,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
  Burger,
  Button,
  Checkbox,
  ColorSchemeScript,
  Container,
  Group,
  MantineProvider,
  Stack,
  UnstyledButton,
  createTheme,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Footer } from "./Footer"
import { Header, headerHeight } from "./Header"
import { Navbar } from "./Navbar"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Bucketline",
  description: "Your Visual Regression baselines in a Bucket",
}

const theme = createTheme({ cursorType: "pointer" })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme="dark">
          <AppShell
            header={{ height: headerHeight }}
            navbar={{
              width: 300,
              breakpoint: "sm",
              // collapsed: { desktop: true, mobile: !opened },
            }}
            padding="md"
            footer={{ height: 60 }}
            styles={{
              main: {
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <Header />
            <Navbar />
            <Container style={{ flexGrow: 1 }}>Main content here</Container>
            <AppShellMain>{children}</AppShellMain>
          </AppShell>
        </MantineProvider>
      </body>
    </html>
  )
}
