"use strict";

var _index = _interopRequireDefault(require("../../module/GetResource/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var pervw = document.body.clientWidth / 100;
var pervh = document.body.clientHeight / 100;
var navSort = document.querySelectorAll(".nav_sort");
navSort.forEach(function (item) {
  item.addEventListener("click", function () {
    navSort.forEach(function (item, index) {
      item.style.color = "rgb(168,168,168)";
      item.lastElementChild.style.visibility = "hidden";
    });
    item.style.color = "rgb(34,213,156)";
    item.lastElementChild.style.visibility = "visible";
  });
});
var recommendPage = document.querySelector(".recommend_page");
var chartPage = document.querySelector(".chart_page");
navSort[0].addEventListener("click", function () {
  recommendPage.style.display = "block";
  chartPage.style.display = "none";
});
navSort[1].addEventListener("click", function () {
  recommendPage.style.display = "none";
  chartPage.style.display = "block";
});
var unsearch = document.querySelector(".unsearch");
var onsearch = document.querySelector(".onsearch");
var searchwait = document.querySelector(".searchwait");
var searching = document.querySelector(".searching");
var cancleSearch = document.querySelector(".cancle_search");
var searchPage = document.querySelectorAll(".search_page");
var recommendSeet = document.querySelector(".recommend_sheet");
var hotItem = document.querySelectorAll(".hot_item");
var historyItem = document.querySelectorAll(".history_item");
var historyList = document.querySelector(".history_list");
var InputSearch = document.querySelector("#InputSearch");
var searchList = document.querySelector(".search_list");
var delete1 = document.querySelector(".delete1");
var delete2 = document.querySelector(".delete2");
var chartList = document.querySelectorAll(".chart_list");

function ThingsUnsearch() {
  unsearch.style.display = "none";
  onsearch.style.display = "block";
  searchwait.style.display = "none";
  searching.style.display = "block";
  searchPage[1].style.display = "block";
  recommendSeet.style.display = "none";

  if (historyList.children.length != 0) {
    searchPage[0].style.display = "block";
  }
}

function ThingsSearchWait() {
  if (InputSearch.value == "") {
    delete1.style.display = "none";
  } else {
    delete1.style.display = "block";
  }

  searchwait.style.display = "none";
  searching.style.display = "block";
}

InputSearch.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) {
    searchDate(InputSearch.value);
  }
});
unsearch.addEventListener("click", function () {
  ThingsUnsearch();
});
cancleSearch.addEventListener("click", function () {
  unsearch.style.display = "flex";
  onsearch.style.display = "none";
  searchwait.style.display = "none";
  searching.style.display = "none";
  searchPage[1].style.display = "none";
  searchPage[0].style.display = "none";
  recommendSeet.style.display = "block";
  searchList.style.display = "none";
  InputSearch.value = "";
});
searchwait.addEventListener("click", function () {
  ThingsSearchWait();
});
searching.children[1].addEventListener("blur", function () {
  if (searching.children[1].value == "") {
    searchwait.style.display = "flex";
    searching.style.display = "none";
  }
});
delete1.addEventListener("click", function () {
  InputSearch.value = "";
  searchList.style.display = "none";
  searchPage[1].style.display = "block";
  searchPage[0].style.display = "block";
});
InputSearch.addEventListener("input", function () {
  if (InputSearch.value == "") {
    delete1.style.display = "none";
  } else {
    delete1.style.display = "block";
  }
});
delete2.addEventListener("click", function () {
  historyList.innerHTML = "";
  searchPage[0].style.display = "none";
});

