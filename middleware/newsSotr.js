export function sortArrayOfEntriesByDate(inputArray) {
    inputArray.sort((a, b) => {
        const dateA = new Date(a[0].date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
        const dateB = new Date(b[0].date.replace(/(\d{2}).(\d{2}).(\d{4})/, '$3-$2-$1'));
        return dateB - dateA;
    });
    return inputArray;
}