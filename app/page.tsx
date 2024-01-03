"use client"
import { ThemeProvider } from "@/components/theme-provider"
import HomePage from "./HomePage"

export default function Home() {
  return (
    <div>
		<ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >   
			<div className=" m-4">
				<HomePage />
			</div>
		</ThemeProvider>
    </div>
  );
}
