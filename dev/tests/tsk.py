import asyncio
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=2)).new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await setup(pg);ev=pg.evaluate
        await ev("G.tut=999;ovOff();document.querySelector('#go').click()")
        await pg.wait_for_timeout(500);await ev("if(R.cine)R.cine.skip=1");await pg.wait_for_timeout(800)
        await ev("MB.xPlan=null;MB.L=[];MB.cd=1e9;const g=mbGeo();const t=MBT.find(q=>q.id==='x_skate');[0,1].forEach(i=>MB.L.push({T:t,s:i?1:-1,x:WK_X,y:8+i*10,a:1,t:0,sp:0.0001}));R.cam.yaw=1.25;R.cam.pit=.5;R.cam.zoom=1.3;R.camVer++")
        await pg.wait_for_timeout(600);await pg.screenshot(path='sk.png');print(errs[:3]);await b.close()
asyncio.run(main())
