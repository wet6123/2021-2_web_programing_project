/* 날짜 구하기 */

const today = new Date();

const todayDate =
  today.getFullYear() +
  "" +
  ("00" + (today.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + today.getDate()).slice(-2);

const lastD = new Date(today.setDate(today.getDate() - 1)); //1일전 날짜

const lastDate =
  lastD.getFullYear() +
  "" +
  ("00" + (lastD.getMonth() + 1)).slice(-2) +
  "" +
  ("00" + lastD.getDate()).slice(-2);

const lastMonth = new Date(today.setDate(today.getDate() - 6)); //7일전 날짜

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

/*xml 데이터 받아오기*/

const xhr2 = new XMLHttpRequest();
const url2 =
  "https://cors-anywhere.herokuapp.com/http://openapi.data.go.kr/openapi/service/rest/Covid19/getCovid19SidoInfStateJson"; /*URL*/
let queryParams2 =
  "?" +
  encodeURIComponent("serviceKey") +
  "=" +
  "%2BoIYTmUUFCPspL03m39Sa5R35t7ygqHkM8mpml78dw14E0OXd68XcaMzBk9PGHSJTabR3KAYDdAww%2FQcn6V2DA%3D%3D"; /*Service Key*/
queryParams2 +=
  "&" + encodeURIComponent("pageNo") + "=" + encodeURIComponent("1"); /**/
queryParams2 +=
  "&" + encodeURIComponent("numOfRows") + "=" + encodeURIComponent("19"); /**/
queryParams2 +=
  "&" +
  encodeURIComponent("startCreateDt") +
  "=" +
  encodeURIComponent(lastDate); /**/
queryParams2 +=
  "&" +
  encodeURIComponent("endCreateDt") +
  "=" +
  encodeURIComponent(todayDate); /**/

xhr2.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nodeValfunc2(this); // this == xhr2
  }
};

xhr2.open("GET", url2 + queryParams2);
xhr2.send("");

function nodeValfunc2(xml) {
  const xmlDoc = xml.responseXML;

  const defCnt = xmlDoc.getElementsByTagName("defCnt"); //확진자
  const deathCnt = xmlDoc.getElementsByTagName("deathCnt"); //사망자
  const gubun = xmlDoc.getElementsByTagName("gubun"); //시도명
  const qurRate = xmlDoc.getElementsByTagName("qurRate"); //10만명 당 발생률
  const overFlowCnt = xmlDoc.getElementsByTagName("overFlowCnt"); //해외 유입
  const localOccCnt = xmlDoc.getElementsByTagName("localOccCnt"); //지역 발생

  const arr = Array.from(Array(19), () => Array(4).fill(null));

  for (i = 0; i < 19; i++) {
    arr[i][0] = gubun[i].childNodes[0].nodeValue;
    arr[i][1] = defCnt[i].childNodes[0].nodeValue;
    arr[i][2] = deathCnt[i].childNodes[0].nodeValue;
    arr[i][3] = overFlowCnt[i].childNodes[0].nodeValue;
    arr[i][4] = localOccCnt[i].childNodes[0].nodeValue;
    arr[i][5] = qurRate[i].childNodes[0].nodeValue;
  }

  let txt = "";
  for (j = 18; j >= 0; j--) {
    txt +=
      "<tr>" +
      "<td>" +
      arr[j][0] +
      "</td>" +
      "<td>" +
      arr[j][1] +
      "</td>" +
      "<td>" +
      arr[j][2] +
      "</td>" +
      "<td>" +
      arr[j][3] +
      "</td>" +
      "<td>" +
      arr[j][4] +
      "</td>" +
      "<td>" +
      arr[j][5] +
      "</td>" +
      "</tr>";
  }
  document.getElementById("data2").innerHTML = txt;
}
