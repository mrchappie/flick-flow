import { ButtonTextBg } from 'components/UI/buttons/buttons';
import { Heading, Heading2 } from 'components/UI/heading/heading';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useModal } from 'utils/modals/ModalContext';
import ConnectDB from 'utils/services/crud/crud';
import { useStateStore } from 'utils/services/state/State';

const DB = new ConnectDB();

export default function Dashboard() {
  const [banners, setBanners] = useState([]);
  const { updateActiveBanner } = useStateStore();
  const { openModal, closeModal } = useModal();

  async function getBanners() {
    const res = await DB.getFirestoreDoc(['settings', 'banners']);
    setBanners(res.content);
  }

  async function changeActiveBannerInDB(activeBanner) {
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

  async function addCustomBanner(file) {
    const downloadURL = await DB.uploadFileToStorage(
      ['banners', file.name],
      file
    );
    await DB.updateFirestoreDocInArray(['settings', 'banners'], {
      active: false,
      url: downloadURL,
      name: file.name,
    });
    setBanners((prevState) => [
      ...prevState,
      { active: false, url: downloadURL, name: file.name },
    ]);
    closeModal('outside');
    toast.success('Banner uploaded successfully');
  }

  return (
    <div>
      <Heading title={'Dashboard'} />
      <div className="justify-between py-4 center">
        <Heading2 title={`Select desired banner`} customStyle={'text-white'} />
        <ButtonTextBg
          handleClick={() => {
            openModal('AddBanner', {
              addCustomBanner,
              title: 'Upload New Banner',
              subTitle: 'Maximum file size is 2MB.',
            });
          }}
          title={'Add Banner'}
        />
      </div>
      {banners.length === 0 && (
        <ButtonTextBg handleClick={getBanners} title={'Load Banners'} />
      )}
      {banners.length > 0 && (
        <section className="grid w-full grid-cols-3 grid-rows-2 gap-4">
          {banners
            .filter((banner) => banner.url)
            .map((banner) => {
              return (
                <div
                  onClick={() => {
                    updateActiveBanner(banner);
                    changeActiveBannerInDB(banner);
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
      )}
    </div>
  );
}
