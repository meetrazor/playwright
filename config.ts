const DEV_URL = 'https://dev.walmartluminate.com/digitallandscapes/';

const QA_URL = 'https://stg.walmartluminate.com/digitallandscapes/';

const PROD_URL = 'https://www.walmartluminate.com/digitallandscapes/';

const DEFAULT_URL = 'https://stg.walmartluminate.com/digitallandscapes/';

export const sessionPath = './session.json';

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
