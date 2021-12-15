export default function transformDate(date) {
    const time = new Date(date);
    
    const hours = (time.getHours().toString().length > 1) ? time.getHours() : "0"+time.getHours();
    const minutes = (time.getMinutes().toString().length > 1) ? time.getMinutes() : "0"+time.getMinutes();

    return `${hours}:${minutes}`;
}