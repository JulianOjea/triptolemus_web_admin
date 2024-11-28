export interface Question {
    id?: number;
    text: string;
    category_name: string;
    category_id?: number;
    confirmingDelete?: boolean;
    isEditing?: boolean;
  }  
