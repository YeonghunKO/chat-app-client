import { TOAST_TYPE } from "@/constant/type";
import { useUiState } from "@/store/store";

import type { TToastType } from "@/type/user";
import { useEffect } from "react";

import { GiCancel, GiConfirmed } from "react-icons/gi";
import { PiWarningCircleBold } from "react-icons/pi";

const Toast = () => {
  const isToastVisible = useUiState((set) => set.isToastVisible);
  const toggleToastVisible = useUiState((set) => set.updateToastInfo);
  const toastType = useUiState((set) => set.toastType);
  const toastMessage = useUiState((set) => set.toastMessage);

  const getToastIconByType = (type: TToastType) => {
    switch (type) {
      case TOAST_TYPE.SUCESSFUL:
        return <GiConfirmed className="h-5 w-5 text-emerald-400" />;
      case TOAST_TYPE.ERROR:
        return <GiCancel className="h-5 w-5 text-red-500" />;
      case TOAST_TYPE.WARN:
        return <PiWarningCircleBold className="h-5 w-5 text-cyan-600" />;

      default:
        break;
    }
  };

  useEffect(() => {
    if (isToastVisible) {
      const toastId = setTimeout(() => {
        toggleToastVisible({ toggle: true });
      }, 2000);

      return () => clearTimeout(toastId);
    }
  }, [isToastVisible]);

  return (
    <div
      className={`absolute bottom-[30px] left-[30px] h-max w-max rounded-md bg-search-input-container-background p-[20px] text-white ${
        isToastVisible ? "animate-fade-in-bottom" : "animate-fade-out-bottom"
      }`}
    >
      <div className="flex items-center justify-center gap-[10px]">
        <span>{getToastIconByType(toastType)}</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};

export default Toast;
