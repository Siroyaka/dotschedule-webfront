import React from 'react';
import clsx from 'clsx';

const WeekDays: React.FC = () => {
    const weekDays = ['日', '月', '火', '水', '木', '金', '土'];
    return (
      <ol id="weekday" className={clsx("flex", "justify-between")}>
        {weekDays.map((weekDay, i) => (
          <li
            key={"weekday-typo-" + i}
            className={clsx("text-center", 'w-full', { ["text-blue-500"]: i === 6 }, { ["text-red-500"]: i === 0 })}
          >
            <span>{weekDay}</span>
          </li>
        ))}
      </ol>
    );
}
export default WeekDays;