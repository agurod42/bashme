import Clime from '../src/Clime';
import { Json } from '../src/resume/providers';

Clime
    .use(new Json('test/data/agurodriguez.json'))
    .show();