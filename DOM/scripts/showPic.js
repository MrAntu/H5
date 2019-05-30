
function showPic(node) {
    var source = node.getActiveAttrib("href");
    var placeholder = document.getElementById("placeholder");
    placeholder.setAttribute("src", source);
}
