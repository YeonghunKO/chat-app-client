import Image from "next/image";

const Empty = () => {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center border-b-4 border-l border-conversation-border bg-panel-header-background">
      <Image
        priority
        src="/whatsapp.gif"
        alt="whatsapp-gif"
        height={300}
        width={300}
      />
    </div>
  );
};

export default Empty;
