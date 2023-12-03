

export const debugLog = (...log) => {
    if (process.env.NODE_ENV == 'local') {
        console.log("LOG:: ", log);
    }
}