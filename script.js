var d = document, user;

if (localStorage.getItem('game') != null)
{

    user = JSON.parse(localStorage.getItem('game'));
    d.querySelector('#moneyText').innerText = ('$ ' + user.money);
    d.querySelector('#moneyShopText').innerText = ('$ ' + user.money);

    if (user.building >= 1)
        for (var i = 1; i != (user.building + 1); i++)
        {
            d.querySelector('.building[data-building="' + i + '"]').style.display = 'block';
            d.querySelectorAll('shop .section[data-shop="build"] .blockBuy')[0].remove();
            if (d.querySelector('.section[data-shop="build"] .blockBuy') == null) d.querySelector('.section[data-shop="build"] .sectionName').innerText = 'Вы все купили';
        }

    if (user.update >= 1)
        for (var i = 1; i != (user.update + 1); i++)
        {
            d.querySelectorAll('shop .section[data-shop="update"] .blockBuy')[0].remove();
            if (d.querySelector('.section[data-shop="update"] .blockBuy') == null) d.querySelector('.section[data-shop="update"] .sectionName').innerText = 'Вы все купили';
        }

} else user = {

    building: 0,
    money: 0,
    click: 1,
    update: 0,
    music: 1,
    ads: [
        0, /* Когда последний раз показывалась реклама при закрытии магазина */
        new Date () / 1000 | 0, /* Когда последний раз показывался мужик с предложение посмотреть рекламу за х3 множитель */
        1, /* Включен ли множитель х3 || 1 = не включен, 3 = включен */
        0 /* Когда был включен множитель х3 */
    ]
}

function newClick ()
{

    user.money = Number(user.money) + (user.click * user.ads[2]);
    d.querySelector('#moneyText').innerText = ('$ ' + user.money);
    d.querySelector('#moneyShopText').innerText = ('$ ' + user.money);

    var time = new Date () / 1;
    d.querySelector('#map').insertAdjacentHTML ('beforeend', '<div id="n' + time + '" class="baks" style="left: ' + (10 + (Math.random () * 70 | 0)) + '%">' + user.click + '$</div>');

    setTimeout(() => {

        var text = '#map div.baks#n' + time;
        d.querySelector(text).style.top = '70px';

        setTimeout(() => {

            d.querySelector(text).remove();
        }, 1000);
    }, 50);

    if (user.music == 1)
    {
        var zv = new Audio ('https://raw.githubusercontent.com/Mashanov/city/main/2.mp3');
        zv.play();
    }
}

function carStart ()
{

    d.querySelector('#car1.car').style.filter = 'hue-rotate(' + (Math.random () * 360 | 0) + 'deg)';

    setTimeout(function (){

        d.querySelector('#car1.car').style.transition = '10s';
        d.querySelector('#car1.car').style.left = '-50px';
        d.querySelector('#car1.car').style.bottom = '215px';

        setTimeout(function ()
        {

            d.querySelector('#car1.car').style.transition = '0s';
            d.querySelector('#car1.car').style.left = '300px';
            d.querySelector('#car1.car').style.bottom = '410px';
            setTimeout(function (){d.querySelector('#car1.car').removeAttribute('style');carStart ();}, 100);

        }, 11000)
    }, 100);
}

setTimeout(function (){carStart ();}, 100);

function carStart2 ()
{

    d.querySelector('#car2.car').style.filter = 'hue-rotate(' + (Math.random () * 360 | 0) + 'deg)';

    setTimeout(function (){

        d.querySelector('#car2.car').style.transition = '5s';
        d.querySelector('#car2.car').style.left = '300px';
        d.querySelector('#car2.car').style.bottom = '440px';

        setTimeout(function ()
        {

            d.querySelector('#car2.car').style.transition = '0s';
            d.querySelector('#car2.car').style.left = '-50px';
            d.querySelector('#car2.car').style.bottom = '240px';
            setTimeout(function (){d.querySelector('#car2.car').removeAttribute('style');carStart2 ();}, 100);

        }, 6000)
    }, 100);
}

setTimeout(function (){carStart2 ();}, 100);

function save ()
{

    localStorage.setItem('game', JSON.stringify(user));
}

function deleteSave ()
{

    localStorage.removeItem('game');
    d.location.reload ();
}

