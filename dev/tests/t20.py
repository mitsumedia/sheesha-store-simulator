import asyncio,os
# テスト対象：環境変数 GAME（なければリポジトリ直下の index.html）
GAME=os.environ.get('GAME','file://'+os.path.abspath(os.path.join(os.path.dirname(__file__),'..','..','index.html')))
from playwright.async_api import async_playwright
async def setup(pg):
    ev=lambda js:pg.evaluate(js)
    await pg.goto(''+GAME+'');await pg.wait_for_timeout(1200)
    for _ in range(4):
        await ev("""(()=>{for(const id of ['#own0','#loc0','#start0']){const b=document.querySelector(id);if(b){b.click();return id}}})()""");await pg.wait_for_timeout(300)
    await ev("G.tut=99;tutOff();ovOff();G.ow.shop='煙の森';save()")
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        pg=await b.new_page(viewport={'width':390,'height':844},device_scale_factor=2)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append('c:'+m.text) if m.type=='error' else None)
        ev=lambda js:pg.evaluate(js)
        await setup(pg)
        print('morning skill:', await ev("(document.querySelector('#ov').innerText.match(/技術\\s*([\\d.]+)/)||[])[1]"))
        await ev("ovOff()")
        await pg.screenshot(path='v_main.png')
        # 営業 → 閉店
        await ev("start();R.speed=4")
        await pg.wait_for_timeout(1500)
        await ev("R.sched=[];R.people.forEach(p=>{p.gone=1});R.t=G.close*60")
        await pg.wait_for_timeout(900)
        print('owner bub', await ev("OW.bub"), 'clA',await ev("R.clA"))
        await pg.screenshot(path='v_close1.png')
        await pg.wait_for_timeout(2600);await pg.screenshot(path='v_close2.png')
        await pg.wait_for_timeout(1500);await pg.screenshot(path='v_close3.png')
        print('ov text1:', (await ev("document.querySelector('#ov').innerText")).replace('\n',' | ')[:300])
        await ev("[...document.querySelectorAll('#ov button')].find(b=>b.textContent.includes('ログを見る')).click()")
        await pg.wait_for_timeout(300);await pg.screenshot(path='v_close4.png')
        print('ov text2:', (await ev("document.querySelector('#ov').innerText")).replace('\n',' | ')[:300])
        await ev("document.querySelector('#dlok').click()");await pg.wait_for_timeout(500)
        print('after dlok phase',await ev("R.phase"),'shut?',await ev("!!document.querySelector('#shut')"),'ov hidden',await ev("document.querySelector('#ov').hidden"))
        await ev("ovOff()");await pg.wait_for_timeout(1300)
        print('shut after morning closed?',await ev("!!document.querySelector('#shut')"))
        # 暇なひとりごと
        await ev("start();R.speed=4;R.sched=[];R.idT=R.t")
        await pg.wait_for_timeout(500);print('idle bub:',await ev("OW.bub"))
        print('errs',errs);await b.close()
if __name__=="__main__":asyncio.run(main())
