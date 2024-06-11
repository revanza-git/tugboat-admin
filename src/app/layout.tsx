"use client";
import { baselightTheme } from "@/utils/theme/DefaultColors";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { SessionProvider, getSession } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        // If the user is logged in, redirect to the dashboard
        router.push("/");
      } else {
        // If the user is not logged in, redirect to the login page
        router.push("/login");
      }
    });
  }, []);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <ThemeProvider theme={baselightTheme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
