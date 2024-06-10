import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { auth } from "@/auth";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SessionProvider } from "next-auth/react";
import NavbarDashboard from "@/components/app/dashboard/navbar-dashboard";

const inter = Inter({ subsets: ["latin"] });


export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="pt-BR">
			<body className={inter.className} suppressHydrationWarning>
			<SessionProvider session={session}>
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-10">
				<NavbarDashboard />
			</header>
			
				
				
                    
					<ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
				</SessionProvider>
			</body>
		</html>
	);
}
