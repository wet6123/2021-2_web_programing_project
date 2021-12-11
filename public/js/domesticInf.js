/* 날짜 구하기 */

const today = new Date();

const todayDate =
  today.getFullYear() +
  "" +
  ("00" + (today.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + today.getDate()).slice(-2);

const lastMonth = new Date(today.setDate(today.getDate() - 7)); //7일전 날짜

const lastMonthDate =
  lastMonth.getFullYear() +
  "" +
  ("00" + (lastMonth.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + lastMonth.getDate()).slice(-2);

/*xml 데이터 받아오기*/

const xhr = new XMLHttpRequest();
const url =
  "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19InfStateJson"; /*URL*/
let queryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=" +
  "%2BoIYTmUUFCPspL03m39Sa5R35t7ygqHkM8mpml78dw14E0OXd68XcaMzBk9PGHSJTabR3KAYDdAww%2FQcn6V2DA%3D%3D"; /*Service Key*/
queryParams +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
queryParams +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("10"); /**/
queryParams +=
  "&" +
  encodeURIComponent("startCreateDt") +
  "=" +
  encodeURIComponent(lastMonthDate); /**/
queryParams +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent(todayDate); /**/

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nodeValfunc(this); // this == xhr
  }
};

xhr.open("GET", url + queryParams);
xhr.send("");

function nodeValfunc(xml) {
  const xmlDoc = xml.responseXML;

  const decideCnt = xmlDoc.getElementsByTagName("decideCnt");
  const deathCnt = xmlDoc.getElementsByTagName("deathCnt");
  const accExamCnt = xmlDoc.getElementsByTagName("accExamCnt");

  //   var items = xmlDoc.getElementsByTagName("items");
  //   console.log(items[0]);

  let arr = new Array();
  arr[0] = decideCnt[0].childNodes[0].nodeValue;
  arr[1] = deathCnt[0].childNodes[0].nodeValue;
  arr[2] = accExamCnt[0].childNodes[0].nodeValue;

  const txt =
    "<td>" +
    arr[0] +
    " 명 </td>" +
    "<td>" +
    arr[1] +
    " 명</td>" +
    "<td>" +
    arr[2] +
    " 명 </td>";
  document.getElementById("data").innerHTML = txt;
}
