export default function transformDate(date) {
    const time = new Date(date);
    
    return `${time.getHours()}:${time.getMinutes()}`;
}