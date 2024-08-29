import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading, Heading2 } from 'components/UI/heading/heading';
import { useEffect, useState } from 'react';
import useFetch from 'utils/hooks/useFetch';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function Dashboard() {
  const { response, fetchData } = useFetch({});
  const [banners, setBanners] = useState([]);
  const { updateActiveBanner } = useStateStore();
  const [file, setFile] = useState(null);

  useEffect(() => {
    getBanners();
  }, []);

  async function getBanners() {
    const res = await DB.getFirestoreDoc(['settings', 'banners']);
    setBanners(res.content);
  }

  async function changeActiveBanner(activeBanner) {
    const changedBanners = banners.map((bannerToFind) => {
      if (bannerToFind.name === activeBanner.name) {
        return {
          ...bannerToFind,
          active: true,
        };
      }
      return {
        ...bannerToFind,
        active: false,
      };
    });

    setBanners(changedBanners);

    await DB.updateFirestoreDoc(['settings', 'banners'], {
      content: changedBanners,
    });
  }

  useEffect(() => {
    console.log(banners);
  }, [banners]);

  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  async function addCustomBanner() {
    const downloadURL = await DB.uploadFileToStorage(
      ['banners', 'banner4'],
      file
    );
    await DB.updateFirestoreDoc(['settings', 'banners'], {
      content: [
        ...banners,
        { active: false, url: downloadURL, name: 'banner4' },
      ],
    });
    setBanners([
      ...banners,
      { active: false, url: downloadURL, name: 'banner4' },
    ]);
  }

  return (
    <div>
      <Heading title={'Dashboard'} />
      <div className="justify-between py-4 center">
        <Heading2
          title={`Select desired banner imag`}
          customStyle={'text-white'}
        />
        <input type="file" onChange={handleFileChange} />
        <ButtonTextBg handleClick={addCustomBanner} title={'Add Banner'} />
      </div>
      <section className="grid w-full grid-cols-3 grid-rows-2 gap-4">
        {banners
          .filter((banner) => banner.url)
          .map((banner) => {
            return (
              <div
                onClick={() => {
                  updateActiveBanner(banner);
                  changeActiveBanner(banner);
                }}
                key={banner.name}
                className={`w-full relative h-[300px] bg-black shadow-2xl border-2 ${
                  banner.active
                    ? 'border-brand2 cursor-not-allowed'
                    : 'border-none cursor-pointer'
                }`}
              >
                {!banner.active && (
                  <div className="absolute top-0 left-0 z-10 w-full h-full text-2xl font-bold transition-all bg-black/75 center">
                    Select Banner
                  </div>
                )}
                <img
                  src={banner.url}
                  alt=""
                  className="object-cover w-full h-full opacity-90"
                />
              </div>
            );
          })}
      </section>
    </div>
  );
}
