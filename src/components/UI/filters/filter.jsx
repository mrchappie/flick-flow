export default function Filter(props) {
  return (
    <div className="items-start w-full center">
      <span className="w-[60px]">{props.heading}:</span>
      <ul className="flex-wrap justify-start w-full center">
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
