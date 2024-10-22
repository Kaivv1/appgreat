export function createError(msg) {
    const error = new Error()
    error.message = msg
    return error
}

