import { Popover, Transition } from '@headlessui/react';
import { Dispatch, Fragment, ReactElement, SetStateAction } from 'react';

interface MultipleSelectProps {
  icon: ReactElement;
  name: string;
  data: any[];
  selectedList: string[];
  filter: (value: string, isClear: boolean) => void;
  setPage: Dispatch<SetStateAction<number>>;
  width: any;
  isDetail?: boolean;
  hasBottom?: boolean;
}

const MultipleSelect = ({
  icon,
  name,
  data,
  selectedList,
  filter,
  setPage,
  width,
  isDetail = false,
  hasBottom = true,
}: MultipleSelectProps) => {
  console.log(data);

  return (
    <Popover className="relative">
      <span className="absolute top-1/2 -translate-y-1/2 left-3">{icon}</span>
      <Popover.Button
        className={`pl-12 select select-ghost bg-white select-bordered cursor-default disabled caret-transparent ${width}`}
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
        <Popover.Panel
          className={`absolute bg-white  shadow-lg p-5 w-full z-10 ${
            isDetail && (hasBottom ? '-top-[19em]' : '-top-[21em]')
          }`}
        >
          <label className="cursor-pointer label justify-start">
            <input
              type="checkbox"
              className="checkbox checkbox-primary"
              value="All"
              checked={selectedList.length === 0}
              onChange={() => {
                filter('All', true);
              }}
            />
            <span
              className="label-text capitalize pl-3"
              onClick={() => {
                filter('All', true);
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
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  value={item}
                  checked={
                    selectedList.findIndex(
                      (selected) => selected === item.name
                    ) >= 0 || selectedList.length === 0
                  }
                />
                <span
                  className="label-text capitalize overflow-hidden text-ellipsis pl-3"
                  onClick={() => {
                    if (
                      selectedList.findIndex(
                        (selected) => selected === item.name
                      ) >= 0
                    ) {
                      filter(item.name, true);
                    } else {
                      filter(item.name, false);
                    }
                  }}
                >
                  {item.name}
                </span>
              </label>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default MultipleSelect;
