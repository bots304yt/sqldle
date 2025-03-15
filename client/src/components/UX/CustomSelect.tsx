import { useEffect, useState } from "react";
import { ArrowIcon } from "../UI/Icons";
interface SelectOption{
    value: string;
    label: string;
}
export default function CustomSelect({options, defaultValue, onChange}: {options: SelectOption[], defaultValue?: string, onChange?: (value: string) => void}){
    const [selected, setSelected] = useState<SelectOption>(options.find(i => i.value === defaultValue) ?? options[0]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setSelected(options.find(i => i.value === defaultValue) ?? options[0]);
    }, [defaultValue, options])

    function handleChange(option: SelectOption){
        setSelected(option);
        if (onChange) onChange(option.value);
    }

    return (<>
        <div className="custom-select relative" onClick={() => setOpen(!open)}>
            {open && <div className="fixed top-0 left-0 inset-0 rounded-md w-screen h-screen cursor-default" onClick={() => setOpen(!open)}></div>}
            <div className="flex items-center gap-2">
                <span>{selected.label}</span>
                <ArrowIcon className={'w-4 h-4' + (open ? ' transform rotate-180' : '')}/>
            </div>
            {open && <div className="absolute top-[100%] options select-none">
                {options.map((option, i) => <p key={i} onClick={() => handleChange(option)} className={selected.value == option.value ? 'selected' : undefined}>{option.label}</p>)}
            </div>}
        </div>
    </>)

}