import { useEffect } from 'react';
import useFetch from 'utils/hooks/useFetch';

export default function UserProfile() {
  // const { response } = useFetch({
  //   url: process.env.REACT_APP_FIREBASE_GET_ITEM_IDS,
  // });

  // useEffect(() => {
  //   if (response) {
  //     console.log(response);
  //   }
  // }, [response]);

  return <div className="w-full">User Profile</div>;
}
