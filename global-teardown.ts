import { sessionPath } from './config';
import fs from 'fs';

async function globalTeardown() {
	if(fs.existsSync(sessionPath)){
		fs.unlinkSync(sessionPath)
	}
}

export default globalTeardown;
