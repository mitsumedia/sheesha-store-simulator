import asyncio,os,sys
sys.path.insert(0,os.path.dirname(__file__))
from t20 import setup
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append('c:'+m.text) if m.type=='error' else None)
        ev=lambda js:pg.evaluate(js)
        await setup(pg)
        await ev("ovOff()")
        print('SER',await ev("SER.length"),'DEC',await ev("DEC.length"),'open start',await ev("DEC.filter(decOpen).map(x=>x.n).join(',')"))
        print('wp series open',await ev("WP.filter(x=>x.u&&x.u[0]==='ser'&&wpOpen(x)).map(x=>x.n).join(',')"))
        await ev("setTab('deco');R.dcat='obj';rdeco()")
        await pg.wait_for_timeout(500)
        await ev("document.querySelector('#sheet')&&document.querySelector('#sheet').classList.add('open')")
        await pg.screenshot(path='/tmp/ser_list.png')
        # 全部を持っていることにして、ボーナスがもらえるか
        await ev("G.money=1e7;G.ow.fame=100;G.ow.starB=100;G.ow.star=100;G.ow.skill=100;save()")
        await ev("R.dser='aqua';rdeco()");await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/ser_list2.png')
        print('errs',errs[:5])
        await b.close()
asyncio.run(main())
