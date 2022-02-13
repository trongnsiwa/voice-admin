import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';
import {
  Calendar,
  DayValue,
} from '@hassanmojab/react-modern-calendar-datepicker';

interface DatePickerProps {
  icon: ReactElement;
  name: string;
  date: DayValue | null;
  onChange: (value: DayValue) => void;
  reset: () => void;
}

const DatePicker = ({ icon, name, date, onChange, reset }: DatePickerProps) => {
  return (
    <Popover className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <Popover.Button className="pl-12 select select-ghost select-bordered cursor-default disabled caret-transparent w-[15em]">
        <span className="my-auto text-gray-600 font-medium whitespace-nowrap">
          {date
            ? `${
                date.day.toString().length === 1 ? '0' + date.day : date.day
              }/${
                date.month.toString().length === 1
                  ? '0' + date.month
                  : date.month
              }/${date.year}`
            : name}
        </span>
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute z-20 shadow-lg">
          <Calendar
            colorPrimary="#474747"
            calendarClassName="responsive-calendar"
            value={date}
            onChange={onChange}
            shouldHighlightWeekends={true}
            renderFooter={() => (
              <div className="w-full flex justify-center">
                <button
                  type="button"
                  onClick={reset}
                  className="btn btn-link text-xs w-[70px]"
                >
                  Reset
                </button>
              </div>
            )}
          />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DatePicker;
