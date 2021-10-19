import Card from '../UI/Card.js';
import ExpenseDate from './ExpenseDate.js';
import './ExpenseItem.css';
function ExpenseItem(props) {
  return (
    <Card className="expense-item">
        <ExpenseDate date={props.date} />
      <div>{props.date.toISOString()}</div>
      <div className="expense-item__description">
        <h2>{props.title}</h2>
        <div className="expense-item__price">${props.amount}</div>
      </div>
      <button onClick={()=>{console.log('Clicked!');}}>Change İtem</button>
    </Card>
  );
}
export default ExpenseItem;
