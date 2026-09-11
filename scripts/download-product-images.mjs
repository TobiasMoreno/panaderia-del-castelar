// Run only to restore the licensed, provisional product photographs.
import { mkdir, writeFile } from "node:fs/promises";
const photos = {
  facturas: 3850333,
  panificados: 5732762,
  pasteleria: 1098592,
  tortas: 16406496,
  dulces: 17358380,
  salados: 15348783,
};
await mkdir(new URL("../public/products/", import.meta.url), {
  recursive: true,
});
for (const [name, id] of Object.entries(photos)) {
  if (process.argv.length > 2 && !process.argv.slice(2).includes(name))
    continue;
  const response = await fetch(
    `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1200&q=85`,
  );
  if (
    !response.ok ||
    !response.headers.get("content-type")?.startsWith("image/")
  )
    throw new Error(`${name}: ${response.status}`);
  const data = Buffer.from(await response.arrayBuffer());
  await writeFile(
    new URL(`../public/products/${name}.jpg`, import.meta.url),
    data,
  );
  console.log(`${name}: ${Math.round(data.length / 1024)} KB`);
}
