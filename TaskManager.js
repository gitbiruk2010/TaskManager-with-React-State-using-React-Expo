import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);
    const [tempTitle, setTempTitle] = useState('');
    const [tempDescription, setTempDescription] = useState('');

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            title,
            description,
            completed: false,
        };
        setTasks([...tasks, newTask]);
        setTitle('');
        setDescription('');
    };

    const toggleTaskCompletion = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const startEdit = (task) => {
        setEditId(task.id);
        setTempTitle(task.title);
        setTempDescription(task.description);
    };

    const saveEdit = () => {
        setTasks(tasks.map(task =>
            task.id === editId ? { ...task, title: tempTitle, description: tempDescription } : task
        ));
        setEditId(null);
        setTempTitle('');
        setTempDescription('');
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>TaskManager</Text>
                <Button title="Add Task" onPress={addTask} style={styles.addButton} />
            </View>
            <TextInput
                style={[styles.input, styles.titleInput]}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
            />
            <View>
                {tasks.map((task) => (
                    <View key={task.id} style={styles.taskContainer}>
                        {editId === task.id ? (
                            <>
                                <TextInput
                                    style={[styles.input, styles.editInput]}
                                    value={tempTitle}
                                    onChangeText={(text) => setTempTitle(text)}
                                />
                                <TextInput
                                    style={[styles.input, styles.editInput, styles.descriptionInput]}
                                    value={tempDescription}
                                    onChangeText={(text) => setTempDescription(text)}
                                    multiline
                                />
                                <Button title="Save" onPress={saveEdit} />
                            </>
                        ) : (
                            <>
                                <Text style={[styles.title, task.completed && styles.completed]}>{task.title}</Text>
                                <Text style={styles.description}>{task.description}</Text>
                                <Text>Completed: {task.completed ? 'Yes' : 'No'}</Text>
                                <View style={styles.buttonGroup}>
                                    <View style={styles.buttonContainer}>
                                        <Button title="Toggle Completion" onPress={() => toggleTaskCompletion(task.id)} />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button title="Edit" onPress={() => startEdit(task)} />
                                    </View>
                                    <View style={styles.buttonContainer}>
                                        <Button title="Delete" onPress={() => deleteTask(task.id)} />
                                    </View>
                                </View>

                            </>
                        )}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        marginRight: 3,
        fontWeight: 'bold',
    },
    addButton: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: 'tan',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
    },
    titleInput: {
        marginTop: 20,
    },
    descriptionInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    taskContainer: {
        marginBottom: 20,
        backgroundColor: 'tan',
        padding: 20,
        borderRadius: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        marginBottom: 5,
        color: '#666',
    },
    completed: {
        textDecorationLine: 'line-through',
        color: 'red',
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    buttonContainer: {
        marginHorizontal: 4,
    },
    button: {
        marginHorizontal: 5,
    },
});

export default TaskManager;
