import { CloseOutlined, DeleteOutlined, EditOutlined, PlusCircleFilled } from '@ant-design/icons';
import { Button, Input, Tooltip } from 'antd'
import { Form, Modal } from 'antd';
import React, { useContext, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import MyContext from '../Context/Context';

const Reciepe = () => {
    const context = useContext(MyContext)
    const { id } = useParams()
    const history = useHistory()
    const reciepe = context.reciepes.find(r => r.id.toString() === id)
    console.log(reciepe)
    const clickHandle = () => {
        const arr = [...context.reciepes]
        const index = arr.findIndex(ele => ele.id.toString() === id)
        if (index !== -1)
            arr.splice(index, 1)
        context.setReciepes(arr);
        history.push('/')
    }
    const clickerHandle = () => {
        setIsModalVisible(true)

    }
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const layout = {
    };
    const tailLayout = {
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        const recs = [...context.reciepes]
        const index = recs.findIndex(ele => ele.id.toString() === id)
        recs[index] = { ...recs[index], ...values, ingredients }
        context.setReciepes(recs)
        setIsModalVisible(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const newIngredient = () => {
        setIngredients(prev => [...prev, " "])

    }
    const [ingredients, setIngredients] = useState([...reciepe.ingredients])

    const removeHandler = (index) => {
        // alert()

        const arr = [...ingredients]
        if (arr.length !== 1) {
            arr.splice(index, 1)
            setIngredients(arr)
        }
    }
    return (
        <div>
            {reciepe && (<>Reciepe : {id}<br></br>
              Description :  {reciepe.desc}<br></br>
               Name : {reciepe.name}<br></br>
               Ingredients : {reciepe.ingredients.join(', ')}
            </>)}
            <Tooltip title="search">
                <Button style={{ float: "right" }} shape="circle" onClick={clickHandle} icon={<DeleteOutlined />} />
            </Tooltip>
            <Tooltip title="search">
                <Button style={{ float: "right" }} shape="circle" onClick={clickerHandle} icon={<EditOutlined />} />
            </Tooltip>
            <Modal title="Basic Modal" okButtonProps={{ htmlType: "submit" }} footer={[]} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        ...reciepe,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Enter the name of the reciepe',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="desc"
                        rules={[
                            {
                                required: true,
                                message: '',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {ingredients.map((ingredient, index) => {
                        return <Form.Item
                            label="Ingredient"
                            key={index}

                            rules={[
                                {

                                    message: '',


                                },
                            ]}



                        >


                            <Input value={ingredient} style={{ width: "95%" }} onChange={(event) => {
                                const arr = [...ingredients]
                                arr[index] = event.target.value;
                                setIngredients(arr)
                            }} /><CloseOutlined onClick={() => removeHandler(index)} />

                        </Form.Item>
                    })}
                    <PlusCircleFilled onClick={newIngredient} style={{ float: "right" }} />



                    <Button key="submit" htmlType="submit" type="primary" >
                        Submit
</Button>
                </Form>
            </Modal>
        </div>
    )
}
export default Reciepe