// One-off: download the client's original images from the Squarespace CDN at
// full resolution (2500w is the largest the CDN serves) into content/images/.
// Re-run safely: files that already exist are skipped unless --force is passed.
//
//   node scripts/fetch-originals.mjs [--force]
import { mkdir, writeFile, access } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'content', 'images')
const force = process.argv.includes('--force')
const CDN = 'https://images.squarespace-cdn.com/content/v1/5e303b43153e93663e8ada71/'

/** local name -> path on the CDN (relative to CDN) */
const sources = {
  // logos
  'logo-clinic.png': '1608081613731-JJ2W4NC0BXBKWKX4NRTK/newlogoFINAL-01.png',
  'logo-pilates.png': '67b016e6-174c-4978-b278-4912416813d7/PHOTO-2024-10-04-15-39-28+1.png',
  'logo-hyper8.jpg': '722b049f-dd47-4a3b-b170-cb3795fd923d/final+logo.jpg',
  'logo-academy.jpg': '37d0275b-4ca0-4588-8a2d-0b6415ded480/Asset+4-100.jpg',
  'logo-academy-mark.png': '41a01ec0-b55f-4591-bfcd-bcd43e914f41/Asset+4.png',
  'tss-white.png': '6ac9a1c8-481d-4760-a455-59032b7abfb8/TSS+WHITE.png',
  'tss-black.png': '01570e71-675e-40a5-90b1-30faffdfa251/TSS.png',
  // home service banners
  'banner-clinic.jpg': '6d96102a-42d3-4090-8c65-e4e5a27bf977/Frame+92.jpg',
  'banner-pilates.jpg': '401ea16b-3467-42b5-ac2a-ea4833523742/Frame+93+2.jpg',
  'banner-hyper8.jpg': 'ad009318-99e7-42bd-a019-4c05ed79b94c/Frame+94.jpg',
  'banner-academy.jpg': 'b15746ba-6792-4839-b3e8-d553dd317f16/Frame+95.jpg',
  // clinic
  'sam-skeleton.jpg': '7eaf3ffc-a024-4df8-abb3-7c2711e78ce7/IMG_3933.jpg',
  'clinic-room.jpg': '87b62040-549d-47df-b561-c57b5fabc95b/WhatsApp+Image+2024-02-15+at+1.07.29+PM.jpeg',
  'clinic-3761.jpg': '96fd2079-7ed3-4c0a-aee6-b5e30c72c033/IMG_3761.jpg',
  'book-3910.jpg': '22e6ee18-bfce-4cc0-a023-7ae0cdf63097/IMG_3910.jpg',
  'book-banner.jpg': 'df9d0457-0df3-4b62-90c4-70d7e01c48fe/image0.jpeg',
  'clinic-wide-old.jpg': '737da6ad-c9e5-4b4e-823d-acc0fa327d40/new%2Bclinic%2Bimage.jpeg',
  // team
  'team-sam.jpg': '6a4df333-885d-4dd6-9686-cc84c47e7a74/0_samnew2.jpg',
  'team-mason.jpg': '935e6c0a-f206-4cac-873c-c0b8ecc4f480/Mason+high+res.jpg',
  'team-hollie.png': '8f2b4f21-eaf4-493e-bb6b-33abb951104b/image0-2.png',
  'team-matt.jpg': '29c5d7e9-efa5-482b-b226-9ed5b93cf3bf/alex.jpg',
  // our clients
  'client-1.jpg': 'cbad4553-bd18-48f6-9aa4-f7f8234feb2e/image1.jpg',
  'client-2.jpg': '22d4d93f-6cd2-4a86-bc08-ddfa1d4bd487/image2.jpeg',
  'client-3.jpg': 'ca60333c-476f-446c-8fc8-8ca33fd0b3dd/image3.jpeg',
  'client-4.jpg': '385e663d-92ac-4807-9f98-1668375c08e7/image4.jpeg',
  'client-5.jpg': '534b7d22-282a-44f4-8649-ec5248c632f4/image5.jpeg',
  'client-6.jpg': 'c154b718-e061-4326-bce7-4f76f2888a84/image6.jpeg',
  'client-7.jpg': '52f194e1-f324-4de6-bd57-076fdc65958e/image7.jpeg',
  'client-8.jpg': 'f33eebae-d270-4f2f-9c9b-d906a3706029/image8.jpeg',
  // partners
  'partner-ctha.png': '1613585265406-SKH9ET49Z77PP0VNFQ18/2.png',
  'partner-cma.png': '1602603090535-57MTYI9TUCYYS51P1XGZ/cma.png',
  'partner-simplecbd.png': '1602603176299-LKIE6DXS0GJ46XPBBOB6/simplecbd.png',
  'partner-cnhc.png': '1613585215090-PWR7YMM7481G4QOG4IGT/1.png',
  'partner-acupuncture.png': '1602603114039-NQ3AM1K7EOVMVU4LCIVN/acupuncrture.png',
  'partner-hyperice.jpg': '7238ac4c-f8b7-4411-9561-a04c036860d6/hyeprice.jpg',
  // pilates
  'pilates-1.jpg': '15af8d0d-2a87-4324-953a-05638208b08f/image2.jpeg',
  'pilates-2.jpg': '52d180ca-037e-49b0-bf84-728e577857bf/image4.jpeg',
  'pilates-3.jpg': '047071be-6331-4791-add3-c8ad49402e41/image0.jpeg',
  'icon-yoga.png': '6236fa6b-8e5b-41c1-b4bf-db647ad79059/yoga.png',
  'icon-book.png': '24679e85-0df5-46f8-b826-48f86c35ab71/open-book+%281%29.png',
  'icon-education.png': 'e4788fb6-efca-481d-b06d-e993dcfb079b/education.png',
  // hyper 8
  'hyper8-hero.png': '626e05ea-10f1-446d-b236-d476d31eb3c4/unnamed.png',
  'hyper8-1.jpg': '0475e5a6-d01e-4739-8073-5a1871b9cea7/photo-output+%281%29.JPG',
  'hyper8-2.jpg': 'de71d571-99fe-456f-a496-652f64186dd2/photo-output+%282%29.JPG',
  'hyper8-store-12week.png': '3a94b614-f966-469f-9c76-9fd2112d9d11/image0-2.png',
  // academy
  'academy-1.jpg': '6cb23128-5f15-4d38-bba1-889acfcf864a/WhatsApp+Image+2024-10-09+at+6.16.05+PM.jpeg',
  'academy-2.jpg': 'ce55f83d-6ae3-4943-b3ba-f25bbc70d2c8/WhatsApp+Image+2024-10-09+at+5.56.54+PM.jpeg',
  'academy-3.jpg': 'ddc71874-25bc-4e85-9907-1d3c71b0b09c/WhatsApp+Image+2024-10-09+at+5.54.20+PM.jpeg',
  'academy-day-in-clinic.jpg': '755a97ac-784b-446f-a337-3843cfbd948e/WhatsApp+Image+2024-07-02+at+5.27.38+PM.jpg',
  'icon-mortarboard.png': 'e6191ac6-d529-4d57-9bba-9169d409f115/mortarboard.png',
  'icon-video.png': '1a070fa7-e8ca-4b08-8d05-df1dfbb13527/video-camera.png',
  'course-1.jpg': 'eadb3cf4-ad8c-4ddb-9f6d-f58b9f9c5484/CleanShot+2024-06-12+at+09.25+1.jpg',
  'course-2.jpg': 'd585faa6-b9e0-4ea1-bc44-dd101eb69407/Frame+2.jpg',
  'course-3.jpg': '981c6340-32ad-4eb0-895f-d62c0ec2648b/IMG_1797.jpg',
  'course-4.jpg': '337aaa0d-fd65-4114-b055-aa60870417d2/IMG_1882+1.jpg',
  'course-5.jpg': 'e3401ff7-4b49-4b96-9f58-75cd046fdd9d/Frame+3.jpg',
  'course-6.jpg': '585d99e5-fe9c-4361-a544-116be09f7fa9/IMG_1878.jpg',
  'course-7.jpg': 'fd2fbbfa-2038-4753-a3ca-5151ed9eef4b/Frame+4.jpg',
  'course-8.jpg': 'ce901936-fd72-4f95-82fb-68969ce6275d/IMG_1867+1.jpg',
  // instagram (the twelve tiles on the live site, newest first)
  'ig-01.jpg': '1781020890791-EQJQQLXZK1OJM5JSVHLZ/image-asset.jpeg',
  'ig-02.jpg': '1780918084841-MSZ3BUER1C0VYZ2IPZEA/image-asset.jpeg',
  'ig-03.jpg': '1780855321746-JL1KSNFF9OX86UIPU8MD/image-asset.jpeg',
  'ig-04.jpg': '1780688359294-C1FJI1XOAKIR6FFBWUZE/image-asset.jpeg',
  'ig-05.jpg': '1780588214411-VDGZ0Y8U8T6BWJ6INL5E/image-asset.jpeg',
  'ig-06.jpg': '1780220495753-H0C1ZQJQBD78X7KHI6RV/image-asset.jpeg',
  'ig-07.jpg': '1779831683501-6GJ1K429ZG0Q64S5OBF7/image-asset.jpeg',
  'ig-08.jpg': '1779618653525-94SY6WFUYPPOQIPU6G40/image-asset.jpeg',
  'ig-09.jpg': '1779361081525-46DCL70MELO90Q7LJCM0/image-asset.jpeg',
  'ig-10.jpg': '1779029957185-92NGPDT32GKFRGP9YUW7/image-asset.jpeg',
  'ig-11.jpg': '1778757747955-B5GJ2AVR9A10TL5R0HN5/image-asset.jpeg',
  'ig-12.jpg': '1778406803349-LWMRBHGGRR7MFNXOOAZY/image-asset.jpeg',
}

