export default function copmare(arr1, arr2) {
    if (arr1.length !== 0 && arr2.length !== 0) {
        arr1.forEach(item => {
            arr2.forEach(elem => {
                if (item.id == elem.id) {
                    arr2.splice(arr2.indexOf(elem), 1);
                }
            });
        });
    }
}