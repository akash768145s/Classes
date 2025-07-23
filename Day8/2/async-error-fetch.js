// Oru wrong API address kudukrom (idhu work aagadhu nu theriyum)
fetch('https://jsonplaceholder.typicode.com/invalid-endpoint')

    // Fetch-ku response kedachaa, indha block la varum
    .then(res => {
        // response OK-a illa-nu check panrom
        if (!res.ok) {
            // illa-na oru pudhu error throw panrom
            // eg: HTTP error 404
            throw new Error('HTTP error ' + res.status);
        }

        // OK-a irundhaa JSON format-a JS object-a maathrom
        return res.json();
    })

    // JSON data kedachaa, console la print panrom
    .then(data => {
        console.log(data);
    })

    // ethachum error na, inga catch panni print panrom
    .catch(err => {
        console.error('Promise error:', err.message);
    });
