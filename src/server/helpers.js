function replaceId(object) {
    if (object.constructor === Array) {
        object.forEach(element => {
            if (element._id) {
                element.id = element._id;
                delete element['_id'];
            }
        });
    } else {
        if (object._id) {
            object.id = object._id;
            delete object['_id'];
        }
    }
    return object;
}

function generateComponentName(pageName) {
    // eslint-disable-next-line
    return pageName.replace(/[\s&\/\\#,+\-()$~%.'"`:*?<>{}]/g,'_');
}

module.exports = {
    replaceId: replaceId,
    generateComponentName: generateComponentName
}