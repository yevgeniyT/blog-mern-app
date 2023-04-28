declare type userType = {
    id: string;
    email: string;
    password: string;
    hashPassword: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    role: string;
    avatarImage: string;
    isActive: boolean;
    lastLogin: Date;
};
