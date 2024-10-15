const DEV_URL = 'https://www.google.com';

const QA_URL = 'https://www.google.com';

const PROD_URL = 'https://www.google.com';

const DEFAULT_URL = 'https://www.google.com';

export const DEFAULT_TIMEOUT = 3000;

export const getURL = (): string => {
	if (process.env.ENV === 'DEV') return DEV_URL;
	if (process.env.ENV === 'QA') return QA_URL;
	if (process.env.ENV === 'PROD') return PROD_URL;
	return DEFAULT_URL;
};

export const credentials = {
	username: 'vn57n4s',
	password: 'Kishan@2008'
};
