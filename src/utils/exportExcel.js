import writeExcelFile from 'write-excel-file/browser';
import { getAddedDate, getSoldDate, getDaysToSell } from './phones';

const header = value => ({ value, fontWeight: 'bold' });
const text = value => ({ value: String(value ?? ''), type: String });
const money = value => ({ value: Number(value) || 0, type: Number, format: '#,##0' });
const date = value =>
  value ? { value, type: Date, format: 'dd.mm.yyyy' } : { value: '', type: String };

const columns = [
  { header: header('ID'), width: 8, cell: p => text(p.id) },
  { header: header('Модель'), width: 28, cell: p => text(p.Model) },
  { header: header('Ціна телефону'), width: 16, cell: p => money(p.Price) },
  { header: header('Ціна запчастин'), width: 16, cell: p => money(p.Detailprice) },
  { header: header('Ціна продажу'), width: 16, cell: p => money(p.Sold_for) },
  {
    header: header('Прибуток'),
    width: 14,
    cell: p => money(Number(p.Sold_for || 0) - Number(p.Price || 0) - Number(p.Detailprice || 0)),
  },
  { header: header('Статус'), width: 14, cell: p => text(p.isSold ? 'Продано' : 'Не продано') },
  { header: header('Додано'), width: 14, cell: p => date(getAddedDate(p)) },
  { header: header('Продано (дата)'), width: 16, cell: p => date(getSoldDate(p)) },
  {
    header: header('Днів до продажу'),
    width: 16,
    cell: p => {
      const days = getDaysToSell(p);
      return days === null ? text('') : { value: days, type: Number };
    },
  },
  { header: header('Примітка'), width: 40, cell: p => text(p.Note) },
];

export const exportPhonesToExcel = async phones => {
  const stamp = new Date().toISOString().slice(0, 10);
  await writeExcelFile(phones, { columns }).toFile(`phones-backup-${stamp}.xlsx`);
};
