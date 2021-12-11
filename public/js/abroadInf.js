/* 날짜 구하기 */

const today = new Date();

const todayDate =
  today.getFullYear() +
  "" +
  ("00" + (today.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + today.getDate()).slice(-2);

const lastMonth = new Date(today.setDate(today.getDate() - 1)); //1일전 날짜

const lastMonthDate =
  lastMonth.getFullYear() +
  "" +
  ("00" + (lastMonth.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + lastMonth.getDate()).slice(-2);

/*xml 데이터 받아오기*/

const xhr = new XMLHttpRequest();
const url =
  "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19NatInfStateJson"; /*URL*/
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
  encodeURIComponent(lastMonthDate); /*1일 전 날짜*/
queryParams +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent(todayDate); /*오늘 날짜*/

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nodeValfunc(this); // this == xhr
  }
};

xhr.open("GET", url + queryParams);
xhr.send("");

function nodeValfunc(xml) {
  const xmlDoc = xml.responseXML;

  const areaName = xmlDoc.getElementsByTagName("areaNm");
  const nationName = xmlDoc.getElementsByTagName("nationNm");
  const nationDefCnt = xmlDoc.getElementsByTagName("natDefCnt");
  const nationDeathCnt = xmlDoc.getElementsByTagName("natDeathCnt");

  const arr = Array.from(Array(areaName.length), () => Array(4).fill(null));
  let name = areaName[0].childNodes[0].nodeValue;
  let num = 0;

  for (i = 0; i < areaName.length; i++) {
    if (
      i != areaName.length - 1 &&
      name == areaName[i].childNodes[0].nodeValue
    ) {
      num++;
      arr[i][0] = null;
      arr[i][1] = null;
    } else {
      arr[i - 1][0] = num;
      arr[i - 1][1] = name;
      name = areaName[i].childNodes[0].nodeValue;
      num = 1;
    }
    arr[i][2] = nationName[i].childNodes[0].nodeValue;
    arr[i][3] = nationDefCnt[i].childNodes[0].nodeValue;
    arr[i][4] = nationDeathCnt[i].childNodes[0].nodeValue;
  }

  let txt = "";
  for (j = areaName.length - 1; j >= 0; j--) {
    txt += "<tr>";

    if (arr[j][1]) {
      txt += "<th rowspan = " + arr[j][0] + ">" + arr[j][1] + "</th>";
    }

    if (arr[j][2] != "한국") {
      txt +=
        "<td>" +
        arr[j][2] +
        "</td>" +
        "<td>" +
        arr[j][3] +
        "명 (사망 " +
        arr[j][4] +
        ")" +
        "</td>" +
        "</tr>";
    }
  }

  document.getElementById("data").innerHTML = txt;
}
