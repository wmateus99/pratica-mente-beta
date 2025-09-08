export function getFileName(baseName = "PraticaMente") {
    let path = window.location.pathname;
    let file = path.split("/").pop();
    let fileName = file.split(".")[0];
    let formattedName = fileName.charAt(0).toUpperCase() + fileName.slice(1);

    return formattedName === "Index"
        ? baseName
        : `${baseName} | ${formattedName}`;
}
