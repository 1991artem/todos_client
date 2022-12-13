import { InputGroup, Button, Form } from "react-bootstrap";

interface IInputTodoFormProps {
  value: string,
  updateText: (str: string) => void,
  handleAction: () => void,
}

const InputTodoForm = ({ value, updateText, handleAction }: IInputTodoFormProps) => {
  return (

    <InputGroup className="mb-3">
        <Form.Control
          placeholder="Add new todo"
          aria-label="Add todo"
          aria-describedby="basic-addon2"
          value={value}
          onChange={(e) => updateText(e.target.value)}
        />
        <Button variant="outline-secondary" id="button-addon2" onClick={handleAction}>
          Add todo
        </Button>
      </InputGroup>
  );
};

export default InputTodoForm;