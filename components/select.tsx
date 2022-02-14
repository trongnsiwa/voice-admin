import { Popover, Transition } from '@headlessui/react';
import { Fragment, ReactElement } from 'react';

interface SelectProps {
  icon: ReactElement;
  name: string;
  data: any[];
  width: any;
  filter: (name: string, value: string | null) => void;
  filterName: string;
  selected: any;
  isDetail?: boolean;
  hasBottom?: boolean;
}

const Select = ({
  icon,
  name,
  data,
  width,
  filter,
  filterName,
  selected,
  isDetail = false,
  hasBottom = true,
}: SelectProps) => {
  return (
    <Popover className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <Popover.Button
        className={`pl-12 select select-ghost bg-white select-bordered cursor-default disabled caret-transparent ${width}`}
      >
        <span className="my-auto text-gray-600 font-medium">
          {selected ?? name}
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
        <Popover.Panel
          className={`absolute bg-white  shadow-lg p-5 w-full z-10 ${
            isDetail && (hasBottom ? '-top-[19em]' : '-top-[21em]')
          }`}
        >
          <label
            className="cursor-pointer label justify-start"
            onClick={() => {
              filter(filterName, null);
            }}
          >
            <input
              type="radio"
              name={`rb-${name}`}
              className="radio focus:text-primary-dark"
              value="All"
              checked={selected === null}
              onChange={() => {
                filter('Status', null);
              }}
            />
            <span
              className="label-text capitalize pl-3"
              onClick={() => {
                filter(filterName, null);
              }}
            >
              All
            </span>
          </label>
          {data &&
            data.map((item, index) => (
              <label
                key={`chk_${item}_${index}`}
                className="cursor-pointer label justify-start"
              >
                <input
                  type="radio"
                  name={`rb-${name}`}
                  className="radio"
                  value={item.name}
                  checked={selected === item.name}
                  onChange={() => {
                    filter(filterName, item.name);
                  }}
                />
                <span
                  className="label-text capitalize overflow-hidden text-ellipsis pl-3"
                  onClick={() => {
                    filter(filterName, item.name);
                  }}
                >
                  {item.label}
                </span>
              </label>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Select;
