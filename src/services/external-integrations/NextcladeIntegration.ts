import { OrderAndLimitConfig } from '../../data/OrderAndLimitConfig';
import { getLinkToFasta } from '../../data/api-lapis';
import { LapisSelector } from '../../data/LapisSelector';

export class NextcladeIntegration {
  static getLink(selector: LapisSelector): string {
    const orderAndLimit: OrderAndLimitConfig = {
      orderBy: 'random',
      limit: 200,
    };
    const linkToFasta = getLinkToFasta(false, selector, orderAndLimit);
    const nextcladePrefix = 'https://master.clades.nextstrain.org/?dataset-name=MPXV&input-fasta=';
    return `${nextcladePrefix}${encodeURIComponent(linkToFasta)}`;
  }
}
