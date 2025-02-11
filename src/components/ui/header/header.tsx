'use client';
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ThemeToggle } from '../theme-provider/theme-buttons';
import FontSelector from '../font-selector/fontSelector';
import { Locale } from '../../../../i18n.config';
import Image from 'next/image';
import { Button } from '../button';
import { getDictionary } from '@/common/dictionaries/dictionaries';
import location from '../../../assets/header/locate-us.svg'
import contact from '../../../assets/header/contact-us.svg'
import Angola from '../../../assets/header/country/angola.svg'
import Afghanistan from '../../../assets/header/country/afghanistan.svg'
import Algeria from '../../../assets/header/country/algeria.svg'
import Andorra from '../../../assets/header/country/andorra.svg'
import India from '../../../assets/header/country/india.svg'
import logo from '../../../assets/down-pointer.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown/dropdown-menu"
import SearchableDropdown from '../dropdown/searchable-dropdown';


type PropsType = {
  lang: Locale;
};

interface LanguageOption {
  code: string;
  label: string;
}

interface Country {
  id: string
  label: string;
  logo: React.ReactNode
}

const HeaderItem = ({
  icon,
  iconText,
  text,
  enableDropdown
  // onClick,
}: {
  icon?: React.ReactNode;
  iconText?: string;
  text?: string;
  enableDropdown?: boolean;
  // onClick?: () => void;
}) => {
  return (
    <Button variant='secondary'
      className={`text-secondary-900 flex cursor-pointer flex-row items-center justify-between space-x-2 px-0 font-bold dark:text-white`}
    // onClick={onClick}
    >
      {icon && (
        <Image src={icon} alt='icon' height='0' width='0' className='h-5 w-4' />
      )}
      {iconText && <div>{iconText}</div>}
      {text && <div className='hidden md:block'>{text}</div>}
    </Button>
  );
};

const Header = (props: PropsType) => {
  const t = getDictionary(props.lang)

  const languages: LanguageOption[] = [
    { label: 'EN (English)', code: 'EN' },
    { label: 'HI (Hindi)', code: 'HI' },
    { label: 'GU (Gujarati)', code: 'GU' },
  ];
  const countries: Country[] = [
    { id: '1', label: 'India', logo: <Image src={India} alt='icon' height='0' width='0' className='h-5 w-4' /> },
    { id: '2', label: 'Afghanistan', logo: <Image src={Afghanistan} alt='icon' height='0' width='0' className='h-5 w-4' /> },
    { id: '3', label: 'Algeria', logo: <Image src={Algeria} alt='icon' height='0' width='0' className='h-5 w-4' /> },
    { id: '4', label: 'Andorra', logo: <Image src={Andorra} alt='icon' height='0' width='0' className='h-5 w-4' /> },
    { id: '5', label: 'Angola', logo: <Image src={Angola} alt='icon' height='0' width='0' className='h-5 w-4' /> },
  ];
  const [rotated, setRotated] = useState(false); 
  const [rotation, setRotation] = useState(false); 
  const [activeLanguage, setActiveLanguage] = useState<LanguageOption>(languages[0]);
  const [activeCountry, setActiveCountry] = useState<Country>(countries[0]);

  const toggleRotate = () => {
    setRotated((prevState) => !prevState); // Toggle the rotation state
  };
  const toggleRotation = () => {
    setRotation((prevState) => !prevState); // Toggle the rotation state
  };
   const handleCountry = (country: Country) =>{
    setActiveCountry(country)
    setRotation(false);
   }

  const handleLanguage = (lang: LanguageOption) => {
    setActiveLanguage(lang) //to be continued
    setRotated(false); 
  }
  
  useEffect(() => {
    languages.forEach((language) => {
      if (language.code.toUpperCase() === props.lang.toUpperCase()) {
        setActiveLanguage(language);
        return;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className=" h-fit w-full p-4 flex flex-row gap-2 items-center justify-around dark:text-white">
      <FontSelector />
      <ThemeToggle />

      {/* Locate us */}
      <HeaderItem
        icon={location}
        text={t.loginPage.header.locateUs}
      />

      {/* Contact us */}
      <HeaderItem
        icon={contact}
        text={t.loginPage.header.contactUs}
      // onClick={}
      />

      {/*Country*/}
      <SearchableDropdown options={countries} />   

      {/*Language*/}
      <DropdownMenu>
        <div className="dropdown-content flex gap-2">
          <span >{activeLanguage.code}</span>
          <DropdownMenuTrigger>
            <button onClick={toggleRotate} className={`h-3.5 w-2.5 flex items-center transition-transform duration-300 transform ${rotated ? 'rotate-180' : ""}`}>
              <Image src={logo} alt='dropdown' className="h-3.5 w-2.5" />
            </button>
          </DropdownMenuTrigger>
          {rotated && (<DropdownMenuContent className="dropdown-content">
            {languages.map((lang) => (
              <DropdownMenuItem key={lang.code} onClick={() => handleLanguage(lang)} className={`${activeLanguage.label === lang.label ? 'bg-orange-200' : ''}`}>
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
          )}
        </div>
      </DropdownMenu>
    </header>
  );
};

export default Header;
