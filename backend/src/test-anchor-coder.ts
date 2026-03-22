import { BorshCoder, Idl } from '@coral-xyz/anchor';
import * as fs from 'fs';
const idl = JSON.parse(fs.readFileSync('../../target/idl/orin_identity.json', 'utf8')) as Idl;
const coder = new BorshCoder(idl);
console.log(Object.keys((coder.accounts as any).accountLayouts));
