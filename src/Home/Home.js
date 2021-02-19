import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import MyContext from '../Context/Context';

const Home = () => {
    const context = useContext(MyContext)
    const history = useHistory()
    const clickHandle = (id) => {
        console.log(context.reciepes)
        history.push(`/reciepe/${id}`)
    }
    return (
        <div>

            {context.reciepes.map((reciepe) => {
                return <Card
                    key={reciepe.id}
                    onClick={() => clickHandle(reciepe.id)}
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                >
                    <Meta title={reciepe.name} description={reciepe.desc} />
                </Card>
            })}
        </div>
    )
}
export default Home