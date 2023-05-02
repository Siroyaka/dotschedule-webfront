import React from 'react';

type BgColor = 'green' | 'white' | 'gray' | 'blue' | 'orange' | 'black';

type ButtonColor = 'green' | 'white' | 'gray' | 'blue' | 'orange' | 'black';

type Speed = 'veryslow' | 'slow' | 'middle' | 'fast' | 'veryfast';

type StepMode = 'up' | 'down' | 'both';

interface StepperProps {
    onClick: (val: number) => void
    mode: StepMode
    enableStep: StepMode
    stepValue: number
    value: number
    children?: React.ReactNode
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

const Stepper: React.FC<StepperProps> = (props) => {
    const {
        onClick,
        stepValue,
        enableStep,
        mode,
        value,
        children,
        onModeColor,
        offModeColor,
        buttonColor,
        className,
        bgChangeSpeed,
        buttonMoveSpeed
    } = props;

    return (
        <div className={`flex border ${className}`}>
            <div className='w-1/2 flex items-center justify-center'>
                {children ?? value}
            </div>
            <div
                className='w-1/4 tap-no-response border-l border-r text-center cursor-pointer'
                onClick={() => {onClick(stepValue + value)}}
            >
                +
            </div>
            <div
                className='w-1/4 tap-no-response text-center cursor-pointer'
                onClick={() => {onClick((-1 * stepValue) + value)}}
            >
                -
            </div>
        </div>
    )
}

export default Stepper;