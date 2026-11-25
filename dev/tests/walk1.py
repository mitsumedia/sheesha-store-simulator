import asyncio,os
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':560},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await setup(pg);ev=pg.evaluate
        await ev("G.tut=999;ovOff();G.loc=Object.assign(G.loc||{},{z:4});genScn();build();R.cam.zoom=.7;R.cam.yaw=-.35;R.camVer++;BGK='';start();R.speed=1;R.sched.push({at:R.t+8,m:[G.cs[12]]},{at:R.t+20,m:[G.cs[20],G.cs[21]]});R.sched.sort((a,b)=>a.at-b.at)")
        os.makedirs('wk',exist_ok=True)
        for i in range(160):
            await pg.wait_for_timeout(80)
            if i%2==0: await pg.screenshot(path=f'wk/f{i//2:03d}.png',clip={'x':0,'y':130,'width':390,'height':400})
        print('outside walkers',await ev("R.people.filter(p=>p.x<-3).length"),'people',await ev("R.people.length"))
        await ev("R.speed=4");
        for i in range(80):
            await pg.wait_for_timeout(1000)
            if await ev("R.phase!=='run'"):break
        print('phase',await ev("R.phase"),'t',await ev("R.t"),'visits',await ev("R.st&&R.st.visits"),errs[:3]);await b.close()
asyncio.run(main())
