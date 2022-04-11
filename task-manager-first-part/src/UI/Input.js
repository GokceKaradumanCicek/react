import classes from './Input.module.css';
import React from 'react';
const Input=React.forwardRef((props, ref)=>{
    return <div className={classes.input}>
        <label htmlFor={props.id} className={classes['input label']}>{props.label}</label>
        <input className={classes['input input']} value={props.value} onChange={props.onChange} ref={ref} {...props}/>
    </div>
});
export default Input;