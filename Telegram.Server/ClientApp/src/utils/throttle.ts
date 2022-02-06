export const throttle = (f: (...args: any[]) => void, ms: number) => {
    let can = true
    let called = false
    let lastArgs = []
    let wrap = (...args: any[]) => {
        lastArgs = args
        if (can) {
            can = false
            f(...args)
            setTimeout(() => {
                can = true
                if (called) {
                    wrap(...lastArgs)
                    called = false
                }
            }, ms)
        } else {
            called = true
        }
    }

    return wrap
}
