import { Filters } from 'utils/interfaces/Interfaces';

export default function Filter(props: Filters) {
  return (
    <div className="center w-full items-start">
      <span className="w-[60px]">{props.heading}:</span>
      <ul className="center w-full flex-wrap justify-start">
        {props.filters.map((filter) => {
          return (
            <li key={filter.name}>
              <label htmlFor={filter.name} className="center w-max">
                <input
                  type={filter.input === 'radio' ? 'radio' : 'checkbox'}
                  defaultChecked={
                    filter.input === 'radio' && filter.placeholder === 'All'
                      ? true
                      : false
                  }
                  name={filter.name}
                  id={filter.name}
                />
                <div>{filter.placeholder}</div>
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
