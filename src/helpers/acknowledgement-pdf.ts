import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { ContributorsSampleDataset } from '../data/ContributorsSampleDataset';
import { Utils } from './Utils';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

export function downloadAcknowledgementTable(contributors: ContributorsSampleDataset) {
  const groups = Utils.groupBy(contributors.payload, c => `${c.authors}@@@${c.institution}`);
  const list = [];
  for (let [key, entries] of groups) {
    const [authors, institution] = key.split('@@@').map(x => (x === 'null' ? null : x));
    const sequences = entries.map(e => e.accession);
    list.push({ text: authors ?? 'Unknown authors', style: 'authors' });
    if (institution) {
      list.push({ text: 'Institution: ' + institution, style: 'labs' });
    }
    list.push(sequences.join(', '));
  }

  var dd = {
    content: [
      { text: 'Acknowledgements', style: 'header' },
      'We gratefully acknowledge the laboratories and authors who generated the sequences and shared them openly.',
      ...list,
    ],
    styles: {
      header: {
        bold: true,
        fontSize: 14,
        marginBottom: 5,
      },
      labs: {
        italics: true,
        marginBottom: 5,
      },
      authors: {
        bold: true,
        marginTop: 12,
        marginBottom: 5,
      },
    },
    defaultStyle: {
      fontSize: 11,
    },
    footer: function (currentPage: any) {
      return { text: currentPage.toString(), alignment: 'center' as const };
    },
  };

  pdfMake.createPdf(dd).download('Acknowledgements');
}
