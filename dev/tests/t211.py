import asyncio
from playwright.async_api import async_playwright
from t20 import setup
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch();pg=await b.new_page(viewport={'width':800,'height':420},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)+(e.stack or '')[:300]))
        await setup(pg);ev=pg.evaluate
        await ev("G.tut=999;G.owTut=2;ovOff();$('#sheet').classList.add('open');fmTab('owner')");await pg.wait_for_timeout(300)
        await ev("const b=document.querySelector('[data-owk=\"edit\"]');b&&b.click()");await pg.wait_for_timeout(300)
        print('ui',await ev("[...document.querySelectorAll('#owed .owl')].map(e=>e.textContent.trim()).join('|')"))
        await ev("document.querySelector('[data-owp=\"accE\"][data-v=\"7\"]').click()");await ev("document.querySelector('[data-owp=\"accH\"][data-v=\"2\"]').click()");await ev("document.querySelector('[data-owp=\"accM\"][data-v=\"4\"]').click()")
        await ev("document.querySelector('[data-ows=\"accCH\"]:nth-child(5)').click()")
        await ev("fmGo()");await pg.wait_for_timeout(300)
        print('saved',await ev("[G.ow.accE,G.ow.accH,G.ow.accM,G.ow.acc,JSON.stringify(OW.c.accV)]"))
        await ev("""(()=>{$('#sheet').classList.remove('open');const W=document.createElement('div');W.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#f3f1ea;display:flex';document.body.appendChild(W);
        const a=document.createElement('canvas');a.width=400;a.height=800;a.style.cssText='width:200px;height:400px;background:transparent!important';W.appendChild(a);vRender(a,fmsVox('p',OW.c),5.9);
        const b=document.createElement('canvas');b.width=400;b.height=800;b.style.cssText='width:200px;height:400px;background:transparent!important';W.appendChild(b);vRender(b,fmsVox('p',OW.c),3.0);
        const c=document.createElement('canvas');c.width=600;c.height=600;c.style.cssText='width:400px;height:400px';W.appendChild(c);chekiDraw(c,G.cs[20],0)})()""")
        await pg.wait_for_timeout(400);await pg.screenshot(path='owacc.png')
        print(errs[:3]);await b.close()
asyncio.run(main())
