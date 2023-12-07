import {
    hashSync,
    compare
} from "bcrypt"

const hashPassword = (password: string, saltRounds: number) => {
    const passwordHash = hashSync(password, saltRounds);
    return { passwordHash};
}


const checkPassword = async (pi: string, pd: string) => {
    if (pi && pd){
        const checkPassword = await compare(pi, pd);
        return checkPassword;
    }
}

export {
    hashPassword,
    checkPassword
};