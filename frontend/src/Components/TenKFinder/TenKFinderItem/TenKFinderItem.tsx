import { Link } from 'react-router-dom';
import { CompanyTenK } from '../../../Types/company'
import './TenKFinderItem.css'


type Props = {
    tenK:CompanyTenK;
}

const TenKFinderItem = ({tenK}: Props) => {
    const fillingDate = new Date(tenK.fillingDate).getFullYear();
  return (
    <div className="tenk-item">
    <Link
    reloadDocument
    to={tenK.finalLink}
    type="button"
    className=""
    > 10k {fillingDate}</Link>
    </div>
  )
}

export default TenKFinderItem