import useScrollMemory from 'utils/hooks/useScrollMemory';

export default function WithScrollMemory(WrappedComponent) {
  return function ScrollMemoryWrapper(props) {
    useScrollMemory();

    return <WrappedComponent {...props} />;
  };
}
