import GetResource from "../../module/GetResource/index.js"

const pervw = document.body.clientWidth / 100
const pervh = document.body.clientHeight / 100
const navSort = document.querySelectorAll(".nav_sort")
navSort.forEach((item) => {
    item.addEventListener("click", () => {
        navSort.forEach((item, index) => {
            item.style.color = "rgb(168,168,168)"
            item.lastElementChild.style.visibility = "hidden"
        })
        item.style.color = "rgb(34,213,156)"
        item.lastElementChild.style.visibility = "visible"

    })
})
const recommendPage = document.querySelector(".recommend_page")
const chartPage = document.querySelector(".chart_page")
navSort[0].addEventListener("click", () => {
    recommendPage.style.display = "block"
    chartPage.style.display = "none"
})
navSort[1].addEventListener("click", () => {
    recommendPage.style.display = "none"
    chartPage.style.display = "block"
})
const unsearch = document.querySelector(".unsearch")
const onsearch = document.querySelector(".onsearch")
const searchwait = document.querySelector(".searchwait")
const searching = document.querySelector(".searching")
const cancleSearch = document.querySelector(".cancle_search")
const searchPage = document.querySelectorAll(".search_page")
const recommendSeet = document.querySelector(".recommend_sheet")
const hotItem = document.querySelectorAll(".hot_item")
const historyItem = document.querySelectorAll(".history_item")
const historyList = document.querySelector(".history_list")
const InputSearch = document.querySelector("#InputSearch")
const searchList = document.querySelector(".search_list")
const delete1 = document.querySelector(".delete1")
const delete2 = document.querySelector(".delete2")
const chartList = document.querySelectorAll(".chart_list")
function ThingsUnsearch() {
    unsearch.style.display = "none"
    onsearch.style.display = "block"
    searchwait.style.display = "none"
    searching.style.display = "block"
    searchPage[1].style.display = "block"
    recommendSeet.style.display = "none"
    if (historyList.children.length != 0) {
        searchPage[0].style.display = "block"
    }
}
function ThingsSearchWait() {
    if (InputSearch.value == "") {
        delete1.style.display = "none"
    } else {
        delete1.style.display = "block"
    }
    searchwait.style.display = "none"
    searching.style.display = "block"
}
InputSearch.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        searchDate(InputSearch.value)
    }
})
unsearch.addEventListener("click", () => {
    ThingsUnsearch()
})
cancleSearch.addEventListener("click", () => {
    unsearch.style.display = "flex"
    onsearch.style.display = "none"
    searchwait.style.display = "none"
    searching.style.display = "none"
    searchPage[1].style.display = "none"
    searchPage[0].style.display = "none"
    recommendSeet.style.display = "block"
    searchList.style.display = "none"
    InputSearch.value = ""
})
searchwait.addEventListener("click", () => {
    ThingsSearchWait()
})
searching.children[1].addEventListener("blur", () => {
    if (searching.children[1].value == "") {
        searchwait.style.display = "flex"
        searching.style.display = "none"
    }
})
delete1.addEventListener("click", () => {
    InputSearch.value = ""
    searchList.style.display = "none"
    searchPage[1].style.display = "block"
    searchPage[0].style.display = "block"
})
InputSearch.addEventListener("input", () => {
    if (InputSearch.value == "") {
        delete1.style.display = "none"
    } else {
        delete1.style.display = "block"
    }
})
delete2.addEventListener("click", () => {
    historyList.innerHTML = ""
    searchPage[0].style.display = "none"
})


