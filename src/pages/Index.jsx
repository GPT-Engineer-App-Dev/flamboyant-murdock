import React, { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  VStack,
  HStack,
  StackDivider,
  Spacer,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { FaPlus, FaTrash } from "react-icons/fa";

const TodoItem = ({ todo, onComplete, onDelete }) => (
  <HStack spacing={3}>
    <Text textDecoration={todo.completed ? "line-through" : "none"}>
      {todo.text}
    </Text>
    <Spacer />
    <Button size="xs" onClick={() => onComplete(todo.id)}>
      {todo.completed ? "Undo" : "Complete"}
    </Button>
    <IconButton
      size="xs" 
      icon={<FaTrash />}
      onClick={() => onDelete(todo.id)}
    />
  </HStack>
);

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = () => {
    const todo = {
      id: Math.random().toString(36).substr(2, 9),
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, todo]);
    setNewTodo("");
  };

  const handleCompleteTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <Box maxWidth="480px" mx="auto" mt={10}>
      <Heading mb={5}>Todo App</Heading>
      <Flex>
        <Input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
          mr={3}
        />
        <Button onClick={handleAddTodo} colorScheme="blue">
          <FaPlus />
        </Button>
      </Flex>
      <VStack
        divider={<StackDivider />}
        borderWidth={1}
        borderColor="gray.100"
        borderRadius="lg"
        p={4}
        my={8}
        spacing={3}
        align="stretch"
      >
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onComplete={handleCompleteTodo}
            onDelete={handleDeleteTodo}
          />
        ))}
      </VStack>
    </Box>
  );
};

export default Index;