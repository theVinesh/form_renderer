import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DynamicForm from './DynamicForm.tsx';
import {describe, expect, it} from 'vitest';
import type {Schema} from "../types/Schema.ts";

const testSchema: Schema = {
    title: "User Registration",
    fields: [
        {label: "Name", type: "text", name: "name"},
        {label: "Dob", type: "date", name: "dob", required: true},
        {label: "Subscribe", type: "checkbox", name: "subscribe"},
        {
            label: "Gender",
            type: "select",
            name: "gender",
            options: ["Male", "Female", "Other"]
        }
    ]
};

describe('DynamicForm', () => {
    it('renders the form correctly', () => {
        render(<DynamicForm schemaText={JSON.stringify(testSchema)}/>);
        expect(screen.getByText('User Registration')).toBeInTheDocument();
        expect(screen.getByLabelText('Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Dob')).toBeInTheDocument();
        expect(screen.getByLabelText('Subscribe')).toBeInTheDocument();
        expect(screen.getByLabelText('Gender')).toBeInTheDocument();
    });

    it('validates required fields on submit', async () => {
        render(<DynamicForm schemaText={JSON.stringify(testSchema)}/>);
        await userEvent.click(screen.getByRole('button', {name: /submit/i}));
        expect(await screen.findByText('Dob is required')).toBeInTheDocument();

        expect(screen.queryByTestId('submitted-data')).not.toBeInTheDocument();
    });

    it('submits form data correctly when all fields are filled', async () => {
        const user = userEvent.setup();

        render(<DynamicForm schemaText={JSON.stringify(testSchema)}/>);

        const nameInput = screen.getByLabelText('Name');
        const dobInput = screen.getByLabelText('Dob');
        const subscribeCheckbox = screen.getByLabelText('Subscribe');
        const genderSelect = screen.getByLabelText('Gender');
        const submitButton = screen.getByRole('button', {name: /submit/i});

        await user.type(nameInput, 'John Doe');
        await user.type(dobInput, '1990-01-15');
        await user.click(subscribeCheckbox);
        await user.selectOptions(genderSelect, 'Male');

        expect(screen.queryByTestId('submitted-data')).not.toBeInTheDocument();

        await user.click(submitButton);

        const submittedDataDiv = screen.getByTestId('submitted-data');
        expect(submittedDataDiv).toBeInTheDocument();

        const submittedDataTextarea = screen.getByDisplayValue(/"name": "John Doe"/);
        expect(submittedDataTextarea).toBeInTheDocument();

        const textareaValue = submittedDataTextarea.textContent;
        const parsedData = JSON.parse(textareaValue || "");

        expect(parsedData).toEqual({
            name: "John Doe",
            dob: "1990-01-15",
            subscribe: true,
            gender: "Male"
        });
    });
});