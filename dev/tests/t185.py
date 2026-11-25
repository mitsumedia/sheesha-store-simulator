import asyncio
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for h in (664,560):
            pg=await b.new_page(viewport={'width':390,'height':h},device_scale_factor=2,has_touch=True,is_mobile=True)
            await setup(pg);ev=pg.evaluate
            await ev("G.tut=999;G.owTut=2;ovOff();G.ow.acted=0;showMorning()");await pg.wait_for_timeout(500)
            await pg.tap('#ov [data-mo="prac"]');await pg.wait_for_timeout(200)
            r=await ev("(()=>{const g=$('#mngo').getBoundingClientRect();return [Math.round(g.top),Math.round(g.bottom),innerHeight]})()")
            print(h,r);await pg.screenshot(path=f'mn{h}.png')
            await pg.tap('#mngo');await pg.wait_for_timeout(500);print('acted',await ev("G.ow.acted"))
        await b.close()
asyncio.run(main())
