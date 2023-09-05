import { BiFilter, BiSearchAlt2, BiArrowBack } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="flex h-14 items-center gap-3 bg-search-input-container-background py-3 pl-5">
      <div className="flex flex-grow items-center gap-5 rounded-lg bg-panel-header-background px-3 py-1">
        <div>
          <BiSearchAlt2 className="text-l cursor-pointer text-panel-header-icon" />
        </div>
        <div className="">
          <input
            type="text"
            placeholder="Search or start new chat"
            className="w-full bg-transparent text-sm text-white focus:outline-none"
          />
        </div>
      </div>
      <div className="pl-3 pr-5">
        <BiFilter className="cursor-pointer text-xl text-panel-header-icon " />
      </div>
    </div>
  );
};

export default SearchBar;
