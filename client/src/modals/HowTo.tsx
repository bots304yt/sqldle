import { CrossIcon } from "@/components/UI/Icons";
import Modal from "@/components/UX/Modal";

export default function HowToModal({close}: {close: () => void}){
    // const { t } = useLanguage();

    return (<Modal close={close}>
        <div className="bg-white max-h-[90vh] overflow-y-auto max-w-[600px] p-4 rounded-md">
            <div className="flex items-center justify-between text-xl font-semibold mb-6">
                <h1>How to play</h1>
                <button className="ghost p-1" onClick={close}><CrossIcon className="w-6 h-6 text-gray-500"/></button>
            </div>
            <div className="px-1 text-gray-500 flex flex-col gap-4">
                <p>SQLdle challenges you to build correct SQL queries by selecting and arranging words in the right order.</p>
                <p className="font-semibold">How to play:</p>
                <ol className="list-decimal px-5">
                    <li>Read the database challenge and understand the task</li>
                    <li>{'Drag words from the "Available Words" section to the "Your SQL Query" section'}</li>
                    <li>Arrange the words in the correct order to form a valid SQL query</li>
                    <li>{'To remove a word from your query, drag it back to the "Available Words" section or outside the query area'}</li>
                    <li>{'Click "Check Query" to verify your solution'}</li>
                    <li>You have 5 attempts to solve each challenge</li>
                    <li>Use the color feedback to refine your query in your next attempt</li>
                </ol>
                <p className="font-semibold">Tips:</p>
                <ul className="list-disc px-5">
                    <li>Pay attention to the database schema provided</li>
                    <li>Remember the basic structure of SQL queries (SELECT, FROM, WHERE, etc.)</li>
                    <li>Some challenges may require JOINs, GROUP BY, or other SQL features</li>
                    <li>Use the color feedback to refine your query</li>
                    <li>{"Capitalization doesn't matter, but the order of words does"}</li>
                </ul>
                <p>Test your SQL knowledge and see how quickly you can solve all the challenges!</p>
            </div>
        </div>
    </Modal>)
}