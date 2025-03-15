export default function ProgressBar({ actual, total }: {actual: number, total: number}) {
    const percentage = (actual / total) * 100;
    return (
        <div className="relative w-full h-2 bg-gray-200 rounded-md">
            <div className="absolute h-full bg-black/95 rounded-md max-w-full" style={{width: `${percentage}%`}}></div>
        </div>
    )
}