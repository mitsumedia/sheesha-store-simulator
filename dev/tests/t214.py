import asyncio
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)+(e.stack or '')[:300]))
        await setup(pg);ev=pg.evaluate
        await ev("G.tut=999;G.owTut=2;ovOff();G.gaD=-1;gachaRoll=()=> 'ow'")
        await ev("document.getElementById('gachab').click()");await pg.wait_for_timeout(500);await pg.screenshot(path='ga0.png')
        await ev("document.querySelector('[data-gx=\"list\"]').click()");await pg.wait_for_timeout(200);await pg.screenshot(path='ga_list.png');await ev("document.querySelector('[data-gx=\"list\"]').click()")
        await ev("document.querySelector('[data-gx=\"ad\"]').click()");await pg.wait_for_timeout(6300)
        for i,ms in enumerate([300,700,700,700,1800]):
            await pg.wait_for_timeout(ms);await pg.screenshot(path=f'ga{i+1}.png')
        print(await ev("[G.gaD===G.day,$('#gares').innerText,[...document.querySelectorAll('#gabtn button')].map(b=>b.textContent)]"))
        await ev("document.querySelector('[data-gx=\"try\"]').click()");await pg.wait_for_timeout(500)
        print('sheet',await ev("$('#sheet').classList.contains('open')"),await ev("!!$('#gap')"))
        print(errs[:3]);await b.close()
asyncio.run(main())
