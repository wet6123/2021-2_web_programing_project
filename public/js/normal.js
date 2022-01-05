const posts = document.getElementsByClassName("post").length;
let text = "";
text += "총 <font color=red>" + posts + "</font> 건";

window.onload = () => {
  document.getElementById("postsNum").innerHTML = text;
};
