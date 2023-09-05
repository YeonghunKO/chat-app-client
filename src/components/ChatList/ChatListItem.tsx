import { IUserInfo } from "@/type";
import Image from "next/image";
import AvatarPhoto from "../common/AvatarPhoto";
import { SIZE } from "@/constant/size";

const ChatListItem = ({ userInfo }: { userInfo: IUserInfo }) => {
  const { name, about, profilePicture } = userInfo;

  return (
    <div className="flex cursor-pointer items-center justify-start gap-[10px] py-[5px] pb-2 pl-[10px] hover:bg-input-background">
      <div className="w-[20%]">
        <AvatarPhoto img={profilePicture as string} size={SIZE.SM} />
      </div>
      <div className="w-[80%] border-b-[1px] border-b-conversation-border">
        <h2>{name}</h2>
        <h4 className="pr-5 text-secondary">{about || "\u00A0"}</h4>
      </div>
    </div>
  );
};

export default ChatListItem;
