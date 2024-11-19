import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DynamicForm } from '../components/DynamicForm';

const mockSchema = {
  formTitle: "Test Form",
  formDescription: "Test Description",
  fields: [
    {
      id: "name",
      type: "text",
      label: "Name",
      required: true,
      placeholder: "Enter name"
    }
  ]
};

describe('DynamicForm', () => {
  it('renders form title and description', () => {
    render(<DynamicForm schema={mockSchema} />);
    expect(screen.getByText('Test Form')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('shows validation error for required field', async () => {
    render(<DynamicForm schema={mockSchema} />);
    const submitButton = screen.getByText('Submit');
    
    fireEvent.click(submitButton);
    
    expect(await screen.findByText('This field is required')).toBeInTheDocument();
  });
});