const exists = (p) => access(p).then(() => true, () => false)
await mkdir(outDir, { recursive: true })

let ok = 0
let skipped = 0
const failed = []
const names = Object.keys(sources)
// modest concurrency so we are polite to the CDN
const queue = [...names]
async function worker() {
  for (let name = queue.shift(); name; name = queue.shift()) {
    const base = name.replace(/\.[a-z]+$/, '')
    if (!force && (await Promise.all(['jpg', 'png', 'webp'].map((e) => exists(join(outDir, base + '.' + e))))).some(Boolean)) { skipped++; continue }
    const url = CDN + sources[name] + '?format=2500w'
    try {
      const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0 (site-migration image fetch)', accept: 'image/jpeg,image/png' } })
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const buf = Buffer.from(await res.arrayBuffer())
      // A few uploads are stored as WebP on the CDN whatever their file name says,
      // so the saved extension follows the bytes we actually received.
      const type = res.headers.get('content-type') || ''
      const ext = type.includes('webp') ? 'webp' : type.includes('png') ? 'png' : 'jpg'
      await writeFile(join(outDir, base + '.' + ext), buf)
      ok++
      console.log(`${name.padEnd(28)} ${(buf.length / 1024).toFixed(0).padStart(6)} KB  ${res.headers.get('content-type')}`)
    } catch (err) {
      failed.push(`${name}: ${err.message} (${url})`)
    }
  }
}
await Promise.all(Array.from({ length: 4 }, worker))
console.log(`\ndownloaded ${ok}, skipped ${skipped}, failed ${failed.length}`)
if (failed.length) { console.log(failed.join('\n')); process.exitCode = 1 }
