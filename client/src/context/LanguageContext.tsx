import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { traductions } from "../lib/traductions";

export type Language = 'en' | 'es' | 'eu' | 'sv';
interface LanguageContextType {
    t: (key: string) => string
    format: (key: string, ...args: string[]|number[]) => string
    lang: Language
    setLang: (lang: Language) => void   
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children}: {children: ReactNode}) {
    const [lang, setLang] = useState<Language>('en')

    const t = (key: string) => {
        const parts = key.split('.')
        let l: unknown = traductions[lang];
        parts.forEach((part) => l = (l as Record<string, unknown>)[part])
        return l as string || `{${key}}`
    }

    const format = (key: string, ...args: string[]|number[]) => {
        let value = t(key)
        if (value == `{${key}}`) return value
        args.forEach(arg => value = value.replace(`%s`, arg as string))
        return value
    }

    const handleSetLang = (lang: Language) => {
        setLang(lang)
        localStorage.setItem('lang', lang)
    }

    useEffect(() => {
        const lang = localStorage.getItem('lang')
        if (lang) setLang(lang as Language)
    }, [])

    return (
        <LanguageContext.Provider value={{t, lang, setLang: handleSetLang, format}}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider')
    }
    return context
}