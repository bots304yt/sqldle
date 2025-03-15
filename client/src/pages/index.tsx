import Game from "@/components/Game";
import GameNotFound from "@/components/GameNotFound";
import { AnimatedBackground } from "@/components/UI/AnimatedBackground";
import { useGame } from "@/context/GameContext";

export default function Page(){
    const { challenge } = useGame();

    if (challenge.id == -1) return <GameNotFound />;
    return (<>
        <Game />
        <AnimatedBackground />
    </>)
}