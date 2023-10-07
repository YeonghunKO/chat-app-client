import { BiFilter, BiSearchAlt2 } from "react-icons/bi";
import Input from "../common/Input";
import { useState } from "react";

const SearchBar = () => {
  const [value, setValue] = useState("");
  return (
    <div className="flex h-14 items-center gap-3 bg-search-input-container-background py-3 pl-3">
      <div className="flex items-center gap-5 rounded-lg py-1">
        <div>
          <BiSearchAlt2 className="text-l cursor-pointer text-panel-header-icon" />
        </div>
        <div className="flex-grow-[2]">
          {/* type="text"
          placeholder="Search or start new chat"
          className="w-full bg-transparent text-sm text-white focus:outline-none" */}
          <Input
            value={value}
            setValue={setValue}
            placeholder="search new chat"
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
