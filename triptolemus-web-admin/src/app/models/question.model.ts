export interface Question {
    id?: number;
    text: string;
    category_name: string;
    category_id?: number;
    isDeleting?: boolean;
    isEditing?: boolean;
  }  
