export function getResponseJson (response) {
    if (!response.ok) {
        return Promise.resolve(response.json())
            .then(error => {
                throw error || response.statusText
            });
    }

    return response.json();
}

if (!RegExp.escape) {
    RegExp.escape = function (s) {
        // eslint-disable-next-line
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    };
}