function DateInit() {
  return regeneratorRuntime.async(function DateInit$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          hotSearchInit();
          chartPageInit();
          sheetDateInit();

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

function checkNaN(item) {
  if (item == "") {
    item = "0px";
  }

  return item;
}

function hotSearchInit() {
  var hotList, hotSearchItemArrs;
  return regeneratorRuntime.async(function hotSearchInit$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          hotList = document.querySelector(".hot_list");
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _index["default"])("/hot"));

        case 3:
          hotSearchItemArrs = _context2.sent;
          hotSearchItemArrs.forEach(function (item) {
            var tempItem = document.createElement("div");
            tempItem.className = "hot_item";
            tempItem.textContent = item;
            hotList.appendChild(tempItem);
            tempItem.addEventListener("click", function () {
              InputSearch.value = tempItem.textContent;
              ThingsSearchWait();
              searchDate(tempItem.textContent);
            });
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function chartPageInit() {
  var chartPage, chartPageData;
  return regeneratorRuntime.async(function chartPageInit$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          chartPage = document.querySelector(".chart_page");
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _index["default"])("/ranking"));

        case 3:
          chartPageData = _context3.sent;
          chartPageData.forEach(function (item, index) {
            var tempChartList = document.createElement("div");
            tempChartList.className = "chart_list";
            tempChartList.innerHTML = "<div class='chart_list_left'><div class='chart_title'></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>1.</div><div class='song_name'></div><div class='song_author'></div></div></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>2.</div><div class='song_name'></div><div class='song_author'></div></div></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>3.</div><div class='song_name'></div><div class='song_author'></div></div></div></div><div class='chart_list_right'><img class='chart_img' src='../../picture/song.jpg' alt=''><div class='week_update'></div><div class='numbers'></div></div>";
            tempChartList.index = index;
            chartPage.appendChild(tempChartList);
            var choiceColorInterval;
            var startTime;
            var startPosY;
            var startTop;
            var flag = 0;
            tempChartList.addEventListener("touchstart", function (e) {
              tempChartList.style.backgroundColor = "rgb(255,255,255)";
              startPosY = e.touches[0].pageY;
              startTop = tempChartList.style.top;
              var points = 255;
              startTime = new Date();
              choiceColorInterval = setInterval(function () {
                points -= 2;
                tempChartList.style.backgroundColor = "rgb(".concat(points, ",").concat(points, ",").concat(points, ")");
              }, 50);
              setTimeout(function () {
                clearInterval(choiceColorInterval);
              }, 500);
              startTime = new Date();
            });
            tempChartList.addEventListener("touchmove", function (e) {
              clearInterval(choiceColorInterval);
              var tempTime = new Date();

              if (tempTime - startTime > 500) {
                tempChartList.style.zIndex = 20;
                var subPos = e.touches[0].pageY - startPosY;
                tempChartList.style.top = checkNaN(tempChartList.style.top);
                console.log(tempChartList.offsetTop, tempChartList.index, index, parseInt(tempChartList.style.top), tempChartList.style.top, 15 * pervw);

                if (!(tempChartList.index == 0 && subPos < 0 || tempChartList.index == chartPage.children.length - 1 && subPos > 0)) {
                  tempChartList.style.top = parseInt(tempChartList.style.top) + subPos + "px";
                }

                startPosY = e.touches[0].pageY;

                if ((parseInt(tempChartList.style.top) > 15 * pervw || parseInt(tempChartList.style.top) < -15 * pervw) && flag == 0) {
                  if (parseInt(tempChartList.style.top) > 0) {
                    chartPage.children[tempChartList.index + 1].style.top = -34.9 * pervw + "px";
                    chartPage.children[tempChartList.index + 1].index--;
                  } else {
                    chartPage.children[tempChartList.index - 1].style.top = 34.9 * pervw + "px";
                    chartPage.children[tempChartList.index - 1].index++;
                  }

                  flag = 1;
                }

                e.preventDefault();
              } else {
                startTime = tempTime;
              }
            });
            tempChartList.addEventListener("touchend", function (e) {
              clearInterval(choiceColorInterval);
              flag = 0;

              if (parseInt(tempChartList.style.top) > 15 * pervw || parseInt(tempChartList.style.top) < -15 * pervw) {
                console.log(parseInt(tempChartList.style.top));
                var temp = chartPage.removeChild(chartPage.children[tempChartList.index]);

                if (parseInt(tempChartList.style.top) > 0) {
                  chartPage.insertBefore(temp, chartPage.children[tempChartList.index + 1]);
                  chartPage.children[tempChartList.index + 1].style.top = "";
                  chartPage.children[tempChartList.index].style.top = "";
                  tempChartList.index++;
                } else {
                  chartPage.insertBefore(temp, chartPage.children[tempChartList.index - 1]);
                  chartPage.children[tempChartList.index - 1].style.top = "";
                  chartPage.children[tempChartList.index].style.top = "";
                  tempChartList.index--;
                }
              }

              tempChartList.style.top = startTop;
              tempChartList.style.zIndex = 0;
              tempChartList.style.backgroundColor = "rgb(255,255,255)";
            });
          });
          chartPageData.forEach(function (item, index) {
            var chartTitleArr = document.querySelectorAll(".chart_title");
            var songName = document.querySelectorAll(".song_name");
            var songAuthor = document.querySelectorAll(".song_author");
            var weekUpdate = document.querySelectorAll(".week_update");
            var numbers = document.querySelectorAll(".numbers");
            var chartImg = document.querySelectorAll(".chart_img");
            chartImg[index].src = item.cover;
            chartTitleArr[index].textContent = item.title;
            weekUpdate[index].textContent = "\u6BCF".concat(item.update_frequence, "\u66F4\u65B0");
            numbers[index].textContent = (item.views / 10000).toFixed(1) + "万";

            for (var i = 0; i < 3; i++) {
              songName[index * 3 + i].textContent = item.top3[i].title + "-";
              var actorString = "";
              item.top3[i].artist.forEach(function (name, index2) {
                if (index2 == 0) {
                  actorString += name;
                } else {
                  actorString += " / ".concat(name);
                }
              });
              songAuthor[index * 3 + i].textContent = actorString;
            }
          });

        case 6:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function sheetDateInit() {
  var sheetDateArr, sheetBox;
  return regeneratorRuntime.async(function sheetDateInit$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap((0, _index["default"])("/recommendations"));

        case 2:
          sheetDateArr = _context4.sent;
          sheetBox = document.querySelectorAll(".sheet_box");
          sheetDateArr.offical.forEach(function (item, index) {
            var tempSheetItemBox = document.createElement("div");
            tempSheetItemBox.className = "sheet_item";
            tempSheetItemBox.innerHTML = "<img class='sheet_item_img' src='../../picture/song.jpg' alt=''><div class='sheet_numbers'>555万</div><div class='sheet_tiem_title'>大大大</div>";
            tempSheetItemBox.children[0].src = sheetDateArr.offical[index].cover;
            tempSheetItemBox.children[1].textContent = (sheetDateArr.offical[index].views / 10000).toFixed(1) + "万";
            tempSheetItemBox.children[2].textContent = sheetDateArr.offical[index].title;
            sheetBox[0].appendChild(tempSheetItemBox);
          });
          sheetDateArr.tatsujin.forEach(function (item, index) {
            var tempSheetItemBox = document.createElement("div");
            tempSheetItemBox.className = "sheet_item";
            tempSheetItemBox.innerHTML = "<img class='sheet_item_img' src='../../picture/song.jpg' alt=''><div class='sheet_numbers'>555万</div><div class='sheet_tiem_title'>大大大</div>";
            tempSheetItemBox.children[0].src = sheetDateArr.tatsujin[index].cover;
            tempSheetItemBox.children[1].textContent = (sheetDateArr.tatsujin[index].views / 10000).toFixed(1) + "万";
            tempSheetItemBox.children[2].textContent = sheetDateArr.tatsujin[index].title;
            sheetBox[1].appendChild(tempSheetItemBox);
          });
          sheetDateArr.column.forEach(function (item, index) {
            var tempSheetItemBox = document.createElement("div");
            tempSheetItemBox.className = "sheet_item";
            tempSheetItemBox.innerHTML = "<div class='sheet_big_box'><div class='sheet_mid_box'><div class='sheet_small_picture'></div><div class='column_name'></div></div><div class='sheet_decoration'></div></div>";
            tempSheetItemBox.children[0].children[0].style.backgroundImage = "url(".concat(sheetDateArr.column[index].background, ")");
            tempSheetItemBox.children[0].children[0].children[0].style.backgroundImage = "url(".concat(sheetDateArr.column[index].icon, ")");
            tempSheetItemBox.children[0].children[0].children[1].textContent = sheetDateArr.column[index].title;
            tempSheetItemBox.children[0].children[1].textContent = sheetDateArr.column[index].description;
            sheetBox[2].appendChild(tempSheetItemBox);
          });

        case 7:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function searchDate(value) {
  var flag, i, tempHistoryItem, sheetDateArr;
  return regeneratorRuntime.async(function searchDate$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          flag = 0;

          if (historyList.children.length != 0) {
            for (i = 0; i < historyList.children.length; i++) {
              console.log(value == historyList.children[i].textContent);

              if (value == historyList.children[i].textContent) {
                flag = 1;
              }
            }
          }

          if (flag != 1) {
            searchList.innerHTML = "";
            tempHistoryItem = document.createElement("div");
            tempHistoryItem.className = "history_item";
            tempHistoryItem.textContent = value;
            historyList.appendChild(tempHistoryItem);
            tempHistoryItem.addEventListener("click", function () {
              InputSearch.value = tempHistoryItem.textContent;
              searchDate(tempHistoryItem.textContent);
            });
          }

          if (historyList.children.length != 0) {
            searchPage[0].style.display = "block";
          }

          _context5.next = 6;
          return regeneratorRuntime.awrap((0, _index["default"])("/search?keyword=".concat(value)));

        case 6:
          sheetDateArr = _context5.sent;
          searchList.style.display = "flex";
          sheetDateArr.forEach(function (item) {
            var tempSearchList = document.createElement("div");
            tempSearchList.innerHTML = "<div class='search_item_title'></div><div class='search_item_author'></div>";
            tempSearchList.className = "search_item";
            searchList.appendChild(tempSearchList);
            tempSearchList.children[0].textContent = item.title;
            var author = "";
            item.artist.forEach(function (item, index) {
              if (index == 0) {
                author += item;
              } else {
                author += " · " + item;
              }
            });
            tempSearchList.children[1].textContent = author;
            searchPage[0].style.display = "none";
            searchPage[1].style.display = "none";
          });

        case 9:
        case "end":
          return _context5.stop();
      }
    }
  });
}

DateInit();