async function DateInit() {
    hotSearchInit()
    chartPageInit()
    sheetDateInit()
}
function checkNaN(item) {
    if (item == "") {
        item = "0px"
    }
    return item
}
async function hotSearchInit() {
    const hotList = document.querySelector(".hot_list")
    const hotSearchItemArrs = await GetResource("/hot")
    hotSearchItemArrs.forEach((item) => {
        const tempItem = document.createElement("div")
        tempItem.className = "hot_item"
        tempItem.textContent = item
        hotList.appendChild(tempItem)
        tempItem.addEventListener("click", () => {
            InputSearch.value = tempItem.textContent
            ThingsSearchWait()
            searchDate(tempItem.textContent)
        })
    })
}
async function chartPageInit() {
    const chartPage = document.querySelector(".chart_page")
    const chartPageData = await GetResource("/ranking")

    chartPageData.forEach((item, index) => {
        const tempChartList = document.createElement("div")
        tempChartList.className = "chart_list"
        tempChartList.innerHTML = "<div class='chart_list_left'><div class='chart_title'></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>1.</div><div class='song_name'></div><div class='song_author'></div></div></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>2.</div><div class='song_name'></div><div class='song_author'></div></div></div><div class='chart_item_box'><div class='chart_item'><div class='chart_item_index'>3.</div><div class='song_name'></div><div class='song_author'></div></div></div></div><div class='chart_list_right'><img class='chart_img' src='../../picture/song.jpg' alt=''><div class='week_update'></div><div class='numbers'></div></div>"
        tempChartList.index = index
        chartPage.appendChild(tempChartList)
        let choiceColorInterval
        let startTime
        let startPosY
        let startTop
        let flag = 0
        tempChartList.addEventListener("touchstart", (e) => {
            tempChartList.style.backgroundColor = "rgb(255,255,255)"
            startPosY = e.touches[0].pageY
            startTop = tempChartList.style.top
            let points = 255
            startTime = new Date()
            choiceColorInterval = setInterval(() => {
                points -= 2
                tempChartList.style.backgroundColor = `rgb(${points},${points},${points})`
            }, 50);
            setTimeout(() => {
                clearInterval(choiceColorInterval)
            }, 500)
            startTime = new Date()
        })
        tempChartList.addEventListener("touchmove", (e) => {
            clearInterval(choiceColorInterval)
            let tempTime = new Date()
            if (tempTime - startTime > 500) {
                tempChartList.style.zIndex = 20
                let subPos = e.touches[0].pageY - startPosY
                tempChartList.style.top = checkNaN(tempChartList.style.top)
                if (!((tempChartList.offsetTop < 0) || (tempChartList.offsetTop + tempChartList.offsetHeight > chartPage.offsetHeight))) {
                    tempChartList.style.top = parseInt(tempChartList.style.top) + subPos + "px"
                } else if (tempChartList.offsetTop <= 0) {
                    tempChartList.style.top = parseInt(tempChartList.style.top) + 1 + "px"
                } else if (tempChartList.offsetTop + tempChartList.offsetHeight >= chartPage.offsetHeight) {
                    tempChartList.style.top = parseInt(tempChartList.style.top) - 1 + "px"
                }

                startPosY = e.touches[0].pageY
                if ((parseInt(tempChartList.style.top) > 15 * pervw || parseInt(tempChartList.style.top) < -15 * pervw) && flag == 0) {
                    if (parseInt(tempChartList.style.top) >= 0) {

                        chartPage.children[tempChartList.index + 1].style.top = - 34.9 * pervw + "px"
                        chartPage.children[tempChartList.index + 1].index--
                    } else {

                        chartPage.children[tempChartList.index - 1].style.top = 34.9 * pervw + "px"
                        chartPage.children[tempChartList.index - 1].index++
                    }
                    flag = 1;
                }
                e.preventDefault()
            } else {
                startTime = tempTime
            }
        })
        tempChartList.addEventListener("touchend", (e) => {
            clearInterval(choiceColorInterval)
            flag = 0
            if (parseInt(tempChartList.style.top) > 15 * pervw || parseInt(tempChartList.style.top) < -15 * pervw) {
                console.log(parseInt(tempChartList.style.top))
                let temp = chartPage.removeChild(chartPage.children[tempChartList.index])
                if (parseInt(tempChartList.style.top) > 0) {
                    chartPage.insertBefore(temp, chartPage.children[tempChartList.index + 1])
                    chartPage.children[tempChartList.index + 1].style.top = ""
                    chartPage.children[tempChartList.index].style.top = ""
                    tempChartList.index++
                } else {
                    chartPage.insertBefore(temp, chartPage.children[tempChartList.index - 1])
                    chartPage.children[tempChartList.index - 1].style.top = ""
                    chartPage.children[tempChartList.index].style.top = ""
                    tempChartList.index--
                }
            }
            tempChartList.style.top = startTop
            tempChartList.style.zIndex = 0
            tempChartList.style.backgroundColor = "rgb(255,255,255)"
        })
    })
    chartPageData.forEach((item, index) => {

        const chartTitleArr = document.querySelectorAll(".chart_title")
        const songName = document.querySelectorAll(".song_name")
        const songAuthor = document.querySelectorAll(".song_author")
        const weekUpdate = document.querySelectorAll(".week_update")
        const numbers = document.querySelectorAll(".numbers")
        const chartImg = document.querySelectorAll(".chart_img")
        chartImg[index].src = item.cover
        chartTitleArr[index].textContent = item.title
        weekUpdate[index].textContent = `每${item.update_frequence}更新`
        numbers[index].textContent = (item.views / 10000).toFixed(1) + "万"
        for (let i = 0; i < 3; i++) {
            songName[index * 3 + i].textContent = item.top3[i].title + "-"
            let actorString = ""
            item.top3[i].artist.forEach((name, index2) => {
                if (index2 == 0) {
                    actorString += name
                } else {
                    actorString += ` / ${name}`
                }
            })
            songAuthor[index * 3 + i].textContent = actorString
        }

    })
}
async function sheetDateInit() {
    const sheetDateArr = await GetResource("/recommendations")
    const sheetBox = document.querySelectorAll(".sheet_box")
    sheetDateArr.offical.forEach((item, index) => {
        const tempSheetItemBox = document.createElement("div")
        tempSheetItemBox.className = "sheet_item"
        tempSheetItemBox.innerHTML = "<img class='sheet_item_img' src='../../picture/song.jpg' alt=''><div class='sheet_numbers'>555万</div><div class='sheet_tiem_title'>大大大</div>"
        tempSheetItemBox.children[0].src = sheetDateArr.offical[index].cover
        tempSheetItemBox.children[1].textContent = (sheetDateArr.offical[index].views / 10000).toFixed(1) + "万"
        tempSheetItemBox.children[2].textContent = sheetDateArr.offical[index].title
        sheetBox[0].appendChild(tempSheetItemBox)
    })
    sheetDateArr.tatsujin.forEach((item, index) => {
        const tempSheetItemBox = document.createElement("div")
        tempSheetItemBox.className = "sheet_item"
        tempSheetItemBox.innerHTML = "<img class='sheet_item_img' src='../../picture/song.jpg' alt=''><div class='sheet_numbers'>555万</div><div class='sheet_tiem_title'>大大大</div>"
        tempSheetItemBox.children[0].src = sheetDateArr.tatsujin[index].cover
        tempSheetItemBox.children[1].textContent = (sheetDateArr.tatsujin[index].views / 10000).toFixed(1) + "万"
        tempSheetItemBox.children[2].textContent = sheetDateArr.tatsujin[index].title
        sheetBox[1].appendChild(tempSheetItemBox)
    })
    sheetDateArr.column.forEach((item, index) => {
        const tempSheetItemBox = document.createElement("div")
        tempSheetItemBox.className = "sheet_item"
        tempSheetItemBox.innerHTML = "<div class='sheet_big_box'><div class='sheet_mid_box'><div class='sheet_small_picture'></div><div class='column_name'></div></div><div class='sheet_decoration'></div></div>"
        tempSheetItemBox.children[0].children[0].style.backgroundImage = `url(${sheetDateArr.column[index].background})`
        tempSheetItemBox.children[0].children[0].children[0].style.backgroundImage = `url(${sheetDateArr.column[index].icon})`
        tempSheetItemBox.children[0].children[0].children[1].textContent = sheetDateArr.column[index].title
        tempSheetItemBox.children[0].children[1].textContent = sheetDateArr.column[index].description
        sheetBox[2].appendChild(tempSheetItemBox)
    })
}
async function searchDate(value) {
    let flag = 0
    if (historyList.children.length != 0) {
        for (let i = 0; i < historyList.children.length; i++) {
            if (value == historyList.children[i].textContent) {
                flag = 1
            }
        }
    }
    if (flag != 1) {
        searchList.innerHTML = ""
        const tempHistoryItem = document.createElement("div")
        tempHistoryItem.className = "history_item"
        tempHistoryItem.textContent = value
        historyList.appendChild(tempHistoryItem)
        tempHistoryItem.addEventListener("click", () => {
            InputSearch.value = tempHistoryItem.textContent
            searchDate(tempHistoryItem.textContent)
        })
    }
    if (historyList.children.length != 0) {
        searchPage[0].style.display = "block"
    }
    const sheetDateArr = await GetResource(`/search?keyword=${value}`)
    searchList.style.display = "flex"
    sheetDateArr.forEach((item) => {
        const tempSearchList = document.createElement("div")
        tempSearchList.innerHTML = "<div class='search_item_title'></div><div class='search_item_author'></div>"
        tempSearchList.className = "search_item"
        searchList.appendChild(tempSearchList)
        tempSearchList.children[0].textContent = item.title
        let author = ""
        item.artist.forEach((item, index) => {
            if (index == 0) {

                author += item
            } else {
                author += " · " + item
            }
        })
        tempSearchList.children[1].textContent = author
        searchPage[0].style.display = "none"
        searchPage[1].style.display = "none"
    })
}
DateInit()