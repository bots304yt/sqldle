import Confetti from "@/components/UI/Confetti";
import { ArrowIcon, CrossIcon, TrophyIcon } from "@/components/UI/Icons";
import Modal from "@/components/UX/Modal";
import { useGame } from "@/context/GameContext";
/* import { useLanguage } from "@/context/LanguageContext"; */

export default function WinModal({close}: {close: () => void}) {
    /* const { t, format } = useLanguage(); */
    const {next, current} = useGame();

    return (
        <Modal close={close}>
            <div className="bg-white p-4 rounded-md flex flex-col gap-4 items-center px-6 min-w-[400px]">
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2 animate-bend">
                        <TrophyIcon className="w-6 h-6 text-yellow-500 animate-bend"/>
                        <h1 className="font-semibold text-xl">Congratulations!</h1>
                    </div>
                    <button className="ghost p-1" onClick={close}s><CrossIcon className="w-6 h-6 cursor-pointer"/></button>
                </div>
                <div className="animate-appearbottom w-full">
                    <div className="text-gray-400 w-full mb-2">
                        <p>You solved the challenge correctly!</p>
                        <p>You solved it in <span className="font-semibold text-black">{current.attempts}</span> attempts.</p>
                    </div>
                    <div className="text-5xl bg-blue-50 flex items-center justify-center min-h-[100px] w-full animate-popfaster">
                        <p className="animate-pop">🎉</p>
                    </div>
                </div>
                <button className="bg-blue-500 text-white top hover:opacity-70 animate-appear" onClick={next}>Next Challenge <ArrowIcon className="transform rotate-270" /> </button>
                {/* <div className="flex items-center gap-2">
                    <CheckIcon className="w-6 h-6 text-green-500"/>
                    <p>{format('game.taken_attempts', current.attempts)}</p>
                </div>
                <div className="flex items-center gap-2">
                    <TrophyIcon className="w-6 h-6 text-yellow-500"/>
                    <p>{t('game.won')}</p>
                </div>
                <button className="dark top" onClick={next}>{t('game.next')}</button> */}
                <Confetti/>
            </div>
            <style jsx>{`
                @keyframes bend {
                    0% {
                        transform: rotate(0deg);
                    }
                    50% {
                        transform: rotate(5deg);
                    }
                    100% {
                        transform: rotate(0deg);
                    }
                }
                .animate-bend{
                    animation: bend 1s;
                }

                @keyframes pop{
                    0% {
                        transform: scale(0);
                    }
                    90% {
                        transform: scale(0);
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                @keyframes pop2{
                    0% {
                        transform: scale(0) rotate(0deg);
                    }
                    30% {
                        transform: scale(0) rotate(10deg);
                    }
                    100% {
                        transform: scale(1) rotate(0deg);
                    }
                }
                .animate-pop{
                    animation: pop 1.5s ease-in-out;
                }
                .animate-popfaster{
                    animation: pop2 1.5s ease-in-out;
                }
                .animate-appear{
                    animation: pop 1s ease-in-out;
                }
            `}</style>	
        </Modal>
    )
}