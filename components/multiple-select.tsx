import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';

interface MultipleSelectProps {
  icon: ReactElement;
  name: string;
  data: any[];
  value: string | null;
  onChange: any;
  width: any;
}

const MultipleSelect = ({
  icon,
  name,
  data,
  value,
  onChange,
  width,
}: MultipleSelectProps) => {
  return (
    <Popover className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <Popover.Button
        className={`pl-12 select select-ghost select-bordered cursor-default disabled caret-transparent ${width}`}
      >
        <span className="my-auto text-gray-600 font-medium">{name}</span>
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
        <Popover.Panel className="absolute bg-white shadow-lg p-5 w-full z-10">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              value="all"
            />
            <span className="label-text capitalize">All</span>
          </label>
          {data &&
            data.map((item, index) => (
              <label
                key={`chk_${item}_${index}`}
                className="cursor-pointer label"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={item}
                />
                <span className="label-text capitalize overflow-hidden text-ellipsis pl-3">
                  {item.label}
                </span>
              </label>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MultipleSelect;
