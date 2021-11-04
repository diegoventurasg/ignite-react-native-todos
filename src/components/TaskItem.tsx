import React, { useEffect, useRef, useState } from 'react';
import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/edit/edit.png';

import { Task } from './TasksList';

interface TaskItemProps {
    task: Task;
    index: number;
    toggleTaskDone: (id: number) => void;
    editTask: (id: number, taskNewTitle: string) => void;
    removeTask: (id: number) => void;
}

export function TaskItem({
    task,
    index,
    toggleTaskDone,
    editTask,
    removeTask
}: TaskItemProps) {
    const [editing, setEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing() {
        setEditing(true);
    }

    function handleCancelEditing() {
        setEditedTitle(task.title);
        setEditing(false);
    }

    function handleSubmitEditing() {
        editTask(task.id, editedTitle);
        setEditing(false);
    }

    function handleRemoveTask() {
        removeTask(task.id);
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing) {
                textInputRef.current.focus();
            } else {
                textInputRef.current.blur();
            }
        }
    }, [editing]);

    return (
        <View style={styles.container}>

            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
            >
                <View
                    testID={`marker-${index}`}
                    style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                    {task.done && (<Icon name="check" size={12} color="#FFF" />)}
                </View>

                <TextInput
                    value={editedTitle}
                    onChangeText={setEditedTitle}
                    editable={editing}
                    onSubmitEditing={handleSubmitEditing}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                    multiline
                />

            </TouchableOpacity>

            <View style={styles.icons}>
                {
                    editing
                        ? <TouchableOpacity onPress={handleCancelEditing}>
                            <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>

                        : <TouchableOpacity onPress={handleStartEditing}>
                            <Image source={editIcon} />
                        </TouchableOpacity>
                }

                <View style={styles.iconDivider} />

                <TouchableOpacity onPress={handleRemoveTask} disabled={editing}>
                    <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    taskButton: {
        flex: 1,
        paddingHorizontal: 24,
        paddingVertical: 15,
        marginBottom: 4,
        borderRadius: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    taskMarker: {
        height: 16,
        width: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#B2B2B2',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskText: {
        color: '#666',
        fontFamily: 'Inter-Medium',
        paddingVertical: 0,
    },
    taskMarkerDone: {
        height: 16,
        width: 16,
        borderRadius: 4,
        backgroundColor: '#1DB863',
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskTextDone: {
        color: '#1DB863',
        textDecorationLine: 'line-through',
        fontFamily: 'Inter-Medium',
        paddingVertical: 0
    },
    icons: {
        flexDirection: 'row',
        marginHorizontal: 24,
    },
    iconDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 12,
    }
})