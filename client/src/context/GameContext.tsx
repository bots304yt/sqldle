import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLanguage } from "./LanguageContext";
import { ChallengeType, defaultChallenge, getChallenge } from "@/lib/challenges";

export interface GameType {
    id: number;
    attempts: number;
    completed: boolean;
    date: string;
}



interface StatsType {
    completed: number;
    average: number;
    streak: number;
    bestStreak: number;
    total: number;
    rate: number;
}

interface GameContextType {
    stats: StatsType;
    updateStat: (stat: GameType) => void;
    challenge: ChallengeType;
    next: () => void;
    back: () => void;
    current: GameType;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const defaultStats: StatsType = {
    completed: 0,
    average: 0.0,
    streak: 0,
    bestStreak: 0,
    total: 0,
    rate: 0.0
}
const defaultGame: GameType = {
    id: 0,
    attempts: 0,
    completed: false,
    date: new Date().toISOString()
}

export function GameProvider({children}: {children: ReactNode}) {
    const {lang} = useLanguage();
    
    const [games, setGames] = useState<GameType[]>([])
    const [stats, setStats] = useState<StatsType>(defaultStats)
    const [challenge, setChallenge] = useState<ChallengeType>(defaultChallenge)
    const [status, setStatus] = useState<GameType>(defaultGame)

    const handleUpdateStat = (game: GameType) => {
        const saved: GameType[] = JSON.parse(localStorage.getItem('stats') || '[]') ?? [];
        
        if(saved.filter(g => g.id == game.id).length == 0){
            saved.push(game)
            setGames(saved)
            localStorage.setItem('stats', JSON.stringify(saved))
            setStats(getTotalStats())
            return
        }

        const newGames = games.filter(g => g.id !== game.id)
        newGames.push(game)
        setGames(newGames)
        localStorage.setItem('stats', JSON.stringify(newGames))
        setStats(getTotalStats())
    }   

    const getTotalStats = () => {
        const totalStats: StatsType = {
            completed: 0,
            average: 0,
            streak: 0,
            bestStreak: 0,
            total: 0,
            rate: 0
        }

        games.forEach(game => {
            totalStats.total++
            if(game.completed) {
                totalStats.completed++
                totalStats.average += game.attempts
                totalStats.streak++
                if(totalStats.streak > totalStats.bestStreak) totalStats.bestStreak = totalStats.streak
            } else {
                totalStats.streak = 0
            }
        })
        return totalStats
    }

    useEffect(() => {
        const ourgames: GameType[] = JSON.parse(localStorage.getItem('stats') || '[]') ?? [];
        const last = ourgames.filter(g => g.completed).sort((a, b) => a.id - b.id).pop();
        const challenge = last ? getChallenge(last.id + 1, lang) : getChallenge(0, lang)
        setChallenge(challenge)
        const valid = ourgames.filter(g => g.id == challenge.id);
        if (valid.length == 0) {
            if (last){
                console.log(last)
                return setStatus(last)
            }
            return setStatus({...defaultGame, id: challenge.id})
        }
        setStatus(valid[0])
    }, [lang])
    
    useEffect(() => {
        const stats = localStorage.getItem('stats')
        if (stats) setGames(JSON.parse(stats))
    }, [])

    useEffect(() => {
        setStats(getTotalStats())
        const current = games.filter(g => g.id == challenge.id);
        if (current.length == 0){
            setStatus({...status, id: challenge.id})
            return
        }
        setStatus(current[0])
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [games])

    const navigator = (step: number) => {
        const challenge = getChallenge(status.id + step, lang)
        setChallenge(challenge)
        const valid = games.filter(g => g.id == challenge.id);
        if (valid.length == 0) {
            setStatus({...defaultGame, id: challenge.id})
            return
        }
        setStatus(valid[0])
    }

    return (
        <GameContext.Provider value={{
            stats, 
            updateStat: handleUpdateStat,
            challenge,
            next: () => navigator(1),
            back: () => navigator(-1),
            current: status
        }}>
            {children}
        </GameContext.Provider>
    )
}

export function useGame() {
    const context = useContext(GameContext)
    if (!context) {
        throw new Error('useGame must be used within a GameProvider')
    }
    return context
}