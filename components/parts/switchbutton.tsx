import React from 'react';

type BgColor = 'green' | 'white' | 'gray' | 'blue' | 'orange' | 'black';

type ButtonColor = 'green' | 'white' | 'gray' | 'blue' | 'orange' | 'black';

type Speed = 'veryslow' | 'slow' | 'middle' | 'fast' | 'veryfast';

interface SwitchButtonProps {
    onClick: (flg: boolean) => void
    isOn: boolean
    onModeColor?: BgColor
    offModeColor?: BgColor
    buttonColor?: ButtonColor
    className?: string
    buttonMoveSpeed?: Speed
    bgChangeSpeed?: Speed
}

const convertBgColor = (bgcolor: BgColor) => {
    switch(bgcolor) {
        case 'green': return 'bg-green-400';
        case 'white': return 'bg-white';
        case 'gray': return 'bg-gray-400';
        case 'blue': return 'bg-blue-400';
        case 'orange': return 'bg-orange-400';
        case 'black': return 'bg-black';
    }
}

const convertButtonColor = (buttonColor: ButtonColor) => {
    switch(buttonColor) {
        case 'green': return 'bg-green-500';
        case 'white': return 'bg-white';
        case 'gray': return 'bg-gray-500';
        case 'blue': return 'bg-blue-500';
        case 'black': return 'bg-black';
    }
}

const convertSpeed = (s: Speed) => {
    switch(s) {
        case 'veryslow': return 'duration-700'
        case 'slow': return 'duration-500'
        case 'middle': return 'duration-300'
        case 'fast': return 'duration-150'
        case 'veryfast': return 'duration-75'
    }
}

const SwitchButton: React.FC<SwitchButtonProps> = (props) => {
    const {
        onClick,
        isOn,
        onModeColor,
        offModeColor,
        buttonColor,
        className,
        bgChangeSpeed,
        buttonMoveSpeed
    } = props;

    const outlineClass = isOn ?
        `${convertBgColor(onModeColor ?? 'green')} justify-end` :
        `${convertBgColor(offModeColor ?? 'gray')} justify-start`;
    
    const buttonCenterStyle = {
        height: "1.2rem",
        width: "1.2rem",
        top: "0.09rem",
        transform: isOn ? "translate(1.6rem)" : "translate(0.1rem)"
    };
    
    return (
        <div
            className={`relative outline-none tap-no-response cursor-pointer rounded-full border shadow transition-all ease-in-out ${convertSpeed(bgChangeSpeed ?? 'middle')} ${outlineClass} ${className}`}
            onClick={() => onClick(!isOn)}
            style={{
                height: "1.5rem",
                width: "3rem"
            }}
        >
            <div
                className={`absolute transition ${convertSpeed(buttonMoveSpeed ?? 'middle')} rounded-full ${convertButtonColor(buttonColor ?? 'white')}`}
                style={buttonCenterStyle}
            />
        </div>
    )
}

export default SwitchButton;