function buy (fromType, fromBuilding, fromMoney, from)
{

    if (fromType == 'build')
    {

        if ((user.building + 1) == fromBuilding && user.money >= fromMoney)
        {

            user.money -= fromMoney;
            d.querySelector('#moneyText').innerText = ('$ ' + user.money);
            d.querySelector('#moneyShopText').innerText = ('$ ' + user.money);
            d.querySelector('.building[data-building="' + fromBuilding + '"]').style.display = 'block';
            user.building = fromBuilding;
            user.click += 1;
            from.parentNode.remove();
            if (d.querySelector('.section[data-shop="build"] .blockBuy') == null) d.querySelector('.section[data-shop="build"] .sectionName').innerText = 'Вы все купили';
            d.querySelector('#redNotification').style.display = 'none';
            save ();
        }

    } else {

        if ((user.update + 1) == fromBuilding && user.money >= fromMoney)
        {

            user.money = (Number(user.money) - fromMoney).toFixed(1);
            d.querySelector('#moneyText').innerText = ('$ ' + user.money);
            d.querySelector('#moneyShopText').innerText = ('$ ' + user.money);
            user.update = fromBuilding;
            from.parentNode.remove();
            if (d.querySelector('.section[data-shop="update"] .blockBuy') == null) d.querySelector('.section[data-shop="update"] .sectionName').innerText = 'Вы все купили';
            d.querySelector('#redNotification').style.display = 'none';
            save ();
        }
    }
}

function passive ()
{

    if (
        
        user.update == 0 && user.money >= 30 ||
        user.update == 1 && user.money >= 100 ||
        user.update == 2 && user.money >= 500 ||
        user.update == 3 && user.money >= 5000 ||
        user.update == 4 && user.money >= 10000 ||
        user.update == 5 && user.money >= 100000 ||
        user.building == 0 && user.money >= 100 ||
        user.building == 1 && user.money >= 500 ||
        user.building == 2 && user.money >= 5000 ||
        user.building == 3 && user.money >= 100000 ||
        user.building == 4 && user.money >= 9000000

    ) d.querySelector('#redNotification').style.display = 'block';

    if (user.ads[2] == 3 && (Number(user.ads[3]) + 120) <= (new Date () / 1000 | 0))
    user.ads[2] = 1;

    if ((Number(user.ads[1]) + 180) <= (new Date () / 1000 | 0))
    {
        
        if (d.querySelector('#adsMan').getAttribute('style') == null)
        {
            d.querySelector('#adsMan').style.bottom = '70px';
            d.querySelector('#adsMessage').style.bottom = '100px';
            user.ads[1] = new Date () / 1000 | 0;
        }
    }

    if (user.update == 0) return null;

    if (user.update == 1) user.money = (Number(user.money) + 0.2 * user.ads[2]).toFixed(1);
    else if (user.update == 2) user.money = (Number(user.money) + 0.5 * user.ads[2]).toFixed(1);
    else if (user.update == 3) user.money = (Number(user.money) + 1.1 * user.ads[2]).toFixed(1);
    else if (user.update == 4) user.money = (Number(user.money) + 2.1 * user.ads[2]).toFixed(1);
    else if (user.update == 5) user.money = (Number(user.money) + 5.1 * user.ads[2]).toFixed(1);
    else if (user.update == 6) user.money = (Number(user.money) + 10.1 * user.ads[2]).toFixed(1);

    d.querySelector('#moneyText').innerText = ('$ ' + user.money);
    d.querySelector('#moneyShopText').innerText = ('$ ' + user.money);
}

function shopVoice (from)
{

    d.querySelector('.sectionButton[style]').removeAttribute('style');
    from.setAttribute('style', 'border-bottom: 3px solid #00d4ff');

    if (from.innerText == 'Стройка')
    {

        d.querySelector('.section[data-shop="update"]').style.display = 'none';
        d.querySelector('.section[data-shop="build"]').style.display = 'inline-block';

    } else {

        d.querySelector('.section[data-shop="build"]').style.display = 'none';
        d.querySelector('.section[data-shop="update"]').style.display = 'inline-block';
    }
}

function aud ()
{

    if (d.querySelector('#musicStop').getAttribute('style') == null)
    {
        d.querySelector('#musicStop').style.display = 'block';
        user.music = 0;
        music.pause ();

    } else {
        
        d.querySelector('#musicStop').removeAttribute('style');
        user.music = 1;
        music.play ();
    }
}

function closeShop (from)
{

    from.parentNode.style.left = '-100%';
    if ((Number(user.ads[0]) + 120) <= (new Date () / 1000 | 0))
    {

        user.ads[0] = new Date () / 1000 | 0;
        vkBridge.send('VKWebAppShowNativeAds', {ad_format:'interstitial'});
    }
}

setInterval(save, 10000);
setInterval(passive, 1000);

var music = new Audio ('https://raw.githubusercontent.com/Mashanov/city/main/1.mp3');
music.loop = true;
music.autoplay = true;
music.volume = 0.5;
music.onloadeddata = () => {
    
    if (user.music == 0) d.querySelector('#musicStop').style.display = 'block';
    else {
        music.play ();
        setTimeout(musicRepeatTest, 1000);
    }
}

function musicRepeatTest ()
{
    setTimeout(musicRepeatTest, 1000);
    if (user.music == 1 && music.currentTime == 0) music.play ();
}