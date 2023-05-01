import React from 'react';

type bgcolor = 'green' | 'white' | 'gray' | 'blue' | 'orange' | 'black';

interface SwitchButtonProps {
    onClick: (flg: boolean) => void
    isOn: boolean
    onModeColor?: bgcolor
    offModeColor?: bgcolor
    buttonColor?: bgcolor
    className?: string
}

const convertBgColor = (bgcolor: bgcolor) => {
    switch(bgcolor) {
        case 'green': return 'bg-green-400';
        case 'white': return 'bg-white';
        case 'gray': return 'bg-gray-400';
        case 'blue': return 'bg-blue-400';
        case 'orange': return 'bg-orange-400';
        case 'black': return 'bg-black';
    }
}

const convertButtonColor = (buttonColor: bgcolor) => {
    switch(buttonColor) {
        case 'green': return 'bg-green-500';
        case 'white': return 'bg-white';
        case 'gray': return 'bg-gray-500';
        case 'blue': return 'bg-blue-500';
        case 'black': return 'bg-black';
    }
}

const SwitchButton: React.FC<SwitchButtonProps> = ({onClick, isOn, onModeColor, offModeColor, buttonColor, className}) => {
    if (onModeColor === undefined) onModeColor = 'green';
    if (offModeColor === undefined) offModeColor = 'gray';
    if (buttonColor === undefined) buttonColor = 'white';

    const outlineClass = isOn ?
        `${convertBgColor(onModeColor)} justify-end` :
        `${convertBgColor(offModeColor)} justify-start`;
    return (
        <div
            className={`cursor-pointer h-6 w-12 rounded-full border shadow flex items-center transition-all ease-in-out duration-500 ${outlineClass} ${className}`}
            onClick={() => onClick(!isOn)}
        >
            <div className={`h-5 w-5 rounded-full mx-0.5 ${convertButtonColor(buttonColor)}`} />
        </div>
    )
}

export default SwitchButton;