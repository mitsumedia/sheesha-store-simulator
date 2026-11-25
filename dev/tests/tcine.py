import asyncio,os
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await (await b.new_context(viewport={'width':390,'height':844},device_scale_factor=1)).new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)[:200]))
        await setup(pg);ev=pg.evaluate
        await ev("G.tut=999;ovOff();G.loc=Object.assign({},G.loc||{},{z:4});genScn();build();BGK=''")
        os.makedirs('cn',exist_ok=True)
        await pg.screenshot(path='cn/p0.png')
        print("prepOW",await ev("[OW.x,R.phase]"));await ev("document.querySelector('#go').click();R.speed=1")
        for i in range(14):
            await pg.wait_for_timeout(450)
            info=await ev("JSON.stringify([R.cine&&R.cine.k,R.cine&&+R.cine.lv.toFixed(2),Math.round(R.t),+R.cam.yaw.toFixed(2),Math.round(OW.x),Math.round(OW.y)])")
            print('open',i,info);await pg.screenshot(path=f'cn/o{i:02d}.png')
        await ev("R.sched.length=0;R.people=[];R.t=G.close*60+1")
        for i in range(18):
            await pg.wait_for_timeout(450)
            info=await ev("JSON.stringify([R.cine&&R.cine.k,R.cine&&R.cine.ph,R.cine&&+R.cine.lv.toFixed(2),Math.round(OW.x),MB.L.filter(m=>m.own).length,!document.querySelector('#ov').hidden,R.phase])")
            print('close',i,info);await pg.screenshot(path=f'cn/c{i:02d}.png')
        print(errs[:3]);await b.close()
asyncio.run(main())
