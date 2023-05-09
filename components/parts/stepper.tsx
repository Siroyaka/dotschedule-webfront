import React from 'react';

import { PlusIconSvg, MinusIconSvg } from 'components/parts/svgIcons';

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

    const plusButton = mode === 'both' || mode === 'up' ? (
        <div className={`w-1/${mode === 'both' ? '4' : '2'} border-l border-r flex items-center justify-center`}>
            <button
                className='tap-no-response w-5 h-5 sm:w-7 sm:h-7 mx-2 my-2 rounded-full bg-gray-100'
                onClick={() => { enableStep === 'both' || enableStep === 'up' ? onClick(stepValue + value) : {} }}
            >
                <PlusIconSvg className={`w-5 sm:w-7 ${ enableStep === 'down' ? 'text-gray-300' : ''}`} />
            </button>
        </div>
    ) : null;

    const minusButton = mode === 'both' || mode === 'down' ? (
        <div className={`w-1/${mode === 'both' ? '4' : '2'} border-l border-r flex items-center justify-center`}>
            <button
                className='tap-no-response w-5 h-5 sm:w-7 sm:h-7 mx-1 my-1 rounded-full bg-gray-100'
                onClick={() => { enableStep === 'both' || enableStep === 'down' ? onClick((-1 * stepValue) + value) : {} }}
            >
                <MinusIconSvg className={`w-5 sm:w-7 ${ enableStep === 'up' ? 'text-gray-300' : ''}`} />
            </button>
        </div>
    ) : null;

    return (
        <div className={`flex ${className ?? ""}`}>
            <div className='w-1/2 text-base sm:text-xl flex items-center justify-center'>
                {children ?? value}
            </div>
            {minusButton}
            {plusButton}
        </div>
    )
}

export default Stepper;