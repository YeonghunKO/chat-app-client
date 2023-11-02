import { forwardRef } from "react";

const PhotoPicker = forwardRef<
  HTMLInputElement,
  { onChangeSetImage: (e: React.ChangeEvent<HTMLInputElement>) => void }
>(({ onChangeSetImage }, ref) => {
  return <input ref={ref} type="file" hidden onChange={onChangeSetImage} />;
});
PhotoPicker.displayName = "PhotoPicker";

export default PhotoPicker;
