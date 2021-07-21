let listPage = window.location.href.indexOf('train/guide/course/list') != -1;

let coursePage = window.location.href.indexOf('/grain/course') != -1;

const readingFlag = 'readingFlag', refreshFlag = 'refreshFlag';

if (listPage) {

    var exeId = setInterval(function () {
        let reading = localStorage.getItem(readingFlag),
            refresh = localStorage.getItem(refreshFlag),
            exitsNextPage = function () {
                let pageNowEle = document.getElementsByClassName('ivu-page-item ivu-page-item-active'),
                    pageNow = pageNowEle && pageNowEle[0].innerText,
                    pageTotalEle = document.querySelector('.total-text'),
                    pageTotal = pageTotalEle && pageTotalEle.textContent.split('/')[1].substring(0, 1);
                return pageNowEle && pageTotalEle && pageNow < pageTotal;
            },

            watchCourse = function () {
                let items = document.getElementsByClassName('item-wrapper');
                for (var i = 0; i < items.length; i++) {
                    let clazz = items[i].children[1].getAttribute('class');
                    if (items[i].children[0].getAttribute('class') == 'item-cover' && clazz.indexOf('pass') == -1) {
                        console.info('play next course');
                        items[i].children[0].click();
                        return;
                    }
                }
                if (!exitsNextPage()) {
                    console.info('no more page video can watch. exit')
                    return;
                }
                //watch next page
                let nextPage = document.querySelector('.ivu-page-next');
                nextPage && nextPage.click();
                //wait for next page display
                setTimeout(function () {
                    console.info('watch next page video')
                    watchCourse()
                }, 3000);
            };

        if (!reading) {
            if (!refresh) {
                localStorage.setItem(refreshFlag, true);
                window.location.reload();
            } else {
                watchCourse();
            }
        } else {
            console.info('course is reading now, waitting for play next video...')
        }

    }, 10000)
}

if (coursePage) {
    (function () {
        localStorage.setItem(readingFlag, true);
        var ID = setInterval(function () {

            //click alarm 
            document.getElementsByClassName('alarmClock-wrapper')[0].click();
            //click if stop
            if (document.getElementsByClassName('vcp-controls-panel')[0].getAttribute('class').indexOf('show') != -1) {
                document.getElementsByClassName('vcp-bigplay')[0].click();
            }
            //click if need comment 
            document.getElementsByClassName('cancel ivu-btn ivu-btn-primary')[0].click();

            let playTime = document.getElementsByClassName('vcp-timelabel')[0].textContent.trim(),
                playTimes = playTime.split("/"),
                current = playTimes[0].trim(),
                total = playTimes[1].trim();

            console.info('current:', current, ';total:', total);
            if (current == total) {
                let next = document.getElementsByClassName('next');
                if (next && next[0]) {
                    next[0].click();
                    console.info('play next section')
                } else {
                    localStorage.removeItem(readingFlag);
                    localStorage.removeItem(refreshFlag);
                    console.info('this page all sections had readed, delete flags');
                    clearInterval(ID);
                    window.close();
                }
            }
        }, 5000)
    })();
}

window.onbeforeunload = function (e) {
    console.info('window closed, clear local storage')
    localStorage.removeItem(readingFlag);
};

