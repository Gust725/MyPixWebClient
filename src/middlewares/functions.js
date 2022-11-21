const middleware = {}
middleware.header = (nameFoo) => {
    const headers = {
        headers: {
            "Content-Type": "text/xml; charset=utf-8",
            SOAPAction: `http://tempuri.org/${nameFoo}`,
        },
    };
    return headers
}

module.exports = middleware;
// export default header;