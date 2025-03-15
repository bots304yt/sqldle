import { useEffect } from "react";
import CustomSelect from "@/components/UX/CustomSelect";
import { DragDrop } from "@/components/UX/DragDrop";
import { ArrowIcon, DatabaseIcon, EyeOpenIcon, QuestionIcon, ServerIcon, TrophyIcon, WnadIcon } from "@/components/UI/Icons";
import { Language, useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import { Containers, Item } from "@/lib/types";
import { GameType, useGame } from "@/context/GameContext";
import StatsModal from "@/modals/Stats";
import WinModal from "@/modals/Win";
import HowToModal from "@/modals/HowTo";

export default function Game(){
    const {t, setLang, lang} = useLanguage();
    const {challenge, updateStat, next, back, current} = useGame();

    const [howtoOpen, setHowtoOpen] = useState(false);
    const [statsOpen, setStatsOpen] = useState(false);
    const [winOpen, setWinOpen] = useState(true);
    const words = [...challenge.words, ...challenge.fakeWords].sort(() => Math.random() - 0.5).map(w => ({value: w, state: 'default'}));
    const [wordContainer, setWordContainer] = useState<Containers>({
        query: {
            title: t('game.query'),
            color: '#62A77E',
            items: []
        },
        available: {
            title: t('game.words'),
            color: '#8561A2',
            items: words
        }
    });

    useEffect(() => {
        setWordContainer((prev) => ({
            query: {
                title: t('game.query'),
                color: prev.query.color,
                items: []
            },
            available: {
                title: t('game.words'),
                color: prev.available.color,
                items: prev.available.items
            }
        }));
    }, [lang, t]);

    const openModal = (modal: string) => {
        switch(modal){
            case 'stats':
                setStatsOpen(true);
                setWinOpen(false);
                setHowtoOpen(false);
                break;
            case 'won':
                setStatsOpen(false);
                setHowtoOpen(false);
                setWinOpen(true);
                break;
            case 'howto':
                setStatsOpen(false);
                setWinOpen(false);
                setHowtoOpen(true);
                break;
            case 'close':
                setStatsOpen(false);
                setWinOpen(false);
                setHowtoOpen(false);
                break;    
            default:
                break;
        }
    }

    const handleItemMove = (item: Item, target: string) => {
        setWordContainer((prev) => ({
            ...prev,
            [target]: {
                ...prev[target],
                items: [...prev[target].items, item]
            }
        }));
    }

    const saveGame = (game: GameType, completed: boolean) => {
        updateStat({
            id: game.id,
            attempts: game.attempts,
            completed,
            date: game.date
        });
    }

    function check(){
        if(current.attempts >= 5) return;
        const query = wordContainer.query.items.map(i => i.value).join(' ').toLowerCase();
        const answers = challenge.answers[0].split(' ');

        const game = {
            id: challenge.id,
            attempts: current.attempts + 1,
            completed: false,
            date: new Date().toISOString()
        }

        let win = false;
        challenge.answers.forEach(a => {
            if (a.toLowerCase() === query.toLowerCase()) return win = true;
        });
        if (win){
            saveGame(game, true);

            return openModal('won');
        }
        saveGame(game, false);
        
        wordContainer.query.items.forEach((e, i) => {
            const word = e.value.toLowerCase();
            if(answers.length > i && word == answers[i].toLowerCase()){
                e.state = 'correct';
            }else if(answers.includes(e.value)){
                e.state = 'incorrect';
            }else{
                e.state = 'wrong';
            }
        });
    }

    const closeModal = () => {
        openModal('close');
    }

    return (
        <main>
            {current.completed && winOpen && <WinModal close={closeModal} />}
            {statsOpen && <StatsModal close={closeModal}/>}
            {howtoOpen && <HowToModal close={closeModal}/>}
            <section className="mx-auto max-w-[800px] w-full text-center font-mono md:py-[10vh] p-5 px-4" id="game">

                <div className="mb-8 max-w-[500px] mx-auto">
                    <div className="flex items-center justify-center gap-2 w-fit mx-auto mb-4">
                        <DatabaseIcon className="w-8 h-8 mx-auto"/>
                        <h1 className="font-bold text-5xl"><span className="text-blue-600">SQL</span>dle</h1>
                    </div>
                    <p className="text-sm text-gray-600">{t('app.description')}</p>    
                </div>

                <section className="flex flex-col gap-4 text-left">

                    <div className="text-md flex items-center justify-between my-4 px-1">
                        <button className="ghost top" onClick={() => openModal('howto')}><QuestionIcon className="w-4 h-4"/>{t('game.howto')}</button>
                        <p className="font-semibold text-xl flex items-center gap-1">
                            <button onClick={() => (back(), setWinOpen(true))} disabled={current.id <= 0} className="mr-2 ghost p-2"><ArrowIcon className="w-4 h-4 transform rotate-90"/></button>
                            {t('game.challenge')} 
                            <span className="ml-3">{current.id + 1}</span>/<span>5</span>
                            <button onClick={() => (next(), setWinOpen(true))} disabled={!current.completed} className="ml-2 ghost p-2"><ArrowIcon className="w-4 h-4 transform rotate-270"/></button>
                        </p>
                        <div className="flex gap-2 items-center">
                            <CustomSelect options={[
                                {value: 'en', label: 'English'}, 
                                {value: 'es', label: 'Español'}, 
                                {value: 'eu', label: 'Euskara'}, 
                                {value: 'sv', label: 'Svenska'}
                            ]} defaultValue={lang} onChange={o => setLang(o as Language)}/>
                            <button className="ghost top" onClick={() => openModal('stats')} >
                                <TrophyIcon className="w-4 h-4"/>
                                <span>{t('game.stats')}</span>
                            </button>
                        </div>
                    </div>

                    <div className="border border-gray-200 rounded-md shadow-md">
                        <div className="bg-blue-50 p-6">
                            <div className="flex items-center gap-2 text-blue-700 mb-4">
                                <DatabaseIcon className="w-5 h-5"/>
                                <span className="p-[0.1rem] px-2 bg-blue-400/20 rounded-full font-semibold text-sm">SQL Challenge</span>
                            </div>
                            <h2 className="text-2xl font-bold">{t('game.title')}</h2>
                            <p className="text-sm text-gray-600">{challenge.desc}</p>
                        </div>
                        <div className="pb-4 px-6">
                            <div className="text-sm bg-blue-900/5 pt-1 p-4 rounded-md my-4">
                                <div className="flex items-center gap-2 py-1">
                                    <ServerIcon className="w-4 h-4"/>
                                    <p>{t('game.schema')}</p>
                                </div>
                                <div className="bg-white p-2">
                                    {challenge.schema.split('\n').map((line, i) => <><span key={i}>{line}</span><br/></>)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                <p>{t('game.task')}</p>
                            </div>
                            <p className="border-l-2 border-green-500 pl-2">{challenge.task}</p>
                        </div>
                    </div>
                    <DragDrop containers={wordContainer} setContainers={setWordContainer} onMove={handleItemMove}/>
                    <div className="flex items-center justify-between px-1 select-none">
                        <p className="bg-gray-100 hover:bg-gray-200 px-4 rounded-full">{t('game.attempts')} <span>{current.attempts}</span>/<span>5</span></p>
                        <div className="flex items-center gap-2">
                            <button className="top bg-blue-500 text-white hover:opacity-70" disabled={wordContainer.query.items.length == 0 || current.completed} onClick={check}>{t('game.check')}</button>
                            {current.completed && <button className="dark top" onClick={next}>{t('game.next')}</button>}
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="ghost p-2 border-2 border-dashed border-gray-200 text-gray-400" onClick={() => {
                                    saveGame({
                                        id: challenge.id,
                                        attempts: current.attempts + 1,
                                        completed: false,
                                        date: new Date().toISOString()
                                    }, true);
                                    openModal('win');
                                }}>
                                    <WnadIcon className="w-4 h-4"/>
                            </button>
                            <button className="ghost text-gray-400 p-2" onClick={() => document.getElementById('answers')?.classList.toggle("hidden")}><EyeOpenIcon/></button>
                        </div>
                    </div>
                    <div id="answers" className="hidden">
                        {challenge.answers.map((answer, i) => <p key={i}>{answer}</p>)}
                    </div>
                </section>
            </section>
        </main>
    )
}