import { ReactNode, useEffect } from "react";

export default function Modal({children, close, /* cross */}:{children: ReactNode, close?: () => void, cross?: boolean}) {
    useEffect(() => {
        document.body.classList.add('no-scroll');
        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, []);

    const handleClose = close ? close : () => {};

    return (
        <section onClick={handleClose} className="fixed inset-0 bg-black/50 flex items-center justify-center slow-appear z-[100]">
            <div className="flex justify-center" onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </section>
    );
}
