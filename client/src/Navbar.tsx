import { useState } from "react";

interface NavBarProps {
    onOptionSelect: (option: string) => void;
  }
  
  const NavBar: React.FC<NavBarProps> = ({ onOptionSelect }) => {
    const [selectedOption, setSelectedOption] = useState('Brunswick');
  
    const handleOptionSelect = (option: string) => {
      setSelectedOption(option);
      onOptionSelect(option);
    };
  
    return (
      <nav>
        <ul>
          <li
            className={selectedOption === 'Brunswick' ? 'active' : ''}
            onClick={() => handleOptionSelect('Brunswick')}
          >
            Brunswick
          </li>
          <li
            className={selectedOption === 'Clayton' ? 'active' : ''}
            onClick={() => handleOptionSelect('Clayton')}
          >
            Clayton
          </li>
          <li
            className={selectedOption === 'FTG' ? 'active' : ''}
            onClick={() => handleOptionSelect('FTG')}
          >
            FTG
          </li>
        </ul>
      </nav>
    );
  };
  
  export default NavBar;
