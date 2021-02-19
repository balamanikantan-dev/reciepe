import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { CloseOutlined, PlusCircleFilled } from '@ant-design/icons';


import React, { useState, useContext } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import "./Navbar.css"
import MyContext from '../Context/Context';

const Navbar = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const location = useLocation();
    const isReciepePage = location.pathname.includes('reciepe');
    console.log(location)
    const context = useContext(MyContext)
    const showModal = () => {
        setIsModalVisible(true);
    };

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
        context.setReciepes(prev => [...prev, { ...values, ingredients, id: Date.now() }])
        setIsModalVisible(false)
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const newIngredient = () => {
        setIngredients(prev => [...prev, " "])

    }
    const [ingredients, setIngredients] = useState([""])

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
            <ul className="ul" >
                <li className="li" style={{ width: "70%", textAlign: "start" }}><Link to="/">Reciepe box</Link></li>
                {/* <li className="li"><a href="#news">News</a></li>
                <li className="li"><a href="#contact">Contact</a></li>
                <li className="li" style={{ float: "right" }}><a class="active" href="#about">About</a></li> */}
                <div style={{ width: "20%", display: 'flex', justifyContent: "space-around", alignItems: "center" }}>
                    {!isReciepePage && <button className="btn" ><i className="fa fa-bars"></i></button>}
                    {!isReciepePage && <button className="b" onClick={showModal} style={{ float: "right" }}>Add reciepe</button>}
                    <Modal title="Basic Modal" okButtonProps={{ htmlType: "submit" }} footer={[]} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>

                        <Form
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
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
            </ul>
        </div>
    )
}
export default Navbar