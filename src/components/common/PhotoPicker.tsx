import { useUserStore } from "@/store";
import { forwardRef } from "react";
import Resizer from "react-image-file-resizer";

const PhotoPicker = forwardRef<HTMLInputElement>((props, ref) => {
  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64",
      );
    });

  const setAvatarImgSrc = useUserStore((set) => set.setNewImgSrc);

  const handlePhotoSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files as FileList;

    const reader = new FileReader();

    if (file[0]) {
      reader.readAsDataURL(file[0]);
      const image = await resizeFile(file[0]);
      setAvatarImgSrc(image as string);
    }
  };

  return <input ref={ref} type="file" hidden onChange={handlePhotoSelect} />;
});

export default PhotoPicker;
