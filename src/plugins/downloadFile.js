
export default function downloadFile(name) {
    fetch(('http://localhost:3000/database/files/' + name), {
        headers: {
            'Origin': 'http://localhost:3000/'
        }
    }).then(res => {
        res.blob().then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        });
    })
}
