export function FromUTC(utcDate) {
    return new Date(utcDate * 1000).toLocaleString('ru-RU')
}