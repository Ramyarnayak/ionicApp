import { Icon } from 'src/app/models/icon';
import { Link } from 'src/app/models/link.model';

export interface FinancialSolution {
    title: string;
    description: string;
    icon: Icon;
    link: Link;
}
