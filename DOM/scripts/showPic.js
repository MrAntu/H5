
function showPic(node) {
    // alert(1111)
    var title = node.getAttribute("title");
    var placeholder = document.getElementById("placeholder");
    if (title == 'a') {
        placeholder.setAttribute("src", "images/1.jpg");
    } else if (title == "b") {
        placeholder.setAttribute("src", "images/cover-5-1.jpg");
    } else if (title == "c") {
        placeholder.setAttribute("src", "images/laugh.png");
    }
}
