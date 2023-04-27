class Logger {
    info(message: string) {
        const now = new Date();
        const timeText = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${digit2(now.getHours())}:${digit2(now.getMinutes())}:${digit2(now.getSeconds())}`;
        console.log(`${timeText} INFO ${message}`);
    }
    debug(message: string) {
        const now = new Date();
        const timeText = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()} ${digit2(now.getHours())}:${digit2(now.getMinutes())}:${digit2(now.getSeconds())}`;
        console.log(`${timeText} DEBUG ${message}`);
    }
}

const digit2 = (n: number): string => {
    const t = ("0" + n);
    return t.substring(t.length - 2, t.length);
}

const logger = new Logger();

export default logger;