import React, { useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown/dropdown-menu"; // Adjust import path based on your setup
import { Input } from "@/components/ui/input";
import Image from "next/image";
import SearchIcon from "../../../assets/search.svg";
import logo from "../../../assets/down-pointer.svg";

type Option = {
  id: string;
  label: string;
  logo: React.ReactNode;
};

// Define the props type for SearchableDropdown
type SearchableDropdownProps = {
  options: Array<Option>;
};

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({ options }) => {
  const [rotation, setRotation] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selected, setSelected] = useState<Option>(options[0]);
  const inputRef = useRef(null);
  
  const toggleRotation = () => {
    setRotation((prevState) => !prevState); // Toggle the rotation state
  };

  const handleCountry = (option: Option) => {
    setSelected(option); //to be continued
    setRotation(false);
  };

  const handleInputChange = (e) => {
    setSearchValue(e.target.value); // Update search value
    if (inputRef.current) {
      inputRef.current.focus(); // Keep input focused continuously
    }
  };

  // Filter options based on search input
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <DropdownMenu>
      <div className="dropdown-content flex gap-2">
        <span>{selected.logo}</span>
        <DropdownMenuTrigger>
          <button
            onClick={toggleRotation}
            className={`h-3.5 w-2.5 flex items-center transition-transform duration-300 transform ${
              rotation ? "rotate-180" : ""
            }`}
          >
            <Image src={logo} alt="dropdown" className="h-3.5 w-2.5" />
          </button>
        </DropdownMenuTrigger>

        {/* List of options */}
        {rotation && (
          <DropdownMenuContent className="dropdown-content">
            {/* Display search box */}
            <div className="relative p-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder= "Search..."               
                value={searchValue}
                onChange={handleInputChange}
                className="h-8 pl-6 z-10"
              />
              <Image
                src={SearchIcon}
                alt="search"
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
              ></Image>
            </div>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <DropdownMenuItem
                  key={option.label}
                  onClick={() => {
                    handleCountry(option);
                  }}
                  className={`p-2 ${
                    selected.label === option.label ? "bg-orange-200" : ""
                  }`}
                >
                  {option.logo}
                  {option.label}
                </DropdownMenuItem>
              ))
            ) : (
              <p className="p-2 text-sm text-gray-500">No results found</p>
            )}
          </DropdownMenuContent>
        )}
      </div>
    </DropdownMenu>
  );
};

export default SearchableDropdown;
