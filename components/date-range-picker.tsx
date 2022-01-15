import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';
import { DateRangePicker } from 'react-date-range';

interface DateRangePickerProps {
  icon: ReactElement;
  name: string;
  selectionRange: {
    startDate: Date;
    endDate: Date;
  };
  onChange: any;
}

const DatePicker = ({
  icon,
  name,
  selectionRange,
  onChange,
}: DateRangePickerProps) => {
  return (
    <Popover className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <Popover.Button className="pl-12 select select-ghost select-bordered cursor-default disabled caret-transparent w-[15em]">
        <span className="my-auto text-gray-600 font-medium whitespace-nowrap">
          {name}
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
        <Popover.Panel className="absolute z-10 shadow-lg">
          <DateRangePicker ranges={[selectionRange]} onChange={onChange} />
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default DatePicker;
