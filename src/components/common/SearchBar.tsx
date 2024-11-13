import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { BiSearchAlt } from "react-icons/bi";

interface Props {
  className?: string;
  placeholder: string;
  label: string;
  onChange: (e: any) => void;
}

export const SearchBar = ({ className, placeholder, label, onChange }: Props) => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text className={`search-bar ${className}`}>
        <BiSearchAlt />
      </InputGroup.Text>
      <FormControl placeholder={placeholder} aria-label={label} onChange={onChange} />
    </InputGroup>
  );
};
