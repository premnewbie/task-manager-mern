export default function PastDate(dateString) {
    const inputDate = new Date(dateString);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return inputDate < today;
}
