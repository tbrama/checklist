export interface AllCheck {
  statusCode: number;
  message: string;
  errorMessage: any;
  data: Daum[];
}

export interface Daum {
  id: number;
  name: string;
  items?: Item[];
  checklistCompletionStatus: boolean;
}

export interface Item {
  id: number;
  name: string;
  itemCompletionStatus: boolean;
}
