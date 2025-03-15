import { CrossIcon } from "@/components/UI/Icons";
import Modal from "@/components/UX/Modal";
import ProgressBar from "@/components/UX/ProgressBar";
import { useGame } from "@/context/GameContext";
import { useLanguage } from "@/context/LanguageContext";

export default function StatsModal({close}: {close: () => void}){
    const { t } = useLanguage();
    const {stats} = useGame();

    return (
        <Modal close={close} cross>
            <div className="bg-white p-4 rounded-md flex flex-col gap-4 max-w-[90%] w-[550px] text-gray-500 relative">
                <p className="flex items-center w-full justify-between">
                    <span className="text-black text-xl font-semibold">{t('stats.title')}</span>
                    <button className="ghost"><CrossIcon className="w-6 h-6 text-gray-500 cursor-pointer" onClick={close}/></button>
                </p>
                <div className="flex items-center gap-2 flex-wrap">
                    <div className="bg-blue-900/5 rounded-md p-4 grow">
                        <p className="font-bold text-2xl">{stats.completed}</p>
                        <p>{t('stats.completed')}</p>
                    </div>
                    <div className="bg-blue-900/5 rounded-md p-4 grow">
                        <p className="font-bold text-2xl">{stats.average}</p>
                        <p>{t('stats.average')}</p>
                    </div>
                </div>
                <div>
                    <p className="flex items-center w-full justify-between"><span>{t('stats.current')}</span><span>{stats.streak}</span></p>
                    <ProgressBar actual={stats.streak} total={stats.total}/>
                </div>
                <div>
                    <p className="flex items-center w-full justify-between"><span>{t('stats.best')}</span><span>{stats.bestStreak}</span></p>
                    <ProgressBar actual={stats.bestStreak} total={stats.total}/>
                </div>
                <div className="bg-blue-900/5 rounded-md p-4 flex flex-col gap-2">
                    <p className="font-semibold">{t('stats.performance')}</p>
                    <div>
                        <p className="flex items-center w-full justify-between"><span>{t('stats.total')}</span><span>{stats.total}</span></p>
                        <p className="flex items-center w-full justify-between"><span>{t('stats.rate')} </span><span>{stats.rate}%</span></p>
                    </div>
                </div>
            </div>    
        </Modal>
    )
}