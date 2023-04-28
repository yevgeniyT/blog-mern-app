//Use optional fuilds? to handle type error in userController as, all fuilds can be undefined if user not provide input
interface UserPayload {
    userId?: string;
    email?: string;
    hashPassword?: string;
    firstName?: string;
    lastName?: string;
    avatarImagePath?: string;
    role?: string;
}
export { UserPayload };
