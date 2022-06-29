import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import * as yup from 'yup'
import axios from 'axios'
import styled from 'styled-components'
import "./App.css";

const Title = styled.div`
    text-align:center;
    margin: 2vw;
`
const PizzaImg = styled.img`
    width:50vw;
`

const PizzaFormDesign = styled.form`
    width: 50vw;
    margin: 0 auto;
    border: 1px solid black;
`

const FormLabel = styled.label`
    background-color: green;
    display:block;
    padding:2vw;
`
const SauceToppingDiv = styled.div`
    margin: 1vw;
`
const SpecialText = styled.input`
    width: 90%;
    height: 5vw;;
    margin: 15px;
`

const OrderBttn = styled.button`
    padding: 2vw;
    width: 30vw;
    margin-left: 10vw;
`

function PizzaForm (){

    const sauceList = ['Original Red','Garlic Ranch','BBQ Sauce','Spinach Alfredo']
    const toppingList = ['Pepperoni','Sausage', 'Canadian Bacon', 'Spicy Italian Sausage', 'Grilled Chicken', 'Onion', 'Green Pepper', 'Diced Tomatoes', 'Black Olives', 'Roasted Garlic', 'Artichoke Hearts', 'Three Cheeses', 'Pineapple', 'Extra Cheese']
    const pizzaSizes = ['Small', 'Medium', 'Large']
    const emptyForm = {
        name: '',
        size: '',
        sauce: '',
        topping1:'',
        topping2:'',
        topping3:'',
        topping4:'',
        special: '',
    }

    const [currentOrder, setCurrentOrder]= useState(emptyForm)
    const [errors, setErrors] = useState(emptyForm)
    const [disabled, setDisabled] = useState(false)

    const schema = yup.object().shape({
        name: yup.string().required('name must be at least 2 characters').min(2,'name must be at least 2 characters'),
        size: yup.string().oneOf(['Small','Medium','Large'],'Please select a valid size'),
        sauce: yup.string().oneOf(['Original Red','Garlic Ranch','BBQ Sauce','Spinach Alfredo'],'Please choose a sauce'),
        topping1: yup.string(),
        topping2: yup.string(),
        topping3: yup.string(),
        topping4: yup.string(),
        special: yup.string(),
    })



    const validate = (name, value, count) =>{
        if(count > 0){
            yup.reach(schema, `${name}${count}`).validate(value)
                .then(()=>{
                    setErrors({...errors,[name]:''})
                })
                .catch(err=>{
                    setErrors({...errors,[name]:err.errors[0]})
            })}
        else{
            yup.reach(schema, name).validate(value)
                .then(()=>{
                    setErrors({...errors,[name]:''})
                })
                .catch(err=>{
                    setErrors({...errors,[name]:err.errors[0]})
                })
            }
        }
    


    const onChange = (evt) =>{
        const {name, value} = evt.target
        let count = 0;

        if(name === 'topping'){
            for(let i = 1; i< 4;i++){
                if(currentOrder[`topping${i}`] === ''){
                    setCurrentOrder({...currentOrder, [`topping${i}`]:value});
                    count = i;
                    break;
                }
            }
        }
        if(name !== 'toppings'){
            setCurrentOrder({...currentOrder, [name]:value})
        }
        validate(name, value, count)
    }


    const postOrder = ()=>{
        const newOrder = {
            name: currentOrder.name,
            size: currentOrder.size,
            sauce: currentOrder.sauce,
            topping1: currentOrder.topping1,
            topping2: currentOrder.topping2,
            topping3: currentOrder.topping3,
            topping4: currentOrder.topping4,
            special: currentOrder.special
        }
        axios.post('https://reqres.in/api/orders',newOrder)
            .then(()=>{
                console.log('sent to server', newOrder)
                setCurrentOrder(emptyForm)
            })
            .catch(()=>{
                console.log('oops')
            })
    }


    const onSubmit = (evt) =>{
        evt.preventDefault();
        postOrder()
    }

    useEffect(()=>{
        schema.isValid(currentOrder)
        .then(res=>{
            setDisabled(!res)
        })
    },[currentOrder])

    return(
        <div>
            <PizzaFormDesign id='pizza-form' onSubmit={onSubmit}>
                <Title>Build Your Own Pizza</Title>
                <PizzaImg src = './pz.jpg' alt='Build your pizza'/>
                <div>
                    <FormLabel>Enter your name</FormLabel>
                    <input type='text' id='name-input' name = 'name' onChange = {onChange} value ={currentOrder.name}/>
                    <div>{errors.name}</div>
                </div>
                <div>
                    <FormLabel>Choice of Size</FormLabel>
                    <select id = 'size-dropdown' name = 'size' onChange = {onChange}>
                        <option>--Option--</option>
                        {
                            pizzaSizes.map(a=>{
                                return(
                                    <option value = {a}>{a}</option>
                                )
                            })
                        }
                    </select>
                    <div>{errors.size}</div>
                </div>
                <div>
                    <FormLabel>Choice of sauce</FormLabel>
                    {
                        sauceList.map(a=>{
                            return(
                                <SauceToppingDiv>
                                    <input type = 'radio' name = 'sauce' id = {a} value ={a} onChange = {onChange}/>
                                    <label for = {a}>{a}</label>
                                </SauceToppingDiv>
                            )
                        })
                    }
                    <div>{errors.sauce}</div>
                </div>
                <FormLabel>Add Toppings</FormLabel>
                <div>
                    {
                        toppingList.map(a=>{
                            return(
                                <SauceToppingDiv>
                                    <input type='checkbox' id = {a} name = 'topping' value={a} onChange = {onChange}/>
                                    <label>{a}</label>
                                </SauceToppingDiv>
                            )
                        })
                    }
                    <div>{errors.topping1}</div>
                </div>
                <div>
                    <FormLabel>Choice of Substitute</FormLabel>
                    <input/>
                </div>
                <div>
                    <FormLabel>Special Instructions</FormLabel>
                    <SpecialText id ='special-text' name = 'special' type='text' onChange = {onChange} value ={currentOrder.special} placeholder='Give us your special instructions.'/>
                    <div>{errors.special}</div>
                </div>
                <div>
                    <Link to='/confirmation'>
                        <OrderBttn disabled={disabled} type='submit' id='order-button'>Add to Order</OrderBttn>
                    </Link>
                    
                </div>
            </PizzaFormDesign>
        </div>
    )
}

export default PizzaForm