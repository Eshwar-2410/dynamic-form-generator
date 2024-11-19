export interface FormField {
    id: string;
    type: 'text' | 'email' | 'select' | 'radio' | 'textarea';
    label: string;
    required: boolean;
    placeholder?: string;
    validation?: {
      pattern: string;
      message: string;
    };
    options?: Array<{
      value: string;
      label: string;
    }>;
  }
  
  export interface FormSchema {
    formTitle: string;
    formDescription: string;
    fields: FormField[];
  }