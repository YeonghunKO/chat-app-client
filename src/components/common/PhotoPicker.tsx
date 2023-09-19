import { forwardRef } from "react";
import Resizer from "react-image-file-resizer";

const PhotoPicker = forwardRef<
  HTMLInputElement,
  { onChangeSetImage: (e: React.ChangeEvent<HTMLInputElement>) => void }
>(({ onChangeSetImage }, ref) => {
  return <input ref={ref} type="file" hidden onChange={onChangeSetImage} />;
});

export default PhotoPicker;
