const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

(async () => {
  const categories = ['activities.json', 'productive-activities.json'].flatMap(file => JSON.parse(fs.readFileSync(path.join('public', file), 'utf8')).categories);
  const activities = categories.flatMap(category => category.activities);
  const images = [...new Set(activities.map(activity => activity.image))];
  const failures = [];
  const checked = [];
  for (const image of images) {
    if (!image || !image.startsWith('/') || image.startsWith('//')) { failures.push({image, error:'Not a local image'}); continue; }
    try {
      const file = path.join('public', image);
      const decoded = await sharp(file, {failOn:'warning'}).raw().toBuffer({resolveWithObject:true});
      if (!decoded.info.width || !decoded.info.height) throw Error('Empty image');
      checked.push({image,width:decoded.info.width,height:decoded.info.height});
    } catch (error) { failures.push({image,error:error.message}); }
  }
  const otherAssets = fs.readdirSync('public').filter(file => /\.(png|jpe?g|webp|svg)$/i.test(file));
  for (const file of otherAssets) {
    try { await sharp(path.join('public',file),{failOn:'warning'}).raw().toBuffer(); }
    catch (error) { failures.push({image:file,error:error.message}); }
  }
  let served = 0;
  let optimized = 0;
  for (let i=0;i<images.length;i+=8) {
    await Promise.all(images.slice(i,i+8).map(async image => {
      try {
        const response = await fetch(new URL(image,'http://127.0.0.1:3000'),{signal:AbortSignal.timeout(15000)});
        if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw Error(`HTTP ${response.status}, ${response.headers.get('content-type')}`);
        await response.arrayBuffer(); served++;
        const optimizedUrl = new URL('/_next/image', 'http://127.0.0.1:3000');
        optimizedUrl.search = new URLSearchParams({url:image,w:'640',q:'75'}).toString();
        const resized = await fetch(optimizedUrl, {signal:AbortSignal.timeout(30000)});
        if (!resized.ok || !resized.headers.get('content-type')?.startsWith('image/')) throw Error(`Optimizer HTTP ${resized.status}`);
        await sharp(Buffer.from(await resized.arrayBuffer()), {failOn:'warning'}).raw().toBuffer();
        optimized++;
      } catch (error) { failures.push({image,error:error.message}); }
    }));
  }
  console.log(JSON.stringify({activities:activities.length,localActivityImages:checked.length,otherLocalAssets:otherAssets.length,imagesServed:served,optimizedImages:optimized,failures},null,2));
  process.exitCode = failures.length ? 1 : 0;
})().catch(error=>{ console.error(error);process.exitCode=1; });
