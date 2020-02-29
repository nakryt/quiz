export const isEmpty = (arg: [] | {}):boolean => {
    if (arg instanceof Array) {
        return arg.length === 0
    } else {
        return Object.keys(arg).length === 0
    }
}
