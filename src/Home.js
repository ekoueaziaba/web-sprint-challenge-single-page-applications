import {Link} from 'react-router-dom'
import styled from 'styled-components'

const PizzaPie = styled.img`
  height: 43.5vw;
  display:inline;
`

const Container = styled.div`
    display: flex;
`

const MainImgBox = styled.div`
  position: relative;
`

const MenuImg = styled.img`
    width: 27vw;
    margin: 3vw;
    height: 20vw;
`

const OrderBttn = styled.button`
  position: absolute;
  left:45%;
  top:80%;
  padding: 2vw;
`

function Home (){
    const otherFood =[{
        name: 'McDonalds',
        cost: '$',
        description:['American','Fast Food','Burgers'],
        time: '20',
        img:'./md.jpg'
    },{
        name: 'sweetGreens',
        cost: '$',
        description:['Healthy', 'Salads'],
        time: '15',
        img:'./sw.jpg'
    },{
        name: 'Starbucks',
        cost: '$',
        description:['Cafe','Coffee', 'Tea'],
        time: '20',
        img:'./sb.jpg'
    }]

    return(
        <div>
            <MainImgBox>
                <PizzaPie src = '/Pizza.jpg' alt='Big pizza'/>
                <Link to ='/pizza'>
                    <OrderBttn id='order-pizza'>Order now!</OrderBttn>
                </Link>
            </MainImgBox>
            <div>Food Delivery in Gotham City</div>
            <Container>
                {otherFood.map(a=>{
                    return(
                        <div>
                            <MenuImg src = {a.img}/>
                            <div>{a.name}</div>
                            <div>{a.cost + ' ' + a.description.join(' ')}</div>
                            <div>{a.time + ' minutes' }</div>
                        </div>
                    )
                })}
            </Container>
        </div>
        
    )
}

export default Home