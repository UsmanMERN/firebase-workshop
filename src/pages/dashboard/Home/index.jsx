import React, { useState, useEffect } from 'react';
import { List, Input, Button, Upload, message, Modal, Card, Tag, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, UploadOutlined } from '@ant-design/icons';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { db } from '../../../config/firebase';

export default function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [image, setImage] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todoList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTodos(todoList);
    };

    const handleAddTodo = async () => {
        if (!newTodo.trim()) return;
        let imageUrl = '';
        if (image) {
            imageUrl = await uploadImage(image);
        }
        const docRef = await addDoc(collection(db, "todos"), { text: newTodo, imageUrl, createdAt: new Date() });
        setTodos([...todos, { id: docRef.id, text: newTodo, imageUrl, createdAt: new Date() }]);
        setNewTodo('');
        setImage(null);
    };

    const handleDeleteTodo = async (id) => {
        await deleteDoc(doc(db, "todos", id));
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleEditTodo = async () => {
        await updateDoc(doc(db, "todos", editingId), { text: editingText });
        setTodos(todos.map(todo => (todo.id === editingId ? { ...todo, text: editingText } : todo)));
        setEditingId(null);
        setModalVisible(false);
    };

    const uploadImage = async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "ml_default");
        const response = await axios.post("https://api.cloudinary.com/v1_1/djvukamo0/image/upload", formData);
        return response.data.secure_url;
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">📌 Stylish Todo List</h2>
            <Card className="p-3 shadow">
                <Space direction="vertical" className="w-100">
                    <Input placeholder="Add a new task..." value={newTodo} onChange={e => setNewTodo(e.target.value)} />
                    <Upload beforeUpload={(file) => { setImage(file); return false; }}>
                        <Button icon={<UploadOutlined />}>Upload Image</Button>
                    </Upload>
                    <Button type="primary" icon={<PlusOutlined />} onClick={handleAddTodo}>Add Task</Button>
                </Space>
            </Card>

            <List
                className="mt-4"
                grid={{ gutter: 16, column: 2 }}
                dataSource={todos}
                renderItem={todo => (
                    <List.Item>
                        <Card
                            title={<Tag color="blue">Task</Tag>}
                            actions={[
                                <EditOutlined key="edit" onClick={() => { setEditingId(todo.id); setEditingText(todo.text); setModalVisible(true); }} />,
                                <DeleteOutlined key="delete" onClick={() => handleDeleteTodo(todo.id)} danger />
                            ]}
                        >
                            <p>{todo.text}</p>
                            {todo.imageUrl && <img src={todo.imageUrl} alt="Uploaded" width="100%" style={{ borderRadius: '5px' }} />}
                        </Card>
                    </List.Item>
                )}
            />

            <Modal title="Edit Task" open={modalVisible} onOk={handleEditTodo} onCancel={() => setModalVisible(false)}>
                <Input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
            </Modal>
        </div>
    );
}
