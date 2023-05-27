import classes from './Checkout.module.css';
import { useRef ,useState} from 'react';

const isEmpty=value=>value.trim()!=='';
const isFiveChars=value=>value.trim().length===6;

const Checkout = (props) => {

 const [formInputsValidity,setformInputsValidity]=useState({
    name:true,
    street:true,
    postalCode:true,
    city:true
 }); 
 const nameInputRef=useRef();
 const streetInputRef=useRef();
 const postalCodeInputRef=useRef();
 const cityInputRef=useRef();
 
  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const enteredNameIsValid=isEmpty(enteredName);
    const enteredStreetIsValid=isEmpty(enteredStreet);
    const enteredPostalCodeIsValid=isFiveChars(enteredPostalCode);
    const enteredCityIsValid=isEmpty(enteredCity);

    setformInputsValidity({
      name:enteredNameIsValid,
      street:enteredStreetIsValid,
      city:enteredCityIsValid,
      postalCode:enteredPostalCodeIsValid
    });

    const formIsValid=enteredNameIsValid && enteredCityIsValid && enteredPostalCodeIsValid && enteredStreetIsValid;
  
    if(!formIsValid){
      return;
    }
    props.onConfirm({
      name:enteredName,
      city:enteredCity,
      postalCode:enteredPostalCode,
      street:enteredStreet
    });
  };

  const nameControlClasses=`${classes.control} 
  ${formInputsValidity.name?'':classes.invalid}`;
  
  const streetControlClasses=`${classes.control} 
  ${formInputsValidity.street?'':classes.invalid}`;

   const postalCodeControlClasses=`${classes.control} 
  ${formInputsValidity.postalCode?'':classes.invalid}`;

  const cityControlClasses=`${classes.control} 
  ${formInputsValidity.city?'':classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputsValidity.name && <p>Please Enter correct value</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputsValidity.street && <p>Please Enter correct value</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef}/>
        {!formInputsValidity.postalCode && <p>Please Enter correct value</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter correct value</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;