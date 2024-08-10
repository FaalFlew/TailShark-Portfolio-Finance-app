import { ButtonType } from "../../Types/ButtonTypes";
import './Button.css'
interface Props {
    label: string;
    type: ButtonType;
  }
  
  const Button: React.FC<Props> = ({ label, type }:Props) => {
    return (
      <button type="submit" className={type+" button"}>
        {label}
      </button>
    );
  };
  
  export default Button;