let listPage = window.location.href.indexOf('train/guide/course/list') != -1;

let coursePage = window.location.href.indexOf('/grain/course') != -1;

const readingFlag = 'readingFlag', refreshFlag = 'refreshFlag';

if (listPage) {

    var exeId = setInterval(function () {
        let reading = localStorage.getItem(readingFlag), refresh = localStorage.getItem(refreshFlag);
        if (!reading) {
            if (!refresh) {
                localStorage.setItem(refreshFlag, true);
                window.location.reload();
            } else {
                //document.getElementsByClassName('item-wrapper')[15].children[1].getAttribute('class')
                let items = document.getElementsByClassName('item-wrapper');
                for (var i = 0; i < items.length; i++) {
                    let clazz = items[i].children[1].getAttribute('class');
                    if (items[i].children[0].getAttribute('class') == 'item-cover' && clazz.indexOf('pass') == -1) {
                        console.info('play next course');
                        items[i].children[0].click();
                        break;
                    }
                }
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
            if(document.getElementsByClassName('vcp-controls-panel')[0].getAttribute('class').indexOf('show') !=-1){
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

window.onload = function(e){
     let video = document.getElementsByTagName('video');
     if(video  && video[0]){
        video[0].setAttribute('muted', true);
        console.info('set video muted');
     }
}
