import {
  ButtonTextBg,
  ButtonTextNoBgWithBorder,
} from 'components/UI/buttons/buttons';
import Heading from 'components/UI/heading/heading';
import { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';
import ListComponent from './listComponent/listomponent';

export default function ManageLists() {
  const { response, fetchData } = useFetch({});

  useEffect(() => {
    if (response) {
      console.log(response);
    }
  }, [response]);

  return (
    <>
      <div className="center">
        <Heading title="Manage Lists" />
        <div className="gap-4 center grow">
          <ButtonTextNoBgWithBorder
            handleClick={() => {
              console.log('test');
              fetchData({
                customURL:
                  process.env.REACT_APP_FIREBASE_EXPORT_LISTS_DATA + `?page=1`,
              });
            }}
            title="Load Lists"
          />
          <ButtonTextBg title="Add List" />
        </div>
      </div>
      <hr className="my-4" />
      <div className="gap-4 center-col">
        <div className="grid w-full grid-cols-6 gap-4 px-4 mt-2 font-bold max-w-[1400px]">
          <span>List name</span>
          <span>Created at</span>
          <span>Updated at</span>
          <span>List ID</span>
          <span>User ID</span>
        </div>
        {response &&
          response.data.map((list) => {
            return <ListComponent list={list} key={list.listID} />;
          })}
      </div>
    </>
  );
}
