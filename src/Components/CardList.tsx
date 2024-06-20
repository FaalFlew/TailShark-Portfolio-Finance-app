import Card from "./Card"

interface Props {}

const CardList: React.FC<Props>= (props: Props): JSX.Element => {
  return (
    <div>
    <Card companyName={"Apple"} ticker={"APPL"} price={100}/>
    <Card companyName={"Tesla"} ticker={"TSLA"} price={60}/>
    <Card companyName={"Microsoft"} ticker={"MSFT"} price={200}/>
    </div>
  )
}

export default CardList