export interface UserResponse {
    _id:       string;
    email:     string;
    password:  string;
    roles:     Role[];
    createdAt: string;
    updatedAt: string;
}

export interface Role {
    _id:  string;
    name: string;
}
