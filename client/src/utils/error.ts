import { AxiosError } from "axios";

interface CustomError {
    code: number | undefined
    msg: string | undefined
}

export function returnErrObj (err: unknown) {
 const error = err as AxiosError<{msg: string}>
 return {code: error.response?.status, msg: error.response?.data.msg} as CustomError
}