// Interface to define the shape of a user entity
export interface User {
  userId: string;
  displayName: string;
  age: number;
  profession: string;
}

// Interface for the request body when updating a user
export interface UpdateUserDataRequestBody {
  userId: string;
  displayName?: string; // Optional fields for updating
  age?: number;
  profession?: string;
}
