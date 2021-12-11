function financial(x) {
  return Number.parseFloat(x).toFixed(0);
}

/* 날짜 구하기 */

const today = new Date();

const lastMonth = new Date(today.setDate(today.getDate() - 1)); //1일전 날짜

const lastMonthDate =
  lastMonth.getFullYear() +
  "-" +
  ("00" + (lastMonth.getMonth() + 1)).slice(-2) +
  "-" +
  ("00" + lastMonth.getDate()).slice(-2) +
  " 00:00:00";

/*xml 데이터 받아오기*/

const xhr = new XMLHttpRequest();
const url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat"; /*URL*/
let queryParams = "?" + encodeURIComponent("page") + "=" + "1";
queryParams +=
  "&" + encodeURIComponent("perPage") + "=" + encodeURIComponent("18"); /**/
queryParams +=
  "&" + encodeURIComponent("returnType") + "=" + encodeURIComponent("XML"); /**/
queryParams +=
  "&" +
  encodeURIComponent("cond[baseDate::EQ]") +
  "=" +
  encodeURIComponent(lastMonthDate); /*1일 전 날짜*/
queryParams +=
  "&" +
  encodeURIComponent("serviceKey") +
  "=" +
  "%2BoIYTmUUFCPspL03m39Sa5R35t7ygqHkM8mpml78dw14E0OXd68XcaMzBk9PGHSJTabR3KAYDdAww%2FQcn6V2DA%3D%3D"; /*인증키*/

xhr.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    nodeValfunc(this); // this == xhr
  }
};

xhr.open("GET", url + queryParams);
xhr.send("");

function nodeValfunc(xml) {
  const xmlDoc = xml.responseXML;

  const baseDate = xmlDoc.getElementsByName("baseDate"); //통계 기준일자
  const sido = xmlDoc.getElementsByName("sido"); //지역명칭
  const firstCnt = xmlDoc.getElementsByName("firstCnt"); //당일 통계(1차 접종)
  const secondCnt = xmlDoc.getElementsByName("secondCnt"); //당일 통계(2차 접종)
  const thirdCnt = xmlDoc.getElementsByName("thirdCnt"); //당일 통계(3차 접종)
  const totalFirstCnt = xmlDoc.getElementsByName("totalFirstCnt"); //전체 누적 통계(1차 접종)
  const totalSecondCnt = xmlDoc.getElementsByName("totalSecondCnt"); //전체 누적 통계(2차 접종)
  const totalThirdCnt = xmlDoc.getElementsByName("totalThirdCnt"); //전체 누적 통계(3차 접종)

  const arr = Array.from(Array(19), () => Array(4).fill(null));

  arr[0][0] = "";
  arr[0][1] = "1차 접종";
  arr[0][2] = "2차 접종";
  arr[0][3] = "3차 접종";
  arr[0][4] = "1차 접종";
  arr[0][5] = "2차 접종";
  arr[0][6] = "3차 접종";

  for (i = 0; i < 18; i++) {
    arr[i + 1][0] = sido[i].childNodes[0].nodeValue;
    arr[i + 1][1] = financial(firstCnt[i].childNodes[0].nodeValue);
    arr[i + 1][2] = financial(secondCnt[i].childNodes[0].nodeValue);
    arr[i + 1][3] = financial(thirdCnt[i].childNodes[0].nodeValue);
    arr[i + 1][4] = financial(totalFirstCnt[i].childNodes[0].nodeValue);
    arr[i + 1][5] = financial(totalSecondCnt[i].childNodes[0].nodeValue);
    arr[i + 1][6] = financial(totalThirdCnt[i].childNodes[0].nodeValue);
  }

  let txt = "";
  for (j = 0; j <= 18; j++) {
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
      "<td>" +
      arr[j][6] +
      "</td>" +
      "</tr>";
  }

  document.getElementById("data").innerHTML = txt;

  const cntDate = baseDate[0].childNodes[0].nodeValue.slice(0, -8);
  document.getElementById("cntDate").innerHTML = `통계 기준일: ${cntDate}`;
}
