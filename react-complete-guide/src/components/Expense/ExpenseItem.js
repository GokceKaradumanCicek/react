import Card from '../UI/Card.js';
import ExpenseDate from './ExpenseDate.js';
import './ExpenseItem.css';
function ExpenseItem(props) {
  let title=props.title;
  const clickHandler=()=>{
   title='Updated!!';
   console.log(title);
  }
  return (
    <Card className="expense-item">
        <ExpenseDate date={props.date} />
      <div>{props.date.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={clickHandler}>Change İtem</button>
    </Card>
  );
}
export default ExpenseItem;
