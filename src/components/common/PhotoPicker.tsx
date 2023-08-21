import { useUserStore } from "@/store/store";
import { forwardRef } from "react";
import ReactDOM from "react-dom";

const PhotoPicker = forwardRef<HTMLInputElement>((props, ref) => {
  const setAvatarImgSrc = useUserStore((set) => set.setNewImgSrc);

  const handlePhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;

    const reader = new FileReader();

    if (file[0]) {
      reader.readAsDataURL(file[0]);

      reader.onload = (e) => {
        setAvatarImgSrc(e.target?.result as string);
      };
    }
  };

  return <input ref={ref} type="file" hidden onChange={handlePhotoSelect} />;
});

export default PhotoPicker;
