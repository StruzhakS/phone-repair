// One-time import: node scripts/importPhones.mjs <path-to-xlsx>
import readXlsxFile from 'read-excel-file/node';
import { initializeApp } from 'firebase/app';
import { doc, getFirestore, writeBatch } from 'firebase/firestore';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/importPhones.mjs <path-to-xlsx>');
  process.exit(1);
}

const app = initializeApp({
  apiKey: 'AIzaSyDSgKBnwFY3HGkVjn34cixyRFrd3wfFtlI',
  projectId: 'phone-repair-c9df6',
});
const db = getFirestore(app);

const toIso = value => (value instanceof Date ? value.toISOString() : null);
const toNumber = value => Number(value) || 0;

const [{ data }] = await readXlsxFile(file);
const phones = data
  .slice(1)
  .filter(row => row[0] !== null && row[0] !== '')
  .map(row => {
    const isSold = row[6] === 'Продано';
    return {
      id: Number(row[0]),
      Model: String(row[1] ?? ''),
      Price: toNumber(row[2]),
      Detailprice: toNumber(row[3]),
      Sold_for: toNumber(row[4]),
      Note: row[10] == null ? '' : String(row[10]),
      isSold,
      addedAt: toIso(row[7]),
      soldAt: isSold ? toIso(row[8]) : null,
    };
  });

const BATCH_SIZE = 400;
for (let i = 0; i < phones.length; i += BATCH_SIZE) {
  const batch = writeBatch(db);
  phones
    .slice(i, i + BATCH_SIZE)
    .forEach(phone => batch.set(doc(db, 'Phones', String(phone.id)), phone));
  await batch.commit();
}

console.log(`Imported ${phones.length} phones`);
process.exit(0);
