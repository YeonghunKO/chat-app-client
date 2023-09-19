import Resizer from "react-image-file-resizer";

interface IResizeFile {
  file: any;
  size: number;
  outPut: "base64" | "blob" | "file";
}

export const resizeFile = ({ file, size, outPut }: IResizeFile) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      "WEBP",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      outPut,
    );
  });
