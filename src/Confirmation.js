import styled from 'styled-components'
import {Link, Route} from 'react-router-dom'
import Home from './Home'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50vw;
`

const ConfirmationDiv = styled.div`
    width: 80vw;
    border: solid 2px red;
    padding: 3vw;
    border-radius: 15px;
    font-size: 5vw;
    text-align: center;
`



function Confirmation(){
    return(
        <Container>
            <ConfirmationDiv>
                <Link to = '/'>
                    Your order of is on your way now! Click here to return to home
                </Link>
            </ConfirmationDiv>
        </Container>
    )
}


export default Confirmation