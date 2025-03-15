import { AppProps } from "next/app";
import '../styles/globals.css'
import { LanguageProvider } from "@/context/LanguageContext";
import { GameProvider } from "@/context/GameContext";

export default function App({ Component, pageProps }: AppProps) {

    return (
        <LanguageProvider>
            <GameProvider>
                <Component {...pageProps} />
            </GameProvider>
        </LanguageProvider>
    )

}