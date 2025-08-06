import { LoaderCircleIcon } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <LoaderCircleIcon className="animate-spin w-16 h-16" />
    </div>
  );
};

export default Loading;
